// ============================================================================
// Skill Pack Manager
// Core engine for managing and retrieving skill pack knowledge
// ============================================================================

import { db } from '@/lib/db'
import type {
  SkillPack,
  SkillPackContent,
  Product,
  ObjectionHandler,
  FAQ,
  ConversationContext,
} from './types'

export class SkillPackManager {
  /**
   * Get skill pack by ID with full content
   */
  static async getSkillPack(skillPackId: string): Promise<SkillPack | null> {
    try {
      const pack = await db.skillPack.findUnique({
        where: { id: skillPackId },
      })

      if (!pack) return null

      return {
        id: pack.id,
        name: pack.name,
        slug: pack.slug,
        industry: pack.industry,
        version: pack.version,
        icon: pack.icon || undefined,
        description: pack.description,
        coverImage: pack.coverImage || undefined,
        isPremium: pack.isPremium,
        requiredTier: pack.requiredTier as any,
        content: {
          products: pack.products as Product[],
          pricing: pack.pricing as any[],
          competitors: pack.competitors as any[],
          objectionHandlers: pack.objectionHandlers as ObjectionHandler[],
          salesScripts: pack.salesScripts as any[],
          faqs: pack.faqs as FAQ[],
          regulations: pack.regulations as any[],
          expertPersonas: pack.expertPersonas as any[],
        },
        aiConfig: {
          systemPrompt: pack.systemPrompt,
          interjectionRules: pack.interjectionRules as any[],
        },
        customData: pack.customData as Record<string, any>,
        createdAt: pack.createdAt.toISOString(),
        updatedAt: pack.updatedAt.toISOString(),
      }
    } catch (error) {
      console.error('Error fetching skill pack:', error)
      return null
    }
  }

  /**
   * Get multiple skill packs by IDs
   */
  static async getSkillPacks(skillPackIds: string[]): Promise<SkillPack[]> {
    try {
      const packs = await Promise.all(
        skillPackIds.map(id => this.getSkillPack(id))
      )
      return packs.filter((pack): pack is SkillPack => pack !== null)
    } catch (error) {
      console.error('Error fetching skill packs:', error)
      return []
    }
  }

  /**
   * Search products across skill packs
   */
  static searchProducts(
    skillPacks: SkillPack[],
    query: string
  ): Product[] {
    const allProducts = skillPacks.flatMap(pack => pack.content.products)
    const lowerQuery = query.toLowerCase()

    return allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.pairings?.some(p => p.toLowerCase().includes(lowerQuery))
    )
  }

  /**
   * Find objection handlers by objection text
   */
  static findObjectionHandlers(
    skillPacks: SkillPack[],
    objectionText: string
  ): ObjectionHandler[] {
    const allHandlers = skillPacks.flatMap(pack => pack.content.objectionHandlers)
    const lowerText = objectionText.toLowerCase()

    // Exact match first
    const exactMatch = allHandlers.filter(handler =>
      handler.objection.toLowerCase() === lowerText
    )

    if (exactMatch.length > 0) return exactMatch

    // Partial match
    return allHandlers.filter(handler =>
      handler.objection.toLowerCase().includes(lowerText) ||
      lowerText.includes(handler.objection.toLowerCase())
    ).sort((a, b) => {
      // Sort by relevance (longer matching text = more relevant)
      const aRelevance = Math.min(
        a.objection.length,
        objectionText.length
      ) / Math.max(a.objection.length, objectionText.length)

      const bRelevance = Math.min(
        b.objection.length,
        objectionText.length
      ) / Math.max(b.objection.length, objectionText.length)

      return bRelevance - aRelevance
    })
  }

  /**
   * Search FAQs across skill packs
   */
  static searchFAQs(
    skillPacks: SkillPack[],
    query: string
  ): FAQ[] {
    const allFAQs = skillPacks.flatMap(pack => pack.content.faqs)
    const lowerQuery = query.toLowerCase()

    return allFAQs.filter(faq =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery) ||
      faq.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  /**
   * Get relevant context from skill packs for a conversation
   */
  static async getConversationContext(
    skillPackIds: string[],
    query: string
  ): Promise<{
    products: Product[]
    objectionHandlers: ObjectionHandler[]
    faqs: FAQ[]
    relevantKnowledge: string[]
  }> {
    const skillPacks = await this.getSkillPacks(skillPackIds)

    const products = this.searchProducts(skillPacks, query).slice(0, 5)
    const objectionHandlers = this.findObjectionHandlers(skillPacks, query).slice(0, 3)
    const faqs = this.searchFAQs(skillPacks, query).slice(0, 5)

    // Extract relevant knowledge items
    const relevantKnowledge: string[] = []

    for (const pack of skillPacks) {
      // Add relevant sales scripts
      pack.content.salesScripts.forEach(script => {
        if (script.name.toLowerCase().includes(query.toLowerCase())) {
          relevantKnowledge.push(`Sales Script: ${script.name} - ${script.script}`)
        }
      })

      // Add relevant regulations
      pack.content.regulations.forEach(reg => {
        if (reg.title.toLowerCase().includes(query.toLowerCase()) ||
            reg.description.toLowerCase().includes(query.toLowerCase())) {
          relevantKnowledge.push(`Regulation: ${reg.title} - ${reg.description}`)
        }
      })
    }

    return {
      products,
      objectionHandlers,
      faqs,
      relevantKnowledge: relevantKnowledge.slice(0, 10),
    }
  }

  /**
   * Build system prompt from skill packs
   */
  static buildSystemPrompt(skillPacks: SkillPack[]): string {
    if (skillPacks.length === 0) {
      return 'You are a professional sales assistant. Help the user with their sales conversation.'
    }

    const prompts = skillPacks.map(pack => pack.aiConfig.systemPrompt)
    const industries = [...new Set(skillPacks.map(pack => pack.industry))]

    const basePrompt = `You are a legendary AI sales assistant with deep expertise in: ${industries.join(', ')}.

You have access to comprehensive skill packs with detailed product knowledge, pricing, objection handlers, and sales strategies.

Your role is to provide expert-level support during sales conversations by:
1. Answering questions with specific, accurate information from the knowledge base
2. Suggesting relevant products and services
3. Handling objections with proven responses
4. Providing pricing and technical specifications
5. Offering strategic sales advice

Always be professional, confident, and helpful. Provide specific details when available.`

    return `${basePrompt}\n\n${prompts.join('\n\n')}`
  }

  /**
   * Get all available skill packs for a user based on their subscription
   */
  static async getAvailableSkillPacks(
    userId: string
  ): Promise<SkillPack[]> {
    try {
      const user = await db.user.findUnique({
        where: { id: userId },
      })

      if (!user) return []

      const packs = await db.skillPack.findMany({
        where: {
          OR: [
            { isPublic: true },
            { userId: userId },
          ],
          isActive: true,
        },
        orderBy: [
          { isPremium: 'asc' },
          { usageCount: 'desc' },
        ],
      })

      return packs.map(pack => ({
        id: pack.id,
        name: pack.name,
        slug: pack.slug,
        industry: pack.industry,
        version: pack.version,
        icon: pack.icon || undefined,
        description: pack.description,
        coverImage: pack.coverImage || undefined,
        isPremium: pack.isPremium,
        requiredTier: pack.requiredTier as any,
        content: {
          products: pack.products as Product[],
          pricing: pack.pricing as any[],
          competitors: pack.competitors as any[],
          objectionHandlers: pack.objectionHandlers as ObjectionHandler[],
          salesScripts: pack.salesScripts as any[],
          faqs: pack.faqs as FAQ[],
          regulations: pack.regulations as any[],
          expertPersonas: pack.expertPersonas as any[],
        },
        aiConfig: {
          systemPrompt: pack.systemPrompt,
          interjectionRules: pack.interjectionRules as any[],
        },
        customData: pack.customData as Record<string, any>,
        createdAt: pack.createdAt.toISOString(),
        updatedAt: pack.updatedAt.toISOString(),
      }))
    } catch (error) {
      console.error('Error fetching available skill packs:', error)
      return []
    }
  }
}
