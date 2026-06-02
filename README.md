# AI-Powered Resume Analyzer

An advanced **AI-Powered Resume Analyzer and ATS (Applicant Tracking System) Optimizer** built using **Java Spring Boot**, **React**, and **PostgreSQL**. 

This application parses resumes (PDF, DOCX, and TXT), checks their content against target job descriptions, computes a weighted ATS match score, identifies missing critical keywords, and provides actionable, structured recommendations to improve placement success.

---

## 🚀 Key Features

* **Resume File Parsing**: Supports automatic text extraction from PDF (using Apache PDFBox) and Word/DOCX (using Apache POI).
* **ATS Score Calculation**: Evaluates resume suitability based on keyword density, standard section structures (Education, Experience, Skills, Projects, Certifications), and contact information verification (email, phone, social links).
* **Skills Comparison**: Highlights matched competencies and gaps side-by-side using color-coded pills.
* **AI Suggestions**: Provides detailed suggestions using Google's Gemini Flash API (or a high-fidelity rule-based local analyzer when offline).
* **Historical Scan Logs**: Persistence of past analyses in a PostgreSQL database with options to review, inspect, or delete records.
* **Analytics Dashboard**: Renders statistics on total scans, average match rates, score bracket distributions, and top missing skills across all scans.

---

## 🛠️ Technical Stack

* **Backend**: Java, Spring Boot, Spring Data JPA, Apache PDFBox, Apache POI
* **Frontend**: React (Vite), Custom CSS (Premium Glassmorphism Dark Mode)
* **Database**: PostgreSQL (JPA auto-updating schemas)
* **AI Integration**: Google Gemini API REST client

---

## 📂 Project Structure

```text
ecommerce/
├── resume-analyzer-backend/   # Spring Boot REST API
└── resume-analyzer-frontend/  # Vite + React Client
```

---

## ⚙️ Running Locally

### Prerequisite: PostgreSQL Setup
Create a local database named `resume_analyzer` in your PostgreSQL instance:
```sql
CREATE DATABASE resume_analyzer;
```

### 1. Run the Spring Boot Backend
1. Import `resume-analyzer-backend` into your Java IDE (Eclipse, IntelliJ) as an *Existing Maven Project*.
2. Configure your database password in `src/main/resources/application.properties`.
3. Start the application by running `ResumeAnalyzerBackendApplication.java` as a Java application (or run `.\mvnw.cmd spring-boot:run` in a terminal).

### 2. Run the React Frontend
Navigate to the frontend folder, install dependencies, and start the Vite dev server:
1. Open a terminal and enter the directory:
   ```cmd
   cd resume-analyzer-frontend
   ```
2. Start the application:
   ```cmd
   node .\node_modules\vite\bin\vite.js
   ```
3. Open your browser and navigate to: **http://localhost:3000**
