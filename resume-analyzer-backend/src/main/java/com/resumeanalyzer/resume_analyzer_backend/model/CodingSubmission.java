package com.resumeanalyzer.resume_analyzer_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "coding_submissions")
public class CodingSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "challenge_id", nullable = false)
    private CodingChallenge challenge;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String code;

    @Column(nullable = false)
    private String language; // e.g., "java", "python", "javascript"

    @Column(nullable = false)
    private String status; // e.g., "PASSED", "COMPILATION_ERROR", "LOGICAL_ERROR", "TIME_LIMIT_EXCEEDED"

    @Column(columnDefinition = "TEXT")
    private String aiFeedback; // Holds code critique and suggested optimizations from Gemini

    private LocalDateTime submittedAt;

    public CodingSubmission() {}

    public CodingSubmission(User user, CodingChallenge challenge, String code, String language, String status, String aiFeedback, LocalDateTime submittedAt) {
        this.user = user;
        this.challenge = challenge;
        this.code = code;
        this.language = language;
        this.status = status;
        this.aiFeedback = aiFeedback;
        this.submittedAt = submittedAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public CodingChallenge getChallenge() {
        return challenge;
    }

    public void setChallenge(CodingChallenge challenge) {
        this.challenge = challenge;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAiFeedback() {
        return aiFeedback;
    }

    public void setAiFeedback(String aiFeedback) {
        this.aiFeedback = aiFeedback;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }
}
