import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PolarisIQ - Legendary AI Sales & Meeting Assistant',
  description: 'Professional AI-powered sales assistant with deep industry skill packs for food & beverage, contractors, real estate, and more.',
  keywords: ['AI sales assistant', 'meeting assistant', 'sales automation', 'skill packs', 'NLP', 'transcription'],
  authors: [{ name: 'PolarisIQ' }],
  openGraph: {
    title: 'PolarisIQ - Legendary AI Sales & Meeting Assistant',
    description: 'Transform your sales with AI-powered intelligence and deep industry expertise',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
          card: 'shadow-lg',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
