// ============================================================================
// Skill Pack Type Definitions
// Core types for the modular skill pack system
// ============================================================================

export interface SkillPackMetadata {
  id: string
  name: string
  slug: string
  industry: string
  version: string
  icon?: string
  description: string
  coverImage?: string
  isPremium: boolean
  requiredTier: 'free' | 'starter' | 'professional' | 'enterprise'
}

export interface Product {
  id: string
  name: string
  category: string
  description: string
  suppliers?: string[]
  pricing: {
    wholesale?: number
    retail?: number
    bulk?: number
    currency: string
  }
  specifications?: Record<string, any>
  seasonality?: string
  certifications?: string[]
  allergens?: string[]
  shelfLife?: string
  storage?: string
  pairings?: string[]
  competitors?: string[]
  usp?: string[] // Unique Selling Points
  customFields?: Record<string, any>
}

export interface PricingRule {
  id: string
  name: string
  type: 'fixed' | 'tiered' | 'volume' | 'dynamic'
  basePrice: number
  currency: string
  tiers?: Array<{
    minQuantity: number
    maxQuantity?: number
    price: number
    discount?: number
  }>
  conditions?: Record<string, any>
  validFrom?: string
  validUntil?: string
}

export interface Competitor {
  id: string
  name: string
  products: string[]
  strengths: string[]
  weaknesses: string[]
  pricing: 'lower' | 'similar' | 'higher'
  marketShare?: number
  differentiators: string[]
}

export interface ObjectionHandler {
  id: string
  objection: string
  category: 'price' | 'quality' | 'timing' | 'competition' | 'need' | 'other'
  responses: string[]
  tactics: string[]
  data?: {
    statistics?: string[]
    testimonials?: string[]
    caseStudies?: string[]
  }
  relatedProducts?: string[]
}

export interface SalesScript {
  id: string
  name: string
  type: 'opening' | 'discovery' | 'presentation' | 'closing' | 'followup'
  script: string
  keyPoints: string[]
  dosDonts: {
    dos: string[]
    donts: string[]
  }
  variations?: Array<{
    name: string
    script: string
    useCase: string
  }>
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  relatedQuestions?: string[]
  sources?: string[]
}

export interface Regulation {
  id: string
  title: string
  description: string
  type: 'legal' | 'safety' | 'quality' | 'environmental' | 'other'
  jurisdiction?: string
  effectiveDate?: string
  requirements: string[]
  penalties?: string[]
  complianceChecklist?: string[]
  resources?: string[]
}

export interface ExpertPersona {
  id: string
  name: string
  role: string
  expertise: string[]
  personality: string
  communicationStyle: string
  strengths: string[]
  systemPrompt: string
}

export interface InterjectionRule {
  id: string
  trigger: string
  triggerType: 'keyword' | 'sentiment' | 'context' | 'timing'
  priority: 1 | 2 | 3 | 4 | 5
  interjectionTemplate: string
  conditions?: Record<string, any>
  cooldownSeconds?: number
}

export interface SkillPackContent {
  products: Product[]
  pricing: PricingRule[]
  competitors: Competitor[]
  objectionHandlers: ObjectionHandler[]
  salesScripts: SalesScript[]
  faqs: FAQ[]
  regulations: Regulation[]
  expertPersonas: ExpertPersona[]
}

export interface SkillPackAIConfig {
  systemPrompt: string
  interjectionRules: InterjectionRule[]
  preferredModel?: 'gpt-4' | 'gpt-4-turbo' | 'claude-3-opus' | 'claude-3-sonnet'
  temperature?: number
  maxTokens?: number
}

export interface SkillPack extends SkillPackMetadata {
  content: SkillPackContent
  aiConfig: SkillPackAIConfig
  customData?: Record<string, any>
  createdAt: string
  updatedAt: string
}

// ============================================================================
// Context & Knowledge Types
// ============================================================================

export interface ContextDocument {
  id: string
  name: string
  type: 'pdf' | 'docx' | 'xlsx' | 'csv' | 'txt' | 'image' | 'other'
  content: string
  extractedData: Record<string, any>
  skillPackIds: string[]
  tags: string[]
}

export interface ConversationContext {
  userId: string
  conversationId: string
  skillPackIds: string[]
  customerInfo?: {
    name?: string
    company?: string
    email?: string
    industry?: string
  }
  documents: ContextDocument[]
  previousMessages: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: string
  }>
  metadata: Record<string, any>
}

// ============================================================================
// API Response Types
// ============================================================================

export interface AssistantResponse {
  message: string
  suggestions?: string[]
  relevantData?: {
    products?: Product[]
    pricing?: PricingRule[]
    objectionHandlers?: ObjectionHandler[]
    faqs?: FAQ[]
  }
  interjections?: Array<{
    type: string
    content: string
    priority: number
  }>
  confidence: number
  sources?: string[]
}

export interface MeetingAnalysis {
  summary: string
  keyPoints: string[]
  decisions: string[]
  actionItems: Array<{
    title: string
    description?: string
    assignee?: string
    dueDate?: string
  }>
  sentiment: 'positive' | 'neutral' | 'negative'
  topics: string[]
  dealValue?: number
  nextSteps: string[]
}
