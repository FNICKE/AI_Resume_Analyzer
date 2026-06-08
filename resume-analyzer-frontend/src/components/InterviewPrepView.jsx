import React, { useState, useEffect } from 'react'

const PenIcon = ({ style }) => (
  <svg style={style || {width: '18px', height: '18px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
)

const TerminalIcon = () => (
  <svg style={{width: '18px', height: '18px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)

const BookIcon = () => (
  <svg style={{width: '18px', height: '18px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const AnalyticsIcon = () => (
  <svg style={{width: '18px', height: '18px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)

const CoffeeIcon = () => (
  <svg style={{width: '32px', height: '32px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
)

const DsaIcon = () => (
  <svg style={{width: '32px', height: '32px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
)

const SqlIcon = () => (
  <svg style={{width: '32px', height: '32px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
)

const OsIcon = () => (
  <svg style={{width: '32px', height: '32px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
)

const GlobeIcon = () => (
  <svg style={{width: '32px', height: '32px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const ClockIcon = () => (
  <svg style={{width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', marginRight: '4px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const RefreshIcon = () => (
  <svg style={{width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
)

const ZapIcon = () => (
  <svg style={{width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', marginRight: '6px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const SearchIcon = () => (
  <svg style={{width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg style={{width: '16px', height: '16px', transition: 'transform 0.2s'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const TargetIcon = ({ style }) => (
  <svg style={style || {width: '24px', height: '24px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const AwardIcon = ({ style }) => (
  <svg style={style || {width: '24px', height: '24px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
  </svg>
)

const RocketIcon = ({ style }) => (
  <svg style={style || {width: '24px', height: '24px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2s-8 7-9 8l-4-4C10 5 17 2 17 2S24 0 22 2ZM13 10a5 5 0 0 1-5 5H4v4L2 21v-4H0v-4h4a5 5 0 0 1 5-5Z" />
  </svg>
)

const BrainIcon = ({ style }) => (
  <svg style={style || {width: '20px', height: '20px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
)

const SpeakerIcon = ({ style }) => (
  <svg style={style || {width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
)

const MicIcon = ({ style }) => (
  <svg style={style || {width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)

const AgentIcon = () => (
  <svg style={{width: '18px', height: '18px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

function InterviewPrepView({ apiUrl, currentUser }) {
  const [activeTab, setActiveTab] = useState('mcq') // 'mcq', 'coding', 'qa', 'performance'

  // Interview state
  const [interviewSession, setInterviewSession] = useState(null)
  const [interviewStack, setInterviewStack] = useState('MERN Stack')
  const [interviewDifficulty, setInterviewDifficulty] = useState('Medium')
  const [interviewMaxQuestions, setInterviewMaxQuestions] = useState(5)
  const [interviewAnswer, setInterviewAnswer] = useState('')
  const [interviewLoading, setInterviewLoading] = useState(false)
  const [interviewHistory, setInterviewHistory] = useState([])
  const [interviewSessionsHistory, setInterviewSessionsHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const [syncingTrends, setSyncingTrends] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')
  const [externalApiUrl, setExternalApiUrl] = useState('')
  const [compilerCode, setCompilerCode] = useState('')
  const [compilerLanguage, setCompilerLanguage] = useState('javascript')
  const [compilerFeedback, setCompilerFeedback] = useState(null)
  const [compilerLoading, setCompilerLoading] = useState(false)
  const chatEndRef = React.useRef(null)

  // Voice state
  const [isListening, setIsListening] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(true)
  const [speechError, setSpeechError] = useState('')
  const recognitionRef = React.useRef(null)

  // Speech input controller
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.')
      return
    }

    if (!recognitionRef.current) {
      const rec = new SpeechRecognition()
      rec.continuous = true
      rec.interimResults = false
      rec.lang = 'en-US'
      
      rec.onstart = () => {
        setIsListening(true)
        setSpeechError('')
      }
      
      rec.onend = () => {
        setIsListening(false)
      }
      
      rec.onerror = (e) => {
        console.error('Speech recognition error:', e.error)
        if (e.error !== 'no-speech') {
          setSpeechError('Microphone error: ' + e.error)
        }
        setIsListening(false)
      }
      
      rec.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript
        setInterviewAnswer(prev => prev + (prev ? ' ' : '') + transcript)
      }

      recognitionRef.current = rec
    }

    try {
      recognitionRef.current.start()
    } catch (e) {
      console.error(e)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const cleanText = text.replace(/[#*`_~]/g, '') // strip markdown
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.rate = 0.95
      utterance.lang = 'en-US'
      window.speechSynthesis.speak(utterance)
    } else {
      console.warn('Speech synthesis not supported.')
    }
  }

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [interviewHistory])

  
  // MCQ state
  const [mcqTopic, setMcqTopic] = useState('')
  const [mcqQuestions, setMcqQuestions] = useState([])
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({}) // questionId -> option
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizResult, setQuizResult] = useState(null)
  const [mcqLoading, setMcqLoading] = useState(false)
  const [quizTimeLeft, setQuizTimeLeft] = useState(0)
  const [quizTimerActive, setQuizTimerActive] = useState(false)

  // Coding state
  const [challenges, setChallenges] = useState([])
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [code, setCode] = useState('')
  const [lang, setLang] = useState('java')
  const [codeSubmitting, setCodeSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
  const [challengesLoading, setChallengesLoading] = useState(false)

  // QA state
  const [qaCategory, setQaCategory] = useState('All')
  const [qaSearch, setQaSearch] = useState('')
  const [qaQuestions, setQaQuestions] = useState([])
  const [expandedQaIds, setExpandedQaIds] = useState(new Set())
  const [qaLoading, setQaLoading] = useState(false)

  // Performance state
  const [stats, setStats] = useState(null)
  const [aiReport, setAiReport] = useState(null)
  const [aiReportLoading, setAiReportLoading] = useState(false)
  const [statsLoading, setStatsLoading] = useState(false)

  // Fetch performance stats when tab is 'performance'
  useEffect(() => {
    if (activeTab === 'performance') {
      fetchPerformanceStats()
    }
  }, [activeTab])

  // Fetch interview session history when tab is 'interview'
  useEffect(() => {
    if (activeTab === 'interview') {
      fetchInterviewHistory()
    }
  }, [activeTab])

  // Fetch Q&As when category changes or tab is 'qa'
  useEffect(() => {
    if (activeTab === 'qa') {
      fetchQaQuestions()
    }
  }, [activeTab, qaCategory])

  // Fetch Coding challenges when tab is 'coding'
  useEffect(() => {
    if (activeTab === 'coding' && challenges.length === 0) {
      fetchChallenges()
    }
  }, [activeTab])

  // MCQ Timer decrement logic
  useEffect(() => {
    let timer = null
    if (quizTimerActive && quizTimeLeft > 0) {
      timer = setInterval(() => {
        setQuizTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (quizTimerActive && quizTimeLeft === 0) {
      handleMcqSubmit()
    }
    return () => clearInterval(timer)
  }, [quizTimerActive, quizTimeLeft])

  // --- API CALLS ---
  const fetchInterviewHistory = async () => {
    setHistoryLoading(true)
    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/interview/history?userId=${currentUser.id}`)
      if (res.ok) {
        const data = await res.json()
        setInterviewSessionsHistory(data)
      }
    } catch (e) {
      console.error('Failed fetching interview history:', e)
    } finally {
      setHistoryLoading(false)
    }
  }

  const isCodingQuestion = (text) => {
    if (!text) return false
    const lower = text.toLowerCase()
    return lower.includes('coding challenge:') || 
           lower.includes('write a function') || 
           lower.includes('write a program') || 
           lower.includes('code example') || 
           lower.includes('write code') ||
           (lower.includes('implement') && (lower.includes('function') || lower.includes('class') || lower.includes('algorithm')))
  }

  const handleCompileCode = async () => {
    if (!compilerCode.trim() || !interviewSession) return
    setCompilerLoading(true)
    setCompilerFeedback(null)
    try {
      const currentQ = interviewSession.currentQuestion || ''
      const res = await fetch(`${apiUrl}/api/interview-prep/compiler/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: compilerCode,
          language: compilerLanguage,
          question: currentQ
        })
      })
      if (res.ok) {
        const data = await res.json()
        setCompilerFeedback(data)
      }
    } catch (e) {
      console.error('Compiler execution failed:', e)
      setCompilerFeedback({
        status: 'CONNECTION_ERROR',
        aiFeedback: '### Network Connection Issue\n\nFailed to establish communication with Spring Boot backend compile engine.'
      })
    } finally {
      setCompilerLoading(false)
    }
  }

  const startMockInterview = async () => {
    setInterviewLoading(true)
    setInterviewOverallFeedback('')
    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/interview/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          techStack: interviewStack,
          difficulty: interviewDifficulty,
          maxQuestions: parseInt(interviewMaxQuestions),
          externalApiUrl: externalApiUrl
        })
      })
      if (res.ok) {
        const data = await res.json()
        setInterviewSession(data)
        const initialHist = data.conversationHistoryJson ? JSON.parse(data.conversationHistoryJson) : []
        setInterviewHistory(initialHist)
        setInterviewAnswer('')
        setCompilerCode('')
        setCompilerFeedback(null)

        // Speak initial greeting + question
        if (autoSpeak) {
          if (initialHist.length > 0 && initialHist[0].content) {
            speakText(initialHist[0].content)
          } else if (data.currentQuestion) {
            speakText(data.currentQuestion)
          }
        }
      }
    } catch (e) {
      console.error('Failed starting mock interview:', e)
    } finally {
      setInterviewLoading(false)
    }
  }

  const submitMockAnswer = async () => {
    if (!interviewSession) return
    
    const isCodingQ = isCodingQuestion(interviewSession.currentQuestion)
    const hasCode = compilerCode.trim() !== ''
    const hasText = interviewAnswer.trim() !== ''

    if (!isCodingQ && !hasText) return
    if (isCodingQ && !hasCode && !hasText) return

    setInterviewLoading(true)

    const userAnsText = isCodingQ && hasCode 
      ? `[SUBMITTED CODE - Language: ${compilerLanguage}]\n\n${compilerCode}\n\n[USER EXPLANATION]\n\n${interviewAnswer || 'No explanation provided.'}`
      : interviewAnswer

    const chatDisplayVal = isCodingQ && hasCode
      ? `Submitted code in ${compilerLanguage}:\n\n\`\`\`${compilerLanguage}\n${compilerCode}\n\`\`\`\n\nExplanation: ${interviewAnswer || 'None'}`
      : interviewAnswer

    setInterviewAnswer('')
    setCompilerCode('')
    setCompilerFeedback(null)

    // Stop recording if listening
    if (isListening) {
      stopListening()
    }
    
    // Stop synthesis if speaking
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    // Optimistically push user answer to history
    setInterviewHistory(prev => [...prev, { role: 'user', content: chatDisplayVal }])

    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/interview/submit-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: interviewSession.id,
          answer: userAnsText,
          externalApiUrl: externalApiUrl
        })
      })
      if (res.ok) {
        const data = await res.json()
        const updatedHist = [
          ...interviewHistory,
          { role: 'user', content: chatDisplayVal },
          {
            role: 'assistant_feedback',
            score: data.feedback.score,
            correctness: data.feedback.correctness,
            correction: data.feedback.correction,
            modelAnswer: data.feedback.modelAnswer
          }
        ]

        if (data.isCompleted) {
          setInterviewSession(prev => ({ ...prev, status: 'COMPLETED' }))
          setInterviewOverallFeedback(data.feedback.overallFeedback)
          updatedHist.push({
            role: 'assistant',
            content: 'Thank you for practicing. Interview is completed! Here is your final summary.',
            overallFeedback: data.feedback.overallFeedback
          })
          fetchInterviewHistory()

          if (autoSpeak) {
            speakText('Thank you for practicing. Interview is completed!')
          }
        } else {
          setInterviewSession(prev => ({ 
            ...prev, 
            currentQuestionIndex: data.questionIndex, 
            currentQuestion: data.nextQuestion 
          }))
          
          updatedHist.push({ role: 'assistant', content: data.nextQuestion, questionIndex: data.questionIndex })

          if (autoSpeak && data.nextQuestion) {
            speakText(data.nextQuestion)
          }
        }
        setInterviewHistory(updatedHist)
      }
    } catch (e) {
      console.error('Failed submitting answer:', e)
    } finally {
      setInterviewLoading(false)
    }
  }

  const syncEmergingTrends = async () => {
    setSyncingTrends(true)
    setSyncMessage('')
    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/questions/sync`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setSyncMessage(`Synced! Added ${data.addedCount} new questions.`)
        fetchQaQuestions()
      } else {
        setSyncMessage('Sync failed.')
      }
    } catch (e) {
      console.error('Failed trend sync:', e)
      setSyncMessage('Connection error.')
    } finally {
      setSyncingTrends(false)
      setTimeout(() => setSyncMessage(''), 4000)
    }
  }

  const [interviewOverallFeedback, setInterviewOverallFeedback] = useState('')

  const fetchPerformanceStats = async () => {

    setStatsLoading(true)
    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/performance?userId=${currentUser.id}`)
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (e) {
      console.error('Failed to fetch stats:', e)
    } finally {
      setStatsLoading(false)
    }
  }

  const fetchQaQuestions = async () => {
    setQaLoading(true)
    try {
      const catParam = qaCategory === 'All' ? '' : qaCategory
      const res = await fetch(`${apiUrl}/api/interview-prep/questions?category=${catParam}`)
      if (res.ok) {
        const data = await res.json()
        setQaQuestions(data)
      }
    } catch (e) {
      console.error('Failed to fetch questions:', e)
    } finally {
      setQaLoading(false)
    }
  }

  const fetchChallenges = async () => {
    setChallengesLoading(true)
    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/coding-challenges`)
      if (res.ok) {
        const data = await res.json()
        setChallenges(data)
        if (data.length > 0) {
          selectChallenge(data[0])
        }
      }
    } catch (e) {
      console.error('Failed to fetch challenges:', e)
    } finally {
      setChallengesLoading(false)
    }
  }

  const selectChallenge = (challenge) => {
    setSelectedChallenge(challenge)
    setCode(challenge.starterCode || `public class Solution {\n    public int[] solve() {\n        // Write code here\n    }\n}`)
    setSubmissionResult(null)
  }

  const startMcqQuiz = async (topicName) => {
    setMcqLoading(true)
    setMcqTopic(topicName)
    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/mcqs?topic=${topicName}&limit=5`)
      if (res.ok) {
        const data = await res.json()
        setMcqQuestions(data)
        setCurrentQuestionIdx(0)
        setSelectedAnswers({})
        setQuizSubmitted(false)
        setQuizResult(null)
        setQuizTimeLeft(300) // 5 minutes
        setQuizTimerActive(true)
      }
    } catch (e) {
      console.error('Error fetching MCQs:', e)
    } finally {
      setMcqLoading(false)
    }
  }

  const handleMcqSelectOption = (questionId, option) => {
    if (quizSubmitted) return
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: option
    }))
  }

  const handleMcqSubmit = async () => {
    setQuizTimerActive(false)
    setMcqLoading(true)
    
    // Prepare submissions list
    const submissions = mcqQuestions.map(q => ({
      questionId: q.id,
      selectedOption: selectedAnswers[q.id] || ''
    }))

    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/mcqs/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          topic: mcqTopic,
          submissions: submissions
        })
      })

      if (res.ok) {
        const data = await res.json()
        setQuizResult(data)
        setQuizSubmitted(true)
        
        // Parse detailsJson to overlay questions with details
        if (data.detailsJson) {
          const detailedSubs = JSON.parse(data.detailsJson)
          // update question explanations and correctness in local state
          const updatedQuestions = mcqQuestions.map(q => {
            const sub = detailedSubs.find(s => s.questionId === q.id)
            if (sub) {
              return {
                ...q,
                correct: sub.correct,
                correctAnswer: sub.correctAnswer,
                explanation: sub.explanation
              }
            }
            return q
          })
          setMcqQuestions(updatedQuestions)
        }
      }
    } catch (e) {
      console.error('Failed to submit MCQ quiz:', e)
    } finally {
      setMcqLoading(false)
    }
  }

  const submitCodingSolution = async () => {
    if (!selectedChallenge) return
    setCodeSubmitting(true)
    setSubmissionResult(null)
    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/coding-challenges/${selectedChallenge.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          code: code,
          language: lang
        })
      })
      if (res.ok) {
        const data = await res.json()
        setSubmissionResult(data)
      }
    } catch (e) {
      console.error('Failed to submit code:', e)
      setSubmissionResult({
        status: 'CONNECTION_ERROR',
        aiFeedback: '### Network Connection Issue\n\nFailed to establish communication with Spring Boot backend.'
      })
    } finally {
      setCodeSubmitting(false)
    }
  }

  const toggleQaExpand = (id) => {
    const updated = new Set(expandedQaIds)
    if (updated.has(id)) {
      updated.delete(id)
    } else {
      updated.add(id)
    }
    setExpandedQaIds(updated)
  }

  const requestAiAudit = async () => {
    setAiReportLoading(true)
    setAiReport(null)
    try {
      const res = await fetch(`${apiUrl}/api/interview-prep/ai-feedback?userId=${currentUser.id}`)
      if (res.ok) {
        const data = await res.json()
        setAiReport(data)
      }
    } catch (e) {
      console.error('Failed to compile report:', e)
    } finally {
      setAiReportLoading(false)
    }
  }

  // Filtered QA
  const filteredQas = qaQuestions.filter(q => {
    const term = qaSearch.toLowerCase()
    return q.question.toLowerCase().includes(term) || q.sampleAnswer.toLowerCase().includes(term)
  })

  // Format countdown timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="interview-prep-container">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-title">
          <h1>Smart Interview Preparation Portal</h1>
          <p>Practice MCQs, solve coding problems, study technical questions, and get AI evaluation insights.</p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="prep-tabs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('mcq')} 
          className={`prep-tab-btn ${activeTab === 'mcq' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <PenIcon /> MCQ Practice
        </button>
        <button 
          onClick={() => setActiveTab('coding')} 
          className={`prep-tab-btn ${activeTab === 'coding' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <TerminalIcon /> Coding Arena
        </button>
        <button 
          onClick={() => setActiveTab('interview')} 
          className={`prep-tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <AgentIcon /> AI Interview Agent
        </button>
        <button 
          onClick={() => setActiveTab('qa')} 
          className={`prep-tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <BookIcon /> Interview Q&A Bank
        </button>
        <button 
          onClick={() => setActiveTab('performance')} 
          className={`prep-tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <AnalyticsIcon /> AI Coach & Analytics
        </button>
      </div>

      {/* --- TAB CONTENT: MCQ PRACTICE --- */}
      {activeTab === 'mcq' && (
        <div className="prep-tab-pane">
          {mcqTopic === '' ? (
            <div className="topic-select-view">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>Choose a Practice Topic</h2>
              <div className="topic-grid">
                {[
                  { name: 'Java', desc: 'Object-Oriented programming, memory models, exceptions, collections.', icon: <CoffeeIcon /> },
                  { name: 'DSA', desc: 'Stacks, Queues, Trees, Binary Search, algorithms complexity.', icon: <DsaIcon /> },
                  { name: 'SQL', desc: 'Select queries, Joins, subqueries, grouping, and aggregations.', icon: <SqlIcon /> },
                  { name: 'OS', desc: 'Threads, deadlocks, virtual memory, paging, CPU scheduling.', icon: <OsIcon /> },
                  { name: 'Web Dev', desc: 'DOM, React hooks, state lifecycle, API connectivity, CSS layouts.', icon: <GlobeIcon /> }
                ].map(topic => (
                  <div key={topic.name} className="topic-card glass-panel" style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} onClick={() => startMcqQuiz(topic.name)}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', marginBottom: '0.75rem', color: '#6366f1' }}>{topic.icon}</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>{topic.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>{topic.desc}</p>
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}>Start Practice</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="quiz-pane">
              {/* Back to select */}
              <button className="btn" style={{ marginBottom: '1rem', background: '#f1f5f9', color: '#334155' }} onClick={() => setMcqTopic('')}>
                ← Back to Topics
              </button>

              {mcqLoading && <div className="loading-spinner">Loading quiz questions...</div>}

              {!mcqLoading && mcqQuestions.length > 0 && (
                <div className="quiz-workspace">
                  {/* Status Bar */}
                  <div className="quiz-status-bar glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0.75rem 1rem' }}>
                    <div style={{ fontWeight: 600, color: '#475569' }}>
                      Topic: <span style={{ color: '#6366f1' }}>{mcqTopic}</span> | Question {currentQuestionIdx + 1} of {mcqQuestions.length}
                    </div>
                    {!quizSubmitted ? (
                      <div className="quiz-timer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: quizTimeLeft < 60 ? '#ef4444' : '#6366f1', fontWeight: 700 }}>
                        <ClockIcon /> Time Left: {formatTime(quizTimeLeft)}
                      </div>
                    ) : (
                      <div style={{ color: '#10b981', fontWeight: 700 }}>
                        Score: {quizResult?.score} / {quizResult?.totalQuestions} ({Math.round((quizResult?.score / quizResult?.totalQuestions) * 100)}%)
                      </div>
                    )}
                  </div>

                  {/* Question Card */}
                  <div className="question-card glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                      {mcqQuestions[currentQuestionIdx].question}
                    </h3>

                    {/* Options list */}
                    <div className="options-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {[
                        { key: 'A', text: mcqQuestions[currentQuestionIdx].optionA },
                        { key: 'B', text: mcqQuestions[currentQuestionIdx].optionB },
                        { key: 'C', text: mcqQuestions[currentQuestionIdx].optionC },
                        { key: 'D', text: mcqQuestions[currentQuestionIdx].optionD }
                      ].map(opt => {
                        const qId = mcqQuestions[currentQuestionIdx].id
                        const isSelected = selectedAnswers[qId] === opt.key
                        const isCorrectAnswer = mcqQuestions[currentQuestionIdx].correctAnswer === opt.key
                        const isCorrectAttempt = mcqQuestions[currentQuestionIdx].correct

                        let cardStyle = {
                          padding: '1rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          background: '#fff',
                          cursor: quizSubmitted ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          transition: 'all 0.2s ease'
                        }

                        if (isSelected && !quizSubmitted) {
                          cardStyle.border = '2px solid #6366f1'
                          cardStyle.background = 'rgba(99, 102, 241, 0.05)'
                        }

                        if (quizSubmitted) {
                          if (isCorrectAnswer) {
                            cardStyle.border = '2px solid #10b981'
                            cardStyle.background = 'rgba(16, 185, 129, 0.08)'
                          } else if (isSelected && !isCorrectAttempt) {
                            cardStyle.border = '2px solid #ef4444'
                            cardStyle.background = 'rgba(239, 68, 68, 0.08)'
                          }
                        }

                        return (
                          <div 
                            key={opt.key}
                            style={cardStyle}
                            onClick={() => handleMcqSelectOption(qId, opt.key)}
                          >
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              border: isSelected ? '2px solid #6366f1' : '1px solid #94a3b8',
                              background: isSelected ? '#6366f1' : 'transparent',
                              color: isSelected ? '#fff' : '#475569',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.85rem'
                            }}>
                              {opt.key}
                            </div>
                            <span style={{ fontSize: '0.95rem', color: '#334155' }}>{opt.text}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Explanations section */}
                    {quizSubmitted && mcqQuestions[currentQuestionIdx].explanation && (
                      <div className="explanation-drawer" style={{ marginTop: '1.5rem', padding: '1rem', borderLeft: '4px solid #6366f1', background: '#f8fafc', borderRadius: '4px' }}>
                        <h4 style={{ fontWeight: 700, color: '#475569', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Explanation:</h4>
                        <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.5' }}>{mcqQuestions[currentQuestionIdx].explanation}</p>
                      </div>
                    )}
                  </div>

                  {/* Navigation controls */}
                  <div className="quiz-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                      className="btn" 
                      style={{ background: '#f1f5f9', color: '#334155' }}
                      disabled={currentQuestionIdx === 0}
                      onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                    >
                      ← Previous
                    </button>

                    {!quizSubmitted ? (
                      <button 
                        className="btn btn-primary"
                        onClick={handleMcqSubmit}
                      >
                        Submit Quiz
                      </button>
                    ) : (
                      <button 
                        className="btn"
                        style={{ background: '#e2e8f0', color: '#1e293b', display: 'inline-flex', alignItems: 'center' }}
                        onClick={() => startMcqQuiz(mcqTopic)}
                      >
                        <RefreshIcon /> Retake Test
                      </button>
                    )}

                    <button 
                      className="btn" 
                      style={{ background: '#f1f5f9', color: '#334155' }}
                      disabled={currentQuestionIdx === mcqQuestions.length - 1}
                      onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- TAB CONTENT: CODING ARENA --- */}
      {activeTab === 'coding' && (
        <div className="prep-tab-pane coding-pane">
          {challengesLoading ? (
            <div className="loading-spinner">Loading coding problems...</div>
          ) : (
            <div className="coding-grid">
              {/* Left Column: Challenge list and detail */}
              <div className="coding-left-panel">
                <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem' }}>
                  <label htmlFor="challenge-select" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Select Problem</label>
                  <select 
                    id="challenge-select"
                    className="form-input" 
                    value={selectedChallenge?.id || ''}
                    onChange={(e) => {
                      const selected = challenges.find(c => c.id === Long.valueOf(e.target.value) || c.id === parseInt(e.target.value))
                      if (selected) selectChallenge(selected)
                    }}
                  >
                    {challenges.map(c => (
                      <option key={c.id} value={c.id}>{c.title} ({c.difficulty})</option>
                    ))}
                  </select>
                </div>

                {selectedChallenge && (
                  <div className="glass-panel challenge-details-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{selectedChallenge.title}</h2>
                      <span className={`difficulty-badge ${selectedChallenge.difficulty.toLowerCase()}`}>
                        {selectedChallenge.difficulty}
                      </span>
                    </div>

                    <div className="challenge-desc" style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {selectedChallenge.description}
                    </div>

                    {selectedChallenge.constraints && (
                      <div>
                        <h4 style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Constraints:</h4>
                        <pre style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                          {selectedChallenge.constraints}
                        </pre>
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <h4 style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Sample Input:</h4>
                        <pre style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                          {selectedChallenge.sampleInput}
                        </pre>
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Sample Output:</h4>
                        <pre style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                          {selectedChallenge.sampleOutput}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Code Editor & Console Output */}
              <div className="coding-right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Editor Header settings */}
                <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Language:</span>
                    <select 
                      value={lang} 
                      onChange={(e) => setLang(e.target.value)} 
                      className="form-input" 
                      style={{ padding: '0.25rem 0.5rem', minWidth: '110px', fontSize: '0.85rem' }}
                    >
                      <option value="java">Java</option>
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                    </select>
                  </div>
                  <button 
                    onClick={submitCodingSolution} 
                    className="btn btn-primary"
                    disabled={codeSubmitting}
                    style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                  >
                    {codeSubmitting ? 'Evaluating Code...' : (
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <ZapIcon /> Submit Code
                      </span>
                    )}
                  </button>
                </div>

                {/* Textarea Code Box */}
                <div className="code-editor-container" style={{ position: 'relative', flexGrow: 1, minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '320px',
                      fontFamily: '"Fira Code", Consolas, Monaco, monospace',
                      fontSize: '0.9rem',
                      padding: '1.25rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      background: '#1e293b',
                      color: '#f8fafc',
                      resize: 'vertical',
                      lineHeight: '1.5',
                      outline: 'none',
                      whiteSpace: 'pre',
                      overflowX: 'auto'
                    }}
                    placeholder="// Paste or write your solution here..."
                  />
                </div>

                {/* Console Output Block */}
                <div className="console-output-box glass-panel" style={{ padding: '1.25rem', flexGrow: 0 }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem' }}>Console Output</h3>
                  
                  {codeSubmitting && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6366f1', fontSize: '0.9rem' }}>
                      <span className="spinner-mini"></span>
                      AI Tutor is executing and auditing your submission...
                    </div>
                  )}

                  {!codeSubmitting && !submissionResult && (
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic' }}>
                      No submission active. Click "Submit Code" to test and get evaluation report.
                    </div>
                  )}

                  {!codeSubmitting && submissionResult && (
                    <div>
                      {/* Status header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Run Status:</span>
                        <span style={{
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: submissionResult.status === 'PASSED' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                          color: submissionResult.status === 'PASSED' ? '#10b981' : '#ef4444'
                        }}>
                          {submissionResult.status}
                        </span>
                      </div>

                      {/* AI Review Markdown */}
                      <div className="markdown-feedback" style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.6', background: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0', overflowY: 'auto', maxHeight: '250px' }}>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{submissionResult.aiFeedback}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB CONTENT: INTERVIEW Q&A BANK --- */}
      {activeTab === 'qa' && (
        <div className="prep-tab-pane">
          {/* Filter Toolbar */}
          <div className="qa-toolbar glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                {['All', 'Java', 'Spring Boot', 'Node.js', 'MERN Stack', 'SQL', 'OS', 'Python', 'C++', 'System Design'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setQaCategory(cat)}
                    className={`pill-btn ${qaCategory === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button
                onClick={syncEmergingTrends}
                disabled={syncingTrends}
                className="pill-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', border: '1px dashed var(--primary)', color: 'var(--primary)', background: '#fff' }}
              >
                <RefreshIcon /> {syncingTrends ? 'Syncing...' : 'Sync Tech Trends'}
              </button>
              {syncMessage && <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>{syncMessage}</span>}
            </div>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
              <input
                type="text"
                value={qaSearch}
                onChange={(e) => setQaSearch(e.target.value)}
                placeholder="Search question bank..."
                className="form-input"
                style={{ paddingRight: '2rem' }}
              />
              <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, display: 'inline-flex', alignItems: 'center' }}>
                <SearchIcon />
              </span>
            </div>
          </div>

          {/* QA list */}
          {qaLoading ? (
            <div className="loading-spinner">Loading interview question bank...</div>
          ) : filteredQas.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
              No interview questions found matching the criteria.
            </div>
          ) : (
            <div className="qa-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredQas.map(qa => {
                const isExpanded = expandedQaIds.has(qa.id)
                return (
                  <div key={qa.id} className="qa-item-card glass-panel" style={{ overflow: 'hidden', transition: 'all 0.2s ease' }}>
                    <div 
                      onClick={() => toggleQaExpand(qa.id)}
                      style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', gap: '1rem' }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', fontWeight: 600 }}>{qa.category}</span>
                          <span className={`difficulty-badge ${qa.difficulty.toLowerCase()}`} style={{ scale: '0.85' }}>{qa.difficulty}</span>
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b' }}>{qa.question}</h3>
                      </div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', color: '#64748b', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)' }}>
                        <ChevronRightIcon />
                      </span>
                    </div>

                    {isExpanded && (
                      <div style={{ padding: '1.25rem', background: '#fafafb', borderTop: '1px solid #f1f5f9', animation: 'auth-fadein 0.2s ease' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Suggested Answer Guideline:</h4>
                        <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                          {qa.sampleAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* --- TAB CONTENT: AI COACH & PERFORMANCE --- */}
      {activeTab === 'performance' && (
        <div className="prep-tab-pane">
          {statsLoading ? (
            <div className="loading-spinner">Loading performance database...</div>
          ) : stats ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Summary Widgets Grid */}
              <div className="stats-dashboard-grid">
                <div className="glass-panel stat-item-card" style={{ padding: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: '#64748b', marginBottom: '0.5rem' }}><PenIcon style={{width: '24px', height: '24px'}} /></div>
                  <h4 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>MCQ Tests Completed</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats.totalMcqQuizzes}</div>
                </div>

                <div className="glass-panel stat-item-card" style={{ padding: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: '#6366f1', marginBottom: '0.5rem' }}><TargetIcon style={{width: '24px', height: '24px'}} /></div>
                  <h4 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Average Quiz Score</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6366f1' }}>{stats.averageMcqScore}%</div>
                </div>

                <div className="glass-panel stat-item-card" style={{ padding: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: '#10b981', marginBottom: '0.5rem' }}><AwardIcon style={{width: '24px', height: '24px'}} /></div>
                  <h4 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Coding Challenges Solved</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>{stats.solvedCodingChallenges}</div>
                </div>

                <div className="glass-panel stat-item-card" style={{ padding: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: '#64748b', marginBottom: '0.5rem' }}><RocketIcon style={{width: '24px', height: '24px'}} /></div>
                  <h4 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Total Code Submissions</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats.totalCodingSubmissions}</div>
                </div>
              </div>

              {/* Lower Section Split: AI report and Recent Activity log */}
              <div className="performance-split-grid">
                {/* Left side: AI Auditor report */}
                <div className="ai-audit-column" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BrainIcon style={{width: '20px', height: '20px', color: '#6366f1'}} /> Personalized AI Coaching Audit
                      </h3>
                      <button 
                        onClick={requestAiAudit} 
                        className="btn btn-primary"
                        disabled={aiReportLoading}
                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                      >
                        {aiReportLoading ? 'Auditing History...' : 'Generate AI Report'}
                      </button>
                    </div>

                    {aiReportLoading && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, padding: '2rem', gap: '1rem' }}>
                        <span className="spinner-mini" style={{ width: '30px', height: '30px' }}></span>
                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Gemini is analyzing your quiz logs and submissions...</span>
                      </div>
                    )}

                    {!aiReportLoading && !aiReport && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, padding: '2rem', textAlign: 'center', border: '1px dashed #cbd5e1', borderRadius: '6px' }}>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                          Generate a specialized AI audit of your preparation. Gemini will review your stats, identify your core strengths and weaknesses, and prescribe study goals.
                        </p>
                        <button className="btn" style={{ background: '#f1f5f9', color: '#1e293b' }} onClick={requestAiAudit}>Compile Report</button>
                      </div>
                    )}

                    {!aiReportLoading && aiReport && (
                      <div className="ai-report-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'auth-fadein 0.3s ease' }}>
                        <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '6px', borderLeft: '4px solid #6366f1' }}>
                          <h4 style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.25rem' }}>Coaching Summary</h4>
                          <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>{aiReport.summary}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <h4 style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#10b981', marginBottom: '0.5rem' }}>Key Strengths</h4>
                            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              {aiReport.strengths?.map((str, idx) => (
                                <li key={idx} style={{ listStyleType: 'disc' }}>{str}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#e11d48', marginBottom: '0.5rem' }}>Identified Gaps</h4>
                            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              {aiReport.weaknesses?.map((wk, idx) => (
                                <li key={idx} style={{ listStyleType: 'disc' }}>{wk}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                          <h4 style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#d97706', marginBottom: '0.5rem' }}>Recommended Actions</h4>
                          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {aiReport.recommendations?.map((rec, idx) => (
                              <li key={idx} style={{ listStyleType: 'decimal' }}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Recent Activity timeline log */}
                <div className="activity-column">
                  <div className="glass-panel" style={{ padding: '1.5rem', height: '100%' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.25rem' }}>Recent Preparation Log</h3>
                    
                    {stats.recentActivity?.length === 0 ? (
                      <div style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>
                        No quiz or coding attempts registered yet. Try completing some MCQs!
                      </div>
                    ) : (
                      <div className="activity-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stats.recentActivity?.map((act, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                            <div style={{
                              padding: '0.3rem 0.6rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: act.type === 'MCQ' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                              color: act.type === 'MCQ' ? '#6366f1' : '#10b981',
                              minWidth: '55px',
                              textAlign: 'center'
                            }}>
                              {act.type}
                            </div>
                            <div style={{ flexGrow: 1 }}>
                              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>{act.title}</h4>
                              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{act.detail}</p>
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textAlign: 'right', whiteSpace: 'nowrap' }}>
                              {new Date(act.date).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>Unable to load performance metrics.</div>
          )}
        </div>
      )}

      {/* --- TAB CONTENT: AI INTERVIEW AGENT --- */}
      {activeTab === 'interview' && (
        <div className="prep-tab-pane">
          {interviewSession === null ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="mobile-single-col">
              {/* Left Column: Start Interview Form */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginBottom: '1.25rem' }}>Setup Your Mock Interview</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Target Job Role</label>
                    <select 
                      className="form-input" 
                      value={interviewStack} 
                      onChange={(e) => setInterviewStack(e.target.value)}
                    >
                      <option value="MERN Stack">Fullstack Developer (MERN Stack)</option>
                      <option value="Node.js">Backend Developer (Node.js)</option>
                      <option value="Java & Spring Boot">Java Developer (Spring Boot)</option>
                      <option value="Python">Python Developer (Django / FastAPI)</option>
                      <option value="C++">Systems Engineer (C++ & Operating Systems)</option>
                      <option value="SQL & Databases">Database Engineer (SQL & Databases)</option>
                      <option value="System Design">Solutions Architect (System Design)</option>
                      <option value="Operating Systems">Infrastructure Engineer (OS & Networking)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Difficulty Level</label>
                    <select 
                      className="form-input" 
                      value={interviewDifficulty} 
                      onChange={(e) => setInterviewDifficulty(e.target.value)}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium (Recommended)</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Number of Questions</label>
                    <select 
                      className="form-input" 
                      value={interviewMaxQuestions} 
                      onChange={(e) => setInterviewMaxQuestions(parseInt(e.target.value))}
                    >
                      <option value="3">3 Questions (Quick Practice)</option>
                      <option value="5">5 Questions (Standard)</option>
                      <option value="10">10 Questions (Complete Test)</option>
                      <option value="15">15 Questions (10 Theory + 5 Coding)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Custom Questions API URL (Optional)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. https://api.myplatform.com/questions" 
                      value={externalApiUrl} 
                      onChange={(e) => setExternalApiUrl(e.target.value)} 
                    />
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem', display: 'block' }}>If provided, questions will be fetched from this endpoint.</span>
                  </div>
                </div>

                <button 
                  onClick={startMockInterview} 
                  disabled={interviewLoading}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
                >
                  {interviewLoading ? 'Initializing AI Agent...' : 'Start Interview Session'}
                </button>
              </div>

              {/* Right Column: History list */}
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>Past Interview Sessions</h2>
                
                {historyLoading ? (
                  <div className="loading-spinner">Loading past sessions...</div>
                ) : interviewSessionsHistory.length === 0 ? (
                  <div style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'center', padding: '2rem', border: '1px dashed #cbd5e1', borderRadius: '6px' }}>
                    No mock interviews completed yet. Setup your configuration and start.
                  </div>
                ) : (
                  <div className="session-history-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '350px' }}>
                    {interviewSessionsHistory.map(session => (
                      <div 
                        key={session.id} 
                        className="session-history-item"
                        onClick={() => {
                          setInterviewSession(session)
                          setInterviewHistory(JSON.parse(session.conversationHistoryJson))
                          if (session.status === 'COMPLETED') {
                            const parsedHistory = JSON.parse(session.conversationHistoryJson)
                            const lastMsg = parsedHistory[parsedHistory.length - 1]
                            setInterviewOverallFeedback(lastMsg?.overallFeedback || '')
                          }
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>{session.techStack}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            Difficulty: {session.difficulty} | Questions: {session.maxQuestions}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className={`badge ${session.status === 'COMPLETED' ? 'badge-success' : 'badge-warning'}`}>
                            {session.status}
                          </span>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                            {new Date(session.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Active Chat Interface */
            <div style={{ display: 'flex', gap: '1.5rem', width: '100%', alignItems: 'stretch' }} className="mobile-single-col">
              <div className="chat-container" style={{ flex: '1', minWidth: '320px', display: 'flex', flexDirection: 'column' }}>
                {/* Chat Header */}
                <div className="chat-header">
                  <div>
                    <span style={{ fontWeight: 700, color: '#1e293b', marginRight: '0.5rem' }}>{interviewSession.techStack}</span>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.4rem', background: '#cbd5e1', borderRadius: '4px', color: '#334155', fontWeight: 600 }}>{interviewSession.difficulty}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {interviewSession.status === 'ACTIVE' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginRight: '0.5rem' }}>
                        <label htmlFor="auto-speak-toggle" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <SpeakerIcon style={{ width: '14px', height: '14px', color: autoSpeak ? '#6366f1' : '#64748b' }} /> Auto-Speak
                        </label>
                        <input 
                          id="auto-speak-toggle"
                          type="checkbox" 
                          checked={autoSpeak} 
                          onChange={(e) => setAutoSpeak(e.target.checked)} 
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    )}
                    {interviewSession.status === 'ACTIVE' && (
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6366f1' }}>
                        Question {interviewSession.currentQuestionIndex + 1} of {interviewSession.maxQuestions}
                      </span>
                    )}
                    <button 
                      onClick={() => {
                        setInterviewSession(null)
                        setInterviewHistory([])
                        setInterviewOverallFeedback('')
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel()
                        }
                        fetchInterviewHistory()
                      }} 
                      className="btn" 
                      style={{ background: '#f1f5f9', color: '#334155', padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}
                    >
                      Close Session
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages-area">
                  {interviewHistory.map((msg, index) => {
                    if (msg.role === 'assistant') {
                      return (
                        <div key={index} className="chat-bubble assistant" style={{ position: 'relative', paddingRight: '2.5rem' }}>
                          <button 
                            onClick={() => speakText(msg.content)} 
                            className="pill-btn" 
                            style={{ position: 'absolute', right: '0.5rem', top: '0.5rem', padding: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1' }}
                            title="Speak Question"
                          >
                            <SpeakerIcon style={{ width: '12px', height: '12px', color: '#6366f1' }} />
                          </button>
                          <strong>AI Interviewer:</strong>
                          <p style={{ marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                        </div>
                      )
                    } else if (msg.role === 'user') {
                      return (
                        <div key={index} className="chat-bubble user">
                          <strong>You:</strong>
                          <p style={{ marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                        </div>
                      )
                    } else if (msg.role === 'assistant_feedback') {
                      return (
                        <div key={index} className="chat-bubble feedback">
                          <div className="feedback-score-row">
                            <span style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem' }}>AI Agent Audit Correction</span>
                            <span className={`feedback-correctness ${msg.correctness?.toLowerCase().includes('partially') ? 'partially' : msg.correctness?.toLowerCase().includes('incorrect') ? 'incorrect' : 'correct'}`}>
                              {msg.correctness}
                            </span>
                            <span className="feedback-score">Score: {msg.score}/100</span>
                          </div>
                          <div>
                            <h4 style={{ fontWeight: 700, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Correction / Critique:</h4>
                            <p style={{ color: '#334155', whiteSpace: 'pre-wrap' }}>{msg.correction}</p>
                          </div>
                          {msg.modelAnswer && (
                            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
                              <h4 style={{ fontWeight: 700, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Suggested Answer Guideline:</h4>
                              <p style={{ color: '#64748b', fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>{msg.modelAnswer}</p>
                            </div>
                          )}
                        </div>
                      )
                    }
                    return null;
                  })}

                  {/* Recap report */}
                  {interviewSession.status === 'COMPLETED' && interviewOverallFeedback && (
                    <div className="recap-card" style={{ marginTop: '1rem', borderLeft: '4px solid #10b981' }}>
                      <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Final Interview Performance Report</h3>
                      <div className="markdown-feedback" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.9rem', color: '#334155' }}>
                        {interviewOverallFeedback}
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                {interviewSession.status === 'ACTIVE' && (
                  <div className="chat-input-area" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {speechError && (
                      <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 600, width: '100%' }}>
                        {speechError}
                      </div>
                    )}
                    <div style={{ display: 'flex', width: '100%', gap: '0.75rem', alignItems: 'flex-end' }}>
                      <textarea
                        className="chat-textarea"
                        placeholder={isListening ? "Listening... Speak your answer now..." : "Type or speak your answer in detail here..."}
                        value={interviewAnswer}
                        disabled={interviewLoading}
                        onChange={(e) => setInterviewAnswer(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            submitMockAnswer()
                          }
                        }}
                      />
                      
                      <button
                        onClick={isListening ? stopListening : startListening}
                        disabled={interviewLoading}
                        className="btn"
                        style={{
                          height: '3.125rem',
                          width: '3.125rem',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isListening ? '#ef4444' : '#f1f5f9',
                          color: isListening ? '#ffffff' : '#475569',
                          border: isListening ? 'none' : '1px solid #cbd5e1',
                          borderRadius: 'var(--radius)',
                          animation: isListening ? 'pulse-glow 1.5s infinite ease-in-out' : 'none'
                        }}
                        title={isListening ? "Stop Listening" : "Speak Answer (Voice Input)"}
                      >
                        <MicIcon style={{ width: '20px', height: '20px' }} />
                      </button>

                      <button 
                        onClick={submitMockAnswer} 
                        disabled={interviewLoading || (!interviewAnswer.trim() && (!isCodingQuestion(interviewSession.currentQuestion) || !compilerCode.trim()))} 
                        className="btn btn-primary chat-send-btn"
                      >
                        {interviewLoading ? 'Evaluating...' : 'Submit Answer'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Code Editor & Compiler (Only shown for coding questions during ACTIVE sessions) */}
              {interviewSession.status === 'ACTIVE' && isCodingQuestion(interviewSession.currentQuestion) && (
                <div className="glass-panel" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem', minWidth: '320px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>Code Compiler Sandbox</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Language:</span>
                      <select 
                        value={compilerLanguage} 
                        onChange={(e) => setCompilerLanguage(e.target.value)} 
                        className="form-input" 
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Write Code Solution:</label>
                    <textarea
                      value={compilerCode}
                      onChange={(e) => setCompilerCode(e.target.value)}
                      style={{
                        width: '100%',
                        height: '250px',
                        fontFamily: '"Fira Code", Consolas, Monaco, monospace',
                        fontSize: '0.85rem',
                        padding: '1rem',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        background: '#1e293b',
                        color: '#f8fafc',
                        outline: 'none',
                        resize: 'vertical',
                        whiteSpace: 'pre'
                      }}
                      placeholder="// Type your code solution here..."
                    />
                  </div>

                  <button 
                    onClick={handleCompileCode} 
                    className="btn btn-primary"
                    disabled={compilerLoading || !compilerCode.trim()}
                    style={{ width: '100%', padding: '0.6rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                  >
                    {compilerLoading ? 'Compiling & Running...' : (
                      <>
                        <ZapIcon /> Run Code compiler
                      </>
                    )}
                  </button>

                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.75rem', minHeight: '100px' }}>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Console Output</h4>
                    {compilerLoading && (
                      <div style={{ fontSize: '0.85rem', color: '#6366f1' }}>AI Tutor is compiling and executing...</div>
                    )}
                    {!compilerLoading && !compilerFeedback && (
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>No output. Click "Run Code compiler" to execute.</div>
                    )}
                    {!compilerLoading && compilerFeedback && (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Status:</span>
                          <span style={{
                            padding: '0.1rem 0.4rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: compilerFeedback.status === 'PASSED' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                            color: compilerFeedback.status === 'PASSED' ? '#10b981' : '#ef4444'
                          }}>
                            {compilerFeedback.status}
                          </span>
                        </div>
                        <div className="markdown-feedback" style={{ fontSize: '0.8rem', color: '#334155', whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto' }}>
                          {compilerFeedback.aiFeedback}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InterviewPrepView
