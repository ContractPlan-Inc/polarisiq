import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, phone, role, teamSize, message, requestType } = body

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Name, email, and company are required' },
        { status: 400 }
      )
    }

    // Store in waitlist/contact table
    await prisma.waitlist.create({
      data: {
        email,
        name,
        company,
        phone: phone || null,
        role: role || null,
        teamSize: teamSize || null,
        message: message || null,
        requestType: requestType || 'demo',
      },
    })

    // TODO: Send notification email via Resend
    // await sendContactNotification({ name, email, company, requestType })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
