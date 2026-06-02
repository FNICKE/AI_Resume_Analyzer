package com.resumeanalyzer.resume_analyzer_backend.repository;

import com.resumeanalyzer.resume_analyzer_backend.model.AnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnalysisResultRepository extends JpaRepository<AnalysisResult, Long> {
    List<AnalysisResult> findAllByOrderByAnalyzedAtDesc();
}
