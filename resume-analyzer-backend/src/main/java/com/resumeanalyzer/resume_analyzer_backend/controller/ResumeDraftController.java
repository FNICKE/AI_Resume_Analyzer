package com.resumeanalyzer.resume_analyzer_backend.controller;

import com.resumeanalyzer.resume_analyzer_backend.model.ResumeDraft;
import com.resumeanalyzer.resume_analyzer_backend.model.User;
import com.resumeanalyzer.resume_analyzer_backend.repository.ResumeDraftRepository;
import com.resumeanalyzer.resume_analyzer_backend.repository.UserRepository;
import com.resumeanalyzer.resume_analyzer_backend.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/drafts")
public class ResumeDraftController {

    @Autowired
    private ResumeDraftRepository resumeDraftRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AIService aiService;

    @PostMapping
    public ResponseEntity<?> saveDraft(@RequestBody SaveDraftRequest request) {
        if (request.getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID is required");
        }

        Optional<User> userOpt = userRepository.findById(request.getUserId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();
        Optional<ResumeDraft> existingDraftOpt = resumeDraftRepository.findFirstByUserIdOrderByUpdatedAtDesc(request.getUserId());

        ResumeDraft draft;
        if (existingDraftOpt.isPresent()) {
            draft = existingDraftOpt.get();
        } else {
            draft = new ResumeDraft();
            draft.setUser(user);
        }

        draft.setTemplateName(request.getTemplateName());
        draft.setContentJson(request.getContentJson());
        draft.setUpdatedAt(LocalDateTime.now());

        resumeDraftRepository.save(draft);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Draft saved successfully");
        response.put("draftId", draft.getId());
        response.put("updatedAt", draft.getUpdatedAt());

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> getDraft(@RequestParam("userId") Long userId) {
        Optional<ResumeDraft> draftOpt = resumeDraftRepository.findFirstByUserIdOrderByUpdatedAtDesc(userId);
        if (draftOpt.isEmpty()) {
            return ResponseEntity.ok(new HashMap<>());
        }

        ResumeDraft draft = draftOpt.get();
        Map<String, Object> response = new HashMap<>();
        response.put("id", draft.getId());
        response.put("templateName", draft.getTemplateName());
        response.put("contentJson", draft.getContentJson());
        response.put("updatedAt", draft.getUpdatedAt());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/improve-bullet")
    public ResponseEntity<?> improveBulletPoint(@RequestBody ImproveBulletRequest request) {
        if (request.getBulletPoint() == null || request.getBulletPoint().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Bullet point text cannot be empty");
        }

        String improvedText = aiService.improveBulletPoint(request.getBulletPoint());
        Map<String, Object> response = new HashMap<>();
        response.put("original", request.getBulletPoint());
        response.put("improved", improvedText);

        return ResponseEntity.ok(response);
    }

    public static class SaveDraftRequest {
        private Long userId;
        private String templateName;
        private String contentJson;

        public SaveDraftRequest() {}

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getTemplateName() { return templateName; }
        public void setTemplateName(String templateName) { this.templateName = templateName; }
        public String getContentJson() { return contentJson; }
        public void setContentJson(String contentJson) { this.contentJson = contentJson; }
    }

    public static class ImproveBulletRequest {
        private String bulletPoint;

        public ImproveBulletRequest() {}

        public String getBulletPoint() { return bulletPoint; }
        public void setBulletPoint(String bulletPoint) { this.bulletPoint = bulletPoint; }
    }
}
