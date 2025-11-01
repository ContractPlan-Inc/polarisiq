import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'PolarisIQ - AI-Powered Sales Assistant for Specialty Foods | Saval Foodservice',
  description: 'Professional voice and text AI assistant for broadline foodservice sales reps. Expert knowledge in specialty foods, pastry, ethnic cuisine, dietary requirements, and sales strategies.',
  keywords: 'foodservice sales, specialty foods, AI assistant, sales enablement, Saval, voice assistant, iPad app, culinary expert, allergen information, dietary compliance',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#2563eb',
  authors: [{ name: 'ContractPlan Inc.' }],
  openGraph: {
    type: 'website',
    title: 'PolarisIQ - AI Sales Assistant for Specialty Foods',
    description: 'Professional AI assistant for foodservice sales reps with expertise in specialty foods, dietary requirements, and sales strategies.',
    siteName: 'PolarisIQ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PolarisIQ - AI Sales Assistant',
    description: 'Professional AI assistant for specialty foods sales',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
