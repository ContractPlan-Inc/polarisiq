// ============================================================================
// AI Assistant API
// Handles conversations with skill pack integration
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { AIAssistant } from '@/lib/ai/assistant'
import { db } from '@/lib/db'
import type { ConversationContext } from '@/lib/skillpacks/types'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const {
      message,
      conversationId,
      skillPackIds,
      customerInfo,
      stream = false,
    } = body

    if (!message || !skillPackIds || skillPackIds.length === 0) {
      return NextResponse.json(
        { error: 'Message and skill pack IDs are required' },
        { status: 400 }
      )
    }

    // Get or create user
    let user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check usage limits
    if (user.subscriptionTier === 'free' && user.monthlyQueries >= 10) {
      return NextResponse.json(
        { error: 'Monthly query limit reached. Please upgrade your plan.' },
        { status: 429 }
      )
    }

    // Get or create conversation
    let conversation
    if (conversationId) {
      conversation = await db.conversation.findUnique({
        where: { id: conversationId },
      })
    }

    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          userId: user.id,
          skillPackIds,
          customerName: customerInfo?.name,
          customerCompany: customerInfo?.company,
          customerEmail: customerInfo?.email,
          messages: [],
        },
      })
    }

    // Build conversation context
    const messages = (conversation.messages as any[]) || []
    const context: ConversationContext = {
      userId: user.id,
      conversationId: conversation.id,
      skillPackIds,
      customerInfo,
      documents: [],
      previousMessages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      })),
      metadata: {},
    }

    // Generate response
    if (stream) {
      // Return streaming response
      const encoder = new TextEncoder()
      const streamResponse = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of AIAssistant.streamResponse(context, message)) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`))
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          } catch (error) {
            controller.error(error)
          }
        },
      })

      return new Response(streamResponse, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    } else {
      const response = await AIAssistant.generateResponse(context, message)

      // Update conversation
      const updatedMessages = [
        ...messages,
        {
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        },
        {
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString(),
        },
      ]

      await db.conversation.update({
        where: { id: conversation.id },
        data: {
          messages: updatedMessages as any,
          updatedAt: new Date(),
        },
      })

      // Update usage
      await db.user.update({
        where: { id: user.id },
        data: {
          monthlyQueries: user.monthlyQueries + 1,
        },
      })

      return NextResponse.json({
        response: response.message,
        suggestions: response.suggestions,
        relevantData: response.relevantData,
        interjections: response.interjections,
        conversationId: conversation.id,
        confidence: response.confidence,
      })
    }
  } catch (error) {
    console.error('Assistant API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get conversation history
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      // Get all conversations for user
      const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
          conversations: {
            orderBy: { updatedAt: 'desc' },
            take: 20,
          },
        },
      })

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        conversations: user.conversations,
      })
    } else {
      // Get specific conversation
      const conversation = await db.conversation.findUnique({
        where: { id: conversationId },
      })

      if (!conversation) {
        return NextResponse.json(
          { error: 'Conversation not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        conversation,
      })
    }
  } catch (error) {
    console.error('Get conversation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
