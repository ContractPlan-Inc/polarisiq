'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">PolarisIQ</h1>
              <p className="text-sm text-gray-600">for Saval Foodservice</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium hidden sm:block">
                Pricing
              </Link>
              <Link href="/sign-in" className="text-gray-700 hover:text-gray-900 font-medium">
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                AI-Powered Sales Enablement
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                Close More Specialty Foods Deals
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                PolarisIQ gives your sales team instant access to expert culinary knowledge during customer meetings.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Answer technical questions with confidence. Handle allergen concerns instantly. Close deals faster with AI-powered support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/sign-up"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg text-center"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/pricing"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-blue-600 text-center"
                >
                  View Pricing
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>10 free queries</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-1">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-8 text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Voice Assistant Active</div>
                      <div className="text-sm opacity-90">Chef Marie - Pastry Expert</div>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                    <p className="text-sm opacity-90 mb-2">"Can the European butter work for lamination?"</p>
                  </div>
                  <div className="bg-white text-gray-900 rounded-lg p-4">
                    <p className="text-sm font-medium">Absolutely! Our 84% butterfat European butter is perfect for lamination. The higher fat content creates better layers...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 mb-8">Trusted by specialty foods sales professionals</p>
          <div className="grid grid-cols-3 gap-8 items-center opacity-60">
            <div className="text-2xl font-bold text-gray-400">Saval Foodservice</div>
            <div className="text-2xl font-bold text-gray-400">Specialty Distributors</div>
            <div className="text-2xl font-bold text-gray-400">Broadline Sales</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Win Specialty Foods Deals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PolarisIQ combines expert culinary knowledge with AI to support your sales team in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              }
              title="Voice-Enabled for iPad"
              description="Voice assistant listens during meetings and provides intelligent interjections with product facts"
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              title="8 Expert Personas"
              description="Pastry chef, sommelier, ethnic cuisine experts, dietary specialists, and more at your fingertips"
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Allergen & Dietary Intel"
              description="Instant access to allergen info, kosher/halal status, dietary restrictions, and compliance data"
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
              title="Sales Pitch Support"
              description="Pre-loaded sales pitches with objection handlers and supporting facts triggered by customer questions"
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title="Meeting Notes & Actions"
              description="Automatically track action items, export meeting summaries, and follow up efficiently"
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
              title="Mobile-Optimized"
              description="Works perfectly on iPad and mobile devices with large touch targets and responsive design"
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Perfect For Every Sales Scenario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UseCaseCard
              title="High-End Restaurant Accounts"
              description="Answer technical questions about pastry techniques, butter fat content, or tempering methods. Impress executive chefs with deep culinary knowledge."
              example="Customer asks about lamination - get instant expert guidance on European butter advantages"
            />
            <UseCaseCard
              title="Institutional Accounts with Special Needs"
              description="Handle complex dietary requirements, allergen concerns, and compliance questions with confidence. Kosher, Halal, vegan, gluten-free - we know it all."
              example="Nursing home asks about allergens - provide complete ingredient breakdown instantly"
            />
            <UseCaseCard
              title="Ethnic Restaurant Owners"
              description="Demonstrate knowledge of authentic ingredients for Japanese, Thai, Middle Eastern, French, Italian, and Indian cuisines. Build trust through expertise."
              example="Thai restaurant needs authentic curry paste - discuss traditional vs modern preparations"
            />
            <UseCaseCard
              title="Competitive Situations"
              description="Use pre-loaded sales pitches with objection handlers to overcome price concerns and highlight value propositions effectively."
              example="Customer says butter is too expensive - trigger value-based response with yield data"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Empower Your Sales Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with 10 free queries. No credit card required. Upgrade anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/sign-up"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-blue-600"
            >
              Request Demo
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Join specialty foods sales professionals using AI to close more deals
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PolarisIQ</h3>
              <p className="text-gray-400 text-sm">
                AI-powered sales assistant for specialty foods professionals
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/assistant" className="hover:text-white">Text Assistant</Link></li>
                <li><Link href="/voice" className="hover:text-white">Voice Interface</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="mailto:support@polarisiq.com" className="hover:text-white">support@polarisiq.com</a></li>
                <li><a href="mailto:sales@polarisiq.com" className="hover:text-white">sales@polarisiq.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} PolarisIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-blue-600 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function UseCaseCard({ title, description, example }: { title: string, description: string, example: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-blue-600">Example:</span> {example}
        </p>
      </div>
    </div>
  )
}
