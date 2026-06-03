package com.resumeanalyzer.resume_analyzer_backend.service;

import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

@Service
public class HashUtils {

    private static final String SALT = "ResumeAnalyzerSecureSaltSecret2026";

    public String hashPassword(String password) {
        try {
            String saltedPassword = password + SALT;
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedhash = digest.digest(saltedPassword.getBytes(StandardCharsets.UTF_8));
            
            StringBuilder hexString = new StringBuilder(2 * encodedhash.length);
            for (byte b : encodedhash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not found", e);
        }
    }

    public boolean checkPassword(String rawPassword, String storedHash) {
        String hashOfInput = hashPassword(rawPassword);
        return hashOfInput.equals(storedHash);
    }
}
