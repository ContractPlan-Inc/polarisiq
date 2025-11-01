'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PLANS } from '@/lib/subscriptions'

interface SubscriptionData {
  plan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
  status: string
  usage: {
    textQueries: number
    voiceQueries: number
    meetings: number
    exports: number
  }
}

interface Meeting {
  id: string
  createdAt: string
  expertUsed: string
  pitchId?: string
  duration?: number
}

export default function DashboardPage() {
  const { isSignedIn, user } = useUser()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isSignedIn) {
      loadDashboardData()
    }
  }, [isSignedIn])

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setSubscription(data.subscription)
      setRecentMeetings(data.recentMeetings || [])
    } catch (error) {
      console.error('Failed to load dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      })
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Failed to open portal:', error)
      alert('Failed to open billing portal. Please try again.')
    }
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h1>
          <Link
            href="/sign-in"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  const currentPlan = subscription ? PLANS[subscription.plan] : PLANS.FREE
  const limits = currentPlan.limits
  const usage = subscription?.usage || { textQueries: 0, voiceQueries: 0, meetings: 0, exports: 0 }

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0 // unlimited
    return Math.min((used / limit) * 100, 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              PolarisIQ
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/assistant" className="text-gray-700 hover:text-gray-900">
                Text Assistant
              </Link>
              <Link href="/voice" className="text-gray-700 hover:text-gray-900">
                Voice Interface
              </Link>
              <Link
                href="/assistant"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || 'there'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your PolarisIQ account overview
          </p>
        </div>

        {/* Subscription Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentPlan.name} Plan</h2>
              <p className="text-gray-600 mt-1">
                {subscription?.status === 'ACTIVE' ? 'Active' : subscription?.status}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                ${currentPlan.price}
                <span className="text-lg text-gray-600">/month</span>
              </div>
              {subscription?.plan !== 'FREE' && (
                <button
                  onClick={handleManageSubscription}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Manage Subscription
                </button>
              )}
            </div>
          </div>

          {/* Usage Meters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Text Queries */}
            <UsageMeter
              label="Text Queries"
              used={usage.textQueries}
              limit={limits.textQueries}
            />

            {/* Voice Queries */}
            <UsageMeter
              label="Voice Queries"
              used={usage.voiceQueries}
              limit={limits.voiceQueries}
            />

            {/* Meetings */}
            <UsageMeter
              label="Meetings"
              used={usage.meetings}
              limit={limits.meetings}
            />

            {/* Exports */}
            <UsageMeter
              label="Exports"
              used={usage.exports}
              limit={limits.exports}
            />
          </div>

          {/* Upgrade CTA */}
          {subscription?.plan === 'FREE' && (
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Ready for more?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Upgrade to unlock voice queries, more text queries, and advanced features
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 whitespace-nowrap"
                >
                  Upgrade Plan
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Recent Meetings */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Meetings</h2>
            <Link
              href="/assistant"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Start New Meeting →
            </Link>
          </div>

          {recentMeetings.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-gray-600">No meetings yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Start your first meeting to see it here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {meeting.expertUsed || 'Meeting'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(meeting.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {meeting.duration && ` • ${Math.round(meeting.duration / 60)}min`}
                      </p>
                    </div>
                  </div>
                  {meeting.pitchId && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                      Sales Pitch
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/assistant"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Text Assistant</h3>
            <p className="text-sm text-gray-600">
              Chat with expert culinary personas for specialty foods guidance
            </p>
          </Link>

          <Link
            href="/voice"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Voice Interface</h3>
            <p className="text-sm text-gray-600">
              Voice-enabled meeting assistant for iPad sales calls
            </p>
          </Link>

          <Link
            href="/pricing"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Upgrade Plan</h3>
            <p className="text-sm text-gray-600">
              Get more queries, voice features, and advanced capabilities
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

function UsageMeter({ label, used, limit }: { label: string; used: number; limit: number }) {
  const isUnlimited = limit === -1
  const percentage = isUnlimited ? 0 : Math.min((used / limit) * 100, 100)
  const color = percentage >= 90 ? 'bg-red-500' : percentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">
          {used} {isUnlimited ? '' : `/ ${limit}`}
          {isUnlimited && <span className="text-green-600 ml-1">∞</span>}
        </span>
      </div>
      {!isUnlimited && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
      {isUnlimited && (
        <div className="text-xs text-gray-500 mt-1">Unlimited</div>
      )}
    </div>
  )
}
