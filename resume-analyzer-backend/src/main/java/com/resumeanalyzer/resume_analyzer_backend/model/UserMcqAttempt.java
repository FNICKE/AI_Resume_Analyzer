package com.resumeanalyzer.resume_analyzer_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_mcq_attempts")
public class UserMcqAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String topic;

    private int score;

    private int totalQuestions;

    private LocalDateTime attemptDate;

    @Column(columnDefinition = "TEXT")
    private String detailsJson; // Stores dynamic breakdown of questions, answers, and keys.

    public UserMcqAttempt() {}

    public UserMcqAttempt(User user, String topic, int score, int totalQuestions, LocalDateTime attemptDate, String detailsJson) {
        this.user = user;
        this.topic = topic;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.attemptDate = attemptDate;
        this.detailsJson = detailsJson;
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

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public LocalDateTime getAttemptDate() {
        return attemptDate;
    }

    public void setAttemptDate(LocalDateTime attemptDate) {
        this.attemptDate = attemptDate;
    }

    public String getDetailsJson() {
        return detailsJson;
    }

    public void setDetailsJson(String detailsJson) {
        this.detailsJson = detailsJson;
    }
}
