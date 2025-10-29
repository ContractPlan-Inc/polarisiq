'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  expert?: {
    id: string
    name: string
    role: string
    avatar: string
  }
}

interface QuickAction {
  label: string
  prompt: string
  icon: string
  category: string
}

const quickActions: QuickAction[] = [
  { label: 'Allergen Info', prompt: 'What allergen information should I know about?', icon: '⚠️', category: 'safety' },
  { label: 'Kosher/Halal', prompt: 'Explain kosher and halal requirements', icon: '✡️', category: 'dietary' },
  { label: 'Product Substitute', prompt: 'Suggest alternative products', icon: '🔄', category: 'product' },
  { label: 'Pastry Techniques', prompt: 'Tell me about lamination and tempering', icon: '🥐', category: 'technique' },
  { label: 'Asian Cuisine', prompt: 'Help me with Japanese and Thai ingredients', icon: '🥢', category: 'cuisine' },
  { label: 'Value Selling', prompt: 'How do I handle price objections?', icon: '💰', category: 'sales' },
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [customerContext, setCustomerContext] = useState('')
  const [showContext, setShowContext] = useState(false)
  const [currentExpert, setCurrentExpert] = useState<any>(null)
  const [meetingMode, setMeetingMode] = useState(false)
  const [actionItems, setActionItems] = useState<string[]>([])
  const [showActionItems, setShowActionItems] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: "**Chef Antonio Rodriguez** (Executive Chef):\n\nWelcome to PolarisIQ for Saval Foodservice! I'm your specialty foods expert assistant.\n\nI can help you with:\n• Allergen & dietary information\n• Product knowledge & substitutions\n• Cuisine expertise (Japanese, Thai, Middle Eastern, Italian, Latin, Indian)\n• Pastry & cooking techniques\n• Value selling strategies\n• Meeting notes & action items\n\nJust ask me anything, or use the quick action buttons below!",
      timestamp: new Date(),
      expert: {
        id: 'executive-chef',
        name: 'Chef Antonio Rodriguez',
        role: 'Executive Chef',
        avatar: '👨‍🍳'
      }
    }
    setMessages([welcomeMessage])
    setCurrentExpert(welcomeMessage.expert)
  }, [])

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setSuggestions([])

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          context: customerContext,
          history: messages.slice(-10),
          currentExpert: currentExpert?.id,
          meetingMode,
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

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

      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions)
      }

      if (data.actionItems && data.actionItems.length > 0) {
        setActionItems(prev => [...prev, ...data.actionItems])
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSend(action.prompt)
  }

  const handleSuggestion = (suggestion: string) => {
    handleSend(suggestion)
  }

  const toggleMeetingMode = () => {
    setMeetingMode(!meetingMode)
    if (!meetingMode) {
      handleSend("I'm starting a customer meeting. Please help me with any questions that come up and track action items.")
    }
  }

  const exportNotes = () => {
    const notes = messages.map(m =>
      `[${m.timestamp.toLocaleTimeString()}] ${m.role === 'user' ? 'Rep' : m.expert?.name || 'Assistant'}: ${m.content}`
    ).join('\n\n')

    const actionItemsText = actionItems.length > 0
      ? '\n\nACTION ITEMS:\n' + actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')
      : ''

    const fullNotes = `PolarisIQ Meeting Notes - ${new Date().toLocaleString()}\n\n` +
      `Customer Context: ${customerContext || 'None provided'}\n\n` +
      `${notes}${actionItemsText}`

    const blob = new Blob([fullNotes], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `polarisiq-notes-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">PolarisIQ</h1>
              <p className="text-xs text-gray-600">Saval Foodservice</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentExpert && (
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-xl">{currentExpert.avatar}</span>
                <div className="text-xs">
                  <div className="font-semibold text-gray-900">{currentExpert.name}</div>
                  <div className="text-gray-600">{currentExpert.role}</div>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowActionItems(!showActionItems)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Action Items"
            >
              {actionItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {actionItems.length}
                </span>
              )}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </button>
            <button
              onClick={() => setShowContext(!showContext)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Customer Context"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={toggleMeetingMode}
              className={`p-2 rounded-lg transition-colors ${meetingMode ? 'bg-red-500 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              title={meetingMode ? 'End Meeting' : 'Start Meeting'}
            >
              {meetingMode && <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={exportNotes}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Export Notes"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Customer Context Panel */}
      {showContext && (
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Customer Context
          </label>
          <textarea
            value={customerContext}
            onChange={(e) => setCustomerContext(e.target.value)}
            placeholder="e.g., High-end Italian restaurant, needs gluten-free pasta options, kosher certified kitchen..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={2}
          />
          <p className="text-xs text-gray-600 mt-2">
            Add customer details for personalized recommendations
          </p>
        </div>
      )}

      {/* Action Items Panel */}
      {showActionItems && actionItems.length > 0 && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">Action Items</h3>
            <button
              onClick={() => setActionItems([])}
              className="text-xs text-gray-600 hover:text-gray-900"
            >
              Clear all
            </button>
          </div>
          <ul className="space-y-1">
            {actionItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-yellow-600">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 shadow-md'
              }`}
            >
              {message.expert && message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                  <span className="text-xl">{message.expert.avatar}</span>
                  <div className="text-xs">
                    <div className="font-semibold">{message.expert.name}</div>
                    <div className="text-gray-500">{message.expert.role}</div>
                  </div>
                </div>
              )}
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
              <div className="loading-dots flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">Suggested follow-ups:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestion(suggestion)}
                disabled={isLoading}
                className="px-3 py-1 bg-white text-gray-700 rounded-full whitespace-nowrap text-xs font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 border border-gray-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full whitespace-nowrap text-sm font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about products, allergens, techniques, cuisine..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
