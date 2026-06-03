import React, { useState } from 'react'

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

    // Form Validations
    if (isLogin) {
      if (!username.trim() || !password) {
        setError('Please enter both your credentials')
        return
      }
    } else {
      if (!username.trim() || !email.trim() || !password) {
        setError('All fields are required')
        return
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email address')
        return
      }
    }

    try {
      setLoading(true)
      
      if (isLogin) {
        // Handle Login
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
        // Handle Register
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
      setError(`${err.message}. (Tip: If you are offline, check your Connection Settings below and try using 127.0.0.1 instead of localhost)`)
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
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '2.5rem',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4), 0 0 30px rgba(99, 102, 241, 0.1)',
        border: '1px solid rgba(99, 102, 241, 0.15)'
      }}>
        {/* Logo and Header info */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, var(--primary), var(--success))',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
            marginBottom: '1rem'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="m9 15 2 2 4-4" />
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: '800', background: 'linear-gradient(to right, #ffffff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isLogin ? 'Sign in to access your ATS scanner & stats' : 'Sign up to start optimizing your placement score'}
          </p>
        </div>

        {error && (
          <div className="glass-panel" style={{
            borderColor: 'rgba(239,68,68,0.2)',
            background: 'rgba(239,68,68,0.05)',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            color: '#f87171',
            fontSize: '0.88rem',
            borderRadius: '8px',
            lineHeight: '1.4'
          }}>
            ⚠️ {error}
          </div>
        )}

        {successMsg && (
          <div className="glass-panel" style={{
            borderColor: 'rgba(16,185,129,0.2)',
            background: 'rgba(16,185,129,0.05)',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            color: '#34d399',
            fontSize: '0.88rem',
            borderRadius: '8px'
          }}>
            ✓ {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="settings-form" style={{ gap: '1.25rem' }}>
          
          <div className="form-group">
            <label htmlFor="auth-username">Username or Email</label>
            <input
              id="auth-username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="auth-email">Email Address</label>
              <input
                id="auth-email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="auth-confirm-password">Confirm Password</label>
              <input
                id="auth-confirm-password"
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}
            disabled={loading}
          >
            {loading ? (
              <span className="pulse-spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          {isLogin ? (
            <p>
              New here?{' '}
              <span onClick={handleToggle} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>
                Create an account
              </span>
            </p>
          ) : (
            <p>
              Have an account?{' '}
              <span onClick={handleToggle} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>
                Sign In instead
              </span>
            </p>
          )}
        </div>

        {/* Collapsible Connection Settings for Troubleshooting */}
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', textAlign: 'center' }}>
          <span 
            onClick={() => setShowSettings(!showSettings)} 
            style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {showSettings ? 'Hide Connection Settings' : 'Show Connection Settings'}
          </span>
          
          {showSettings && (
            <div style={{ marginTop: '0.75rem', textAlign: 'left' }} className="form-group">
              <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }} htmlFor="auth-api-url">Spring Boot API Base URL</label>
              <input
                id="auth-api-url"
                type="text"
                className="form-input"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', marginTop: '0.25rem' }}
                value={localApiUrl}
                onChange={(e) => {
                  setLocalApiUrl(e.target.value)
                  onApiUrlChange(e.target.value)
                }}
              />
              <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.3' }}>
                If offline, try using 127.0.0.1 instead of localhost to bypass local DNS resolution rules.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthView
