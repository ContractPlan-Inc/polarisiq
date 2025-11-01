// Usage tracking utilities

import { prisma } from './db'
import { checkLimit } from './subscriptions'

export async function trackUsage(
  userId: string,
  type: 'TEXT_QUERY' | 'VOICE_QUERY' | 'EXPERT_SWITCH' | 'PITCH_LOADED' | 'MEETING_STARTED' | 'EXPORT_NOTES',
  metadata?: any
) {
  try {
    await prisma.usage.create({
      data: {
        userId,
        type,
        metadata: metadata || undefined,
      },
    })
  } catch (error) {
    console.error('Failed to track usage:', error)
  }
}

export async function getUsageCount(
  userId: string,
  type: 'TEXT_QUERY' | 'VOICE_QUERY',
  periodStart?: Date
) {
  const startDate = periodStart || getStartOfMonth()

  const count = await prisma.usage.count({
    where: {
      userId,
      type,
      createdAt: {
        gte: startDate,
      },
    },
  })

  return count
}

export async function canUseFeature(
  userId: string,
  featureType: 'text' | 'voice'
): Promise<{ allowed: boolean; limit?: number; current?: number; message?: string }> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  })

  if (!subscription || subscription.status !== 'ACTIVE') {
    return {
      allowed: false,
      message: 'No active subscription',
    }
  }

  const usageType = featureType === 'text' ? 'TEXT_QUERY' : 'VOICE_QUERY'
  const limitType = featureType === 'text' ? 'textQueries' : 'voiceQueries'

  const currentUsage = await getUsageCount(userId, usageType)
  const allowed = checkLimit(subscription.plan, limitType, currentUsage)

  const plan = await import('./subscriptions').then(m => m.getPlanById(subscription.plan))
  const limit = plan.limits[limitType]

  if (!allowed) {
    return {
      allowed: false,
      limit: limit === -1 ? undefined : limit,
      current: currentUsage,
      message: `You've reached your ${featureType} query limit of ${limit} for this month. Please upgrade your plan.`,
    }
  }

  return {
    allowed: true,
    limit: limit === -1 ? undefined : limit,
    current: currentUsage,
  }
}

function getStartOfMonth(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

export async function saveMeeting(
  userId: string,
  data: {
    title?: string
    customerContext?: string
    mode: 'TEXT' | 'VOICE' | 'LIVE'
    duration?: number
    messages: any
    experts: string[]
    pitchId?: string
  }
) {
  return await prisma.meeting.create({
    data: {
      userId,
      ...data,
    },
  })
}

export async function saveActionItem(
  userId: string,
  content: string,
  meetingId?: string,
  dueDate?: Date
) {
  return await prisma.actionItem.create({
    data: {
      userId,
      meetingId,
      content,
      dueDate,
    },
  })
}
