// ============================================================================
// Skill Packs API
// Manage and retrieve skill packs
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { SkillPackManager } from '@/lib/skillpacks/manager'
import { db } from '@/lib/db'

// Get available skill packs for user
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get available skill packs based on subscription tier
    const skillPacks = await SkillPackManager.getAvailableSkillPacks(user.id)

    return NextResponse.json({
      skillPacks,
      activeSkillPacks: user.activeSkillPacks,
    })
  } catch (error) {
    console.error('Get skill packs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Activate/deactivate skill packs for user
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
    const { skillPackIds } = body

    if (!Array.isArray(skillPackIds)) {
      return NextResponse.json(
        { error: 'skillPackIds must be an array' },
        { status: 400 }
      )
    }

    // Update user's active skill packs
    const user = await db.user.update({
      where: { clerkId: userId },
      data: {
        activeSkillPacks: skillPackIds,
      },
    })

    return NextResponse.json({
      success: true,
      activeSkillPacks: user.activeSkillPacks,
    })
  } catch (error) {
    console.error('Update skill packs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
