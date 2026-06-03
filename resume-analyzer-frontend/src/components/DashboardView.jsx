import React, { useState, useEffect } from 'react'
import { Icons } from '../App'

function DashboardView({ apiUrl, currentUser, onViewScan, onNavigateToScan }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${apiUrl}/api/resumes/stats?userId=${currentUser.id}`)
      if (!res.ok) {
        throw new Error('Failed to retrieve statistics')
      }
      const data = await res.json()
      setStats(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not connect to the API. Make sure the Spring Boot server is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [apiUrl])

  const getScoreBadgeClass = (score) => {
    if (score >= 75) return 'high'
    if (score >= 50) return 'mid'
    return 'low'
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Analytics Dashboard</h1>
          <p>Get a high-level view of your resume optimizations and missing skill distributions.</p>
        </div>
        <button className="btn btn-primary" onClick={onNavigateToScan}>
          <svg style={{ width: '18px', height: '18px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Scan
        </button>
      </div>

      {loading ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="pulse-spinner" style={{ margin: '0 auto 1.5rem auto', width: '50px', height: '50px' }}></div>
          <p>Analyzing statistics database...</p>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.02)' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Connection Failure</h3>
          <p style={{ color: '#94a3b8' }}>{error}</p>
        </div>
      ) : (
        <>
          {/* Dashboard Summary Statistics Cards */}
          <div className="dashboard-grid">
            <div className="glass-panel stat-card">
              <div className="stat-header">
                <span>Total ATS Scans</span>
                <div className="stat-icon-bg blue">
                  <Icons.FileText />
                </div>
              </div>
              <div className="stat-value">{stats.totalScans}</div>
              <div className="stat-footer">Total resume uploads</div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-header">
                <span>Average ATS Score</span>
                <div className="stat-icon-bg green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
              </div>
              <div className="stat-value">{stats.averageScore}%</div>
              <div className="stat-footer">Target score should be &gt; 75%</div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-header">
                <span>Ready for Placement</span>
                <div className="stat-icon-bg orange">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </div>
              <div className="stat-value">{stats.highScoreCount}</div>
              <div className="stat-footer">Resumes with score &gt;= 75%</div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-header">
                <span>Requires Optimization</span>
                <div className="stat-icon-bg red">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
              </div>
              <div className="stat-value">{stats.lowScoreCount}</div>
              <div className="stat-footer">Resumes with score &lt; 50%</div>
            </div>
          </div>

          {/* Visual Charts and Missing Keywords Breakdown */}
          {stats.totalScans > 0 ? (
            <div className="analytics-section">
              {/* ATS Score Distribution Bar Chart */}
              <div className="glass-panel">
                <h3 style={{ marginBottom: '1.5rem' }}>ATS Score Distribution</h3>
                <div className="chart-container">
                  {/* Low Bar */}
                  <div className="bar-wrapper">
                    <span className="bar-value">{stats.lowScoreCount}</span>
                    <div 
                      className="chart-bar low" 
                      style={{ height: `${stats.totalScans > 0 ? (stats.lowScoreCount / stats.totalScans) * 180 : 0}px` }}
                    ></div>
                    <span className="bar-label">Weak (&lt;50%)</span>
                  </div>

                  {/* Mid Bar */}
                  <div className="bar-wrapper">
                    <span className="bar-value">{stats.midScoreCount}</span>
                    <div 
                      className="chart-bar mid" 
                      style={{ height: `${stats.totalScans > 0 ? (stats.midScoreCount / stats.totalScans) * 180 : 0}px` }}
                    ></div>
                    <span className="bar-label">Moderate (50-74%)</span>
                  </div>

                  {/* High Bar */}
                  <div className="bar-wrapper">
                    <span className="bar-value">{stats.highScoreCount}</span>
                    <div 
                      className="chart-bar high" 
                      style={{ height: `${stats.totalScans > 0 ? (stats.highScoreCount / stats.totalScans) * 180 : 0}px` }}
                    ></div>
                    <span className="bar-label">Strong (&gt;=75%)</span>
                  </div>
                </div>
              </div>

              {/* Missing Skills analytics list */}
              <div className="glass-panel">
                <h3 style={{ marginBottom: '1.5rem' }}>Top Missing Skills</h3>
                {stats.topMissingKeywords.length === 0 ? (
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No keywords identified as missing from scans yet.</p>
                ) : (
                  <div className="keyword-rank-list">
                    {stats.topMissingKeywords.map((item, idx) => (
                      <div className="keyword-rank-item" key={idx}>
                        <span style={{ textTransform: 'capitalize', width: '90px' }}>{item.keyword}</span>
                        <div className="keyword-rank-bar-bg">
                          <div 
                            className="keyword-rank-bar" 
                            style={{ width: `${(item.count / stats.totalScans) * 100}%` }}
                          ></div>
                        </div>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{item.count} scans</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Recent Scans Table */}
          <div className="glass-panel">
            <h3 style={{ marginBottom: '1.25rem' }}>Recent Analyses</h3>
            {stats.recentScans.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: '#64748b' }}>
                <p>No recent scans available. Go to the Scanner tab to upload a file.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Filename</th>
                      <th>Score</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentScans.map((scan) => (
                      <tr key={scan.id}>
                        <td style={{ fontWeight: '600' }}>📄 {scan.resume?.filename || 'Unnamed Resume'}</td>
                        <td>
                          <span className={`score-badge ${getScoreBadgeClass(scan.atsScore)}`}>
                            {scan.atsScore}%
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                            onClick={() => onViewScan(scan)}
                          >
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardView
