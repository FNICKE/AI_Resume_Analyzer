import React, { useState } from 'react'

const authStyles = `
  @keyframes auth-spin { to { transform: rotate(360deg); } }
  @keyframes auth-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .auth-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'Inter', sans-serif;
    animation: auth-fadein 0.4s ease;
  }

  /* ============ LEFT PANEL ============ */
  .auth-left {
    background: linear-gradient(145deg, #1e2346 0%, #2d3778 55%, #1a1f4b 100%);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .auth-left-blob1 {
    position: absolute;
    top: -5rem;
    left: -5rem;
    width: 18rem;
    height: 18rem;
    background: rgba(99,102,241,0.09);
    border-radius: 50%;
    pointer-events: none;
  }

  .auth-left-blob2 {
    position: absolute;
    bottom: -4rem;
    right: -4rem;
    width: 15rem;
    height: 15rem;
    background: rgba(139,92,246,0.08);
    border-radius: 50%;
    pointer-events: none;
  }

  .auth-left-logo {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 3.5rem;
    position: relative;
    z-index: 1;
  }

  .auth-left-logo-icon {
    width: 2.25rem;
    height: 2.25rem;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .auth-left-logo span {
    font-weight: 700;
    font-size: 1.05rem;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  .auth-left-content {
    position: relative;
    z-index: 1;
  }

  .auth-left-content h1 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.25;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .auth-left-content h1 span {
    display: block;
    color: #818cf8;
    margin-top: 0.25rem;
  }

  .auth-left-content p {
    color: rgba(255,255,255,0.55);
    font-size: 0.88rem;
    line-height: 1.7;
    max-width: 22rem;
    margin-bottom: 2.5rem;
  }

  .auth-features {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .auth-feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .auth-feature-check {
    width: 1.375rem;
    height: 1.375rem;
    background: rgba(99,102,241,0.2);
    border: 1px solid rgba(99,102,241,0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 0.65rem;
    font-weight: 800;
    color: #818cf8;
  }

  .auth-feature-item span {
    color: rgba(255,255,255,0.72);
    font-size: 0.85rem;
    font-weight: 500;
  }

  /* trust badge */
  .auth-trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2.5rem;
    padding: 0.5rem 0.875rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2rem;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.5);
    font-weight: 500;
  }

  .auth-trust-dot {
    width: 0.4rem;
    height: 0.4rem;
    background: #10b981;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ============ RIGHT PANEL ============ */
  .auth-right {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 2rem;
    overflow-y: auto;
  }

  .auth-form-box {
    width: 100%;
    max-width: 24rem;
  }

  .auth-form-header {
    margin-bottom: 1.75rem;
  }

  .auth-form-header h2 {
    font-size: 1.6rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.02em;
    margin-bottom: 0.375rem;
  }

  .auth-form-header p {
    color: #6b7280;
    font-size: 0.84rem;
  }

  .auth-form-header p span {
    color: #6366f1;
    cursor: pointer;
    font-weight: 600;
  }
  .auth-form-header p span:hover { text-decoration: underline; }

  /* Alerts */
  .auth-alert {
    padding: 0.625rem 0.875rem;
    border-radius: 0.5rem;
    font-size: 0.82rem;
    line-height: 1.5;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .auth-alert.error {
    background: #fee2e2;
    border: 1px solid #fca5a5;
    color: #991b1b;
  }

  .auth-alert.success {
    background: #d1fae5;
    border: 1px solid #6ee7b7;
    color: #065f46;
  }

  /* Form fields */
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .auth-field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .auth-field label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
  }

  .auth-field input {
    width: 100%;
    padding: 0.6rem 0.875rem;
    border: 1.5px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    color: #111827;
    background: #f9fafb;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .auth-field input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
    background: #ffffff;
  }

  .auth-field input::placeholder { color: #9ca3af; }

  /* Submit button */
  .auth-submit-btn {
    width: 100%;
    padding: 0.6875rem;
    background: #6366f1;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    margin-top: 0.25rem;
    box-shadow: 0 0.125rem 0.5rem rgba(99,102,241,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
    letter-spacing: -0.01em;
  }

  .auth-submit-btn:hover:not(:disabled) {
    background: #4f46e5;
    transform: translateY(-1px);
    box-shadow: 0 0.25rem 0.875rem rgba(99,102,241,0.4);
  }

  .auth-submit-btn:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
    transform: none;
  }

  .auth-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: auth-spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  /* Divider */
  .auth-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 1.25rem 0 0;
  }

  .auth-divider hr {
    flex: 1;
    border: none;
    border-top: 1px solid #f3f4f6;
    margin: 0;
  }

  .auth-divider span {
    font-size: 0.72rem;
    color: #9ca3af;
    cursor: pointer;
    white-space: nowrap;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* Connection settings */
  .auth-settings-panel {
    margin-top: 0.875rem;
    padding: 0.875rem;
    background: #f9fafb;
    border: 1px solid #e9ecef;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .auth-settings-panel label {
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 600;
  }

  .auth-settings-panel input {
    width: 100%;
    padding: 0.5rem 0.625rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.78rem;
    font-family: 'Inter', sans-serif;
    color: #111827;
    background: #fff;
    outline: none;
  }

  .auth-settings-panel input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99,102,241,0.1);
  }

  .auth-settings-hint {
    font-size: 0.7rem;
    color: #9ca3af;
    line-height: 1.4;
    margin-top: 0.125rem;
  }

  /* Mobile header shown only on small screens */
  .auth-mobile-header {
    display: none;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 1.75rem;
  }

  .auth-mobile-logo-icon {
    width: 2rem;
    height: 2rem;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ============ RESPONSIVE ============ */

  /* Tablet: shrink left panel */
  @media (max-width: 900px) {
    .auth-left {
      padding: 2rem 2rem;
    }

    .auth-left-logo {
      margin-bottom: 2rem;
    }

    .auth-trust-badge { display: none; }
  }

  /* Mobile: hide left panel, show full-width form */
  @media (max-width: 680px) {
    .auth-page {
      grid-template-columns: 1fr;
      min-height: 100vh;
    }

    /* Hide the entire left branding panel on mobile */
    .auth-left { display: none; }

    .auth-right {
      padding: 0;
      align-items: flex-start;
      min-height: 100vh;
      background: linear-gradient(160deg, #f5f3ff 0%, #ffffff 40%);
    }

    .auth-form-box {
      max-width: 100%;
      padding: 2rem 1.5rem 3rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Show mobile logo header */
    .auth-mobile-header { display: flex; }

    .auth-form-header h2 { font-size: 1.4rem; }
  }

  @media (max-width: 380px) {
    .auth-form-box { padding: 1.5rem 1.25rem 2.5rem; }
    .auth-form-header h2 { font-size: 1.25rem; }
    .auth-submit-btn { font-size: 0.85rem; }
  }
`

function AuthView({ apiUrl, onLoginSuccess, onApiUrlChange }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [localApiUrl, setLocalApiUrl] = useState(apiUrl)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)

    if (isLogin) {
      if (!username.trim() || !password) { setError('Please enter both your credentials'); return }
    } else {
      if (!username.trim() || !email.trim() || !password) { setError('All fields are required'); return }
      if (password.length < 6) { setError('Password must be at least 6 characters long'); return }
      if (password !== confirmPassword) { setError('Passwords do not match'); return }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address'); return }
    }

    try {
      setLoading(true)
      if (isLogin) {
        const res = await fetch(`${localApiUrl}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
        if (!res.ok) {
          const errMsg = await res.text()
          throw new Error(errMsg || 'Authentication failed. Please check your credentials.')
        }
        const userData = await res.json()
        onLoginSuccess(userData)
      } else {
        const res = await fetch(`${localApiUrl}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        })
        if (!res.ok) {
          const errMsg = await res.text()
          throw new Error(errMsg || 'Registration failed. Try a different username or email.')
        }
        setSuccessMsg('Registration successful! Please sign in with your credentials.')
        setIsLogin(true)
        setPassword('')
        setConfirmPassword('')
      }
    } catch (err) {
      console.error(err)
      setError(`${err.message}. (Tip: Try using 127.0.0.1 instead of localhost in Connection Settings)`)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = () => {
    setIsLogin(!isLogin)
    setError(null)
    setSuccessMsg(null)
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="auth-page">
      <style>{authStyles}</style>

      {/* ====== LEFT PANEL — Branding ====== */}
      <div className="auth-left">
        <div className="auth-left-blob1" />
        <div className="auth-left-blob2" />

        {/* Logo */}
        <div className="auth-left-logo">
          <div className="auth-left-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="m9 15 2 2 4-4" />
            </svg>
          </div>
          <span>ResumeAI</span>
        </div>

        {/* Headline */}
        <div className="auth-left-content">
          <h1>
            Land your dream job with
            <span>AI-powered resumes</span>
          </h1>
          <p>
            Scan, score, and optimize your resume against any job description.
            Get 80–90+ ATS scores every time.
          </p>

          {/* Feature list */}
          <div className="auth-features">
            {[
              'Instant ATS keyword scoring',
              'AI bullet point optimizer (Gemini)',
              'ATS-compliant single-column PDF',
              'Scan history & score trends'
            ].map((text, idx) => (
              <div key={idx} className="auth-feature-item">
                <div className="auth-feature-check">✓</div>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="auth-trust-badge">
            <span className="auth-trust-dot" />
            Trusted for ATS optimization
          </div>
        </div>
      </div>

      {/* ====== RIGHT PANEL — Form ====== */}
      <div className="auth-right">
        <div className="auth-form-box">

          {/* Mobile-only logo (left panel hidden on mobile) */}
          <div className="auth-mobile-header">
            <div className="auth-mobile-logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="m9 15 2 2 4-4" />
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>ResumeAI</span>
          </div>

          {/* Header */}
          <div className="auth-form-header">
            <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            <p>
              {isLogin ? "Don't have an account? " : 'Already registered? '}
              <span onClick={handleToggle}>
                {isLogin ? 'Sign up free' : 'Sign in here'}
              </span>
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="auth-alert error">
              <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ef4444' }}>
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="auth-alert success">
              <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10b981' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="auth-username">Username</label>
              <input
                id="auth-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>

            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="auth-email">Email Address</label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  autoComplete="email"
                />
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
            </div>

            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="auth-confirm-password">Confirm Password</label>
                <input
                  id="auth-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
              </div>
            )}

            <button type="submit" disabled={loading} className="auth-submit-btn">
              {loading ? (
                <>
                  <span className="auth-spinner" />
                  Processing...
                </>
              ) : (
                isLogin ? 'Sign In →' : 'Create Account →'
              )}
            </button>
          </form>

          {/* Connection settings */}
          <div className="auth-divider">
            <hr />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }} onClick={() => setShowSettings(s => !s)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              {showSettings ? 'Hide Connection Settings' : 'Connection Settings'}
            </span>
            <hr />
          </div>

          {showSettings && (
            <div className="auth-settings-panel">
              <label htmlFor="auth-api-url">Spring Boot API Base URL</label>
              <input
                id="auth-api-url"
                type="text"
                value={localApiUrl}
                onChange={e => {
                  setLocalApiUrl(e.target.value)
                  onApiUrlChange(e.target.value)
                }}
                placeholder="http://localhost:8080"
              />
              <p className="auth-settings-hint">
                Try 127.0.0.1 instead of localhost if login fails.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthView
