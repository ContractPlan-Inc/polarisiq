'use client'

import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              PolarisIQ
            </Link>
            <Link
              href="/assistant"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Launch Assistant
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need for Successful Sales Visits
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Built specifically for broadline sales reps working with specialty foods
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Core Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureDetail
              title="Instant Allergen Intelligence"
              description="Get immediate answers about allergens across thousands of products. Essential for food safety and customer confidence."
              features={[
                'FDA top 9 allergen coverage',
                'Cross-contamination warnings',
                'Manufacturing facility info',
                'Real-time product updates'
              ]}
              icon="⚠️"
            />
            <FeatureDetail
              title="Dietary Compliance Expert"
              description="Navigate complex dietary requirements with confidence. Support customers with specific religious or health needs."
              features={[
                'Kosher & Halal certification',
                'Gluten-free verification',
                'Vegan & vegetarian options',
                'Keto, Paleo, and more'
              ]}
              icon="✓"
            />
            <FeatureDetail
              title="Smart Product Substitutions"
              description="Never lose a sale due to out-of-stock items. Get intelligent alternatives that maintain quality and value."
              features={[
                'Comparable quality matching',
                'Price-point alternatives',
                'Seasonal availability info',
                'Customer preference tracking'
              ]}
              icon="🔄"
            />
            <FeatureDetail
              title="Menu & Pairing Suggestions"
              description="Help customers create winning menus with expert product pairing recommendations."
              features={[
                'Complementary product bundles',
                'Seasonal pairing ideas',
                'Cuisine-specific suggestions',
                'Premium upsell opportunities'
              ]}
              icon="🍽️"
            />
          </div>
        </div>
      </section>

      {/* Sales Support */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Sales Rep Support Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SupportCard
              title="Objection Handling"
              description="Proven frameworks and responses for common customer objections about price, quality, and change."
              icon="💬"
            />
            <SupportCard
              title="Value Conversations"
              description="Move beyond price discussions with total cost of ownership and menu value calculations."
              icon="💰"
            />
            <SupportCard
              title="Technical Knowledge"
              description="Instant access to product specs, storage requirements, shelf life, and preparation methods."
              icon="📚"
            />
          </div>
        </div>
      </section>

      {/* Mobile First */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-5xl mb-4">📱</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Built for Mobile-First Use
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Designed for the realities of field sales. Use it anywhere, anytime during customer visits.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span className="text-gray-700">Works on any smartphone or tablet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span className="text-gray-700">Touch-optimized interface for quick access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span className="text-gray-700">Fast responses - no waiting during meetings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span className="text-gray-700">Works online or offline (coming soon)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Real Field Scenarios</h3>
                <div className="space-y-4">
                  <Scenario text="Chef asks about gluten-free pasta options mid-conversation" />
                  <Scenario text="Customer needs kosher-certified cheese substitute" />
                  <Scenario text="Quick allergen check while reviewing order" />
                  <Scenario text="Price justification for premium product" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Perfect For These Situations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UseCase
              title="High-End Restaurants"
              description="Demanding chefs with specific quality and sourcing requirements"
            />
            <UseCase
              title="Healthcare Facilities"
              description="Strict dietary compliance and allergen management needs"
            />
            <UseCase
              title="Specialty Cafes"
              description="Vegan, gluten-free, and alternative dietary focus"
            />
            <UseCase
              title="Catering Companies"
              description="Event-specific requirements and dietary accommodations"
            />
            <UseCase
              title="Schools & Universities"
              description="Allergen awareness and diverse dietary needs"
            />
            <UseCase
              title="Hotels & Resorts"
              description="International guests with varied dietary customs"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Sales Visits?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join sales reps who are closing more deals with specialty foods expertise at their fingertips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assistant"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Using PolarisIQ
            </Link>
            <Link
              href="/"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-blue-600"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function FeatureDetail({ title, description, features, icon }: {
  title: string
  description: string
  features: string[]
  icon: string
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SupportCard({ title, description, icon }: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="text-center p-6">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function Scenario({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl">→</span>
      <span className="text-sm">{text}</span>
    </div>
  )
}

function UseCase({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
