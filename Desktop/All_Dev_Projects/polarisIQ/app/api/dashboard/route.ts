import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user with subscription
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
      },
    })

    if (!user || !user.subscription) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get current month's usage
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const usage = await prisma.usage.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfMonth,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Get recent meetings
    const recentMeetings = await prisma.meeting.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        createdAt: true,
        expertUsed: true,
        pitchId: true,
      },
    })

    // Calculate duration for meetings (simplified - just use created time as estimate)
    const meetingsWithDuration = recentMeetings.map((meeting) => ({
      ...meeting,
      duration: 300, // Default 5 minutes for now
    }))

    return NextResponse.json({
      subscription: {
        plan: user.subscription.plan,
        status: user.subscription.status,
        usage: {
          textQueries: usage?.textQueries || 0,
          voiceQueries: usage?.voiceQueries || 0,
          meetings: usage?.meetings || 0,
          exports: usage?.exports || 0,
        },
      },
      recentMeetings: meetingsWithDuration,
    })
  } catch (error: any) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
