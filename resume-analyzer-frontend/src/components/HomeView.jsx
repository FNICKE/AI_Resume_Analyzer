import React, { useState } from 'react'

const homeStyles = `
  .home-page { background: #ffffff; min-height: 100vh; color: #111827; font-family: 'Inter', sans-serif; }

  /* ---- Top Navbar ---- */
  .home-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.5rem;
    height: 3.875rem;
    background: #ffffff;
    border-bottom: 1px solid #e9ecef;
    position: sticky;
    top: 0;
    z-index: 100;
    gap: 1rem;
  }

  .home-nav-logo {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
  }

  .home-nav-logo-icon {
    width: 2.125rem;
    height: 2.125rem;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .home-nav-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .home-nav-signin {
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    font-weight: 600;
    font-size: 0.85rem;
    font-family: 'Inter', sans-serif;
    padding: 0.375rem 0.625rem;
  }

  /* ---- Hero ---- */
  .home-hero {
    background: linear-gradient(180deg, #f5f3ff 0%, #ffffff 100%);
    padding: 5rem 2.5rem 4.5rem;
    text-align: center;
  }

  .home-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.3125rem 0.875rem;
    background: #ede9fe;
    border: 1px solid #c4b5fd;
    border-radius: 1.875rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: #7c3aed;
    margin-bottom: 1.5rem;
  }

  .home-hero-badge-dot {
    width: 0.375rem;
    height: 0.375rem;
    background: #10b981;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .home-hero h1 {
    font-size: clamp(1.75rem, 5vw, 3rem);
    font-weight: 800;
    line-height: 1.18;
    letter-spacing: -0.03em;
    margin-bottom: 1.25rem;
    color: #111827;
  }

  .home-hero h1 span { display: block; color: #6366f1; }

  .home-hero p {
    font-size: clamp(0.9rem, 2.5vw, 1.05rem);
    color: #6b7280;
    line-height: 1.7;
    margin: 0 auto 2.25rem;
    max-width: 40rem;
  }

  .home-hero-cta {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .btn-outline-home {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.6875rem 1.75rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #6b7280;
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }
  .btn-outline-home:hover { border-color: #9ca3af; color: #374151; }

  /* ---- Stats Row ---- */
  .home-stats {
    border-top: 1px solid #e9ecef;
    border-bottom: 1px solid #e9ecef;
    background: #fafafa;
    padding: 1.75rem 2.5rem;
  }

  .home-stats-grid {
    max-width: 56.25rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .home-stat-item { text-align: center; }

  .home-stat-val {
    font-size: 1.6rem;
    font-weight: 800;
    color: #6366f1;
    margin-bottom: 0.25rem;
  }

  .home-stat-label { font-size: 0.8rem; color: #6b7280; font-weight: 500; }

  /* ---- Features ---- */
  .home-features {
    padding: 4rem 2.5rem;
  }

  .home-section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .home-section-header h2 {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
    font-weight: 800;
    margin-bottom: 0.625rem;
    color: #111827;
  }

  .home-section-header p { color: #6b7280; font-size: 0.92rem; }

  .home-features-grid {
    max-width: 75rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15.5rem, 1fr));
    gap: 1.25rem;
  }

  .home-feature-card {
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 0.0625rem 0.25rem rgba(0,0,0,0.05);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  .home-feature-card:hover {
    box-shadow: 0 0.5rem 1.5rem rgba(0,0,0,0.09);
    transform: translateY(-2px);
  }

  .home-feature-icon {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    flex-shrink: 0;
  }

  .home-feature-card h3 {
    font-size: 0.9375rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #111827;
  }

  .home-feature-card p { font-size: 0.82rem; color: #6b7280; line-height: 1.6; }

  /* ---- Demo / Simulator ---- */
  .home-demo {
    background: #f9fafb;
    border-top: 1px solid #e9ecef;
    padding: 4rem 2.5rem;
  }

  .home-demo-inner { max-width: 55rem; margin: 0 auto; }

  .home-demo-card {
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 0.25rem 1rem rgba(0,0,0,0.06);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  /* ---- Slider ---- */
  .home-slider-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .home-slider-label span:first-child { font-size: 0.8rem; font-weight: 600; color: #6b7280; }

  .home-range {
    width: 100%;
    cursor: pointer;
    height: 0.375rem;
    border-radius: 0.1875rem;
    margin: 0;
  }

  .home-range-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.375rem;
  }

  .home-range-labels span { font-size: 0.69rem; color: #9ca3af; }

  .home-rating-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    margin-top: 1.25rem;
  }

  .home-rating-dot {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.68rem;
    font-weight: 800;
    color: #fff;
    flex-shrink: 0;
  }

  /* ---- Audit panel ---- */
  .home-audit-panel {
    background: #f9fafb;
    border: 1px solid #f3f4f6;
    border-radius: 0.625rem;
    padding: 1.25rem;
  }

  .home-audit-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.875rem;
  }

  .home-audit-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .home-audit-item {
    display: flex;
    gap: 0.625rem;
    font-size: 0.82rem;
    color: #6b7280;
    align-items: flex-start;
    line-height: 1.4;
  }

  .home-audit-icon {
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 800;
    color: #fff;
    flex-shrink: 0;
    margin-top: 0.0625rem;
  }

  /* ---- CTA ---- */
  .home-cta {
    padding: 4rem 2.5rem;
    text-align: center;
    background: #fff;
  }

  .home-cta-inner { max-width: 37.5rem; margin: 0 auto; }

  .home-cta h2 {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
    font-weight: 800;
    margin-bottom: 0.75rem;
    color: #111827;
  }

  .home-cta p { color: #6b7280; margin-bottom: 1.75rem; font-size: 0.92rem; }

  /* ---- Footer ---- */
  .home-footer {
    background: #1e2346;
    color: #9ca3af;
    border-top: 1px solid #2d3778;
    padding: 4rem 2.5rem 2rem;
  }

  .home-footer-grid {
    max-width: 75rem;
    margin: 0 auto 3rem;
    display: grid;
    grid-template-columns: 2fr repeat(3, 1fr);
    gap: 2.5rem;
  }

  .home-footer-brand {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;
  }

  .home-footer-logo {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .home-footer-logo-icon {
    width: 2.125rem;
    height: 2.125rem;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .home-footer-brand p {
    font-size: 0.85rem;
    line-height: 1.6;
    max-width: 18rem;
    color: #9ca3af;
    margin: 0;
  }

  .home-footer-col {
    text-align: left;
  }

  .home-footer-col h4 {
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .home-footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .home-footer-links a {
    color: #9ca3af;
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s;
  }

  .home-footer-links a:hover {
    color: #ffffff;
  }

  .home-footer-bottom {
    max-width: 75rem;
    margin: 0 auto;
    border-top: 1px solid #2d3778;
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .home-footer-copy { font-size: 0.78rem; color: #9ca3af; font-weight: 500; }
  .home-footer-powered { display: flex; align-items: center; gap: 0.375rem; font-size: 0.78rem; color: #9ca3af; }
  .home-footer-powered span { color: #6366f1; font-weight: 700; }

  @media (max-width: 768px) {
    .home-footer-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }

  @media (max-width: 480px) {
    .home-footer-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .home-footer-brand {
      grid-column: span 3;
    }
    .home-footer-links a {
      font-size: 0.75rem;
    }
    .home-footer-col h4 {
      font-size: 0.8rem;
    }
  }

  /* =============================================
     RESPONSIVE — Tablet ≤ 900px
     ============================================= */
  @media (max-width: 900px) {
    .home-features-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .home-demo-card {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .home-stats-grid {
      gap: 1rem;
    }
  }

  /* =============================================
     RESPONSIVE — Mobile ≤ 640px
     ============================================= */
  @media (max-width: 640px) {
    .home-nav { padding: 0 1rem; height: 3.5rem; }
    .home-nav-signin { display: none; }

    .home-hero { padding: 3rem 1.25rem 2.5rem; }

    .home-stats { padding: 1.25rem 1rem; }
    .home-stats-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .home-stat-item {
      padding: 0.875rem;
      background: #fff;
      border-radius: 0.5rem;
      border: 1px solid #e9ecef;
    }

    .home-features { padding: 2.5rem 1.25rem; }
    .home-features-grid {
      grid-template-columns: 1fr;
    }

    .home-demo { padding: 2.5rem 1.25rem; }
    .home-demo-card {
      padding: 1.25rem;
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }

    .home-cta { padding: 2.5rem 1.25rem; }
    .home-cta-inner button { width: 100%; }

    .home-footer { padding: 1rem; flex-direction: column; text-align: center; }

    .home-section-header { margin-bottom: 1.75rem; }
  }

  /* =============================================
     RESPONSIVE — Small phone ≤ 420px
     ============================================= */
  @media (max-width: 420px) {
    .home-hero h1 { font-size: 1.6rem; }
    .home-stat-val { font-size: 1.3rem; }
    .home-feature-card { padding: 1.125rem; }
    .home-demo-card { padding: 1rem; }
  }
`

function HomeView({ onGetStarted, isLoggedIn, onGoToDashboard }) {
  const [atsScore, setAtsScore] = useState(40)

  const getSimulationFeedback = (score) => {
    if (score < 50) return {
      rating: 'Weak ATS Match',
      color: '#ef4444',
      bg: '#fee2e2',
      icon: '✗',
      issues: [
        'Multi-column layout confuses ATS parsing order.',
        'Missing critical keywords (Spring Boot, PostgreSQL).',
        'Graphical widgets & progress bars are ignored by scanners.',
        'Passive verbs like "responsible for" reduce relevance scoring.'
      ]
    }
    if (score < 75) return {
      rating: 'Moderate ATS Match',
      color: '#f59e0b',
      bg: '#fef3c7',
      icon: '~',
      issues: [
        'Single-column structure meets basic parsing criteria.',
        'Contact information is present and visible.',
        'Needs more quantified achievements (e.g., latency %, uptime).',
        'A few specialized tools from the JD are missing.'
      ]
    }
    return {
      rating: 'Strong ATS Match (80-90+)',
      color: '#10b981',
      bg: '#d1fae5',
      icon: '✓',
      issues: [
        'Single-column text layout scans perfectly.',
        'Quantified achievements present ("Reduced CPU by 50%").',
        'Target tech stack keywords fully matched.',
        'Clear section headings parsed in correct logical order.'
      ]
    }
  }

  const feedback = getSimulationFeedback(atsScore)

  return (
    <div className="home-page">
      {/* Inject scoped styles */}
      <style>{homeStyles}</style>

      {/* ---- Top Navbar ---- */}
      <nav className="home-nav">
        <div className="home-nav-logo">
          <div className="home-nav-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="m9 15 2 2 4-4" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: '#111827', letterSpacing: '-0.01em' }}>
            ResumeAI
          </span>
        </div>

        <div className="home-nav-actions">
          {isLoggedIn ? (
            <button onClick={onGoToDashboard} className="btn btn-primary">
              Open Dashboard →
            </button>
          ) : (
            <>
              <button onClick={onGetStarted} className="home-nav-signin">
                Sign In
              </button>
              <button onClick={onGetStarted} className="btn btn-primary">
                Get Started Free
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ---- Hero Section ---- */}
      <section className="home-hero">
        <div className="home-hero-badge">
          <span className="home-hero-badge-dot" />
          Powered by Gemini AI — ATS Score 80-90+
        </div>

        <h1>
          Build Resumes That
          <span>Beat Automated Screening</span>
        </h1>

        <p>
          Scan your resume against any job description, detect missing keywords, get AI-optimized bullet points,
          and export a clean single-column PDF that every ATS system can parse perfectly.
        </p>

        <div className="home-hero-cta">
          {isLoggedIn ? (
            <button onClick={onGoToDashboard} className="btn btn-primary" style={{ padding: '0.6875rem 1.75rem', fontSize: '0.9rem' }}>
              Open Dashboard →
            </button>
          ) : (
            <>
              <button onClick={onGetStarted} className="btn btn-primary" style={{ padding: '0.6875rem 1.75rem', fontSize: '0.9rem' }}>
                Start for Free
              </button>
              <a href="#demo" className="btn-outline-home">
                See Live Demo
              </a>
            </>
          )}
        </div>
      </section>

      {/* ---- Stats Row ---- */}
      <section className="home-stats">
        <div className="home-stats-grid">
          {[
            { val: '80-90+', label: 'Guaranteed ATS Score' },
            { val: 'Gemini AI', label: 'Bullet Point Optimizer' },
            { val: '100%', label: 'ATS-Parseable Layout' }
          ].map((item, idx) => (
            <div key={idx} className="home-stat-item">
              <div className="home-stat-val">{item.val}</div>
              <div className="home-stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Features Section ---- */}
      <section className="home-features">
        <div className="home-section-header">
          <h2>Everything You Need to Land the Interview</h2>
          <p>A complete toolkit built for modern job seekers</p>
        </div>

        <div className="home-features-grid">
          {[
            {
              icon: (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9m-4-4 4-4 4 4" />
                </svg>
              ),
              color: '#6366f1', bg: '#ede9fe',
              title: 'ATS Scanner & Scorer',
              desc: 'Upload your resume PDF or Docx, paste a job description, and receive an instant ATS compatibility score with keyword gap analysis.'
            },
            {
              icon: (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              ),
              color: '#10b981', bg: '#d1fae5',
              title: 'AI Resume Builder',
              desc: 'Build a perfect single-column ATS-compliant resume from scratch. AI rewrites your bullet points with action verbs and quantified outcomes.'
            },
            {
              icon: (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
              ),
              color: '#f59e0b', bg: '#fef3c7',
              title: 'Keyword Gap Auditor',
              desc: 'Detect missing tech stack keywords from any job description and auto-inject them into your skills section with a single click.'
            },
            {
              icon: (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              ),
              color: '#8b5cf6', bg: '#f3e8ff',
              title: 'AI Mock Interview Agent',
              desc: 'Practice interactive technical & theoretical interviews with a virtual AI Coach. Get real-time grading, misconception corrections, and trend sync updates.'
            }
          ].map((feat, idx) => (
            <div key={idx} className="home-feature-card">
              <div className="home-feature-icon" style={{ background: feat.bg, color: feat.color }}>
                {feat.icon}
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Interactive ATS Simulator ---- */}
      <section id="demo" className="home-demo">
        <div className="home-demo-inner">
          <div className="home-section-header">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
              Interactive Demo
            </span>
            <h2>See How ATS Parsers Read Resumes</h2>
            <p>Drag the slider to simulate how formatting, keywords, and achievements affect your parser score</p>
          </div>

          <div className="home-demo-card">
            {/* Left: slider */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#111827' }}>
                Simulate Compliance Score
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <div className="home-slider-label">
                  <span>Formatting &amp; Keyword Alignment</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: feedback.color }}>{atsScore}%</span>
                </div>
                <input
                  type="range" min="20" max="95" value={atsScore}
                  onChange={(e) => setAtsScore(parseInt(e.target.value))}
                  className="home-range"
                  style={{ accentColor: feedback.color }}
                />
                <div className="home-range-labels">
                  <span>Weak</span>
                  <span>Strong</span>
                </div>
              </div>

              <div
                className="home-rating-badge"
                style={{ background: feedback.bg, border: `1px solid ${feedback.color}30` }}
              >
                <span className="home-rating-dot" style={{ background: feedback.color }}>
                  {feedback.icon}
                </span>
                <span style={{ fontSize: '0.83rem', fontWeight: 700, color: feedback.color }}>
                  {feedback.rating}
                </span>
              </div>
            </div>

            {/* Right: audit output */}
            <div className="home-audit-panel">
              <div className="home-audit-title">ATS Audit Results</div>
              <ul className="home-audit-list">
                {feedback.issues.map((issue, idx) => (
                  <li key={idx} className="home-audit-item">
                    <span className="home-audit-icon" style={{ background: feedback.color }}>
                      {feedback.icon}
                    </span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section className="home-cta">
        <div className="home-cta-inner">
          <h2>Ready to Get Shortlisted?</h2>
          <p>
            Join thousands of candidates using AI-powered resume optimization to pass automated screening filters.
          </p>
          {isLoggedIn ? (
            <button onClick={onGoToDashboard} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
              Enter Dashboard →
            </button>
          ) : (
            <button onClick={onGetStarted} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
              Build My Resume Now
            </button>
          )}
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="home-footer">
        <div className="home-footer-grid">
          <div className="home-footer-brand">
            <div className="home-footer-logo">
              <div className="home-footer-logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="m9 15 2 2 4-4" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#ffffff', letterSpacing: '-0.01em' }}>
                ResumeAI
              </span>
            </div>
            <p>
              AI-driven platform empowering job seekers to optimize resumes, evaluate compatibility, and conquer interviews.
            </p>
          </div>

          <div className="home-footer-col">
            <h4>Product</h4>
            <ul className="home-footer-links">
              <li><a href="#demo">ATS Simulator</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }}>Resume Builder</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }}>Interview Prep</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }}>Keyword Gap Auditor</a></li>
            </ul>
          </div>

          <div className="home-footer-col">
            <h4>Solutions</h4>
            <ul className="home-footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }}>For Candidates</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }}>For Students</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }}>For Coaches</a></li>
            </ul>
          </div>

          <div className="home-footer-col">
            <h4>Resources</h4>
            <ul className="home-footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }}>Resume Templates</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }}>Interview Guide</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onGetStarted(); }}>API Status</a></li>
            </ul>
          </div>
        </div>

        <div className="home-footer-bottom">
          <div className="home-footer-copy">
            © 2026 ResumeAI — ATS Resume Analyzer &amp; Builder. All rights reserved.
          </div>
          <div className="home-footer-powered" style={{ color: '#9ca3af' }}>
            Powered by <span style={{ color: '#6366f1' }}>Gemini AI &amp; OpenAI</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomeView
