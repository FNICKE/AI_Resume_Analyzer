package com.resumeanalyzer.resume_analyzer_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;

@Service
public class AIService {

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Map<String, Object> getImprovementSuggestions(
            String resumeText,
            String jobDescText,
            int atsScore,
            List<String> matchedKeywords,
            List<String> missingKeywords,
            List<String> detectedSections,
            boolean hasEmail,
            boolean hasPhone,
            boolean hasLinks) {

        if (geminiApiKey != null && !geminiApiKey.trim().isEmpty()) {
            try {
                return callGeminiAPI(resumeText, jobDescText, atsScore, missingKeywords);
            } catch (Exception e) {
                System.err.println("Error calling Gemini API: " + e.getMessage() + ". Falling back to rule-based analysis.");
            }
        }

        // Rule-based analyzer (Fallback & Offline mode)
        Map<String, Object> suggestions = new HashMap<>();
        suggestions.put("summary", generateSummary(atsScore, matchedKeywords.size(), missingKeywords.size()));
        suggestions.put("formattingSuggestions", generateFormattingSuggestions(detectedSections, resumeText.length()));
        suggestions.put("keywordSuggestions", generateKeywordSuggestions(missingKeywords));
        suggestions.put("contentSuggestions", generateContentSuggestions(resumeText, hasEmail, hasPhone, hasLinks));

        return suggestions;
    }

    private String generateSummary(int score, int matchedCount, int missingCount) {
        if (score >= 80) {
            return "Excellent! Your resume matches the job description very well. You have demonstrated a strong alignment of skills and structured your resume cleanly. Review the minor suggestions below to make it flawless.";
        } else if (score >= 60) {
            return "Good start, but there is room for improvement. Your resume contains several relevant keywords, but missing core competencies or structural sections is holding your ATS score back. Incorporating the suggested keywords will significantly boost your ranking.";
        } else {
            return "Your resume requires significant optimization for this position. The keyword match is low, or crucial resume sections are missing. Tailoring your resume to use industry-standard terms and formatting will improve your chances of passing automated screens.";
        }
    }

    private List<String> generateFormattingSuggestions(List<String> detectedSections, int textLength) {
        List<String> suggestions = new ArrayList<>();
        
        List<String> allSections = Arrays.asList("experience", "education", "skills", "projects", "certifications");
        for (String sec : allSections) {
            if (!detectedSections.contains(sec)) {
                suggestions.add("Missing '" + sec.substring(0,1).toUpperCase() + sec.substring(1) + "' section. ATS systems scan for these standard headings to categorize your background.");
            }
        }

        int wordCount = textLength / 6;
        if (wordCount > 1500) {
            suggestions.add("Your resume seems overly long (approx. " + wordCount + " words). Keep your resume to 1-2 pages maximum by summarizing older or less relevant roles.");
        } else if (wordCount < 200) {
            suggestions.add("Your resume is very brief (approx. " + wordCount + " words). Expand on your projects and responsibilities to provide more context to recruiters.");
        }

        suggestions.add("Ensure you use standard fonts like Inter, Arial, or Calibri. Avoid using text inside images or complex column tables, as older ATS parsers can misread them.");
        return suggestions;
    }

    private List<String> generateKeywordSuggestions(List<String> missingKeywords) {
        List<String> suggestions = new ArrayList<>();
        if (missingKeywords.isEmpty()) {
            suggestions.add("No missing keywords identified! Your profile covers the core tech stack mentioned in the job description.");
            return suggestions;
        }

        suggestions.add("Directly integrate the missing keywords (" + String.join(", ", missingKeywords.subList(0, Math.min(5, missingKeywords.size()))) + ") in your 'Skills' list or under relevant project descriptions.");
        
        for (int i = 0; i < Math.min(3, missingKeywords.size()); i++) {
            String kw = missingKeywords.get(i);
            suggestions.add("Contextualize your skill in " + kw.toUpperCase() + ": write a bullet point like: 'Utilized " + kw + " to optimize system workflows, resulting in a 15% increase in efficiency.'");
        }
        return suggestions;
    }

    private List<String> generateContentSuggestions(String text, boolean hasEmail, boolean hasPhone, boolean hasLinks) {
        List<String> suggestions = new ArrayList<>();
        String lowerText = text.toLowerCase();

        List<String> weakVerbs = Arrays.asList("responsible for", "helped with", "worked on", "assisted");
        boolean hasWeakVerbs = false;
        for (String verb : weakVerbs) {
            if (lowerText.contains(verb)) {
                hasWeakVerbs = true;
                break;
            }
        }

        if (hasWeakVerbs) {
            suggestions.add("Replace passive phrasing like 'responsible for' or 'assisted with' with strong action verbs (e.g., 'Spearheaded', 'Optimized', 'Designed', 'Engineered').");
        } else {
            suggestions.add("Continue using strong action verbs to begin each bullet point under your experience section.");
        }

        if (!hasEmail) {
            suggestions.add("Missing email address. Ensure a professional email is clearly visible in the header.");
        }
        if (!hasPhone) {
            suggestions.add("Missing contact phone number. Include a mobile phone number with the country code.");
        }
        if (!hasLinks) {
            suggestions.add("Add a link to your LinkedIn and/or GitHub profile to allow recruiters to view your projects and network online.");
        }

        boolean hasNumbers = lowerText.matches(".*\\b\\d+%?\\b.*");
        if (!hasNumbers) {
            suggestions.add("Quantify your achievements: Add metrics and percentages (e.g., 'reduced latency by 20%', 'managed a team of 4 engineers') to demonstrate real impact.");
        } else {
            suggestions.add("Good job quantifying your achievements with metrics. Ensure every major project highlights a numerical result or business outcome.");
        }

        return suggestions;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> callGeminiAPI(String resume, String jd, int score, List<String> missingKeywords) {
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;
            
            String systemInstructions = "You are an ATS (Applicant Tracking System) expert. Analyze this resume against the job description. " +
                "Provide suggestions in strict JSON format. You MUST return ONLY a JSON object and no markdown formatting or triple backticks. The JSON object structure MUST be: " +
                "{\n  \"summary\": \"General summary of matching performance\",\n" +
                "  \"formattingSuggestions\": [\"suggestion1\", \"suggestion2\"],\n" +
                "  \"keywordSuggestions\": [\"suggestion1\", \"suggestion2\"],\n" +
                "  \"contentSuggestions\": [\"suggestion1\", \"suggestion2\"]\n" +
                "}";
            
            String prompt = "Resume Text:\n" + resume + "\n\nJob Description:\n" + jd + 
                "\n\nATS Score computed locally: " + score + "\nMissing Keywords: " + missingKeywords;
            
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", systemInstructions + "\n\n" + prompt);
            
            Map<String, Object> partsObj = new HashMap<>();
            partsObj.put("parts", Collections.singletonList(textPart));
            
            Map<String, Object> payload = new HashMap<>();
            payload.put("contents", Collections.singletonList(partsObj));
            
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("responseMimeType", "application/json");
            payload.put("generationConfig", generationConfig);

            Map<String, Object> response = restTemplate.postForObject(url, payload, Map.class);
            
            if (response != null && response.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (!parts.isEmpty()) {
                        String responseText = (String) parts.get(0).get("text");
                        return objectMapper.readValue(responseText, Map.class);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch response from Gemini API: " + e.getMessage() + ". Using local rules.");
        }
        
        // Local rules fallback
        Map<String, Object> suggestions = new HashMap<>();
        suggestions.put("summary", generateSummary(score, 0, missingKeywords.size()));
        suggestions.put("formattingSuggestions", generateFormattingSuggestions(Collections.emptyList(), resume.length()));
        suggestions.put("keywordSuggestions", generateKeywordSuggestions(missingKeywords));
        suggestions.put("contentSuggestions", generateContentSuggestions(resume, true, true, true));
        return suggestions;
    }
}
