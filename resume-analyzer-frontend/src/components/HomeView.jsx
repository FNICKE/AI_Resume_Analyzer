import React, { useState } from 'react'

function HomeView({ onGetStarted, isLoggedIn, onGoToDashboard }) {
  const [atsScore, setAtsScore] = useState(40)

  // Dynamic feedback for the interactive simulator
  const getSimulationFeedback = (score) => {
    if (score < 50) {
      return {
        rating: 'Weak ATS Match',
        color: '#ef4444',
        glow: 'rgba(239, 68, 68, 0.25)',
        issues: [
          'Multiple columns can confuse older ATS scanners.',
          'Missing critical keywords (e.g. Spring Boot, PostgreSQL).',
          'Contains graphical widgets or progress bars (ignored by scanners).',
          'Uses passive verbs like "responsible for" rather than active verbs.'
        ]
      }
    } else if (score < 75) {
      return {
        rating: 'Moderate ATS Match',
        color: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.25)',
        issues: [
          'Single-column structure matches parsing criteria.',
          'Has basic contact details.',
          'Needs more quantified achievements (e.g., latency, throughput %).',
          'Missing a few specialized tools in the target job description.'
        ]
      }
    } else {
      return {
        rating: 'Strong ATS Match (80-90+)',
        color: '#10b981',
        glow: 'rgba(16, 185, 129, 0.25)',
        issues: [
          'Strict single-column text layout scans flawlessly.',
          'Quantified achievements present ("Reduced database CPU by 50%").',
          'Target key tech stack skills fully matched.',
          'Clear section headings parsed in proper logical order.'
        ]
      }
    }
  }

  const feedback = getSimulationFeedback(atsScore)

  return (
    <div style={{ color: '#f8fafc', paddingBottom: '4rem' }}>
      
      {/* Premium Header/Navbar */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.5rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        marginBottom: '4rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #6366f1, #10b981)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.25)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="m9 15 2 2 4-4" />
            </svg>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            RESUMEAI
          </span>
        </div>

        <div>
          {isLoggedIn ? (
            <button onClick={onGoToDashboard} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
              Go to Dashboard
            </button>
          ) : (
            <button onClick={onGetStarted} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}>
              Sign In / Register
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 1rem',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '30px',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#a5b4fc',
          marginBottom: '1.5rem'
        }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
          Now Integrated with Gemini AI 1.5 Flash
        </div>

        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          lineHeight: '1.15', 
          letterSpacing: '-0.03em', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(to right, #ffffff, #c7d2fe, #a5b4fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Optimize Your Resume. <br/>
          Beat the ATS. Land Your Job.
        </h1>

        <p style={{ 
          fontSize: '1.15rem', 
          color: '#94a3b8', 
          lineHeight: '1.6', 
          marginBottom: '2.5rem',
          maxWidth: '650px',
          margin: '0 auto 2.5rem auto'
        }}>
          An intelligent platform designed to scan your existing resumes against job descriptions, audit skill keywords, and build clean, single-column templates optimized for 80-90+ ATS pass-rates.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {isLoggedIn ? (
            <button onClick={onGoToDashboard} className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Go to Dashboard
            </button>
          ) : (
            <button onClick={onGetStarted} className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Get Started for Free
            </button>
          )}
          <a href="#demo" className="btn btn-secondary" style={{ padding: '0.85rem 2rem' }}>
            Simulate ATS Score
          </a>
        </div>
      </section>

      {/* Feature Spotlights */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '6rem' }}>
        
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ 
            width: '46px', 
            height: '46px', 
            borderRadius: '10px', 
            backgroundColor: 'rgba(99, 102, 241, 0.12)', 
            color: '#818cf8', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '1.25rem' 
          }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9m-4-4 4-4 4 4" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>ATS Scoring & Scanner</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Upload your PDF or Docx resume and parse it against any target job description to compute a live matching rating instantly.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ 
            width: '46px', 
            height: '46px', 
            borderRadius: '10px', 
            backgroundColor: 'rgba(16, 185, 129, 0.12)', 
            color: '#34d399', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '1.25rem' 
          }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>AI-Powered Builder</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Create an ATS-perfect resume using our multi-step template. Write bullets and ask the Gemini AI assistant to optimize them with action verbs and metrics.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ 
            width: '46px', 
            height: '46px', 
            borderRadius: '10px', 
            backgroundColor: 'rgba(245, 158, 11, 0.12)', 
            color: '#fbbf24', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '1.25rem' 
          }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H10.82a2 2 0 0 1-1.99-1.819l-.637-7A2 2 0 0 1 9.828 3zM12 18v.01" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Keyword Gap Audits</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Compare target JD keywords against your resume profile. Detect missing competencies and automatically inject them into your skills categorization.
          </p>
        </div>

      </section>

      {/* Interactive Simulator Section */}
      <section id="demo" className="glass-panel" style={{ padding: '3rem', marginBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interactive Playground</span>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1rem' }}>See How ATS Systems Read Your Resume</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Drag the slider below to simulate how parsing quality, structure, action verbs, and keyword alignment combine to affect your shortlisting score.
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span>Formatting & Skill Compliance Score</span>
                <span style={{ color: feedback.color }}>{atsScore}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                value={atsScore}
                onChange={(e) => setAtsScore(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  accentColor: feedback.color
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: feedback.color,
                textTransform: 'uppercase'
              }}>
                {feedback.rating}
              </div>
            </div>
          </div>

          {/* Dynamic Simulator Output box */}
          <div style={{ 
            backgroundColor: 'rgba(8, 10, 24, 0.5)', 
            border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            boxShadow: `0 10px 30px -10px ${feedback.glow}`,
            transition: 'all 0.3s ease'
          }}>
            <h4 style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              ATS Scanner Audit Results:
            </h4>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {feedback.issues.map((issue, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: '#94a3b8', alignItems: 'flex-start' }}>
                  <span style={{ 
                    color: feedback.color, 
                    fontWeight: 'bold', 
                    fontSize: '1rem',
                    lineHeight: '1'
                  }}>
                    {atsScore >= 75 ? '✓' : '•'}
                  </span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* CTA Footer section */}
      <section style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to optimize your application?</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1rem' }}>
          Join thousands of candidates using AI matching models to pass automated filters.
        </p>
        {isLoggedIn ? (
          <button onClick={onGoToDashboard} className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
            Enter Workspace Dashboard
          </button>
        ) : (
          <button onClick={onGetStarted} className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
            Build & Analyze Now
          </button>
        )}
      </section>

    </div>
  )
}

export default HomeView
