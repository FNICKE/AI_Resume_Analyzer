package com.resumeanalyzer.resume_analyzer_backend.controller;

import com.resumeanalyzer.resume_analyzer_backend.model.*;
import com.resumeanalyzer.resume_analyzer_backend.repository.UserRepository;
import com.resumeanalyzer.resume_analyzer_backend.service.InterviewPrepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/interview-prep")
public class InterviewPrepController {

    @Autowired
    private InterviewPrepService interviewPrepService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/mcqs")
    public ResponseEntity<?> getMcqs(
            @RequestParam("topic") String topic,
            @RequestParam(value = "limit", defaultValue = "5") int limit) {
        List<McqQuestion> questions = interviewPrepService.getRandomMcqs(topic, limit);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/mcqs/submit")
    public ResponseEntity<?> submitMcq(@RequestBody McqSubmitRequest request) {
        if (request.getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID is required");
        }
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        UserMcqAttempt attempt = interviewPrepService.submitMcqTest(
            userOpt.get(),
            request.getTopic(),
            request.getSubmissions()
        );
        return ResponseEntity.ok(attempt);
    }

    @GetMapping("/mcq-history")
    public ResponseEntity<?> getMcqHistory(@RequestParam("userId") Long userId) {
        List<UserMcqAttempt> attempts = interviewPrepService.getMcqHistory(userId);
        return ResponseEntity.ok(attempts);
    }

    @GetMapping("/coding-challenges")
    public ResponseEntity<?> getCodingChallenges() {
        List<CodingChallenge> challenges = interviewPrepService.getAllChallenges();
        return ResponseEntity.ok(challenges);
    }

    @GetMapping("/coding-challenges/{id}")
    public ResponseEntity<?> getCodingChallenge(@PathVariable("id") Long id) {
        return interviewPrepService.getChallengeById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/coding-challenges/{id}/submit")
    public ResponseEntity<?> submitCodingChallenge(
            @PathVariable("id") Long id,
            @RequestBody CodingSubmitRequest request) {
        if (request.getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID is required");
        }
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        CodingSubmission submission = interviewPrepService.submitCode(
            userOpt.get(),
            id,
            request.getCode(),
            request.getLanguage()
        );
        return ResponseEntity.ok(submission);
    }

    @GetMapping("/coding-history")
    public ResponseEntity<?> getCodingHistory(@RequestParam("userId") Long userId) {
        List<CodingSubmission> submissions = interviewPrepService.getCodingHistory(userId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/questions")
    public ResponseEntity<?> getInterviewQuestions(@RequestParam(value = "category", required = false) String category) {
        List<InterviewQuestion> questions = interviewPrepService.getInterviewQuestions(category);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/performance")
    public ResponseEntity<?> getPerformanceStats(@RequestParam("userId") Long userId) {
        Map<String, Object> stats = interviewPrepService.getPerformanceStats(userId);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/ai-feedback")
    public ResponseEntity<?> getAiFeedback(@RequestParam("userId") Long userId) {
        Map<String, Object> feedback = interviewPrepService.getAiFeedbackReport(userId);
        return ResponseEntity.ok(feedback);
    }

    // --- MOCK INTERVIEW AGENT ENDPOINTS ---

    @PostMapping("/interview/start")
    public ResponseEntity<?> startInterview(@RequestBody InterviewStartRequest request) {
        if (request.getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID is required");
        }
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        MockInterviewSession session = interviewPrepService.startInterviewSession(
            userOpt.get(),
            request.getTechStack(),
            request.getDifficulty(),
            request.getMaxQuestions(),
            request.getExternalApiUrl()
        );
        return ResponseEntity.ok(session);
    }

    @PostMapping("/interview/submit-answer")
    public ResponseEntity<?> submitInterviewAnswer(@RequestBody InterviewAnswerRequest request) {
        if (request.getSessionId() == null) {
            return ResponseEntity.badRequest().body("Session ID is required");
        }
        try {
            Map<String, Object> result = interviewPrepService.submitInterviewAnswer(
                request.getSessionId(),
                request.getAnswer(),
                request.getExternalApiUrl()
            );
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/interview/history")
    public ResponseEntity<?> getInterviewHistory(@RequestParam("userId") Long userId) {
        List<MockInterviewSession> history = interviewPrepService.getInterviewHistory(userId);
        return ResponseEntity.ok(history);
    }

    @PostMapping("/questions/sync")
    public ResponseEntity<?> syncTechnicalTrends() {
        int addedCount = interviewPrepService.syncTrendingQuestions();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("addedCount", addedCount);
        response.put("message", "Tech trend questions synchronized successfully. Added " + addedCount + " new items.");
        return ResponseEntity.ok(response);
    }

    // Request structures
    public static class McqSubmitRequest {
        private Long userId;
        private String topic;
        private List<Map<String, Object>> submissions;

        public McqSubmitRequest() {}

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getTopic() { return topic; }
        public void setTopic(String topic) { this.topic = topic; }
        public List<Map<String, Object>> getSubmissions() { return submissions; }
        public void setSubmissions(List<Map<String, Object>> submissions) { this.submissions = submissions; }
    }

    public static class CodingSubmitRequest {
        private Long userId;
        private String code;
        private String language;

        public CodingSubmitRequest() {}

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
    }

    public static class InterviewStartRequest {
        private Long userId;
        private String techStack;
        private String difficulty;
        private int maxQuestions;
        private String externalApiUrl;

        public InterviewStartRequest() {}

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getTechStack() { return techStack; }
        public void setTechStack(String techStack) { this.techStack = techStack; }
        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
        public int getMaxQuestions() { return maxQuestions; }
        public void setMaxQuestions(int maxQuestions) { this.maxQuestions = maxQuestions; }
        public String getExternalApiUrl() { return externalApiUrl; }
        public void setExternalApiUrl(String externalApiUrl) { this.externalApiUrl = externalApiUrl; }
    }

    public static class InterviewAnswerRequest {
        private Long sessionId;
        private String answer;
        private String externalApiUrl;

        public InterviewAnswerRequest() {}

        public Long getSessionId() { return sessionId; }
        public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
        public String getAnswer() { return answer; }
        public void setAnswer(String answer) { this.answer = answer; }
        public String getExternalApiUrl() { return externalApiUrl; }
        public void setExternalApiUrl(String externalApiUrl) { this.externalApiUrl = externalApiUrl; }
    }

    @PostMapping("/compiler/evaluate")
    public ResponseEntity<?> evaluateGenericCode(@RequestBody CompilerRequest request) {
        if (request.getCode() == null || request.getQuestion() == null) {
            return ResponseEntity.badRequest().body("Code and Question are required");
        }
        Map<String, Object> result = interviewPrepService.compileGenericCode(
            request.getCode(),
            request.getLanguage(),
            request.getQuestion()
        );
        return ResponseEntity.ok(result);
    }

    public static class CompilerRequest {
        private String code;
        private String language;
        private String question;

        public CompilerRequest() {}

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
    }
}
