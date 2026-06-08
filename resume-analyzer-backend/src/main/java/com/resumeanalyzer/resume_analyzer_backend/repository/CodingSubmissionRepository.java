package com.resumeanalyzer.resume_analyzer_backend.repository;

import com.resumeanalyzer.resume_analyzer_backend.model.CodingSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodingSubmissionRepository extends JpaRepository<CodingSubmission, Long> {
    List<CodingSubmission> findByUserIdOrderBySubmittedAtDesc(Long userId);
    List<CodingSubmission> findByUserIdAndChallengeIdOrderBySubmittedAtDesc(Long userId, Long challengeId);
}
