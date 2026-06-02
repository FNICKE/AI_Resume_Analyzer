import React, { useState } from 'react'

function SettingsView({ apiUrl, setApiUrl }) {
  const [inputValue, setInputValue] = useState(apiUrl)
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setApiUrl(inputValue)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Configuration Settings</h1>
          <p>Configure project properties and API connections.</p>
        </div>
      </div>

      <div className="glass-panel">
        <form onSubmit={handleSave} className="settings-form">
          <div className="form-group">
            <label htmlFor="apiUrl">Spring Boot API Base URL</label>
            <input 
              id="apiUrl"
              type="text" 
              className="form-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. http://localhost:8080"
              required
            />
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
              Specifies the server address where the Spring Boot backend REST endpoints are running.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary">
              Save Configuration
            </button>
            {saved && (
              <span style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '500' }}>
                ✓ API configuration updated successfully!
              </span>
            )}
          </div>
        </form>
      </div>

      <div className="glass-panel" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#6366f1' }}>Database Connection (PostgreSQL)</h3>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '1rem' }}>
          The backend connects to PostgreSQL automatically on database startup. Standard connection settings are:
        </p>
        <table className="history-table" style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.75rem' }}>Property</th>
              <th style={{ padding: '0.75rem' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem' }}>Database URL</td>
              <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>jdbc:postgresql://localhost:5432/resume_analyzer</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}>Username / Password</td>
              <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>postgres / postgres</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}>Table DDL Strategy</td>
              <td style={{ padding: '0.75rem', color: '#10b981' }}>Auto Update (ddl-auto=update)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SettingsView
