package com.resumeanalyzer.resume_analyzer_backend.repository;

import com.resumeanalyzer.resume_analyzer_backend.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
}
