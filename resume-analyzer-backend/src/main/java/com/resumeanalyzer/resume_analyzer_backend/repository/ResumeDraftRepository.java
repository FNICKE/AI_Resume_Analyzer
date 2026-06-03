package com.resumeanalyzer.resume_analyzer_backend.repository;

import com.resumeanalyzer.resume_analyzer_backend.model.ResumeDraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ResumeDraftRepository extends JpaRepository<ResumeDraft, Long> {
    Optional<ResumeDraft> findFirstByUserIdOrderByUpdatedAtDesc(Long userId);
}
