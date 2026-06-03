package com.resumeanalyzer.resume_analyzer_backend.repository;

import com.resumeanalyzer.resume_analyzer_backend.model.AnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnalysisResultRepository extends JpaRepository<AnalysisResult, Long> {
    List<AnalysisResult> findAllByOrderByAnalyzedAtDesc();

    @Query("SELECT a FROM AnalysisResult a WHERE a.resume.user.id = :userId OR a.resume.user IS NULL ORDER BY a.analyzedAt DESC")
    List<AnalysisResult> findByUserId(@Param("userId") Long userId);
}
