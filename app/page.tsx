'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Sparkles,
  Brain,
  Mic,
  FileText,
  TrendingUp,
  Shield,
  Zap,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

export default function LandingPage() {
  const industries = [
    { name: 'Food & Beverage', icon: '🍷', description: 'Product knowledge, pairing recommendations, pricing strategies' },
    { name: 'Contractors', icon: '🏗️', description: 'Material specs, building codes, project estimation' },
    { name: 'Real Estate', icon: '🏡', description: 'Market analysis, property valuation, legal requirements' },
    { name: 'Technology', icon: '💻', description: 'Product specs, competitive analysis, ROI calculations' },
    { name: 'Healthcare', icon: '⚕️', description: 'Compliance, equipment knowledge, regulations' },
    { name: 'Financial Services', icon: '💰', description: 'Products, regulations, risk assessment' },
  ]

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Intelligence',
      description: 'Multi-model AI with GPT-4 and Claude for unmatched accuracy and context understanding',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Deep Skill Packs',
      description: 'Industry-specific knowledge bases with products, pricing, objection handlers, and more',
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Voice-Enabled',
      description: 'Hands-free operation during calls with real-time suggestions and intelligent interjections',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Context Upload',
      description: 'Upload catalogs, pricing sheets, any document - AI extracts and indexes everything',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Meeting Intelligence',
      description: 'Recording, transcription, insights, action items - automatically generated',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics & Insights',
      description: 'Track performance, deal value, conversion rates, and optimize your sales process',
    },
  ]

  const stats = [
    { value: '10x', label: 'Faster Deal Closure' },
    { value: '95%', label: 'AI Accuracy' },
    { value: '50+', label: 'Industries Supported' },
    { value: '24/7', label: 'Always Available' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">PolarisIQ</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link>
              <Link href="#industries" className="hover:text-blue-400 transition-colors">Industries</Link>
              <Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link>
              <Link href="/sign-in" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all">Sign In</Link>
              <Link href="/sign-up" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-500/50">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-2 mb-8">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">Legendary AI-Powered Sales Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Transform Sales with
              <br />
              Deep AI Intelligence
            </h1>

            <p className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-3xl mx-auto">
              The only sales assistant with deep, industry-specific skill packs. Upload your materials,
              get expert-level support in minutes. Voice-enabled, meeting intelligence, and NLP that actually works.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
              <Link href="/sign-up" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-lg shadow-2xl shadow-blue-500/50 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="#demo" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-lg backdrop-blur-sm border border-white/20 transition-all">
                  Watch Demo
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-blue-200/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Legendary Features</h2>
            <p className="text-xl text-blue-100/70 max-w-2xl mx-auto">
              Built for professionals who demand excellence. Every feature designed to showcase the true power of AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400 group-hover:bg-blue-500/30 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-blue-100/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Deep Skill Packs</h2>
            <p className="text-xl text-blue-100/70 max-w-2xl mx-auto">
              Pre-built expertise for your industry. Upload your materials and get started in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all group cursor-pointer"
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {industry.name}
                </h3>
                <p className="text-blue-100/60 text-sm">{industry.description}</p>
                <div className="mt-4 flex items-center text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Sales?
          </h2>
          <p className="text-xl text-blue-100/80 mb-12">
            Join thousands of professionals using AI to close deals faster and smarter.
          </p>
          <Link href="/sign-up">
            <button className="px-12 py-5 bg-white text-blue-900 hover:bg-blue-50 rounded-xl font-bold text-xl shadow-2xl transition-all transform hover:scale-105">
              Start Your Free Trial
            </button>
          </Link>
          <p className="mt-6 text-blue-200/60 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold">PolarisIQ</span>
            </div>
            <div className="text-blue-200/60 text-sm">
              © 2024 PolarisIQ. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
