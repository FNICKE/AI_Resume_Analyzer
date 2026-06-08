package com.resumeanalyzer.resume_analyzer_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mock_interview_sessions")
public class MockInterviewSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "tech_stack", nullable = false)
    private String techStack;

    @Column(nullable = false)
    private String difficulty;

    @Column(name = "current_question_index")
    private int currentQuestionIndex;

    @Column(name = "max_questions")
    private int maxQuestions;

    @Column(name = "current_question", columnDefinition = "TEXT")
    private String currentQuestion;

    @Column(nullable = false)
    private String status; // ACTIVE, COMPLETED

    @Column(name = "conversation_history_json", columnDefinition = "TEXT")
    private String conversationHistoryJson;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public MockInterviewSession() {}

    public MockInterviewSession(User user, String techStack, String difficulty, int maxQuestions, String status, LocalDateTime createdAt) {
        this.user = user;
        this.techStack = techStack;
        this.difficulty = difficulty;
        this.maxQuestions = maxQuestions;
        this.currentQuestionIndex = 0;
        this.status = status;
        this.createdAt = createdAt;
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

    public String getTechStack() {
        return techStack;
    }

    public void setTechStack(String techStack) {
        this.techStack = techStack;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public int getCurrentQuestionIndex() {
        return currentQuestionIndex;
    }

    public void setCurrentQuestionIndex(int currentQuestionIndex) {
        this.currentQuestionIndex = currentQuestionIndex;
    }

    public int getMaxQuestions() {
        return maxQuestions;
    }

    public void setMaxQuestions(int maxQuestions) {
        this.maxQuestions = maxQuestions;
    }

    public String getCurrentQuestion() {
        return currentQuestion;
    }

    public void setCurrentQuestion(String currentQuestion) {
        this.currentQuestion = currentQuestion;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getConversationHistoryJson() {
        return conversationHistoryJson;
    }

    public void setConversationHistoryJson(String conversationHistoryJson) {
        this.conversationHistoryJson = conversationHistoryJson;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
