import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET')
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing headers' }, { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
  }

  const eventType = evt.type

  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data)
        break

      case 'user.updated':
        await handleUserUpdated(evt.data)
        break

      case 'user.deleted':
        await handleUserDeleted(evt.data)
        break

      default:
        console.log(`Unhandled Clerk event: ${eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Clerk webhook error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function handleUserCreated(data: any) {
  const { id, email_addresses, first_name, last_name, image_url } = data

  // Create Stripe customer
  const customer = await stripe.customers.create({
    email: email_addresses[0]?.email_address,
    name: `${first_name || ''} ${last_name || ''}`.trim(),
    metadata: {
      clerkUserId: id,
    },
  })

  // Create user and subscription in database
  await prisma.user.create({
    data: {
      id,
      email: email_addresses[0]?.email_address,
      firstName: first_name,
      lastName: last_name,
      imageUrl: image_url,
      subscription: {
        create: {
          stripeCustomerId: customer.id,
          plan: 'FREE',
          status: 'ACTIVE',
        },
      },
    },
  })

  console.log(`Created user ${id} with FREE plan`)
}

async function handleUserUpdated(data: any) {
  const { id, email_addresses, first_name, last_name, image_url } = data

  await prisma.user.update({
    where: { id },
    data: {
      email: email_addresses[0]?.email_address,
      firstName: first_name,
      lastName: last_name,
      imageUrl: image_url,
    },
  })

  console.log(`Updated user ${id}`)
}

async function handleUserDeleted(data: any) {
  const { id } = data

  // Delete user (cascade will handle subscription, usage, etc.)
  await prisma.user.delete({
    where: { id },
  })

  console.log(`Deleted user ${id}`)
}
