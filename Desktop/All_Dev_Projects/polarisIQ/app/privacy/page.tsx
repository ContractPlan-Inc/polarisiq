import Link from 'next/link'

export default function PrivacyPage() {
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

      {/* Privacy Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                PolarisIQ ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered sales assistant service for specialty foods professionals.
              </p>
              <p className="text-gray-700">
                By using PolarisIQ, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                When you create an account, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Name and email address</li>
                <li>Company name and role</li>
                <li>Payment information (processed securely by Stripe)</li>
                <li>Profile photo (optional)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Usage Data</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect information about how you use the Service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Text and voice queries you submit</li>
                <li>Meeting transcripts and conversation history</li>
                <li>Action items and notes you create</li>
                <li>Expert personas you interact with</li>
                <li>Sales pitches you use</li>
                <li>Feature usage and engagement metrics</li>
                <li>Device information (browser type, operating system)</li>
                <li>IP address and location data</li>
                <li>Session duration and frequency</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Voice Data</h3>
              <p className="text-gray-700 mb-4">
                When using voice features:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Voice recordings are processed in real-time using browser-based speech recognition</li>
                <li>Voice data is not stored on our servers</li>
                <li>Transcribed text from voice queries is treated as usage data</li>
                <li>You can disable voice features at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use collected information for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Providing the Service:</strong> Processing queries, generating responses, maintaining conversation history</li>
                <li><strong>Account Management:</strong> Creating and managing your account, processing payments</li>
                <li><strong>Personalization:</strong> Customizing your experience, remembering preferences</li>
                <li><strong>Analytics:</strong> Understanding usage patterns, improving features</li>
                <li><strong>Communication:</strong> Sending service updates, billing notifications, marketing (with consent)</li>
                <li><strong>Support:</strong> Responding to inquiries, troubleshooting issues</li>
                <li><strong>Security:</strong> Detecting fraud, preventing abuse, ensuring platform integrity</li>
                <li><strong>Legal Compliance:</strong> Meeting regulatory requirements, enforcing terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Encryption:</strong> All data is encrypted in transit (TLS/SSL) and at rest</li>
                <li><strong>Database:</strong> Hosted on Neon PostgreSQL with automatic backups</li>
                <li><strong>Access Control:</strong> Strict authentication and authorization protocols</li>
                <li><strong>Monitoring:</strong> Continuous security monitoring and logging</li>
                <li><strong>Compliance:</strong> SOC 2 compliant infrastructure partners</li>
              </ul>
              <p className="text-gray-700">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                We use trusted third-party services to operate PolarisIQ:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Clerk (Authentication)</h4>
                  <p className="text-gray-700 text-sm">
                    Manages user accounts and authentication. See <a href="https://clerk.com/privacy" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Clerk Privacy Policy</a>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Stripe (Payments)</h4>
                  <p className="text-gray-700 text-sm">
                    Processes payments securely. We never store your full payment details. See <a href="https://stripe.com/privacy" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Neon (Database)</h4>
                  <p className="text-gray-700 text-sm">
                    Hosts our PostgreSQL database with enterprise-grade security. See <a href="https://neon.tech/privacy" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Neon Privacy Policy</a>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">PostHog (Analytics)</h4>
                  <p className="text-gray-700 text-sm">
                    Privacy-focused analytics to improve our service. See <a href="https://posthog.com/privacy" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">PostHog Privacy Policy</a>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Sentry (Error Tracking)</h4>
                  <p className="text-gray-700 text-sm">
                    Monitors errors to maintain service quality. See <a href="https://sentry.io/privacy/" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Sentry Privacy Policy</a>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Vercel (Hosting)</h4>
                  <p className="text-gray-700 text-sm">
                    Hosts our application infrastructure. See <a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share data only in these circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Service Providers:</strong> Third parties that help us operate (listed above)</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li><strong>Protection:</strong> To protect rights, property, or safety of PolarisIQ, users, or others</li>
                <li><strong>Consent:</strong> With your explicit permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your information for different periods:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Account Data:</strong> Until you delete your account, plus 30 days</li>
                <li><strong>Meeting History:</strong> For the duration of your subscription, exportable anytime</li>
                <li><strong>Usage Analytics:</strong> Anonymized after 12 months</li>
                <li><strong>Billing Records:</strong> 7 years for tax and legal compliance</li>
                <li><strong>Support Tickets:</strong> 2 years after resolution</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Access:</strong> Request a copy of all personal data we hold</li>
                <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Download your meeting history and notes</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
              </ul>
              <p className="text-gray-700">
                To exercise these rights, contact us at <a href="mailto:privacy@polarisiq.com" className="text-blue-600 hover:text-blue-700">privacy@polarisiq.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for authentication and security</li>
                <li><strong>Analytics Cookies:</strong> Understand usage patterns (PostHog)</li>
                <li><strong>Preference Cookies:</strong> Remember your settings</li>
              </ul>
              <p className="text-gray-700">
                You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700">
                Your data may be processed in countries outside your residence. We ensure adequate protection through standard contractual clauses and by partnering with providers that comply with international data protection frameworks.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p className="text-gray-700">
                PolarisIQ is not intended for users under 18. We do not knowingly collect data from children. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. AI and Machine Learning</h2>
              <p className="text-gray-700 mb-4">
                Our AI features process your queries to provide responses:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Query text is processed to generate relevant responses</li>
                <li>We may use anonymized usage data to improve AI models</li>
                <li>Personal information is not used for AI training without consent</li>
                <li>You can opt-out of contributing to model improvements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. California Privacy Rights (CCPA)</h2>
              <p className="text-gray-700 mb-4">
                If you are a California resident, you have additional rights:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to know whether personal information is sold or disclosed</li>
                <li>Right to say no to the sale of personal information (we don't sell data)</li>
                <li>Right to delete personal information</li>
                <li>Right to non-discrimination for exercising CCPA rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. European Privacy Rights (GDPR)</h2>
              <p className="text-gray-700 mb-4">
                If you are in the European Economic Area, you have rights under GDPR:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or through the Service. The "Last Updated" date at the top indicates when changes were made. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For privacy-related questions or to exercise your rights:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li>Email: <a href="mailto:privacy@polarisiq.com" className="text-blue-600 hover:text-blue-700">privacy@polarisiq.com</a></li>
                <li>Support: <a href="mailto:support@polarisiq.com" className="text-blue-600 hover:text-blue-700">support@polarisiq.com</a></li>
                <li>Data Protection Officer: <a href="mailto:dpo@polarisiq.com" className="text-blue-600 hover:text-blue-700">dpo@polarisiq.com</a></li>
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
