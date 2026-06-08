package com.resumeanalyzer.resume_analyzer_backend.repository;

import com.resumeanalyzer.resume_analyzer_backend.model.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Long> {
    List<InterviewQuestion> findByCategoryOrderByDifficultyAsc(String category);
}
