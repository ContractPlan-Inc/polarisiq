// ============================================================================
// AI Assistant Service
// Multi-model AI with skill pack integration
// ============================================================================

import { OpenAI } from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { SkillPackManager } from '../skillpacks/manager'
import type { AssistantResponse, ConversationContext } from '../skillpacks/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface AssistantConfig {
  model?: 'gpt-4' | 'gpt-4-turbo' | 'claude-3-opus' | 'claude-3-sonnet'
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

export class AIAssistant {
  /**
   * Generate response using skill packs and AI
   */
  static async generateResponse(
    context: ConversationContext,
    userMessage: string,
    config: AssistantConfig = {}
  ): Promise<AssistantResponse> {
    try {
      // Get relevant context from skill packs
      const skillPackContext = await SkillPackManager.getConversationContext(
        context.skillPackIds,
        userMessage
      )

      // Load skill packs
      const skillPacks = await SkillPackManager.getSkillPacks(context.skillPackIds)

      // Build system prompt
      const systemPrompt = SkillPackManager.buildSystemPrompt(skillPacks)

      // Build context message
      const contextMessage = this.buildContextMessage(skillPackContext, context)

      // Build conversation history
      const messages = [
        {
          role: 'system' as const,
          content: systemPrompt,
        },
        {
          role: 'system' as const,
          content: contextMessage,
        },
        ...context.previousMessages.slice(-10).map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user' as const,
          content: userMessage,
        },
      ]

      // Choose model
      const model = config.model || 'gpt-4-turbo'

      let responseText: string

      if (model.startsWith('gpt')) {
        // Use OpenAI
        const response = await openai.chat.completions.create({
          model: model === 'gpt-4-turbo' ? 'gpt-4-turbo-preview' : 'gpt-4',
          messages: messages as any,
          temperature: config.temperature || 0.7,
          max_tokens: config.maxTokens || 1000,
        })

        responseText = response.choices[0]?.message?.content || 'Sorry, I could not generate a response.'
      } else {
        // Use Anthropic Claude
        const response = await anthropic.messages.create({
          model: model === 'claude-3-opus' ? 'claude-3-opus-20240229' : 'claude-3-sonnet-20240229',
          max_tokens: config.maxTokens || 1000,
          temperature: config.temperature || 0.7,
          system: `${systemPrompt}\n\n${contextMessage}`,
          messages: context.previousMessages.slice(-10).map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content,
          })).concat([
            {
              role: 'user',
              content: userMessage,
            },
          ]) as any,
        })

        responseText = response.content[0].type === 'text'
          ? response.content[0].text
          : 'Sorry, I could not generate a response.'
      }

      // Generate suggestions based on context
      const suggestions = this.generateSuggestions(skillPackContext, userMessage)

      // Check for interjections
      const interjections = this.checkInterjections(
        skillPacks,
        userMessage,
        responseText
      )

      return {
        message: responseText,
        suggestions,
        relevantData: {
          products: skillPackContext.products,
          objectionHandlers: skillPackContext.objectionHandlers,
          faqs: skillPackContext.faqs,
        },
        interjections,
        confidence: 0.85,
        sources: skillPackContext.relevantKnowledge,
      }
    } catch (error) {
      console.error('Error generating assistant response:', error)

      return {
        message: 'I apologize, but I encountered an error processing your request. Please try again.',
        confidence: 0,
      }
    }
  }

  /**
   * Build context message from skill pack data
   */
  private static buildContextMessage(
    skillPackContext: ReturnType<typeof SkillPackManager.getConversationContext> extends Promise<infer T> ? T : never,
    context: ConversationContext
  ): string {
    const parts: string[] = []

    if (context.customerInfo?.name) {
      parts.push(`Customer: ${context.customerInfo.name}${context.customerInfo.company ? ` from ${context.customerInfo.company}` : ''}`)
    }

    if (skillPackContext.products.length > 0) {
      parts.push('\n**Relevant Products:**')
      skillPackContext.products.forEach(product => {
        parts.push(`- ${product.name} (${product.category}): ${product.description}`)
        if (product.pricing.retail) {
          parts.push(`  Price: $${product.pricing.retail}`)
        }
      })
    }

    if (skillPackContext.objectionHandlers.length > 0) {
      parts.push('\n**Objection Handlers:**')
      skillPackContext.objectionHandlers.forEach(handler => {
        parts.push(`- ${handler.objection}`)
        parts.push(`  Responses: ${handler.responses.join(', ')}`)
      })
    }

    if (skillPackContext.faqs.length > 0) {
      parts.push('\n**Relevant FAQs:**')
      skillPackContext.faqs.forEach(faq => {
        parts.push(`- Q: ${faq.question}`)
        parts.push(`  A: ${faq.answer}`)
      })
    }

    if (skillPackContext.relevantKnowledge.length > 0) {
      parts.push('\n**Additional Knowledge:**')
      skillPackContext.relevantKnowledge.forEach(knowledge => {
        parts.push(`- ${knowledge}`)
      })
    }

    return parts.join('\n')
  }

  /**
   * Generate helpful suggestions for the user
   */
  private static generateSuggestions(
    skillPackContext: any,
    userMessage: string
  ): string[] {
    const suggestions: string[] = []

    // Suggest products if relevant
    if (skillPackContext.products.length > 0) {
      const product = skillPackContext.products[0]
      suggestions.push(`Tell me more about ${product.name}`)
      if (product.pairings && product.pairings.length > 0) {
        suggestions.push(`What pairs well with ${product.name}?`)
      }
    }

    // Suggest objection handlers
    if (skillPackContext.objectionHandlers.length > 0) {
      const handler = skillPackContext.objectionHandlers[0]
      suggestions.push(`How do I handle: "${handler.objection}"?`)
    }

    // General suggestions
    if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
      suggestions.push('Show pricing comparison')
      suggestions.push('Explain value proposition')
    }

    return suggestions.slice(0, 3)
  }

  /**
   * Check for interjections based on rules
   */
  private static checkInterjections(
    skillPacks: any[],
    userMessage: string,
    assistantResponse: string
  ): Array<{ type: string; content: string; priority: number }> {
    const interjections: Array<{ type: string; content: string; priority: number }> = []

    for (const pack of skillPacks) {
      for (const rule of pack.aiConfig.interjectionRules || []) {
        if (rule.triggerType === 'keyword') {
          const lowerMessage = userMessage.toLowerCase()
          const lowerResponse = assistantResponse.toLowerCase()

          if (lowerMessage.includes(rule.trigger.toLowerCase()) ||
              lowerResponse.includes(rule.trigger.toLowerCase())) {
            interjections.push({
              type: rule.triggerType,
              content: rule.interjectionTemplate,
              priority: rule.priority,
            })
          }
        }
      }
    }

    return interjections.sort((a, b) => b.priority - a.priority).slice(0, 3)
  }

  /**
   * Stream response for real-time UI updates
   */
  static async *streamResponse(
    context: ConversationContext,
    userMessage: string,
    config: AssistantConfig = {}
  ): AsyncGenerator<string, void, unknown> {
    try {
      // Get context
      const skillPackContext = await SkillPackManager.getConversationContext(
        context.skillPackIds,
        userMessage
      )

      const skillPacks = await SkillPackManager.getSkillPacks(context.skillPackIds)
      const systemPrompt = SkillPackManager.buildSystemPrompt(skillPacks)
      const contextMessage = this.buildContextMessage(skillPackContext, context)

      const messages = [
        { role: 'system' as const, content: systemPrompt },
        { role: 'system' as const, content: contextMessage },
        ...context.previousMessages.slice(-10).map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: 'user' as const, content: userMessage },
      ]

      const model = config.model || 'gpt-4-turbo'

      if (model.startsWith('gpt')) {
        const stream = await openai.chat.completions.create({
          model: model === 'gpt-4-turbo' ? 'gpt-4-turbo-preview' : 'gpt-4',
          messages: messages as any,
          temperature: config.temperature || 0.7,
          max_tokens: config.maxTokens || 1000,
          stream: true,
        })

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ''
          if (content) {
            yield content
          }
        }
      } else {
        // Anthropic streaming
        const stream = await anthropic.messages.stream({
          model: model === 'claude-3-opus' ? 'claude-3-opus-20240229' : 'claude-3-sonnet-20240229',
          max_tokens: config.maxTokens || 1000,
          temperature: config.temperature || 0.7,
          system: `${systemPrompt}\n\n${contextMessage}`,
          messages: context.previousMessages.slice(-10).map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content,
          })).concat([
            { role: 'user', content: userMessage },
          ]) as any,
        })

        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            yield chunk.delta.text
          }
        }
      }
    } catch (error) {
      console.error('Error streaming response:', error)
      yield 'Sorry, I encountered an error. Please try again.'
    }
  }
}
