package com.resumeanalyzer.resume_analyzer_backend.repository;

import com.resumeanalyzer.resume_analyzer_backend.model.McqQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface McqQuestionRepository extends JpaRepository<McqQuestion, Long> {
    
    // Retrieves random MCQ questions by topic. Works on PostgreSQL and MySQL.
    @Query(value = "SELECT * FROM mcq_questions WHERE topic = :topic ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<McqQuestion> findRandomQuestionsByTopic(@Param("topic") String topic, @Param("limit") int limit);
}
