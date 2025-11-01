import Link from 'next/link'

export default function TermsPage() {
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
              <Link href="/pricing" className="text-gray-700 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/sign-in" className="text-gray-700 hover:text-gray-900">
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using PolarisIQ ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-700">
                PolarisIQ is a specialized AI-powered assistant designed for foodservice sales professionals, specifically those working with specialty foods. The Service provides expert culinary knowledge, sales support, and meeting assistance through text and voice interfaces.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to use PolarisIQ for commercial foodservice sales purposes in accordance with your subscription plan. This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Accessing culinary expertise and specialty foods information</li>
                <li>Using voice and text interfaces during customer meetings</li>
                <li>Generating meeting notes and action items</li>
                <li>Exporting meeting data for business use</li>
              </ul>
              <p className="text-gray-700 mb-4">
                This is the grant of a license, not a transfer of title. Under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Share your account credentials with others</li>
                <li>Exceed your subscription plan's usage limits</li>
                <li>Attempt to reverse engineer or copy the Service</li>
                <li>Use the Service for any unlawful purpose</li>
                <li>Resell or redistribute access to the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Subscription Plans and Billing</h2>
              <p className="text-gray-700 mb-4">
                PolarisIQ offers multiple subscription tiers with varying features and usage limits:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Free Plan:</strong> Limited queries for trial purposes</li>
                <li><strong>Starter Plan:</strong> Basic text query access</li>
                <li><strong>Professional Plan:</strong> Full access including voice features</li>
                <li><strong>Enterprise Plan:</strong> Unlimited access with team features</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Billing terms:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Subscriptions are billed monthly in advance</li>
                <li>You will be charged on the same day each month</li>
                <li>Usage resets at the start of each billing cycle</li>
                <li>Unused queries do not roll over to the next month</li>
                <li>Refunds are provided on a case-by-case basis</li>
                <li>You may cancel your subscription at any time</li>
                <li>Access continues until the end of your current billing period</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Data and Privacy</h2>
              <p className="text-gray-700 mb-4">
                We collect and process data to provide the Service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Meeting transcripts and conversation history</li>
                <li>Action items and notes you create</li>
                <li>Usage statistics and analytics</li>
                <li>Account and billing information</li>
              </ul>
              <p className="text-gray-700">
                Your data is stored securely and never shared with third parties for marketing purposes. See our <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link> for complete details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. AI-Generated Content Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                PolarisIQ uses artificial intelligence to provide culinary expertise and sales support. While we strive for accuracy:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>AI-generated information may contain errors or inaccuracies</li>
                <li>Dietary and allergen information should be verified with suppliers</li>
                <li>The Service does not replace professional culinary or food safety expertise</li>
                <li>Users are responsible for verifying critical information</li>
                <li>We are not liable for decisions made based on AI-generated content</li>
              </ul>
              <p className="text-gray-700">
                <strong>Important:</strong> Always verify allergen and dietary information with your suppliers before making claims to customers. Food safety is your responsibility.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Usage Limits and Fair Use</h2>
              <p className="text-gray-700 mb-4">
                Each subscription plan includes specific usage limits. If you exceed your limits:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>The Service will notify you when approaching limits</li>
                <li>Access may be restricted when limits are exceeded</li>
                <li>You may upgrade your plan for immediate access</li>
                <li>Limits reset at the start of each billing cycle</li>
                <li>We reserve the right to suspend accounts for abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                We strive to provide reliable service but cannot guarantee 100% uptime:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Scheduled maintenance may temporarily interrupt service</li>
                <li>We will provide advance notice when possible</li>
                <li>No refunds for brief service interruptions</li>
                <li>Extended outages may qualify for service credits</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Service, including all content, features, and functionality, is owned by PolarisIQ and protected by intellectual property laws. You retain ownership of:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Your customer data and meeting notes</li>
                <li>Action items you create</li>
                <li>Exported meeting transcripts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall PolarisIQ be liable for any indirect, incidental, special, consequential or punitive damages resulting from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Your use or inability to use the Service</li>
                <li>Errors or inaccuracies in AI-generated content</li>
                <li>Loss of data or business opportunities</li>
                <li>Service interruptions or downtime</li>
                <li>Third-party actions or content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the Service after changes constitutes acceptance of the modified terms. We will notify users of significant changes via email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                Either party may terminate this agreement:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You may cancel your subscription at any time</li>
                <li>We may suspend or terminate accounts for terms violations</li>
                <li>Upon termination, access ends at the current billing period</li>
                <li>Your data may be deleted after a reasonable grace period</li>
                <li>Export your data before cancellation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which PolarisIQ operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li>Email: <a href="mailto:legal@polarisiq.com" className="text-blue-600 hover:text-blue-700">legal@polarisiq.com</a></li>
                <li>Support: <a href="mailto:support@polarisiq.com" className="text-blue-600 hover:text-blue-700">support@polarisiq.com</a></li>
              </ul>
            </section>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
