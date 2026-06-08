package com.resumeanalyzer.resume_analyzer_backend.repository;

import com.resumeanalyzer.resume_analyzer_backend.model.UserMcqAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMcqAttemptRepository extends JpaRepository<UserMcqAttempt, Long> {
    List<UserMcqAttempt> findByUserIdOrderByAttemptDateDesc(Long userId);
}
