import React, { useState, useEffect } from 'react'

const UserIcon = () => (
  <svg style={{width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const FileTextIcon = () => (
  <svg style={{width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg style={{width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const FolderIcon = () => (
  <svg style={{width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const GraduationIcon = () => (
  <svg style={{width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
)

const SkillsIcon = () => (
  <svg style={{width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const SaveIcon = () => (
  <svg style={{width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
)

const PrinterIcon = () => (
  <svg style={{width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
)

const WandIcon = () => (
  <svg style={{width: '12px', height: '12px', display: 'inline-block', verticalAlign: 'middle', marginRight: '4px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 22 8.5 22 22 2" />
  </svg>
)

const SuccessIcon = () => (
  <svg style={{width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle', marginRight: '4px', color: '#10b981'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const WarningIcon = () => (
  <svg style={{width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle', marginRight: '4px', color: '#ef4444'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

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

function BuilderView({ apiUrl, currentUser }) {
  const [activeStep, setActiveStep] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [jdText, setJdText] = useState('')
  const [jdAnalysis, setJdAnalysis] = useState(null)
  const [showPreview, setShowPreview] = useState(false) // for mobile toggle
  const [optimizingIndex, setOptimizingIndex] = useState(null)
  const [optimizeError, setOptimizeError] = useState('')

  const [resumeData, setResumeData] = useState({
    personal: { fullName: '', title: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
    summary: '',
    experience: [],
    projects: [],
    education: [],
    skills: { languages: '', frameworks: '', databases: '', tools: '' }
  })

  useEffect(() => { fetchDraft() }, [currentUser])

  const fetchDraft = async () => {
    if (!currentUser) return
    try {
      const response = await fetch(`${apiUrl}/api/drafts?userId=${currentUser.id}`)
      if (response.ok) {
        const data = await response.json()
        if (data && data.contentJson) {
          try {
            const parsed = JSON.parse(data.contentJson)
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
            loadDefaultTemplate()
          }
        } else {
          loadDefaultTemplate()
        }
      } else {
        loadDefaultTemplate()
      }
    } catch (error) {
      loadDefaultTemplate()
    }
  }

  const loadDefaultTemplate = () => {
    setResumeData(JSON.parse(JSON.stringify(defaultDraft)))
    setSaveStatus('Loaded standard ATS template')
  }

  useEffect(() => {
    const timer = setTimeout(() => { saveDraft(true) }, 30000)
    return () => clearTimeout(timer)
  }, [resumeData])

  const saveDraft = async (isAuto = false) => {
    if (!currentUser || isSaving) return
    setIsSaving(true)
    if (!isAuto) setSaveStatus('Saving...')
    try {
      const response = await fetch(`${apiUrl}/api/drafts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          templateName: 'ATS_Standard_Single_Column',
          contentJson: JSON.stringify(resumeData)
        })
      })
      if (response.ok) {
        setSaveStatus(`${isAuto ? 'Auto-saved' : 'Saved'} at ${new Date().toLocaleTimeString()}`)
      } else {
        setSaveStatus('Failed to save draft')
      }
    } catch (error) {
      setSaveStatus('Error saving (backend offline?)')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePersonalChange = (field, val) => {
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [field]: val } }))
  }

  const handleSkillsChange = (category, val) => {
    setResumeData(prev => ({ ...prev, skills: { ...prev.skills, [category]: val } }))
  }

  const addItem = (section, template) => {
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], template] }))
  }

  const removeItem = (section, index) => {
    setResumeData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }))
  }

  const updateItem = (section, index, field, val) => {
    setResumeData(prev => {
      const items = [...prev[section]]
      items[index] = { ...items[index], [field]: val }
      return { ...prev, [section]: items }
    })
  }

  const addBullet = (section, itemIndex) => {
    setResumeData(prev => {
      const items = [...prev[section]]
      items[itemIndex] = { ...items[itemIndex], bullets: [...(items[itemIndex].bullets || []), ''] }
      return { ...prev, [section]: items }
    })
  }

  const removeBullet = (section, itemIndex, bulletIndex) => {
    setResumeData(prev => {
      const items = [...prev[section]]
      items[itemIndex] = { ...items[itemIndex], bullets: items[itemIndex].bullets.filter((_, i) => i !== bulletIndex) }
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

  const optimizeBullet = async (section, itemIndex, bulletIndex) => {
    const currentBullet = resumeData[section][itemIndex].bullets[bulletIndex]
    if (!currentBullet?.trim()) { setOptimizeError('Bullet point is empty'); return }
    setOptimizingIndex({ section, itemIndex, bulletIndex })
    setOptimizeError('')
    try {
      const response = await fetch(`${apiUrl}/api/drafts/improve-bullet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulletPoint: currentBullet })
      })
      if (response.ok) {
        const data = await response.json()
        if (data?.improved) updateBullet(section, itemIndex, bulletIndex, data.improved)
      } else {
        setOptimizeError('AI optimization failed')
      }
    } catch (e) {
      setOptimizeError('Error reaching AI service')
    } finally {
      setOptimizingIndex(null)
    }
  }

  const analyzeJobDescription = () => {
    if (!jdText.trim()) { alert('Please paste a job description first.'); return }
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
    const allResumeText = [
      resumeData.summary, resumeData.skills.languages, resumeData.skills.frameworks,
      resumeData.skills.databases, resumeData.skills.tools,
      ...resumeData.experience.map(e => `${e.company} ${e.role} ${(e.bullets || []).join(' ')}`),
      ...resumeData.projects.map(p => `${p.name} ${p.tech} ${(p.bullets || []).join(' ')}`),
      ...resumeData.education.map(ed => `${ed.institution} ${ed.degree} ${ed.major}`)
    ].join(' ').toLowerCase()
    const matched = [], missing = []
    techKeywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw.replace('.', '\\.')}\\b`, 'i')
      if (regex.test(lowerJd)) {
        if (allResumeText.includes(kw)) matched.push(kw)
        else missing.push(kw)
      }
    })
    setJdAnalysis({ matched, missing })
  }

  const autoInjectKeyword = (keyword) => {
    const lowerKw = keyword.toLowerCase()
    let category = 'tools'
    if (/java|javascript|typescript|python|go|golang|rust|c\+\+|c#|sql/i.test(lowerKw)) category = 'languages'
    else if (/postgresql|mysql|mongodb|redis|elasticsearch|cassandra|oracle|nosql/i.test(lowerKw)) category = 'databases'
    else if (/spring boot|react|next|vue|angular|django|flask|fastapi|node|express/i.test(lowerKw)) category = 'frameworks'
    const currentVal = resumeData.skills[category]
    handleSkillsChange(category, currentVal ? `${currentVal}, ${keyword}` : keyword)
    if (jdAnalysis) {
      setJdAnalysis(prev => ({ matched: [...prev.matched, keyword], missing: prev.missing.filter(k => k !== keyword) }))
    }
  }

  const steps = [
    { title: 'Personal', icon: <UserIcon /> },
    { title: 'Summary', icon: <FileTextIcon /> },
    { title: 'Experience', icon: <BriefcaseIcon /> },
    { title: 'Projects', icon: <FolderIcon /> },
    { title: 'Education', icon: <GraduationIcon /> },
    { title: 'Skills', icon: <SkillsIcon /> }
  ]

  // -------- Inline styles --------
  const sectionCardStyle = {
    background: '#fff',
    border: '1px solid #e9ecef',
    borderRadius: '0.5rem',
    padding: '0.875rem',
    marginBottom: '0.875rem',
    position: 'relative'
  }

  const sectionTitleStyle = {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #e9ecef'
  }

  const subtleLabel = {
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#6b7280',
    display: 'block',
    marginBottom: '0.3125rem'
  }

  const textInput = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '0.84rem',
    fontFamily: 'Inter, sans-serif',
    color: '#111827',
    background: '#f9fafb',
    outline: 'none'
  }

  const deleteBtn = {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600
  }

  return (
    <div>
      {/* ---- Page Header ---- */}
      <div className="page-header">
        <div className="page-title">
          <h1>Resume Builder</h1>
          <p>Build an 80-90+ ATS-score single-column resume. AI-powered bullet optimizer included.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-secondary"
            style={{ display: 'none' }}
            id="preview-toggle-btn"
          >
            {showPreview ? '← Edit' : 'Preview →'}
          </button>
          <button onClick={() => saveDraft(false)} disabled={isSaving} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {isSaving ? 'Saving...' : <><SaveIcon /> Save Draft</>}
          </button>
          <button onClick={() => window.print()} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <PrinterIcon /> Export PDF
          </button>
        </div>
      </div>

      {/* Save status bar */}
      {saveStatus && (
        <div style={{ fontSize: '0.78rem', color: '#6366f1', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', background: '#f5f3ff', borderRadius: '0.5rem', border: '1px solid #e0e7ff' }}>
          <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
          {saveStatus}
        </div>
      )}

      {/* ---- Builder Grid ---- */}
      <div className="builder-layout">

        {/* ===== LEFT PANEL: Forms ===== */}
        <div className="builder-control-panel">

          {/* Step wizard tabs */}
          <div className="wizard-nav">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`wizard-btn ${activeStep === idx ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </div>

          {/* STEP 1: Personal Info */}
          {activeStep === 0 && (
            <div>
              <div style={sectionCardStyle}>
                <h3 style={sectionTitleStyle}>Contact Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))', gap: '0.875rem' }}>
                  {[
                    { field: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
                    { field: 'title', label: 'Professional Title', placeholder: 'Senior Backend Engineer' },
                    { field: 'email', label: 'Email Address', placeholder: 'email@example.com' },
                    { field: 'phone', label: 'Phone Number', placeholder: '+1 (555) 123-4567' },
                    { field: 'location', label: 'Location', placeholder: 'San Francisco, CA' }
                  ].map(f => (
                    <div key={f.field}>
                      <label style={subtleLabel}>{f.label}</label>
                      <input
                        type="text"
                        value={resumeData.personal[f.field]}
                        onChange={e => handlePersonalChange(f.field, e.target.value)}
                        placeholder={f.placeholder}
                        style={textInput}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div style={sectionCardStyle}>
                <h3 style={sectionTitleStyle}>Online Links</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))', gap: '0.875rem' }}>
                  {[
                    { field: 'website', label: 'Portfolio / Website', placeholder: 'johndoe.dev' },
                    { field: 'linkedin', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/johndoe' },
                    { field: 'github', label: 'GitHub URL', placeholder: 'github.com/johndoe' }
                  ].map(f => (
                    <div key={f.field}>
                      <label style={subtleLabel}>{f.label}</label>
                      <input
                        type="text"
                        value={resumeData.personal[f.field]}
                        onChange={e => handlePersonalChange(f.field, e.target.value)}
                        placeholder={f.placeholder}
                        style={textInput}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Summary */}
          {activeStep === 1 && (
            <div style={sectionCardStyle}>
              <h3 style={sectionTitleStyle}>Professional Summary</h3>
              <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: '0.625rem', lineHeight: '1.5' }}>
                Write 3–4 sentences highlighting your core competencies, specialties, and major impact. Avoid buzzwords — be specific.
              </p>
              <textarea
                rows={7}
                value={resumeData.summary}
                onChange={e => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="e.g. Senior Software Engineer with 5+ years of experience designing high-performance REST APIs using Spring Boot..."
                style={{ ...textInput, resize: 'vertical', minHeight: '7rem', lineHeight: '1.6' }}
              />
            </div>
          )}

          {/* STEP 3: Experience */}
          {activeStep === 2 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Work Experience</h3>
                <button
                  onClick={() => addItem('experience', { company: '', role: '', dates: '', location: '', bullets: [''] })}
                  className="btn btn-secondary btn-sm"
                  style={{ borderColor: '#6366f1', color: '#6366f1' }}
                >
                  + Add
                </button>
              </div>
              {resumeData.experience.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', fontSize: '0.85rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px dashed #d1d5db' }}>
                  Click "+ Add" to add your work experience
                </div>
              )}
              {resumeData.experience.map((exp, idx) => (
                <div key={idx} style={sectionCardStyle}>
                  <button onClick={() => removeItem('experience', idx)} style={deleteBtn}>✕ Remove</button>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))', gap: '0.75rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>
                    {[
                      { field: 'company', label: 'Company Name', placeholder: 'Acme Corp' },
                      { field: 'role', label: 'Job Title', placeholder: 'Software Engineer' },
                      { field: 'dates', label: 'Dates', placeholder: 'Jan 2022 – Present' },
                      { field: 'location', label: 'Location', placeholder: 'New York, NY' }
                    ].map(f => (
                      <div key={f.field}>
                        <label style={subtleLabel}>{f.label}</label>
                        <input type="text" value={exp[f.field]} onChange={e => updateItem('experience', idx, f.field, e.target.value)} placeholder={f.placeholder} style={textInput} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                    <label style={subtleLabel}>Key Achievements</label>
                    <button onClick={() => addBullet('experience', idx)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>+ Add Bullet</button>
                  </div>
                  {(exp.bullets || []).map((bullet, bIdx) => {
                    const isOpt = optimizingIndex?.section === 'experience' && optimizingIndex?.itemIndex === idx && optimizingIndex?.bulletIndex === bIdx
                    return (
                      <div key={bIdx} className="bullet-row">
                        <span className="bullet-dot">•</span>
                        <textarea
                          rows={2}
                          className="bullet-textarea"
                          value={bullet}
                          onChange={e => updateBullet('experience', idx, bIdx, e.target.value)}
                          placeholder="Start with action verb: Optimized database..."
                        />
                        <div className="bullet-actions">
                           <button
                            onClick={() => optimizeBullet('experience', idx, bIdx)}
                            disabled={isOpt}
                            style={{ padding: '0.25rem 0.4rem', fontSize: '0.68rem', background: '#f5f3ff', border: '1px solid #c4b5fd', borderRadius: '0.375rem', color: '#7c3aed', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}
                          >
                            {isOpt ? 'Optimizing...' : <><WandIcon /> Optimize</>}
                          </button>
                          <button onClick={() => removeBullet('experience', idx, bIdx)} style={{ padding: '0.25rem 0.4rem', fontSize: '0.68rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.375rem', color: '#dc2626', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>✕</button>
                        </div>
                      </div>
                    )
                  })}
                  {optimizeError && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{optimizeError}</p>}
                </div>
              ))}
            </div>
          )}

          {/* STEP 4: Projects */}
          {activeStep === 3 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Projects</h3>
                <button
                  onClick={() => addItem('projects', { name: '', role: '', tech: '', bullets: [''] })}
                  className="btn btn-secondary btn-sm"
                  style={{ borderColor: '#6366f1', color: '#6366f1' }}
                >
                  + Add
                </button>
              </div>
              {resumeData.projects.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', fontSize: '0.85rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px dashed #d1d5db' }}>
                  Click "+ Add" to add a project
                </div>
              )}
              {resumeData.projects.map((proj, idx) => (
                <div key={idx} style={sectionCardStyle}>
                  <button onClick={() => removeItem('projects', idx)} style={deleteBtn}>✕ Remove</button>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))', gap: '0.75rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>
                    {[
                      { field: 'name', label: 'Project Name', placeholder: 'AI Resume Parser' },
                      { field: 'role', label: 'Your Role', placeholder: 'Lead Developer' }
                    ].map(f => (
                      <div key={f.field}>
                        <label style={subtleLabel}>{f.label}</label>
                        <input type="text" value={proj[f.field]} onChange={e => updateItem('projects', idx, f.field, e.target.value)} placeholder={f.placeholder} style={textInput} />
                      </div>
                    ))}
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={subtleLabel}>Technologies Used (comma-separated)</label>
                      <input type="text" value={proj.tech} onChange={e => updateItem('projects', idx, 'tech', e.target.value)} placeholder="Spring Boot, React.js, PostgreSQL" style={textInput} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                    <label style={subtleLabel}>Key Features & Impact</label>
                    <button onClick={() => addBullet('projects', idx)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>+ Add Bullet</button>
                  </div>
                  {(proj.bullets || []).map((bullet, bIdx) => {
                    const isOpt = optimizingIndex?.section === 'projects' && optimizingIndex?.itemIndex === idx && optimizingIndex?.bulletIndex === bIdx
                    return (
                      <div key={bIdx} className="bullet-row">
                        <span className="bullet-dot">•</span>
                        <textarea rows={2} className="bullet-textarea" value={bullet} onChange={e => updateBullet('projects', idx, bIdx, e.target.value)} placeholder="Built microservice pipeline reducing latency by 40%..." />
                        <div className="bullet-actions">
                          <button
                            onClick={() => optimizeBullet('projects', idx, bIdx)}
                            disabled={isOpt}
                            style={{ padding: '0.25rem 0.4rem', fontSize: '0.68rem', background: '#f5f3ff', border: '1px solid #c4b5fd', borderRadius: '0.375rem', color: '#7c3aed', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}
                          >
                            {isOpt ? 'Optimizing...' : <><WandIcon /> Optimize</>}
                          </button>
                          <button onClick={() => removeBullet('projects', idx, bIdx)} style={{ padding: '0.25rem 0.4rem', fontSize: '0.68rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '0.375rem', color: '#dc2626', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>✕</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          )}

          {/* STEP 5: Education */}
          {activeStep === 4 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Education</h3>
                <button onClick={() => addItem('education', { institution: '', degree: '', major: '', dates: '', gpa: '' })} className="btn btn-secondary btn-sm" style={{ borderColor: '#6366f1', color: '#6366f1' }}>+ Add</button>
              </div>
              {resumeData.education.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', fontSize: '0.85rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px dashed #d1d5db' }}>Click "+ Add" to add education</div>
              )}
              {resumeData.education.map((edu, idx) => (
                <div key={idx} style={sectionCardStyle}>
                  <button onClick={() => removeItem('education', idx)} style={deleteBtn}>✕ Remove</button>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {[
                      { field: 'institution', label: 'Institution', placeholder: 'Stanford University' },
                      { field: 'degree', label: 'Degree', placeholder: 'B.S. / M.S.' },
                      { field: 'major', label: 'Field of Study', placeholder: 'Computer Science' },
                      { field: 'dates', label: 'Graduation Date', placeholder: 'May 2021' },
                      { field: 'gpa', label: 'GPA / Scale', placeholder: '3.9/4.0' }
                    ].map(f => (
                      <div key={f.field}>
                        <label style={subtleLabel}>{f.label}</label>
                        <input type="text" value={edu[f.field]} onChange={e => updateItem('education', idx, f.field, e.target.value)} placeholder={f.placeholder} style={textInput} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 6: Skills */}
          {activeStep === 5 && (
            <div style={sectionCardStyle}>
              <h3 style={sectionTitleStyle}>Technical Skills</h3>
              <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: '0.875rem' }}>
                Separate keywords with commas. ATS parsers match these to job description keywords.
              </p>
              {[
                { cat: 'languages', label: 'Programming Languages', placeholder: 'Java, JavaScript, Python, SQL' },
                { cat: 'frameworks', label: 'Frameworks & Libraries', placeholder: 'React.js, Spring Boot, Node.js' },
                { cat: 'databases', label: 'Databases & Storage', placeholder: 'PostgreSQL, Redis, MongoDB' },
                { cat: 'tools', label: 'Tools & Infrastructure', placeholder: 'Docker, Git, AWS, CI/CD' }
              ].map(f => (
                <div key={f.cat} style={{ marginBottom: '0.75rem' }}>
                  <label style={subtleLabel}>{f.label}</label>
                  <input type="text" value={resumeData.skills[f.cat]} onChange={e => handleSkillsChange(f.cat, e.target.value)} placeholder={f.placeholder} style={textInput} />
                </div>
              ))}
            </div>
          )}

          {/* Step nav buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #e9ecef', marginTop: '0.25rem' }}>
            <button onClick={() => setActiveStep(prev => Math.max(0, prev - 1))} disabled={activeStep === 0} className="btn btn-secondary">
              ← Previous
            </button>
            {activeStep < steps.length - 1 ? (
              <button onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))} className="btn btn-primary">
                Next →
              </button>
            ) : (
              <button onClick={() => { saveDraft(false); alert('Draft saved!') }} className="btn btn-primary" style={{ background: '#10b981', borderColor: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <SuccessIcon /> Save & Finalize
              </button>
            )}
          </div>

          {/* AI JD Keywords Matcher */}
          <div className="jd-toolkit-card">
            <div className="jd-toolkit-title">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" /></svg>
              AI Keyword Gap Analyzer
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.625rem' }}>
              Paste a job description to detect missing tech keywords and auto-inject them.
            </p>
            <textarea
              rows={3}
              value={jdText}
              onChange={e => setJdText(e.target.value)}
              placeholder="Paste Job Description here..."
              style={{ ...textInput, resize: 'vertical', minHeight: '4rem' }}
            />
            <button onClick={analyzeJobDescription} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.8rem' }}>
              Analyze & Match Keywords
            </button>
            {jdAnalysis && (
              <div style={{ marginTop: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', marginBottom: '0.25rem', display: 'inline-flex', alignItems: 'center' }}><SuccessIcon /> Matched ({jdAnalysis.matched.length})</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {jdAnalysis.matched.map((kw, i) => (
                      <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', background: '#d1fae5', color: '#065f46', borderRadius: '0.25rem', border: '1px solid #a7f3d0', display: 'inline-flex', alignItems: 'center' }}><SuccessIcon /> {kw}</span>
                    ))}
                    {jdAnalysis.matched.length === 0 && <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>None matched yet.</span>}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626', marginBottom: '0.25rem', display: 'inline-flex', alignItems: 'center' }}><WarningIcon /> Missing ({jdAnalysis.missing.length}) — Click to inject</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {jdAnalysis.missing.map((kw, i) => (
                      <button key={i} onClick={() => autoInjectKeyword(kw)} title="Click to inject into Skills" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', background: '#fee2e2', color: '#991b1b', borderRadius: '0.25rem', border: '1px dashed #fca5a5', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ {kw}</button>
                    ))}
                    {jdAnalysis.missing.length === 0 && <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}><SuccessIcon /> All keywords matched!</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== RIGHT PANEL: ATS Resume Preview ===== */}
        <div className="preview-container">
          <div className="preview-header">
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827' }}>Live ATS Resume Preview</h3>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', background: '#f1f5f9', padding: '0.25rem 0.625rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0' }}>
              Single-column · ATS compliant
            </span>
          </div>

          {/* Paper preview wrapper */}
          <div className="resume-preview-area">
            {/* Actual ATS-safe resume document */}
            <div
              id="ats-resume-print-area"
              style={{
                width: '100%',
                maxWidth: '50rem',
                minHeight: '62.5rem',
                backgroundColor: '#ffffff',
                color: '#1e293b',
                padding: '2.5rem',
                boxShadow: '0 0.625rem 1.5625rem -0.3125rem rgba(0,0,0,0.15)',
                fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
                fontSize: '11pt',
                lineHeight: '1.45',
                boxSizing: 'border-box',
                borderRadius: '0.25rem'
              }}
            >
              {/* ---- Header ---- */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #334155', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                <h1 style={{ fontSize: '22pt', fontWeight: 'bold', margin: '0 0 0.2rem 0', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  {resumeData.personal.fullName || 'YOUR FULL NAME'}
                </h1>
                <div style={{ fontSize: '10.5pt', fontWeight: 600, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {resumeData.personal.title || 'Professional Title'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.25rem 0.75rem', fontSize: '9pt', color: '#475569' }}>
                  {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                  {resumeData.personal.phone && <span>| {resumeData.personal.phone}</span>}
                  {resumeData.personal.location && <span>| {resumeData.personal.location}</span>}
                  {resumeData.personal.website && <span>| {resumeData.personal.website}</span>}
                  {resumeData.personal.linkedin && <span>| {resumeData.personal.linkedin}</span>}
                  {resumeData.personal.github && <span>| {resumeData.personal.github}</span>}
                </div>
              </div>

              {/* ---- Summary ---- */}
              {resumeData.summary && (
                <ResumeSection title="Professional Summary">
                  <p style={{ fontSize: '9.5pt', margin: 0, color: '#334155', textAlign: 'justify' }}>{resumeData.summary}</p>
                </ResumeSection>
              )}

              {/* ---- Experience ---- */}
              {resumeData.experience.length > 0 && (
                <ResumeSection title="Professional Experience">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} style={{ marginBottom: idx < resumeData.experience.length - 1 ? '0.625rem' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10pt', color: '#0f172a', flexWrap: 'wrap', gap: '0.25rem' }}>
                        <span>{exp.company}</span>
                        <span style={{ fontWeight: 500 }}>{exp.dates}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '9.5pt', color: '#475569', marginBottom: '3px', flexWrap: 'wrap' }}>
                        <span>{exp.role}</span>
                        <span>{exp.location}</span>
                      </div>
                      {exp.bullets?.length > 0 && (
                        <ul style={{ margin: '0', paddingLeft: '1.125rem', fontSize: '9.5pt', color: '#334155' }}>
                          {exp.bullets.map((b, bIdx) => b.trim() && <li key={bIdx} style={{ marginBottom: '2px', textAlign: 'justify' }}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </ResumeSection>
              )}

              {/* ---- Projects ---- */}
              {resumeData.projects.length > 0 && (
                <ResumeSection title="Projects & Technical Work">
                  {resumeData.projects.map((proj, idx) => (
                    <div key={idx} style={{ marginBottom: idx < resumeData.projects.length - 1 ? '0.625rem' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10pt', color: '#0f172a', flexWrap: 'wrap', gap: '0.25rem' }}>
                        <span>{proj.name} {proj.role && <span style={{ fontWeight: 'normal', fontStyle: 'italic', color: '#475569' }}>– {proj.role}</span>}</span>
                        <span style={{ fontSize: '9pt', fontWeight: 'normal', fontStyle: 'italic', color: '#475569' }}>{proj.tech}</span>
                      </div>
                      {proj.bullets?.length > 0 && (
                        <ul style={{ margin: '2px 0 0', paddingLeft: '1.125rem', fontSize: '9.5pt', color: '#334155' }}>
                          {proj.bullets.map((b, bIdx) => b.trim() && <li key={bIdx} style={{ marginBottom: '2px', textAlign: 'justify' }}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </ResumeSection>
              )}

              {/* ---- Education ---- */}
              {resumeData.education.length > 0 && (
                <ResumeSection title="Education">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} style={{ marginBottom: idx < resumeData.education.length - 1 ? '0.5rem' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10pt', color: '#0f172a', flexWrap: 'wrap' }}>
                        <span>{edu.institution}</span>
                        <span style={{ fontWeight: 500 }}>{edu.dates}</span>
                      </div>
                      <div style={{ fontSize: '9.5pt', color: '#475569', fontStyle: 'italic' }}>
                        {edu.degree}{edu.major && ` in ${edu.major}`}{edu.gpa && ` — GPA: ${edu.gpa}`}
                      </div>
                    </div>
                  ))}
                </ResumeSection>
              )}

              {/* ---- Skills ---- */}
              {(resumeData.skills.languages || resumeData.skills.frameworks || resumeData.skills.databases || resumeData.skills.tools) && (
                <ResumeSection title="Technical Skills">
                  <div style={{ fontSize: '9.5pt', lineHeight: '1.55', color: '#334155' }}>
                    {resumeData.skills.languages && <div><strong>Languages:</strong> {resumeData.skills.languages}</div>}
                    {resumeData.skills.frameworks && <div><strong>Frameworks & Libraries:</strong> {resumeData.skills.frameworks}</div>}
                    {resumeData.skills.databases && <div><strong>Databases & Caching:</strong> {resumeData.skills.databases}</div>}
                    {resumeData.skills.tools && <div><strong>Developer Tools & Infra:</strong> {resumeData.skills.tools}</div>}
                  </div>
                </ResumeSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Small helper for resume section headings */
function ResumeSection({ title, children }) {
  return (
    <div style={{ marginBottom: '1.125rem' }}>
      <h3 style={{
        fontSize: '10.5pt',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0f172a',
        borderBottom: '1.5px solid #cbd5e1',
        paddingBottom: '2px',
        marginBottom: '6px',
        letterSpacing: '0.06em'
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

export default BuilderView
