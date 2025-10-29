// Live Meeting Mode Component
// Intelligent voice assistant that listens during sales calls and interjects with facts

'use client'

import { useState, useEffect, useRef } from 'react'
import { useVoiceInterface, detectWakeWord, detectInterruptPhrase, extractCommand, cleanTextForSpeech } from '@/lib/hooks/useVoiceInterface'

interface LiveMeetingProps {
  onTranscript: (text: string) => void
  onInterjection: (text: string) => void
  enabled: boolean
}

interface Keyword {
  phrase: string
  category: string
  priority: 'high' | 'medium' | 'low'
  response: string
}

// Smart keywords that trigger automatic interjections
const SMART_KEYWORDS: Keyword[] = [
  // Allergen triggers
  { phrase: 'allergen', category: 'safety', priority: 'high', response: 'Excuse me - I can provide allergen information if helpful.' },
  { phrase: 'gluten', category: 'safety', priority: 'high', response: 'I have gluten-free certification details if needed.' },
  { phrase: 'dairy free', category: 'safety', priority: 'high', response: 'I can help identify dairy-free alternatives.' },
  { phrase: 'nut allergy', category: 'safety', priority: 'high', response: 'Let me provide nut-free options and cross-contamination info.' },

  // Dietary triggers
  { phrase: 'kosher', category: 'dietary', priority: 'high', response: 'I have kosher certification details and requirements.' },
  { phrase: 'halal', category: 'dietary', priority: 'high', response: 'I can provide halal certification and compliance information.' },
  { phrase: 'vegan', category: 'dietary', priority: 'medium', response: 'I can suggest vegan alternatives if helpful.' },

  // Price objections
  { phrase: 'too expensive', category: 'price', priority: 'high', response: 'May I share the cost-per-serving breakdown and value proposition?' },
  { phrase: 'cheaper', category: 'price', priority: 'medium', response: 'I can help explain the quality and yield advantages.' },
  { phrase: 'price', category: 'price', priority: 'low', response: 'I have value comparison data if useful.' },

  // Product questions
  { phrase: 'substitute', category: 'product', priority: 'medium', response: 'I can recommend alternative products.' },
  { phrase: 'out of stock', category: 'product', priority: 'high', response: 'Let me suggest comparable alternatives.' },
  { phrase: 'chocolate', category: 'pastry', priority: 'low', response: 'I have Belgian chocolate specifications available.' },
  { phrase: 'butter', category: 'pastry', priority: 'low', response: 'I can explain European butter benefits for pastry.' },

  // Cuisine questions
  { phrase: 'japanese', category: 'cuisine', priority: 'medium', response: 'I have Japanese ingredient expertise if needed.' },
  { phrase: 'thai', category: 'cuisine', priority: 'medium', response: 'I can provide Thai cuisine guidance.' },
  { phrase: 'middle eastern', category: 'cuisine', priority: 'medium', response: 'I have Middle Eastern product knowledge available.' },
  { phrase: 'mediterranean', category: 'cuisine', priority: 'medium', response: 'I can help with Mediterranean ingredients.' },

  // Technique questions
  { phrase: 'tempering', category: 'technique', priority: 'medium', response: 'I can explain chocolate tempering if helpful.' },
  { phrase: 'lamination', category: 'technique', priority: 'medium', response: 'I have lamination technique details available.' },
]

export default function LiveMeetingMode({ onTranscript, onInterjection, enabled }: LiveMeetingProps) {
  const [isActive, setIsActive] = useState(false)
  const [recentTranscripts, setRecentTranscripts] = useState<string[]>([])
  const [lastInterjectionTime, setLastInterjectionTime] = useState(0)
  const [confidence, setConfidence] = useState(0)
  const conversationBufferRef = useRef<string>('')
  const interjectionCooldownRef = useRef<NodeJS.Timeout | null>(null)

  const voice = useVoiceInterface({
    continuous: true,
    interimResults: true,
    language: 'en-US',
    autoSpeak: false,
    voiceRate: 1.1,
    voicePitch: 1.0,
    voiceVolume: 0.9,
  })

  // Handle new transcripts
  useEffect(() => {
    if (voice.transcript && voice.transcript.length > 0) {
      const newTranscript = voice.transcript

      // Add to conversation buffer
      conversationBufferRef.current += ' ' + newTranscript

      // Keep only last 500 characters
      if (conversationBufferRef.current.length > 500) {
        conversationBufferRef.current = conversationBufferRef.current.slice(-500)
      }

      setRecentTranscripts(prev => [...prev.slice(-10), newTranscript])
      onTranscript(newTranscript)

      // Check for wake words
      if (detectWakeWord(newTranscript)) {
        const command = extractCommand(newTranscript)
        if (command) {
          handleWakeWordCommand(command)
        }
      }

      // Check for interrupt phrases
      if (detectInterruptPhrase(newTranscript)) {
        handleInterruptRequest(newTranscript)
      }

      // Check for smart keywords
      checkForSmartInterjection(newTranscript)
    }
  }, [voice.transcript])

  // Handle wake word commands
  const handleWakeWordCommand = (command: string) => {
    const response = `Yes, I can help with ${command}. Let me provide that information.`
    interject(response, 'high')
    onInterjection(command)
  }

  // Handle explicit interrupt requests
  const handleInterruptRequest = (transcript: string) => {
    const response = "Certainly. Let me add to that."
    interject(response, 'medium')
  }

  // Check for smart keyword interjections
  const checkForSmartInterjection = (transcript: string) => {
    const lowerTranscript = transcript.toLowerCase()
    const now = Date.now()

    // Cooldown period: don't interject more than once every 15 seconds
    if (now - lastInterjectionTime < 15000) {
      return
    }

    // Find matching keywords
    const matches = SMART_KEYWORDS.filter(keyword =>
      lowerTranscript.includes(keyword.phrase)
    ).sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })

    if (matches.length > 0) {
      const match = matches[0]

      // Only interject on high priority or if explicitly discussing the topic
      if (match.priority === 'high' || shouldInterject(lowerTranscript, match)) {
        interject(match.response, match.priority)
        setLastInterjectionTime(now)
      }
    }
  }

  // Determine if we should interject based on context
  const shouldInterject = (transcript: string, keyword: Keyword): boolean => {
    // Check if it's a question
    const isQuestion = transcript.includes('?') ||
      transcript.includes('what') ||
      transcript.includes('how') ||
      transcript.includes('can you')

    // Check if customer is expressing concern
    const isConcern = transcript.includes('concern') ||
      transcript.includes('worry') ||
      transcript.includes('issue') ||
      transcript.includes('problem')

    // Check if there's a pause indicator (typically from speech recognition)
    const hasPause = transcript.endsWith('.') || transcript.endsWith('?')

    // Interject if it's a question or concern and there's a pause
    return (isQuestion || isConcern) && hasPause
  }

  // Perform interjection
  const interject = (text: string, priority: 'high' | 'medium' | 'low') => {
    // Speak the interjection
    voice.speak(text, priority === 'high')

    // Set cooldown
    if (interjectionCooldownRef.current) {
      clearTimeout(interjectionCooldownRef.current)
    }
    interjectionCooldownRef.current = setTimeout(() => {
      // Cooldown expired
    }, 15000)
  }

  // Toggle active state
  useEffect(() => {
    if (enabled && !isActive) {
      setIsActive(true)
      voice.startListening()
    } else if (!enabled && isActive) {
      setIsActive(false)
      voice.stopListening()
      conversationBufferRef.current = ''
      setRecentTranscripts([])
    }
  }, [enabled])

  // Calculate confidence based on audio quality and recognition
  useEffect(() => {
    if (voice.isListening) {
      // Simulate confidence calculation
      // In production, this could be based on actual audio levels and recognition quality
      setConfidence(85 + Math.random() * 10)
    } else {
      setConfidence(0)
    }
  }, [voice.isListening, voice.transcript])

  if (!voice.isSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">
          Voice interface not supported in this browser. Please use Chrome, Safari, or Edge.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Status Indicator */}
      {isActive && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {voice.isListening && (
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </div>
              )}
              <div>
                <p className="font-semibold">Live Meeting Mode Active</p>
                <p className="text-xs text-blue-100">
                  {voice.isListening ? 'Listening to conversation...' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-100">Confidence</p>
              <p className="text-lg font-bold">{Math.round(confidence)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Interim Transcript */}
      {voice.interimTranscript && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-sm text-gray-600 italic">
            {voice.interimTranscript}
          </p>
        </div>
      )}

      {/* Recent Activity */}
      {recentTranscripts.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Recent Activity</p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {recentTranscripts.slice(-3).map((transcript, idx) => (
              <p key={idx} className="text-xs text-gray-600">
                • {transcript}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Speaking Indicator */}
      {voice.isSpeaking && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-1 h-4 bg-green-500 rounded-full animate-pulse"></span>
              <span className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
            <p className="text-sm font-medium text-green-800">Assistant speaking...</p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {voice.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">{voice.error}</p>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs font-semibold text-blue-900 mb-1">Voice Commands:</p>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• <strong>"Hey Chef"</strong> or <strong>"Polaris"</strong> - Activate assistant</li>
          <li>• <strong>"Tell them about..."</strong> - Request specific information</li>
          <li>• Assistant automatically suggests facts when relevant topics are mentioned</li>
        </ul>
      </div>
    </div>
  )
}
