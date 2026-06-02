package com.resumeanalyzer.resume_analyzer_backend.service;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ScoringService {

    // A comprehensive set of technical and professional keywords
    private static final Set<String> TECH_KEYWORDS = new HashSet<>(Arrays.asList(
        // Languages
        "java", "python", "javascript", "typescript", "c++", "c#", "ruby", "go", "rust", "php", "html", "css", "sql", "kotlin", "swift", "scala", "r", "bash", "shell",
        // Frameworks & Libraries
        "spring boot", "spring", "react", "angular", "vue", "next.js", "node.js", "express", "django", "flask", "fastapi", "laravel", "hibernate", "jpa", "redux", "jquery", "bootstrap", "tailwind",
        // Cloud & DevOps
        "docker", "kubernetes", "aws", "azure", "gcp", "git", "github", "gitlab", "maven", "gradle", "jenkins", "ci/cd", "terraform", "ansible", "prometheus", "grafana",
        // Databases & Caching
        "postgresql", "mysql", "mongodb", "redis", "oracle", "sqlite", "dynamodb", "elasticsearch", "cassandra", "mariadb", "firebase",
        // Architecture & APIs
        "rest api", "restful", "graphql", "microservices", "soap", "web services", "websocket", "system design", "oop", "mvc",
        // Testing & Methodologies
        "agile", "scrum", "kanban", "unit testing", "junit", "mockito", "selenium", "jest", "tdd", "bdd",
        // Machine Learning & AI
        "nlp", "natural language processing", "ai", "artificial intelligence", "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy", "opencv",
        // Security & Networking
        "jwt", "oauth", "ssl", "tls", "saml", "firewall", "cybersecurity", "cryptography",
        // Soft Skills / Professional Concepts
        "project management", "team leadership", "problem solving", "communication", "collaboration", "analytical", "debugging", "ci/cd pipelines", "data structures", "algorithms"
    ));

    public Map<String, Object> analyzeResume(String resumeText, String jobDescriptionText) {
        String cleanResume = resumeText.toLowerCase();
        String cleanJobDesc = jobDescriptionText.toLowerCase();

        // 1. Keyword extraction from Job Description
        List<String> jdKeywords = new ArrayList<>();
        for (String keyword : TECH_KEYWORDS) {
            String regex = "\\b" + Pattern.quote(keyword) + "\\b";
            if (keyword.contains("+") || keyword.contains("#") || keyword.contains(".")) {
                regex = "(?i)(?<=^|[^a-zA-Z0-9])" + Pattern.quote(keyword) + "(?=$|[^a-zA-Z0-9])";
            }
            Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(cleanJobDesc);
            if (matcher.find()) {
                jdKeywords.add(keyword);
            }
        }

        // If no JD keywords are detected, extract capitalized words or common terms
        if (jdKeywords.isEmpty()) {
            Set<String> words = new HashSet<>();
            Pattern p = Pattern.compile("\\b[a-zA-Z]{3,15}\\b");
            Matcher m = p.matcher(cleanJobDesc);
            while (m.find()) {
                words.add(m.group().toLowerCase());
            }
            Set<String> stopwords = new HashSet<>(Arrays.asList(
                "the", "and", "for", "with", "this", "that", "from", "your", "will", "have", "are", "our", "you", "but", "not", "they"
            ));
            words.removeAll(stopwords);
            jdKeywords.addAll(words.stream().limit(15).collect(Collectors.toList()));
        }

        // 2. Match keywords against Resume
        List<String> matchedKeywords = new ArrayList<>();
        List<String> missingKeywords = new ArrayList<>();

        for (String keyword : jdKeywords) {
            String regex = "\\b" + Pattern.quote(keyword) + "\\b";
            if (keyword.contains("+") || keyword.contains("#") || keyword.contains(".")) {
                regex = "(?i)(?<=^|[^a-zA-Z0-9])" + Pattern.quote(keyword) + "(?=$|[^a-zA-Z0-9])";
            }
            Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(cleanResume);
            if (matcher.find()) {
                matchedKeywords.add(keyword);
            } else {
                missingKeywords.add(keyword);
            }
        }

        // 3. Section Presence Scoring (Structure)
        String[] sections = {"experience", "education", "skills", "projects", "certifications", "contact", "summary"};
        int presentSections = 0;
        List<String> detectedSections = new ArrayList<>();
        for (String section : sections) {
            Pattern pattern = Pattern.compile("\\b" + section + "\\b", Pattern.CASE_INSENSITIVE);
            if (pattern.matcher(cleanResume).find()) {
                presentSections++;
                detectedSections.add(section);
            }
        }
        int sectionScore = (int) (((double) presentSections / sections.length) * 100);

        // 4. Contact Information Checking
        int contactScore = 0;
        boolean hasEmail = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}").matcher(cleanResume).find();
        boolean hasPhone = Pattern.compile("(\\+?\\d{1,4}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}").matcher(cleanResume).find();
        boolean hasLinks = cleanResume.contains("linkedin.com") || cleanResume.contains("github.com");

        if (hasEmail) contactScore += 40;
        if (hasPhone) contactScore += 40;
        if (hasLinks) contactScore += 20;

        // 5. Overall ATS Score Calculation (50% keywords, 30% sections, 20% contact)
        double matchRatio = jdKeywords.isEmpty() ? 1.0 : (double) matchedKeywords.size() / jdKeywords.size();
        int keywordScore = (int) (matchRatio * 100);
        
        int overallScore = (int) ((keywordScore * 0.5) + (sectionScore * 0.3) + (contactScore * 0.2));
        overallScore = Math.max(0, Math.min(100, overallScore));

        Map<String, Object> result = new HashMap<>();
        result.put("atsScore", overallScore);
        result.put("matchedKeywords", matchedKeywords);
        result.put("missingKeywords", missingKeywords);
        result.put("sectionScore", sectionScore);
        result.put("contactScore", contactScore);
        result.put("detectedSections", detectedSections);
        result.put("hasEmail", hasEmail);
        result.put("hasPhone", hasPhone);
        result.put("hasLinks", hasLinks);

        return result;
    }
}
