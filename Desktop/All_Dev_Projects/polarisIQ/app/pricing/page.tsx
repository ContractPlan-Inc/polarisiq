'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { PLANS } from '@/lib/subscriptions'
import { useState } from 'react'

export default function PricingPage() {
  const { isSignedIn, user } = useUser()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSubscribe = async (planId: string, stripePriceId?: string) => {
    if (!isSignedIn) {
      window.location.href = '/sign-up'
      return
    }

    if (!stripePriceId) {
      // Free plan or contact sales
      if (planId === 'FREE') {
        window.location.href = '/assistant'
      } else {
        window.location.href = '/contact?plan=' + planId
      }
      return
    }

    setIsLoading(planId)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: stripePriceId }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
      setIsLoading(null)
    }
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
              {isSignedIn ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                    Dashboard
                  </Link>
                  <Link
                    href="/assistant"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    Launch App
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="text-gray-700 hover:text-gray-900">
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for your sales team. All plans include expert AI assistance.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Plan */}
            <PricingCard
              plan={PLANS.FREE}
              onSelect={() => handleSubscribe('FREE')}
              isLoading={isLoading === 'FREE'}
              ctaText={isSignedIn ? "Current Plan" : "Start Free Trial"}
            />

            {/* Starter Plan */}
            <PricingCard
              plan={PLANS.STARTER}
              onSelect={() => handleSubscribe('STARTER', PLANS.STARTER.stripePriceId)}
              isLoading={isLoading === 'STARTER'}
              ctaText="Get Started"
            />

            {/* Professional Plan */}
            <PricingCard
              plan={PLANS.PROFESSIONAL}
              onSelect={() => handleSubscribe('PROFESSIONAL', PLANS.PROFESSIONAL.stripePriceId)}
              isLoading={isLoading === 'PROFESSIONAL'}
              ctaText="Get Professional"
              popular
            />

            {/* Enterprise Plan */}
            <PricingCard
              plan={PLANS.ENTERPRISE}
              onSelect={() => handleSubscribe('ENTERPRISE', PLANS.ENTERPRISE.stripePriceId)}
              isLoading={isLoading === 'ENTERPRISE'}
              ctaText="Get Enterprise"
            />
          </div>

          {/* FAQ */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <FAQItem
                question="Can I change plans later?"
                answer="Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing period."
              />
              <FAQItem
                question="What happens if I exceed my query limit?"
                answer="You'll receive a notification when approaching your limit. You can either upgrade your plan or wait until your monthly reset. We never charge overage fees."
              />
              <FAQItem
                question="Is there a free trial?"
                answer="Yes! All new users start with our Free plan which includes 10 queries to test the platform. No credit card required."
              />
              <FAQItem
                question="Can I cancel anytime?"
                answer="Absolutely. You can cancel your subscription at any time from your account settings. You'll retain access until the end of your billing period."
              />
              <FAQItem
                question="Do you offer custom enterprise solutions?"
                answer="Yes! Contact our sales team for custom integrations, white-label options, on-premise deployment, and volume pricing."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PricingCard({ plan, onSelect, isLoading, ctaText, popular }: {
  plan: typeof PLANS[keyof typeof PLANS]
  onSelect: () => void
  isLoading: boolean
  ctaText: string
  popular?: boolean
}) {
  return (
    <div className={`relative bg-white rounded-2xl shadow-xl p-8 ${popular ? 'ring-2 ring-blue-600' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
          <span className="text-gray-600">/month</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={isLoading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          popular
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? 'Loading...' : ctaText}
      </button>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  )
}
