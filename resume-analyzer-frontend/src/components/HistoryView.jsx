import React, { useState, useEffect } from 'react'
import { Icons } from '../App'

function HistoryView({ apiUrl, currentUser, onViewScan }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${apiUrl}/api/resumes/history?userId=${currentUser.id}`)
      if (!res.ok) {
        throw new Error('Failed to retrieve history logs')
      }
      const data = await res.json()
      setHistory(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not connect to the API. Make sure the Spring Boot server is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [apiUrl])

  const handleDelete = async (id, e) => {
    e.stopPropagation() // Prevent row click
    if (!window.confirm('Are you sure you want to delete this scan history record?')) {
      return
    }

    try {
      const res = await fetch(`${apiUrl}/api/resumes/history/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) {
        throw new Error('Failed to delete history record')
      }
      // Remove from list
      setHistory(history.filter(item => item.id !== id))
    } catch (err) {
      alert('Error deleting item: ' + err.message)
    }
  }

  const getScoreClass = (score) => {
    if (score >= 75) return 'high'
    if (score >= 50) return 'mid'
    return 'low'
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Scan History</h1>
          <p>Browse and review your past resume optimizations and ATS feedback logs.</p>
        </div>
        <button className="btn btn-secondary" onClick={fetchHistory} disabled={loading}>
          Refresh List
        </button>
      </div>

      {loading ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="pulse-spinner" style={{ margin: '0 auto 1.5rem auto', width: '50px', height: '50px' }}></div>
          <p>Retrieving database records...</p>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.02)' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Connection Failure</h3>
          <p style={{ color: '#94a3b8' }}>{error}</p>
        </div>
      ) : history.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', width: '64px', height: '64px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#64748b' }}>
            <Icons.FileText />
          </div>
          <h3>No Scans Found</h3>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Upload your first resume in the ATS Scanner tab to start compiling database records.</p>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
          <table className="history-table">
            <thead>
              <tr>
                <th>Scan Date</th>
                <th>File Name</th>
                <th>Job Description Target</th>
                <th>ATS Score</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => onViewScan(item)}>
                  <td>{formatDate(item.analyzedAt)}</td>
                  <td style={{ fontWeight: '600' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#6366f1', display: 'inline-flex', alignItems: 'center' }}>
                        <svg style={{ width: '16px', height: '16px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </span>
                      {item.resume?.filename || 'Unnamed Resume'}
                    </div>
                  </td>
                  <td style={{ color: '#94a3b8', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.jobDescriptionText || 'N/A'}
                  </td>
                  <td>
                    <span className={`score-badge ${getScoreClass(item.atsScore)}`}>
                      {item.atsScore}%
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                        onClick={() => onViewScan(item)}
                      >
                        Inspect
                      </button>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '0.4rem 0.5rem' }}
                        onClick={(e) => handleDelete(item.id, e)}
                        title="Delete record"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default HistoryView
