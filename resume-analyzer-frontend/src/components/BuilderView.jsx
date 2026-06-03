import React, { useState, useEffect } from 'react'

function BuilderView({ apiUrl, currentUser }) {
  const [activeStep, setActiveStep] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [jdText, setJdText] = useState('')
  const [jdAnalysis, setJdAnalysis] = useState(null)
  
  // State for the bullet point currently being optimized by AI
  const [optimizingIndex, setOptimizingIndex] = useState(null) // { section: 'experience'|'projects', itemIndex: number, bulletIndex: number }
  const [optimizeError, setOptimizeError] = useState('')

  // Resume builder form state
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [],
    projects: [],
    education: [],
    skills: {
      languages: '',
      frameworks: '',
      databases: '',
      tools: ''
    }
  })

  // Load draft from DB on mount
  useEffect(() => {
    fetchDraft()
  }, [currentUser])

  const fetchDraft = async () => {
    if (!currentUser) return
    try {
      const response = await fetch(`${apiUrl}/api/drafts?userId=${currentUser.id}`)
      if (response.ok) {
        const data = await response.json()
        if (data && data.contentJson) {
          try {
            const parsed = JSON.parse(data.contentJson)
            // Merge loaded data with default empty state to ensure no missing fields
            setResumeData({
              personal: { ...defaultDraft.personal, ...parsed.personal },
              summary: parsed.summary || '',
              experience: parsed.experience || [],
              projects: parsed.projects || [],
              education: parsed.education || [],
              skills: { ...defaultDraft.skills, ...parsed.skills }
            })
            setSaveStatus(`Loaded saved draft from ${new Date(data.updatedAt).toLocaleTimeString()}`)
          } catch (e) {
            console.error("Failed to parse saved draft JSON", e)
            loadDefaultTemplate()
          }
        } else {
          loadDefaultTemplate()
        }
      } else {
        loadDefaultTemplate()
      }
    } catch (error) {
      console.error("Failed to fetch draft", error)
      loadDefaultTemplate()
    }
  }

  const loadDefaultTemplate = () => {
    setResumeData(JSON.parse(JSON.stringify(defaultDraft)))
    setSaveStatus('Loaded standard template (no saved draft found)')
  }

  // Auto-save draft every 30 seconds if changed
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft(true)
    }, 30000)
    return () => clearTimeout(timer)
  }, [resumeData])

  const saveDraft = async (isAuto = false) => {
    if (!currentUser) return
    if (isSaving) return
    
    setIsSaving(true)
    if (!isAuto) setSaveStatus('Saving draft...')
    
    try {
      const response = await fetch(`${apiUrl}/api/drafts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUser.id,
          templateName: 'ATS_Standard_Single_Column',
          contentJson: JSON.stringify(resumeData)
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSaveStatus(`${isAuto ? 'Auto-saved' : 'Saved'} draft at ${new Date().toLocaleTimeString()}`)
      } else {
        setSaveStatus('Failed to save draft')
      }
    } catch (error) {
      console.error("Save draft error", error)
      setSaveStatus('Error connecting to backend to save')
    } finally {
      setIsSaving(false)
    }
  }

  // Handle personal info changes
  const handlePersonalChange = (field, val) => {
    setResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: val
      }
    }))
  }

  // Handle skills changes
  const handleSkillsChange = (category, val) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: val
      }
    }))
  }

  // Generic dynamic array helpers
  const addItem = (section, template) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }))
  }

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const updateItem = (section, index, field, val) => {
    setResumeData(prev => {
      const items = [...prev[section]]
      items[index] = { ...items[index], [field]: val }
      return { ...prev, [section]: items }
    })
  }

  // Bullet point list helpers for Experience and Projects
  const addBullet = (section, itemIndex) => {
    setResumeData(prev => {
      const items = [...prev[section]]
      items[itemIndex] = {
        ...items[itemIndex],
        bullets: [...(items[itemIndex].bullets || []), '']
      }
      return { ...prev, [section]: items }
    })
  }

  const removeBullet = (section, itemIndex, bulletIndex) => {
    setResumeData(prev => {
      const items = [...prev[section]]
      items[itemIndex] = {
        ...items[itemIndex],
        bullets: items[itemIndex].bullets.filter((_, i) => i !== bulletIndex)
      }
      return { ...prev, [section]: items }
    })
  }

  const updateBullet = (section, itemIndex, bulletIndex, val) => {
    setResumeData(prev => {
      const items = [...prev[section]]
      const bullets = [...items[itemIndex].bullets]
      bullets[bulletIndex] = val
      items[itemIndex] = { ...items[itemIndex], bullets }
      return { ...prev, [section]: items }
    })
  }

  // Call API to optimize bullet point
  const optimizeBullet = async (section, itemIndex, bulletIndex) => {
    const currentBullet = resumeData[section][itemIndex].bullets[bulletIndex]
    if (!currentBullet || !currentBullet.trim()) {
      setOptimizeError('Bullet point text is empty')
      return
    }

    setOptimizingIndex({ section, itemIndex, bulletIndex })
    setOptimizeError('')

    try {
      const response = await fetch(`${apiUrl}/api/drafts/improve-bullet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bulletPoint: currentBullet })
      })

      if (response.ok) {
        const data = await response.json()
        if (data && data.improved) {
          updateBullet(section, itemIndex, bulletIndex, data.improved)
        }
      } else {
        setOptimizeError('Failed to optimize bullet point')
      }
    } catch (e) {
      console.error(e)
      setOptimizeError('Error communicating with AI service')
    } finally {
      setOptimizingIndex(null)
    }
  }

  // Job Description Keyword Matching Analyzer
  const analyzeJobDescription = () => {
    if (!jdText.trim()) {
      alert('Please paste a job description first.')
      return
    }

    // Common technical term lists to parse
    const techKeywords = [
      'react', 'next.js', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'sass', 'tailwind',
      'java', 'spring boot', 'python', 'django', 'flask', 'fastapi', 'go', 'golang', 'rust', 'c++', 'c#', '.net',
      'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'cassandra', 'oracle', 'sql', 'nosql',
      'docker', 'kubernetes', 'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'ci/cd', 'jenkins',
      'github actions', 'git', 'maven', 'gradle', 'graphql', 'rest api', 'microservices', 'serverless',
      'agile', 'scrum', 'jira', 'pytest', 'junit', 'mockito', 'selenium', 'machine learning', 'ai', 'data science',
      'nlp', 'devops', 'terraform', 'ansible', 'prometheus', 'grafana', 'webpack', 'vite', 'node.js', 'express'
    ]

    const lowerJd = jdText.toLowerCase()
    
    // Combine all fields of resume text to search for matching terms
    const allResumeText = [
      resumeData.summary,
      resumeData.skills.languages,
      resumeData.skills.frameworks,
      resumeData.skills.databases,
      resumeData.skills.tools,
      ...resumeData.experience.map(e => `${e.company} ${e.role} ${(e.bullets || []).join(' ')}`),
      ...resumeData.projects.map(p => `${p.name} ${p.tech} ${(p.bullets || []).join(' ')}`),
      ...resumeData.education.map(ed => `${ed.institution} ${ed.degree} ${ed.major}`)
    ].join(' ').toLowerCase()

    const matched = []
    const missing = []

    techKeywords.forEach(kw => {
      // Check if keyword is in the Job Description
      const regex = new RegExp(`\\b${kw.replace('.', '\\.')}\\b`, 'i')
      if (regex.test(lowerJd)) {
        if (allResumeText.includes(kw)) {
          matched.push(kw)
        } else {
          missing.push(kw)
        }
      }
    })

    setJdAnalysis({ matched, missing })
  }

  // Automatically inject a missing keyword to Skills section
  const autoInjectKeyword = (keyword) => {
    // Attempt to inject skill into matching categories
    const lowerKw = keyword.toLowerCase()
    let category = 'tools' // default fallback

    const langRegex = /java|javascript|typescript|python|go|golang|rust|c\+\+|c#|sql/i
    const dbRegex = /postgresql|mysql|mongodb|redis|elasticsearch|cassandra|oracle|nosql/i
    const frameworkRegex = /spring boot|react|next|vue|angular|django|flask|fastapi|node|express/i

    if (langRegex.test(lowerKw)) category = 'languages'
    else if (dbRegex.test(lowerKw)) category = 'databases'
    else if (frameworkRegex.test(lowerKw)) category = 'frameworks'

    const currentVal = resumeData.skills[category]
    const newVal = currentVal ? `${currentVal}, ${keyword}` : keyword
    
    handleSkillsChange(category, newVal)

    // Remove from missing and add to matched in current local analysis view
    if (jdAnalysis) {
      setJdAnalysis(prev => ({
        matched: [...prev.matched, keyword],
        missing: prev.missing.filter(k => k !== keyword)
      }))
    }
  }

  // Print function
  const triggerPrint = () => {
    window.print()
  }

  const steps = [
    { title: 'Personal Info', description: 'Contact & online profiles' },
    { title: 'Summary', description: 'ATS professional overview' },
    { title: 'Experience', description: 'Quantified work history' },
    { title: 'Projects', description: 'Key technical achievements' },
    { title: 'Education', description: 'Academic records' },
    { title: 'Skills', description: 'Categorized technical skills' }
  ]

  return (
    <div className="builder-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: 'calc(100vh - 40px)', padding: '1rem', overflow: 'hidden' }}>
      
      {/* LEFT: Builder Panel (Forms & AI Toolkit) */}
      <div className="builder-control-panel card-glass" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', padding: '1.5rem' }}>
        
        {/* Header & Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 className="gradient-text" style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Resume Builder</h2>
            <p className="subtitle" style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.25rem' }}>Construct a single-column, 80-90+ score ATS resume</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={() => saveDraft(false)} disabled={isSaving} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            <button onClick={triggerPrint} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2m-12 0v5h12v-5" />
              </svg>
              Print / Export PDF
            </button>
          </div>
        </div>

        {saveStatus && (
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="pulse-dot" style={{ width: '6px', height: '6px', backgroundColor: '#38bdf8', borderRadius: '50%' }}></div>
            {saveStatus}
          </div>
        )}

        {/* Form Wizard Navigation Header */}
        <div className="wizard-nav" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem', scrollbarWidth: 'none' }}>
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                background: activeStep === idx ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                border: '1px solid',
                borderColor: activeStep === idx ? '#6366f1' : 'rgba(255, 255, 255, 0.1)',
                color: activeStep === idx ? '#818cf8' : '#94a3b8',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              Step {idx + 1}: {s.title}
            </button>
          ))}
        </div>

        {/* Wizard Form Panels */}
        <div className="wizard-content" style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', paddingRight: '0.5rem', marginBottom: '1.5rem' }}>
          
          {/* STEP 1: Personal Info */}
          {activeStep === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Contact Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" value={resumeData.personal.fullName} onChange={(e) => handlePersonalChange('fullName', e.target.value)} placeholder="e.g. John Doe" />
                </div>
                <div className="input-group">
                  <label>Professional Title</label>
                  <input type="text" value={resumeData.personal.title} onChange={(e) => handlePersonalChange('title', e.target.value)} placeholder="e.g. Senior Backend Engineer" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" value={resumeData.personal.email} onChange={(e) => handlePersonalChange('email', e.target.value)} placeholder="e.g. email@example.com" />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="text" value={resumeData.personal.phone} onChange={(e) => handlePersonalChange('phone', e.target.value)} placeholder="e.g. +1 (555) 123-4567" />
                </div>
              </div>
              <div className="input-group">
                <label>Location</label>
                <input type="text" value={resumeData.personal.location} onChange={(e) => handlePersonalChange('location', e.target.value)} placeholder="e.g. San Francisco, CA" />
              </div>
              
              <h3 style={{ fontSize: '1.1rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginTop: '1rem' }}>Links & Websites</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label>Portfolio/Website</label>
                  <input type="text" value={resumeData.personal.website} onChange={(e) => handlePersonalChange('website', e.target.value)} placeholder="e.g. johndoe.dev" />
                </div>
                <div className="input-group">
                  <label>LinkedIn Link</label>
                  <input type="text" value={resumeData.personal.linkedin} onChange={(e) => handlePersonalChange('linkedin', e.target.value)} placeholder="e.g. linkedin.com/in/johndoe" />
                </div>
                <div className="input-group">
                  <label>GitHub Link</label>
                  <input type="text" value={resumeData.personal.github} onChange={(e) => handlePersonalChange('github', e.target.value)} placeholder="e.g. github.com/johndoe" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Summary */}
          {activeStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label>Professional Summary</label>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Write a concise 3-4 sentence paragraph highlighting your core competencies, technical specialties, and major impacts. Avoid fluff.
                </p>
                <textarea
                  rows="6"
                  value={resumeData.summary}
                  onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="e.g. Senior Software Engineer with 5+ years of experience designing high-performance REST APIs..."
                />
              </div>
            </div>
          )}

          {/* STEP 3: Experience */}
          {activeStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#e2e8f0', margin: 0 }}>Work Experience</h3>
                <button
                  type="button"
                  onClick={() => addItem('experience', { company: '', role: '', dates: '', location: '', bullets: [''] })}
                  className="btn btn-secondary"
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', borderColor: '#818cf8', color: '#818cf8' }}
                >
                  + Add Experience
                </button>
              </div>

              {resumeData.experience.map((exp, idx) => (
                <div key={idx} style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
                  <button
                    onClick={() => removeItem('experience', idx)}
                    style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Delete Entry
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
                    <div className="input-group">
                      <label>Company Name</label>
                      <input type="text" value={exp.company} onChange={(e) => updateItem('experience', idx, 'company', e.target.value)} placeholder="e.g. Acme Corporation" />
                    </div>
                    <div className="input-group">
                      <label>Job Title</label>
                      <input type="text" value={exp.role} onChange={(e) => updateItem('experience', idx, 'role', e.target.value)} placeholder="e.g. Software Engineer" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="input-group">
                      <label>Dates Worked</label>
                      <input type="text" value={exp.dates} onChange={(e) => updateItem('experience', idx, 'dates', e.target.value)} placeholder="e.g. Jan 2022 - Present" />
                    </div>
                    <div className="input-group">
                      <label>Location</label>
                      <input type="text" value={exp.location} onChange={(e) => updateItem('experience', idx, 'location', e.target.value)} placeholder="e.g. New York, NY (Remote)" />
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>Key Achievements (Bullet Points)</label>
                      <button
                        type="button"
                        onClick={() => addBullet('experience', idx)}
                        style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        + Add Bullet
                      </button>
                    </div>

                    {(exp.bullets || []).map((bullet, bIdx) => {
                      const isOptimizing = optimizingIndex && 
                                           optimizingIndex.section === 'experience' && 
                                           optimizingIndex.itemIndex === idx && 
                                           optimizingIndex.bulletIndex === bIdx

                      return (
                        <div key={bIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <span style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.9rem' }}>•</span>
                          <textarea
                            rows="2"
                            style={{ flexGrow: 1, padding: '0.5rem', fontSize: '0.85rem' }}
                            value={bullet}
                            onChange={(e) => updateBullet('experience', idx, bIdx, e.target.value)}
                            placeholder="Describe achievement starting with an action verb (e.g. Optimized DB index structure...)"
                          />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <button
                              type="button"
                              onClick={() => optimizeBullet('experience', idx, bIdx)}
                              disabled={isOptimizing}
                              className="btn btn-secondary"
                              style={{ 
                                padding: '0.25rem 0.5rem', 
                                fontSize: '0.7rem', 
                                backgroundColor: isOptimizing ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                borderColor: '#38bdf8',
                                color: '#38bdf8',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {isOptimizing ? 'AI Running...' : 'AI Optimize'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeBullet('experience', idx, bIdx)}
                              style={{ 
                                border: '1px solid rgba(239, 68, 68, 0.4)', 
                                background: 'transparent',
                                color: '#ef4444',
                                borderRadius: '4px',
                                padding: '0.25rem 0.5rem',
                                cursor: 'pointer',
                                fontSize: '0.7rem' 
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    })}
                    {optimizeError && (
                      <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{optimizeError}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 4: Projects */}
          {activeStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#e2e8f0', margin: 0 }}>Projects</h3>
                <button
                  type="button"
                  onClick={() => addItem('projects', { name: '', role: '', tech: '', bullets: [''] })}
                  className="btn btn-secondary"
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', borderColor: '#818cf8', color: '#818cf8' }}
                >
                  + Add Project
                </button>
              </div>

              {resumeData.projects.map((proj, idx) => (
                <div key={idx} style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
                  <button
                    onClick={() => removeItem('projects', idx)}
                    style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Delete Entry
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
                    <div className="input-group">
                      <label>Project Name</label>
                      <input type="text" value={proj.name} onChange={(e) => updateItem('projects', idx, 'name', e.target.value)} placeholder="e.g. AI Resume Parser" />
                    </div>
                    <div className="input-group">
                      <label>Project Role</label>
                      <input type="text" value={proj.role} onChange={(e) => updateItem('projects', idx, 'role', e.target.value)} placeholder="e.g. Lead Developer / Creator" />
                    </div>
                  </div>

                  <div className="input-group" style={{ marginBottom: '1rem' }}>
                    <label>Technologies Used (Comma-separated)</label>
                    <input type="text" value={proj.tech} onChange={(e) => updateItem('projects', idx, 'tech', e.target.value)} placeholder="e.g. Spring Boot, React.js, PostgreSQL" />
                  </div>

                  {/* Bullet points */}
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>Key Features & Impact</label>
                      <button
                        type="button"
                        onClick={() => addBullet('projects', idx)}
                        style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        + Add Bullet
                      </button>
                    </div>

                    {(proj.bullets || []).map((bullet, bIdx) => {
                      const isOptimizing = optimizingIndex && 
                                           optimizingIndex.section === 'projects' && 
                                           optimizingIndex.itemIndex === idx && 
                                           optimizingIndex.bulletIndex === bIdx

                      return (
                        <div key={bIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <span style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.9rem' }}>•</span>
                          <textarea
                            rows="2"
                            style={{ flexGrow: 1, padding: '0.5rem', fontSize: '0.85rem' }}
                            value={bullet}
                            onChange={(e) => updateBullet('projects', idx, bIdx, e.target.value)}
                            placeholder="Describe project contribution (e.g. Built microservice pipeline...)"
                          />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <button
                              type="button"
                              onClick={() => optimizeBullet('projects', idx, bIdx)}
                              disabled={isOptimizing}
                              className="btn btn-secondary"
                              style={{ 
                                padding: '0.25rem 0.5rem', 
                                fontSize: '0.7rem', 
                                backgroundColor: isOptimizing ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                borderColor: '#38bdf8',
                                color: '#38bdf8',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {isOptimizing ? 'AI Running...' : 'AI Optimize'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeBullet('projects', idx, bIdx)}
                              style={{ 
                                border: '1px solid rgba(239, 68, 68, 0.4)', 
                                background: 'transparent',
                                color: '#ef4444',
                                borderRadius: '4px',
                                padding: '0.25rem 0.5rem',
                                cursor: 'pointer',
                                fontSize: '0.7rem' 
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 5: Education */}
          {activeStep === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#e2e8f0', margin: 0 }}>Education</h3>
                <button
                  type="button"
                  onClick={() => addItem('education', { institution: '', degree: '', major: '', dates: '', gpa: '' })}
                  className="btn btn-secondary"
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', borderColor: '#818cf8', color: '#818cf8' }}
                >
                  + Add Education
                </button>
              </div>

              {resumeData.education.map((edu, idx) => (
                <div key={idx} style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
                  <button
                    onClick={() => removeItem('education', idx)}
                    style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Delete Entry
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
                    <div className="input-group">
                      <label>Institution Name</label>
                      <input type="text" value={edu.institution} onChange={(e) => updateItem('education', idx, 'institution', e.target.value)} placeholder="e.g. Stanford University" />
                    </div>
                    <div className="input-group">
                      <label>Degree</label>
                      <input type="text" value={edu.degree} onChange={(e) => updateItem('education', idx, 'degree', e.target.value)} placeholder="e.g. M.S. or B.S." />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="input-group">
                      <label>Field of Study (Major)</label>
                      <input type="text" value={edu.major} onChange={(e) => updateItem('education', idx, 'major', e.target.value)} placeholder="e.g. Computer Science" />
                    </div>
                    <div className="input-group">
                      <label>Graduation Date</label>
                      <input type="text" value={edu.dates} onChange={(e) => updateItem('education', idx, 'dates', e.target.value)} placeholder="e.g. May 2021" />
                    </div>
                    <div className="input-group">
                      <label>GPA / Scale</label>
                      <input type="text" value={edu.gpa} onChange={(e) => updateItem('education', idx, 'gpa', e.target.value)} placeholder="e.g. 3.9/4.0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 6: Skills */}
          {activeStep === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Technical Skills</h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Categorize your skills. Separate keywords with commas so ATS parsers match them quickly.</p>
              
              <div className="input-group">
                <label>Programming Languages</label>
                <input type="text" value={resumeData.skills.languages} onChange={(e) => handleSkillsChange('languages', e.target.value)} placeholder="e.g. Java, JavaScript, Python, SQL" />
              </div>
              <div className="input-group">
                <label>Frameworks & Libraries</label>
                <input type="text" value={resumeData.skills.frameworks} onChange={(e) => handleSkillsChange('frameworks', e.target.value)} placeholder="e.g. React.js, Spring Boot, Node.js" />
              </div>
              <div className="input-group">
                <label>Databases & Cloud Storage</label>
                <input type="text" value={resumeData.skills.databases} onChange={(e) => handleSkillsChange('databases', e.target.value)} placeholder="e.g. PostgreSQL, Redis, DynamoDB" />
              </div>
              <div className="input-group">
                <label>Developer Tools & Infrastructure</label>
                <input type="text" value={resumeData.skills.tools} onChange={(e) => handleSkillsChange('tools', e.target.value)} placeholder="e.g. Docker, Git, AWS, CI/CD, Kubernetes" />
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next Wizards Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTops: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem' }}
          >
            ← Previous Step
          </button>
          
          {activeStep < steps.length - 1 ? (
            <button
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.25rem' }}
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={() => {
                saveDraft(false)
                alert('Draft saved successfully to dashboard database!')
              }}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.25rem', backgroundColor: '#10b981', borderColor: '#10b981' }}
            >
              Save & Finalize Draft
            </button>
          )}
        </div>

        {/* AI TOOLKIT SECTION: JD Keywords Matcher */}
        <div className="card-glass" style={{ border: '1px dashed rgba(99, 102, 241, 0.4)', borderRadius: '8px', padding: '1rem', marginTop: '2rem', backgroundColor: 'rgba(99, 102, 241, 0.02)' }}>
          <h3 style={{ fontSize: '1rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0' }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H10.82a2 2 0 0 1-1.99-1.819l-.637-7A2 2 0 0 1 9.828 3zM12 18v.01" />
            </svg>
            AI JD Keywords Matcher (ATS Optimizer)
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
            Paste the target Job Description to automatically detect missing tech stack keywords and inject them.
          </p>
          <textarea
            rows="3"
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste Job Description here..."
            style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', marginBottom: '0.75rem', borderRadius: '6px' }}
          />
          <button
            onClick={analyzeJobDescription}
            className="btn btn-secondary"
            style={{ width: '100%', fontSize: '0.8rem', padding: '0.4rem', borderColor: '#6366f1', color: '#818cf8' }}
          >
            Compare & Optimize Keywords
          </button>

          {/* Keywords Match Display */}
          {jdAnalysis && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <h4 style={{ fontSize: '0.8rem', color: '#10b981', margin: '0 0 0.25rem 0' }}>Matched Keywords ({jdAnalysis.matched.length})</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {jdAnalysis.matched.map((kw, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      ✓ {kw}
                    </span>
                  ))}
                  {jdAnalysis.matched.length === 0 && <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>None matched.</span>}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '0.8rem', color: '#ef4444', margin: '0 0 0.25rem 0' }}>Missing Tech Keywords ({jdAnalysis.missing.length})</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {jdAnalysis.missing.map((kw, i) => (
                    <button
                      key={i}
                      onClick={() => autoInjectKeyword(kw)}
                      title="Click to auto-inject into skills list"
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.4rem',
                        backgroundColor: 'rgba(239, 68, 68, 0.05)',
                        color: '#f87171',
                        borderRadius: '4px',
                        border: '1px dashed rgba(239, 68, 68, 0.4)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.15rem'
                      }}
                    >
                      + {kw}
                    </button>
                  ))}
                  {jdAnalysis.missing.length === 0 && <span style={{ fontSize: '0.7rem', color: '#34d399' }}>Excellent! All relevant tech keywords are present!</span>}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* RIGHT: Live ATS-Compliant Document Preview */}
      <div className="preview-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#cbd5e1', margin: 0 }}>ATS-Compliant Live Preview</h3>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Auto-formats to 1-column page</span>
        </div>

        {/* Paper Sheet Preview container */}
        <div 
          style={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            backgroundColor: '#0f172a', 
            border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: '8px', 
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {/* Printable container */}
          <div 
            id="ats-resume-print-area" 
            className="resume-paper"
            style={{
              width: '100%',
              maxWidth: '800px',
              minHeight: '1000px',
              backgroundColor: '#ffffff',
              color: '#1e293b',
              padding: '2.5rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '11pt',
              lineHeight: '1.4',
              boxSizing: 'border-box'
            }}
          >
            {/* Header / Contact Details */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #334155', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 0.25rem 0', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {resumeData.personal.fullName || 'YOUR NAME'}
              </h1>
              <div style={{ fontSize: '11pt', fontWeight: '500', color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                {resumeData.personal.title || 'Professional Title'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem 1rem', fontSize: '9.5pt', color: '#475569' }}>
                {resumeData.personal.email && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {resumeData.personal.email}
                  </span>
                )}
                {resumeData.personal.phone && <span>| {resumeData.personal.phone}</span>}
                {resumeData.personal.location && <span>| {resumeData.personal.location}</span>}
                {resumeData.personal.website && <span>| {resumeData.personal.website}</span>}
                {resumeData.personal.linkedin && <span>| {resumeData.personal.linkedin}</span>}
                {resumeData.personal.github && <span>| {resumeData.personal.github}</span>}
              </div>
            </div>

            {/* Summary */}
            {resumeData.summary && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '6px', letterSpacing: '0.5px' }}>
                  Professional Summary
                </h3>
                <p style={{ fontSize: '10pt', margin: 0, color: '#334155', textAlign: 'justify' }}>
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '8px', letterSpacing: '0.5px' }}>
                  Professional Experience
                </h3>
                {resumeData.experience.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: idx === resumeData.experience.length - 1 ? 0 : '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10.5pt', color: '#0f172a' }}>
                      <span>{exp.company}</span>
                      <span>{exp.dates}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '9.5pt', color: '#475569', marginBottom: '4px' }}>
                      <span>{exp.role}</span>
                      <span>{exp.location}</span>
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '9.5pt', color: '#334155' }}>
                        {exp.bullets.map((bullet, bIdx) => bullet.trim() && (
                          <li key={bIdx} style={{ marginBottom: '3px', textAlign: 'justify' }}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {resumeData.projects && resumeData.projects.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '8px', letterSpacing: '0.5px' }}>
                  Projects & Technical Work
                </h3>
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} style={{ marginBottom: idx === resumeData.projects.length - 1 ? 0 : '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10.5pt', color: '#0f172a' }}>
                      <span>{proj.name} {proj.role && <span style={{ fontWeight: 'normal', fontStyle: 'italic', color: '#475569' }}>- {proj.role}</span>}</span>
                      <span style={{ fontSize: '9.5pt', fontWeight: 'normal', color: '#475569', fontStyle: 'italic' }}>{proj.tech}</span>
                    </div>
                    {proj.bullets && proj.bullets.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '9.5pt', color: '#334155', marginTop: '3px' }}>
                        {proj.bullets.map((bullet, bIdx) => bullet.trim() && (
                          <li key={bIdx} style={{ marginBottom: '3px', textAlign: 'justify' }}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '8px', letterSpacing: '0.5px' }}>
                  Education
                </h3>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: idx === resumeData.education.length - 1 ? 0 : '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10.5pt', color: '#0f172a' }}>
                      <span>{edu.institution}</span>
                      <span>{edu.dates}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5pt', color: '#475569', fontStyle: 'italic' }}>
                      <span>{edu.degree} in {edu.major} {edu.gpa && <span>(GPA: {edu.gpa})</span>}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '8px', letterSpacing: '0.5px' }}>
                Technical Skills
              </h3>
              <div style={{ fontSize: '9.5pt', lineHeight: '1.5', color: '#334155' }}>
                {resumeData.skills.languages && (
                  <div>
                    <strong>Languages:</strong> {resumeData.skills.languages}
                  </div>
                )}
                {resumeData.skills.frameworks && (
                  <div>
                    <strong>Frameworks & Libraries:</strong> {resumeData.skills.frameworks}
                  </div>
                )}
                {resumeData.skills.databases && (
                  <div>
                    <strong>Databases & Caching:</strong> {resumeData.skills.databases}
                  </div>
                )}
                {resumeData.skills.tools && (
                  <div>
                    <strong>Developer Tools & Infra:</strong> {resumeData.skills.tools}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

const defaultDraft = {
  personal: {
    fullName: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'johndoe@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe'
  },
  summary: 'Detail-oriented Senior Software Engineer with 5+ years of experience designing, building, and optimizing scalable backend web services. Proven track record of improving system performance and leading developers to deploy robust cloud products.',
  experience: [
    {
      company: 'Tech Solutions Inc.',
      role: 'Senior Software Engineer',
      dates: 'Jan 2023 - Present',
      location: 'San Francisco, CA',
      bullets: [
        'Led a team of 4 engineers to design and deploy a microservices-based API gateway, improving API response times by 35%.',
        'Optimized database queries and indexing in PostgreSQL, reducing server CPU utilization from 80% to 30%.',
        'Spearheaded the integration of a containerized deployment workflow using Docker, reducing delivery cycles by 5 days.'
      ]
    },
    {
      company: 'App Innovations',
      role: 'Software Engineer',
      dates: 'Jun 2021 - Dec 2022',
      location: 'Austin, TX',
      bullets: [
        'Developed core features of a cloud-based web CRM product, supporting over 50,000 active customer records.',
        'Secured application routing structures using Spring Security with JWT and OAuth2 integration.',
        'Wrote 100+ unit and integration tests using JUnit and Mockito, increasing test coverage by 25%.'
      ]
    }
  ],
  projects: [
    {
      name: 'AI Resume Analyzer',
      role: 'Lead Developer',
      tech: 'Spring Boot, React.js, PostgreSQL, Gemini API',
      bullets: [
        'Engineered an ATS-friendly parser evaluating candidate text profiles against target job metrics.',
        'Integrated AI-assisted keyword suggestions using Google Gemini endpoint prompts.'
      ]
    }
  ],
  education: [
    {
      institution: 'University of Texas at Austin',
      degree: 'B.S.',
      major: 'Computer Science',
      dates: 'Sep 2017 - May 2021',
      gpa: '3.8/4.0'
    }
  ],
  skills: {
    languages: 'Java, JavaScript, Python, SQL, HTML/CSS',
    frameworks: 'Spring Boot, React.js, Node.js, Express',
    databases: 'PostgreSQL, Redis, MongoDB, MySQL',
    tools: 'Git, Docker, AWS, Maven, CI/CD, Linux'
  }
}

export default BuilderView
