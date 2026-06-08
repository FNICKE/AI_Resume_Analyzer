import React, { useState, useEffect } from 'react'
import DashboardView from './components/DashboardView'
import ScannerView from './components/ScannerView'
import HistoryView from './components/HistoryView'
import SettingsView from './components/SettingsView'
import AuthView from './components/AuthView'
import BuilderView from './components/BuilderView'
import HomeView from './components/HomeView'
import InterviewPrepView from './components/InterviewPrepView'

export const Icons = {
  Home: () => (
    <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Dashboard: () => (
    <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </svg>
  ),
  Builder: () => (
    <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  Scanner: () => (
    <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m8 17 4-4 4 4" />
    </svg>
  ),
  History: () => (
    <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),
  Settings: () => (
    <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  FileText: () => (
    <svg style={{width: '20px', height: '20px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  Trash: () => (
    <svg style={{width: '18px', height: '18px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  Search: () => (
    <svg style={{width: '20px', height: '20px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Interview: () => (
    <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10" />
      <path d="M6 10h10" />
      <path d="M6 14h10" />
    </svg>
  )
}

function App() {
  const [activeView, setActiveView] = useState(() => {
    const saved = localStorage.getItem('resume_analyzer_user')
    return saved ? 'dashboard' : 'home'
  })
  const [selectedScan, setSelectedScan] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Set up API Base URL with fallback (127.0.0.1 bypasses DNS errors when offline)
  const [apiUrl, setApiUrl] = useState(() => {
    const stored = localStorage.getItem('resume_analyzer_api_url') || 'http://127.0.0.1:8080';
    return stored.replace('localhost', '127.0.0.1');
  });

  // Load user session from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('resume_analyzer_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    localStorage.setItem('resume_analyzer_api_url', apiUrl)
  }, [apiUrl])

  const navigate = (view, extra = {}) => {
    setActiveView(view)
    if (extra.clearScan) setSelectedScan(null)
    setSidebarOpen(false) // close sidebar on mobile nav click
  }

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('resume_analyzer_user', JSON.stringify(userData))
    setCurrentUser(userData)
    setActiveView('dashboard')
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('resume_analyzer_user')
      setCurrentUser(null)
      setSelectedScan(null)
      setActiveView('home')
    }
  }

  const viewScanResult = (scan) => {
    setSelectedScan(scan)
    setActiveView('scanner')
  }

  // Intercept view rendering if not authenticated
  if (!currentUser) {
    if (activeView === 'home') {
      return (
        <HomeView 
          onGetStarted={() => setActiveView('auth')} 
          isLoggedIn={false} 
          onGoToDashboard={() => setActiveView('dashboard')} 
        />
      )
    }

    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <AuthView apiUrl={apiUrl} onLoginSuccess={handleLoginSuccess} onApiUrlChange={setApiUrl} />
      </div>
    )
  }

  return (
    <div className="app-container">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="m9 15 2 2 4-4" />
            </svg>
          </div>
          <div className="logo-text">
            RESUMEAI
            <span>ATS Parser & Optimizer</span>
          </div>
        </div>

        <nav>
          <div className="sidebar-section-label">Main Menu</div>
          <ul className="nav-links">
            <li>
              <div 
                className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
                onClick={() => navigate('dashboard', { clearScan: true })}
              >
                <Icons.Dashboard />
                Dashboard
              </div>
            </li>
            <li>
              <div 
                className={`nav-item ${activeView === 'scanner' ? 'active' : ''}`}
                onClick={() => navigate('scanner')}
              >
                <Icons.Scanner />
                ATS Scanner
              </div>
            </li>
            <li>
              <div 
                className={`nav-item ${activeView === 'builder' ? 'active' : ''}`}
                onClick={() => navigate('builder', { clearScan: true })}
              >
                <Icons.Builder />
                Resume Builder
              </div>
            </li>
            <li>
              <div 
                className={`nav-item ${activeView === 'prep' ? 'active' : ''}`}
                onClick={() => navigate('prep', { clearScan: true })}
              >
                <Icons.Interview />
                Interview Prep
              </div>
            </li>
          </ul>
          <div className="sidebar-section-label" style={{ marginTop: '8px' }}>Reports</div>
          <ul className="nav-links">
            <li>
              <div 
                className={`nav-item ${activeView === 'history' ? 'active' : ''}`}
                onClick={() => navigate('history', { clearScan: true })}
              >
                <Icons.History />
                Scan History
              </div>
            </li>
            <li>
              <div 
                className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
                onClick={() => navigate('settings', { clearScan: true })}
              >
                <Icons.Settings />
                Settings
              </div>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer displaying authenticated user */}
        <div className="sidebar-footer" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="user-avatar">{currentUser.username.substring(0, 2).toUpperCase()}</div>
            <div className="user-info">
              <h4 style={{ textTransform: 'capitalize' }}>{currentUser.username}</h4>
              <p>Logged In</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#ef4444', 
              cursor: 'pointer', 
              padding: '0.25rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Sign Out"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Hamburger for mobile */}
            <button
              className="navbar-hamburger"
              onClick={() => setSidebarOpen(prev => !prev)}
              aria-label="Toggle Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>
              {activeView === 'dashboard' && 'Analytics Dashboard'}
              {activeView === 'scanner' && 'ATS Scanner'}
              {activeView === 'builder' && 'Resume Builder'}
              {activeView === 'prep' && 'Interview Prep'}
              {activeView === 'history' && 'Scan History'}
              {activeView === 'settings' && 'Settings'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('scanner')}
              className="btn btn-primary"
              style={{ padding: '0.4375rem 0.875rem', fontSize: '0.8rem' }}
            >
              + New Scan
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.75rem', borderLeft: '1px solid #e9ecef' }}>
              <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {currentUser.username.substring(0, 2).toUpperCase()}
              </div>
              <span className="navbar-username" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>{currentUser.username}</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {activeView === 'dashboard' && (
            <DashboardView 
              apiUrl={apiUrl} 
              currentUser={currentUser}
              onViewScan={viewScanResult} 
              onNavigateToScan={() => setActiveView('scanner')}
            />
          )}
          
          {activeView === 'scanner' && (
            <ScannerView 
              apiUrl={apiUrl} 
              currentUser={currentUser}
              initialScan={selectedScan} 
              clearInitialScan={() => setSelectedScan(null)}
            />
          )}
          
          {activeView === 'history' && (
            <HistoryView 
              apiUrl={apiUrl} 
              currentUser={currentUser}
              onViewScan={viewScanResult} 
            />
          )}
          
          {activeView === 'settings' && (
            <SettingsView 
              apiUrl={apiUrl} 
              setApiUrl={setApiUrl} 
            />
          )}

          {activeView === 'builder' && (
            <BuilderView 
              apiUrl={apiUrl} 
              currentUser={currentUser}
            />
          )}

          {activeView === 'prep' && (
            <InterviewPrepView 
              apiUrl={apiUrl} 
              currentUser={currentUser}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
