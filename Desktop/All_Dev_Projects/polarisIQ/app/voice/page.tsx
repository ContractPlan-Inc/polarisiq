'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useVoiceInterface, cleanTextForSpeech } from '@/lib/hooks/useVoiceInterface'
import LiveMeetingMode from '@/app/components/LiveMeetingMode'
import { SALES_PITCHES, findRelevantPitch, findSupportingFact, findObjectionHandler, type SalesPitch } from '@/lib/salesPitches'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'interjection'
  content: string
  timestamp: Date
  expert?: {
    name: string
    avatar: string
  }
  spokenText?: string
}

export default function VoiceAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [liveMeetingEnabled, setLiveMeetingEnabled] = useState(false)
  const [selectedPitch, setSelectedPitch] = useState<SalesPitch | null>(null)
  const [showPitchSelector, setShowPitchSelector] = useState(false)
  const [currentExpert, setCurrentExpert] = useState({
    name: 'Chef Antonio Rodriguez',
    avatar: '👨‍🍳'
  })

  const voice = useVoiceInterface({
    continuous: false,
    interimResults: true,
    language: 'en-US',
    autoSpeak: true,
    voiceRate: 1.1,
    voicePitch: 1.0,
    voiceVolume: 0.9,
  })

  // Welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: 'Welcome to PolarisIQ Voice Assistant for Saval Foodservice. I\'m ready to support your sales call. Tap the microphone to ask questions, or enable Live Meeting Mode for real-time assistance.',
      timestamp: new Date(),
      expert: currentExpert
    }
    setMessages([welcomeMessage])

    // Speak welcome
    const cleanText = cleanTextForSpeech(welcomeMessage.content)
    voice.speak(cleanText, false)
  }, [])

  // Handle transcript from live meeting mode
  const handleLiveMeetingTranscript = (transcript: string) => {
    // Only log significant transcripts (not just interim results)
    if (transcript.length > 20) {
      const message: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: transcript,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, message])
    }
  }

  // Handle interjection from live meeting mode
  const handleLiveMeetingInterjection = async (topic: string) => {
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: topic,
          context: selectedPitch ? `Sales pitch: ${selectedPitch.name}` : '',
          history: messages.slice(-5),
          meetingMode: true,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'interjection',
          content: data.response,
          timestamp: new Date(),
          expert: data.expert
        }

        setMessages(prev => [...prev, assistantMessage])

        // Speak the interjection
        const cleanText = cleanTextForSpeech(data.response)
        voice.speak(cleanText, true)
      }
    } catch (error) {
      console.error('Interjection error:', error)
    }
  }

  // Handle manual voice query
  const handleVoiceQuery = async () => {
    if (voice.transcript && voice.transcript.length > 0) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: voice.transcript,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])

      // Get response from API
      try {
        const response = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: voice.transcript,
            context: selectedPitch ? `Sales pitch: ${selectedPitch.name}` : '',
            history: messages.slice(-10),
            meetingMode: liveMeetingEnabled,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.response,
            timestamp: new Date(),
            expert: data.expert
          }

          setMessages(prev => [...prev, assistantMessage])
          setCurrentExpert(data.expert)

          // Speak the response
          const cleanText = cleanTextForSpeech(data.response)
          voice.speak(cleanText, false)
        }
      } catch (error) {
        console.error('Query error:', error)
      }
    }
  }

  // Effect to handle transcript changes
  useEffect(() => {
    if (voice.transcript && !voice.isListening && !liveMeetingEnabled) {
      handleVoiceQuery()
    }
  }, [voice.transcript, voice.isListening])

  // Select sales pitch
  const handleSelectPitch = (pitch: SalesPitch) => {
    setSelectedPitch(pitch)
    setShowPitchSelector(false)

    const message: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I'll support you with the ${pitch.name} pitch. I have ${pitch.supportingFacts.length} supporting facts and ${pitch.objectionHandlers.length} objection handlers ready.`,
      timestamp: new Date(),
      expert: currentExpert
    }

    setMessages(prev => [...prev, message])
    voice.speak(message.content, false)
  }

  // Speak selected pitch
  const speakPitch = () => {
    if (!selectedPitch) return

    const pitchText = `${selectedPitch.name}. Key points: ${selectedPitch.keyPoints.join('. ')}. ${selectedPitch.closingStatement}`
    const cleanText = cleanTextForSpeech(pitchText)
    voice.speak(cleanText, false)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header - iPad Optimized */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Voice Assistant</h1>
              <p className="text-sm text-gray-600">iPad Meeting Support - Saval Foodservice</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-2xl">{currentExpert.avatar}</span>
            <div className="text-sm">
              <div className="font-semibold text-gray-900">{currentExpert.name}</div>
              <div className="text-gray-600">Ready to assist</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* Voice Controls - Large iPad-optimized */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Manual Voice Input */}
              <div className="text-center">
                <button
                  onClick={voice.toggle}
                  disabled={liveMeetingEnabled}
                  className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-6xl transition-all transform active:scale-95 ${
                    voice.isListening
                      ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                  } disabled:opacity-50 disabled:cursor-not-allowed mx-auto`}
                >
                  {voice.isListening ? '⏹' : '🎤'}
                </button>
                <p className="text-lg font-semibold text-gray-900 mt-4">
                  {voice.isListening ? 'Listening...' : 'Tap to Ask'}
                </p>
                <p className="text-sm text-gray-600">
                  {voice.isListening ? 'Speak your question' : 'Manual voice query'}
                </p>
              </div>

              {/* Live Meeting Mode */}
              <div className="text-center">
                <button
                  onClick={() => setLiveMeetingEnabled(!liveMeetingEnabled)}
                  className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-6xl transition-all transform active:scale-95 ${
                    liveMeetingEnabled
                      ? 'bg-green-500 shadow-lg shadow-green-500/50'
                      : 'bg-gray-600 hover:bg-gray-700 shadow-lg'
                  } mx-auto`}
                >
                  {liveMeetingEnabled ? '🔴' : '▶️'}
                </button>
                <p className="text-lg font-semibold text-gray-900 mt-4">
                  {liveMeetingEnabled ? 'Meeting Active' : 'Start Meeting'}
                </p>
                <p className="text-sm text-gray-600">
                  {liveMeetingEnabled ? 'Listening & ready to interject' : 'Live meeting mode'}
                </p>
              </div>
            </div>

            {/* Live Transcript */}
            {voice.interimTranscript && (
              <div className="mt-6 bg-gray-50 border-2 border-blue-200 rounded-xl p-6">
                <p className="text-xl text-gray-700 italic">
                  {voice.interimTranscript}
                </p>
              </div>
            )}

            {/* Speaking Indicator */}
            {voice.isSpeaking && (
              <div className="mt-6 bg-green-50 border-2 border-green-300 rounded-xl p-6">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex gap-2">
                    <span className="w-2 h-12 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="w-2 h-12 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-12 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                  <p className="text-xl font-semibold text-green-800">Assistant Speaking...</p>
                </div>
              </div>
            )}
          </div>

          {/* Live Meeting Mode Component */}
          {liveMeetingEnabled && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <LiveMeetingMode
                onTranscript={handleLiveMeetingTranscript}
                onInterjection={handleLiveMeetingInterjection}
                enabled={liveMeetingEnabled}
              />
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.role === 'interjection'
                        ? 'bg-green-500 text-white border-2 border-green-600'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.expert && (
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-300">
                        <span className="text-2xl">{message.expert.avatar}</span>
                        <span className="font-semibold text-sm">{message.expert.name}</span>
                      </div>
                    )}
                    <p className="text-lg whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Sales Pitch Support */}
        <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Pitch Support</h2>

          {/* Selected Pitch */}
          {selectedPitch ? (
            <div className="mb-6">
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-blue-900">{selectedPitch.name}</h3>
                    <p className="text-xs text-blue-700">{selectedPitch.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPitch(null)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={speakPitch}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    🔊 Speak Pitch
                  </button>

                  <div className="text-sm">
                    <p className="font-semibold text-gray-700 mb-1">Target:</p>
                    <p className="text-gray-600">{selectedPitch.targetCustomer}</p>
                  </div>

                  <div className="text-sm">
                    <p className="font-semibold text-gray-700 mb-1">Key Points:</p>
                    <ul className="space-y-1">
                      {selectedPitch.keyPoints.slice(0, 3).map((point, idx) => (
                        <li key={idx} className="text-gray-600 flex gap-2">
                          <span>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm">
                    <p className="font-semibold text-gray-700 mb-1">Available Support:</p>
                    <p className="text-gray-600">
                      {selectedPitch.supportingFacts.length} facts, {selectedPitch.objectionHandlers.length} objection handlers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowPitchSelector(true)}
              className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-200 transition-colors mb-6"
            >
              <p className="text-lg font-semibold text-gray-700">+ Select Sales Pitch</p>
              <p className="text-sm text-gray-600 mt-1">Get automated fact support</p>
            </button>
          )}

          {/* Pitch Selector Modal */}
          {showPitchSelector && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
              <div className="bg-white rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Select Sales Pitch</h3>
                  <button
                    onClick={() => setShowPitchSelector(false)}
                    className="text-gray-600 hover:text-gray-900 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {SALES_PITCHES.map((pitch) => (
                    <button
                      key={pitch.id}
                      onClick={() => handleSelectPitch(pitch)}
                      className="w-full text-left bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl p-4 transition-all"
                    >
                      <h4 className="font-bold text-gray-900 mb-1">{pitch.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{pitch.targetCustomer}</p>
                      <div className="flex gap-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {pitch.category}
                        </span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {pitch.supportingFacts.length} facts
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 mb-2">Quick Actions</h3>
            <button
              onClick={() => voice.speak('What would you like to know?', false)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg text-left transition-colors"
            >
              🎤 Test Voice
            </button>
            <button
              onClick={() => setMessages([])}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg text-left transition-colors"
            >
              🗑️ Clear Messages
            </button>
            <Link
              href="/assistant"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg text-left transition-colors"
            >
              ⌨️ Text Mode
            </Link>
          </div>

          {/* Voice Status */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">System Status</h3>
            <div className="space-y-1 text-xs">
              <p className={voice.isSupported ? 'text-green-600' : 'text-red-600'}>
                {voice.isSupported ? '✓ Voice supported' : '✗ Voice not supported'}
              </p>
              <p className="text-gray-600">
                Mode: {liveMeetingEnabled ? 'Live Meeting' : 'Manual Query'}
              </p>
              {voice.error && (
                <p className="text-red-600">⚠️ {voice.error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
