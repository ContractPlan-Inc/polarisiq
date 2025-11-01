'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const handleComplete = () => {
    router.push('/assistant')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {step === 1 && (
            <Step1
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <Step2
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <Step3
              onComplete={handleComplete}
              onBack={() => setStep(2)}
            />
          )}
        </div>

        {/* Skip Link */}
        <div className="text-center mt-6">
          <button
            onClick={handleComplete}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Skip tutorial
          </button>
        </div>
      </div>
    </div>
  )
}

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to PolarisIQ!
      </h2>
      <p className="text-xl text-gray-600 mb-6">
        Your AI-powered specialty foods expert assistant
      </p>
      <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
        PolarisIQ gives you instant access to expert culinary knowledge during customer meetings.
        Answer technical questions with confidence, handle allergen concerns, and close deals faster.
      </p>

      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">What you can do with PolarisIQ:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Ask 8 expert culinary personas</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Get instant allergen & dietary info</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Use voice interface on iPad</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Track meeting notes & action items</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
      >
        Get Started
      </button>
    </div>
  )
}

function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Meet Your Expert Team
        </h2>
        <p className="text-gray-600">
          8 specialized culinary personas ready to help you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <ExpertCard
          name="Chef Marie"
          specialty="Pastry & French Techniques"
          icon="👩‍🍳"
        />
        <ExpertCard
          name="Chef Antonio"
          specialty="Italian & Mediterranean"
          icon="👨‍🍳"
        />
        <ExpertCard
          name="Chef Yuki"
          specialty="Japanese & Asian Cuisines"
          icon="🍱"
        />
        <ExpertCard
          name="Chef Layla"
          specialty="Middle Eastern Foods"
          icon="🥙"
        />
        <ExpertCard
          name="Chef Carlos"
          specialty="Latin American Flavors"
          icon="🌮"
        />
        <ExpertCard
          name="Chef Sam"
          specialty="Dietary & Allergen Expert"
          icon="✓"
        />
        <ExpertCard
          name="Chef Marcus"
          specialty="Proteins & Seafood"
          icon="🥩"
        />
        <ExpertCard
          name="Jean-Pierre"
          specialty="Wine & Beverage Pairing"
          icon="🍷"
        />
      </div>

      <div className="bg-indigo-50 rounded-xl p-6 mb-8">
        <p className="text-sm text-gray-700">
          <strong className="text-gray-900">💡 Pro Tip:</strong> PolarisIQ automatically selects
          the best expert based on your question. You can also manually switch experts anytime.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function Step3({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Interface
        </h2>
        <p className="text-gray-600">
          PolarisIQ works how you work
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900">Text Assistant</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Type questions and get instant expert responses. Perfect for quick lookups and detailed research.
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Works on any device</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Full conversation history</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Export meeting notes</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900">Voice Interface</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Hands-free assistance during customer meetings. Intelligent interjections with sales pitch support.
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>iPad optimized</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Live Meeting Mode</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Smart interjections</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-4 mb-8">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Your Plan:</strong> You have <strong>10 free queries</strong> to try PolarisIQ.
              Voice features require a Professional or Enterprise plan. <Link href="/pricing" className="text-blue-600 hover:text-blue-700 font-semibold">View pricing</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onComplete}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
        >
          Start Using PolarisIQ
        </button>
      </div>
    </div>
  )
}

function ExpertCard({ name, specialty, icon }: { name: string; specialty: string; icon: string }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{icon}</div>
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{specialty}</div>
        </div>
      </div>
    </div>
  )
}
