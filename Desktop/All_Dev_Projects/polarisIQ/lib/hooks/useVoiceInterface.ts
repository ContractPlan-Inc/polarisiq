// Voice Interface Hook for PolarisIQ
// Premium voice recognition and text-to-speech for iPad sales calls

import { useState, useEffect, useRef, useCallback } from 'react'

interface VoiceConfig {
  continuous?: boolean
  interimResults?: boolean
  language?: string
  autoSpeak?: boolean
  voiceRate?: number
  voicePitch?: number
  voiceVolume?: number
}

interface VoiceState {
  isListening: boolean
  isSpeaking: boolean
  isSupported: boolean
  transcript: string
  interimTranscript: string
  error: string | null
}

interface UseVoiceInterfaceReturn extends VoiceState {
  startListening: () => void
  stopListening: () => void
  speak: (text: string, interrupt?: boolean) => void
  stopSpeaking: () => void
  toggle: () => void
}

// Voice wake words and trigger phrases
const WAKE_WORDS = ['hey chef', 'chef help', 'polaris', 'assistant']
const INTERRUPT_PHRASES = ['what about', 'tell them about', 'mention', 'add that']

export function useVoiceInterface(config: VoiceConfig = {}): UseVoiceInterfaceReturn {
  const {
    continuous = true,
    interimResults = true,
    language = 'en-US',
    autoSpeak = true,
    voiceRate = 1.0,
    voicePitch = 1.0,
    voiceVolume = 1.0,
  } = config

  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const speechSynthesis = window.speechSynthesis

    if (SpeechRecognition && speechSynthesis) {
      setIsSupported(true)

      const recognition = new SpeechRecognition()
      recognition.continuous = continuous
      recognition.interimResults = interimResults
      recognition.lang = language
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
        setIsListening(true)
        setError(null)
      }

      recognition.onresult = (event: any) => {
        let interimText = ''
        let finalText = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalText += transcript
          } else {
            interimText += transcript
          }
        }

        if (finalText) {
          setTranscript(finalText)
          setInterimTranscript('')

          // Reset silence timeout
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current)
          }

          // Auto-restart after silence
          silenceTimeoutRef.current = setTimeout(() => {
            if (continuous && isListening) {
              recognition.start()
            }
          }, 1500)
        } else {
          setInterimTranscript(interimText)
        }
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)

        if (event.error === 'no-speech') {
          // Auto-restart on no-speech
          if (continuous && isListening) {
            recognition.start()
          }
        } else {
          setError(`Voice error: ${event.error}`)
          setIsListening(false)
        }
      }

      recognition.onend = () => {
        // Auto-restart if continuous mode is enabled
        if (continuous && isListening) {
          try {
            recognition.start()
          } catch (e) {
            console.error('Failed to restart recognition:', e)
            setIsListening(false)
          }
        } else {
          setIsListening(false)
        }
      }

      recognitionRef.current = recognition
    } else {
      setIsSupported(false)
      setError('Voice interface not supported in this browser')
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
    }
  }, [continuous, interimResults, language, isListening])

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return

    try {
      recognitionRef.current.start()
      setIsListening(true)
      setError(null)
    } catch (error) {
      console.error('Error starting recognition:', error)
      setError('Failed to start voice recognition')
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return

    try {
      recognitionRef.current.stop()
      setIsListening(false)
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
    } catch (error) {
      console.error('Error stopping recognition:', error)
    }
  }, [isListening])

  const speak = useCallback((text: string, interrupt: boolean = false) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    // Stop current speech if interrupting
    if (interrupt && isSpeaking) {
      window.speechSynthesis.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = voiceRate
    utterance.pitch = voicePitch
    utterance.volume = voiceVolume
    utterance.lang = language

    // Try to select a professional voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice =>
      voice.name.includes('Google') ||
      voice.name.includes('Daniel') ||
      voice.name.includes('Samantha')
    ) || voices[0]

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      synthesisRef.current = null
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      setIsSpeaking(false)
      synthesisRef.current = null
    }

    synthesisRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [isSpeaking, voiceRate, voicePitch, voiceVolume, language])

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      synthesisRef.current = null
    }
  }, [])

  const toggle = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  return {
    isListening,
    isSpeaking,
    isSupported,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    toggle,
  }
}

// Helper function to detect wake words
export function detectWakeWord(text: string): boolean {
  const lowerText = text.toLowerCase()
  return WAKE_WORDS.some(word => lowerText.includes(word))
}

// Helper function to detect interrupt phrases
export function detectInterruptPhrase(text: string): boolean {
  const lowerText = text.toLowerCase()
  return INTERRUPT_PHRASES.some(phrase => lowerText.includes(phrase))
}

// Helper function to extract command after wake word
export function extractCommand(text: string): string | null {
  const lowerText = text.toLowerCase()

  for (const wakeWord of WAKE_WORDS) {
    const index = lowerText.indexOf(wakeWord)
    if (index !== -1) {
      const command = text.substring(index + wakeWord.length).trim()
      return command || null
    }
  }

  return null
}

// Helper function to clean text for speech
export function cleanTextForSpeech(text: string): string {
  return text
    .replace(/\*\*/g, '') // Remove markdown bold
    .replace(/\*/g, '') // Remove markdown italic
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert markdown links to text
    .replace(/`([^`]+)`/g, '$1') // Remove inline code markers
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/•/g, '') // Remove bullet points
    .replace(/\n+/g, '. ') // Convert line breaks to pauses
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}
