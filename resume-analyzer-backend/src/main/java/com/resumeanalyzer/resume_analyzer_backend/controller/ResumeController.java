package com.resumeanalyzer.resume_analyzer_backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeanalyzer.resume_analyzer_backend.model.AnalysisResult;
import com.resumeanalyzer.resume_analyzer_backend.model.Resume;
import com.resumeanalyzer.resume_analyzer_backend.repository.AnalysisResultRepository;
import com.resumeanalyzer.resume_analyzer_backend.repository.ResumeRepository;
import com.resumeanalyzer.resume_analyzer_backend.repository.UserRepository;
import com.resumeanalyzer.resume_analyzer_backend.service.AIService;
import com.resumeanalyzer.resume_analyzer_backend.service.ParserService;
import com.resumeanalyzer.resume_analyzer_backend.service.ScoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*") // Allow frontend requests
public class ResumeController {

    @Autowired
    private ParserService parserService;

    @Autowired
    private ScoringService scoringService;

    @Autowired
    private AIService aiService;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private AnalysisResultRepository analysisResultRepository;

    @Autowired
    private UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobDescription") String jobDescription,
            @RequestParam(value = "userId", required = false) Long userId) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File cannot be empty");
            }
            if (jobDescription == null || jobDescription.trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Job description cannot be empty");
            }

            // 1. Parse File
            String rawText = parserService.parseFile(file);
            String fileType = file.getOriginalFilename().toLowerCase().endsWith(".pdf") ? "pdf" : "docx";

            // 2. Save Resume Entity
            Resume resume = new Resume();
            resume.setFilename(file.getOriginalFilename());
            resume.setFileType(fileType);
            resume.setRawText(rawText);
            resume.setUploadedAt(LocalDateTime.now());
            
            if (userId != null) {
                userRepository.findById(userId).ifPresent(resume::setUser);
            }
            resume = resumeRepository.save(resume);

            // 3. Compute Score and keywords
            Map<String, Object> analysis = scoringService.analyzeResume(rawText, jobDescription);
            int atsScore = (int) analysis.get("atsScore");
            List<String> matchedKeywords = (List<String>) analysis.get("matchedKeywords");
            List<String> missingKeywords = (List<String>) analysis.get("missingKeywords");
            List<String> detectedSections = (List<String>) analysis.get("detectedSections");
            boolean hasEmail = (boolean) analysis.get("hasEmail");
            boolean hasPhone = (boolean) analysis.get("hasPhone");
            boolean hasLinks = (boolean) analysis.get("hasLinks");

            // 4. Generate AI Suggestions
            Map<String, Object> aiSuggestions = aiService.getImprovementSuggestions(
                    rawText,
                    jobDescription,
                    atsScore,
                    matchedKeywords,
                    missingKeywords,
                    detectedSections,
                    hasEmail,
                    hasPhone,
                    hasLinks
            );

            // 5. Save AnalysisResult Entity
            AnalysisResult result = new AnalysisResult();
            result.setResume(resume);
            result.setJobDescriptionText(jobDescription);
            result.setAtsScore(atsScore);
            result.setMatchedKeywords(objectMapper.writeValueAsString(matchedKeywords));
            result.setMissingKeywords(objectMapper.writeValueAsString(missingKeywords));
            result.setSuggestions(objectMapper.writeValueAsString(aiSuggestions));
            result.setAnalyzedAt(LocalDateTime.now());
            result = analysisResultRepository.save(result);

            return ResponseEntity.ok(result);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing resume: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<AnalysisResult>> getHistory(
            @RequestParam(value = "userId", required = false) Long userId) {
        if (userId != null) {
            return ResponseEntity.ok(analysisResultRepository.findByUserId(userId));
        }
        return ResponseEntity.ok(analysisResultRepository.findAllByOrderByAnalyzedAtDesc());
    }

    @GetMapping("/history/{id}")
    public ResponseEntity<?> getHistoryItem(@PathVariable Long id) {
        Optional<AnalysisResult> result = analysisResultRepository.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Scan history record not found");
        }
    }

    @DeleteMapping("/history/{id}")
    public ResponseEntity<?> deleteHistoryItem(@PathVariable Long id) {
        if (analysisResultRepository.existsById(id)) {
            analysisResultRepository.deleteById(id);
            return ResponseEntity.ok(Collections.singletonMap("message", "History record deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Scan history record not found");
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStats(
            @RequestParam(value = "userId", required = false) Long userId) {
        try {
            List<AnalysisResult> results;
            if (userId != null) {
                results = analysisResultRepository.findByUserId(userId);
            } else {
                results = analysisResultRepository.findAll();
            }
            int totalScans = results.size();
            
            if (totalScans == 0) {
                Map<String, Object> emptyStats = new HashMap<>();
                emptyStats.put("totalScans", 0);
                emptyStats.put("averageScore", 0);
                emptyStats.put("lowScoreCount", 0);
                emptyStats.put("midScoreCount", 0);
                emptyStats.put("highScoreCount", 0);
                emptyStats.put("topMissingKeywords", Collections.emptyList());
                emptyStats.put("recentScans", Collections.emptyList());
                return ResponseEntity.ok(emptyStats);
            }

            int scoreSum = 0;
            int lowScore = 0; // < 50
            int midScore = 0; // 50 - 75
            int highScore = 0; // >= 75
            Map<String, Integer> missingKeywordsFreq = new HashMap<>();

            for (AnalysisResult r : results) {
                int score = r.getAtsScore();
                scoreSum += score;

                if (score < 50) {
                    lowScore++;
                } else if (score < 75) {
                    midScore++;
                } else {
                    highScore++;
                }

                // Parse missing keywords to build dynamic statistics
                try {
                    List<String> missing = objectMapper.readValue(r.getMissingKeywords(), new TypeReference<List<String>>() {});
                    for (String kw : missing) {
                        missingKeywordsFreq.put(kw, missingKeywordsFreq.getOrDefault(kw, 0) + 1);
                    }
                } catch (Exception e) {
                    // Ignore parsing error for specific records
                }
            }

            double averageScore = (double) scoreSum / totalScans;

            // Sort missing keywords by frequency
            List<Map.Entry<String, Integer>> sortedMissing = new ArrayList<>(missingKeywordsFreq.entrySet());
            sortedMissing.sort((e1, e2) -> e2.getValue().compareTo(e1.getValue()));

            List<Map<String, Object>> topMissing = new ArrayList<>();
            for (int i = 0; i < Math.min(6, sortedMissing.size()); i++) {
                Map<String, Object> kwStat = new HashMap<>();
                kwStat.put("keyword", sortedMissing.get(i).getKey());
                kwStat.put("count", sortedMissing.get(i).getValue());
                topMissing.add(kwStat);
            }

            List<AnalysisResult> recentResults;
            if (userId != null) {
                recentResults = results; // results is already sorted desc
            } else {
                recentResults = analysisResultRepository.findAllByOrderByAnalyzedAtDesc();
            }
            List<AnalysisResult> limitedRecent = recentResults.subList(0, Math.min(5, recentResults.size()));

            Map<String, Object> stats = new HashMap<>();
            stats.put("totalScans", totalScans);
            stats.put("averageScore", Math.round(averageScore * 10.0) / 10.0);
            stats.put("lowScoreCount", lowScore);
            stats.put("midScoreCount", midScore);
            stats.put("highScoreCount", highScore);
            stats.put("topMissingKeywords", topMissing);
            stats.put("recentScans", limitedRecent);

            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving statistics: " + e.getMessage());
        }
    }
}
