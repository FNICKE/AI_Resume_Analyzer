import React, { useState, useRef, useEffect } from 'react'
import { Icons } from '../App'

function ScannerView({ apiUrl, currentUser, initialScan, clearInitialScan }) {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [activeTab, setActiveTab] = useState('summary')
  
  const fileInputRef = useRef(null)

  // Cyclical loading messages for premium feeling during analysis
  const loadingMessages = [
    'Parsing file layout and extracting raw text...',
    'Running NLP algorithms to detect key headings...',
    'Mapping technical skills and counting keywords...',
    'Performing job description comparison check...',
    'Generating AI-driven content improvement tips...',
    'Writing report metrics to PostgreSQL database...'
  ]

  useEffect(() => {
    let timer
    if (loading) {
      timer = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length)
      }, 2000)
    } else {
      setLoadingStep(0)
    }
    return () => clearInterval(timer)
  }, [loading])

  // Sync with initialScan when loaded from history or dashboard
  useEffect(() => {
    if (initialScan) {
      setResult(initialScan)
    } else {
      setResult(null)
    }
  }, [initialScan])

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (selectedFile) => {
    const ext = selectedFile.name.split('.').pop().toLowerCase()
    if (['pdf', 'docx', 'txt'].includes(ext)) {
      setFile(selectedFile)
      setError(null)
    } else {
      setError('Invalid file type. Please upload a PDF, DOCX, or TXT file.')
      setFile(null)
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current.click()
  }

  const handleScan = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please upload a resume file first.')
      return
    }
    if (!jobDescription.trim()) {
      setError('Please provide a target job description.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('jobDescription', jobDescription)
      if (currentUser && currentUser.id) {
        formData.append('userId', currentUser.id)
      }

      const res = await fetch(`${apiUrl}/api/resumes/analyze`, {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        const errMsg = await res.text()
        throw new Error(errMsg || 'Analysis failed. Please try again.')
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Unable to connect to the backend server. Please verify it is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setFile(null)
    setJobDescription('')
    setError(null)
    if (clearInitialScan) {
      clearInitialScan()
    }
  }

  // Safe parsing helper for JSON database fields
  const parseSafe = (jsonStr, fallback = []) => {
    if (!jsonStr) return fallback
    try {
      return typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr
    } catch (e) {
      console.error('JSON parsing failed:', e)
      return fallback
    }
  }

  // Circular Gauge Calculations
  const getStrokeDashoffset = (score) => {
    const radius = 70
    const circumference = 2 * Math.PI * radius
    return circumference - (score / 100) * circumference
  }

  const getScoreClass = (score) => {
    if (score >= 75) return 'high'
    if (score >= 50) return 'mid'
    return 'low'
  }

  const getScoreVerdict = (score) => {
    if (score >= 80) return 'Excellent Match'
    if (score >= 75) return 'Ready for Placement'
    if (score >= 60) return 'Good Match (Needs Tweaking)'
    if (score >= 50) return 'Average Match (Needs Work)'
    return 'Poor Match (Optimize Resume)'
  }

  return (
    <div>
      {/* Loading Screen Overlay */}
      {loading && (
        <div className="glass-panel scan-loading-container">
          <div className="pulse-spinner"></div>
          <h2 style={{ fontFamily: 'var(--font-heading)' }}>Running ATS Analysis</h2>
          <p style={{ color: 'var(--primary)', fontWeight: '600', minHeight: '24px', transition: 'all 0.5s ease' }}>
            {loadingMessages[loadingStep]}
          </p>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            This process parses and analyzes keyword density using our database rules.
          </span>
        </div>
      )}

      {!loading && !result && (
        <>
          <div className="page-header">
            <div className="page-title">
              <h1>ATS Resume Scanner</h1>
              <p>Scan your resume against a job description to get keyword matches and improve placement success.</p>
            </div>
          </div>

          {error && (
            <div className="glass-panel" style={{ borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.02)', marginBottom: '1.5rem', color: '#f87171' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleScan}>
            <div className="scanner-split">
              {/* Left side: Upload area */}
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.75rem' }}>
                  Step 1: Upload Resume
                </h3>
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt"
                />

                <div 
                  className={`file-upload-box ${dragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileSelect}
                >
                  <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>

                  {file ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>File Selected</p>
                      <div className="file-info-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <svg style={{ width: '14px', height: '14px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </span>
                        {file.name}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Click or drag to swap files
                      </span>
                    </div>
                  ) : (
                    <div>
                      <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                        Drag & Drop your resume here
                      </p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        or click to browse your folders
                      </p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
                        Supported formats: PDF, DOCX, TXT (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side: Job Description Input */}
              <div className="glass-panel text-input-container">
                <h3 style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.75rem' }}>
                  Step 2: Job Description
                </h3>
                <textarea 
                  className="custom-textarea"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description details here... (incorporating technical skills, languages, database, frameworks, etc.)"
                  required
                ></textarea>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.05rem' }}>
                Analyze Resume <Icons.ArrowRight />
              </button>
            </div>
          </form>
        </>
      )}

      {/* Mode 2: Analysis Report visualization */}
      {!loading && result && (
        <div>
          <div className="page-header">
            <div className="page-title">
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.25rem' }}>
                Scan Report Details
              </span>
              <h1>ATS Score Analysis</h1>
              <p style={{ color: '#94a3b8' }}>
                File: <strong>{result.resume?.filename || 'Uploaded Resume'}</strong>
              </p>
            </div>
            <button className="btn btn-secondary" onClick={handleReset}>
              Scan Another Resume
            </button>
          </div>

          <div className="report-grid">
            {/* Left side: Score circular gauge */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-panel gauge-wrapper" style={{ padding: '2.5rem 1.5rem' }}>
                <svg className="gauge-svg">
                  <circle cx="90" cy="90" r="70" className="gauge-bg"></circle>
                  <circle 
                    cx="90" 
                    cy="90" 
                    r="70" 
                    className={`gauge-fill ${getScoreClass(result.atsScore)}`}
                    style={{
                      strokeDasharray: 2 * Math.PI * 70,
                      strokeDashoffset: getStrokeDashoffset(result.atsScore)
                    }}
                  ></circle>
                  <text 
                    x="90" 
                    y="100" 
                    fill="var(--text-primary)" 
                    textAnchor="middle" 
                    className="gauge-text"
                    transform="rotate(90 90 90)"
                  >
                    {result.atsScore}%
                  </text>
                </svg>

                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                    {getScoreVerdict(result.atsScore)}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Match Confidence
                  </span>
                </div>
              </div>

              {/* Struct/Formatting Quick Checks */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  Structural Checks
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <span>Email Info</span>
                    <span style={{ color: '#10b981', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <svg style={{ width: '14px', height: '14px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Verified
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <span>Phone Details</span>
                    <span style={{ color: '#10b981', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <svg style={{ width: '14px', height: '14px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Verified
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <span>Social/GitHub Links</span>
                    <span style={{ color: '#10b981', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <svg style={{ width: '14px', height: '14px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Verified
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <span>Standard Sections</span>
                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>
                      {parseSafe(result.matchedKeywords).length > 3 ? 'Good Structure' : 'Partial Check'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Keywords and AI Advice */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Keywords panel: Matched vs Missing */}
              <div className="glass-panel keywords-panel">
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Keyword Comparison</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Skills detected in job description and compared to your uploaded resume.
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--success)', marginBottom: '0.5rem' }}>
                    Matched Skills ({parseSafe(result.matchedKeywords).length})
                  </h4>
                  {parseSafe(result.matchedKeywords).length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No matches identified.</p>
                  ) : (
                    <div className="pills-container">
                      {parseSafe(result.matchedKeywords).map((kw, idx) => (
                        <span className="pill matched" key={idx}>
                          <svg className="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--danger)', marginBottom: '0.5rem' }}>
                    Missing Core Skills ({parseSafe(result.missingKeywords).length})
                  </h4>
                  {parseSafe(result.missingKeywords).length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <svg style={{ width: '14px', height: '14px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Perfect skill coverage! No missing keywords identified.
                    </p>
                  ) : (
                    <div className="pills-container">
                      {parseSafe(result.missingKeywords).map((kw, idx) => (
                        <span className="pill missing" key={idx}>
                          <svg className="pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* AI Suggestions Box (Tabs) */}
              <div className="glass-panel">
                <div className="tabs-header">
                  <button 
                    className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
                    onClick={() => setActiveTab('summary')}
                  >
                    Match Verdict
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'keywords' ? 'active' : ''}`}
                    onClick={() => setActiveTab('keywords')}
                  >
                    Skill Insertion
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                    onClick={() => setActiveTab('content')}
                  >
                    Action Verbs
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'formatting' ? 'active' : ''}`}
                    onClick={() => setActiveTab('formatting')}
                  >
                    Layout & Layout
                  </button>
                </div>

                <div className="suggestion-list">
                  {parseSafe(result.suggestions).fallbackActive && (
                    <div style={{
                      background: 'rgba(217, 119, 6, 0.15)',
                      borderLeft: '4px solid #d97706',
                      color: '#fbbf24',
                      padding: '0.75rem 1rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      marginBottom: '1.25rem',
                      lineHeight: '1.4'
                    }}>
                      <strong>Notice:</strong> Your Gemini API free-tier request quota is currently exhausted. Standard rule-based parsing has been applied.
                    </div>
                  )}

                  {activeTab === 'summary' && (
                    <div style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                      <p style={{ marginBottom: '1rem', fontWeight: '500', color: 'var(--primary)' }}>
                        Analysis Summary:
                      </p>
                      <p style={{ color: '#e2e8f0' }}>
                        {parseSafe(result.suggestions, { summary: '' }).summary}
                      </p>
                    </div>
                  )}

                  {activeTab === 'keywords' && (
                    parseSafe(result.suggestions, { keywordSuggestions: [] }).keywordSuggestions.map((item, idx) => (
                      <div className="suggestion-item" key={idx}>
                        <div className="suggestion-bullet warning">
                          <svg className="suggestion-bullet-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                        </div>
                        <div className="suggestion-text">{item}</div>
                      </div>
                    ))
                  )}

                  {activeTab === 'content' && (
                    parseSafe(result.suggestions, { contentSuggestions: [] }).contentSuggestions.map((item, idx) => (
                      <div className="suggestion-item" key={idx}>
                        <div className="suggestion-bullet info">
                          <svg className="suggestion-bullet-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                          </svg>
                        </div>
                        <div className="suggestion-text">{item}</div>
                      </div>
                    ))
                  )}

                  {activeTab === 'formatting' && (
                    parseSafe(result.suggestions, { formattingSuggestions: [] }).formattingSuggestions.map((item, idx) => (
                      <div className="suggestion-item" key={idx}>
                        <div className="suggestion-bullet success">
                          <svg className="suggestion-bullet-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div className="suggestion-text">{item}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScannerView
