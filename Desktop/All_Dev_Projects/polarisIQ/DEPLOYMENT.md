# PolarisIQ Deployment Guide

Complete guide to deploy PolarisIQ to production with all services configured.

## Quick Start (Automated)

Run the automated setup script:

```bash
npm run setup
```

This will guide you through setting up:
- Neon Database
- Clerk Authentication
- Stripe Payments
- Vercel Deployment

## Manual Setup

### 1. Prerequisites

- Node.js 18+ installed
- Git configured
- Vercel CLI (`npm install -g vercel`)

### 2. Service Setup

#### Neon Database (PostgreSQL)

1. Go to https://console.neon.tech
2. Sign up / Log in
3. Create new project: **polarisiq-production**
4. Select region closest to users
5. Copy connection string
6. Save as `DATABASE_URL` and `DIRECT_URL`

**Format:**
```
postgresql://username:password@ep-xxxxx.region.aws.neon.tech/polarisiq?sslmode=require
```

#### Clerk Authentication

1. Go to https://dashboard.clerk.com
2. Create new application: **PolarisIQ**
3. Enable Email authentication
4. Go to **API Keys** section
5. Copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

6. Go to **Webhooks** → Add Endpoint
   - URL: `https://your-app.vercel.app/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`
   - Copy `CLERK_WEBHOOK_SECRET`

#### Stripe Payments

1. Go to https://dashboard.stripe.com
2. Sign up / Log in
3. Go to **Developers → API Keys**
4. Copy (use Test mode for development):
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`

5. Create Products:
   Go to **Products** → Create Product

   **Product 1: Starter**
   - Name: PolarisIQ Starter
   - Price: $29/month (recurring)
   - Description: 100 text queries per month
   - Copy price ID → `STRIPE_PRICE_ID_STARTER`

   **Product 2: Professional** ⭐
   - Name: PolarisIQ Professional
   - Price: $99/month (recurring)
   - Description: 500 queries + voice features
   - Copy price ID → `STRIPE_PRICE_ID_PROFESSIONAL`

   **Product 3: Enterprise**
   - Name: PolarisIQ Enterprise
   - Price: $299/month (recurring)
   - Description: 2000 queries + voice + teams
   - Copy price ID → `STRIPE_PRICE_ID_ENTERPRISE`

6. Set up Webhook:
   - Go to **Developers → Webhooks** → Add Endpoint
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Events to select:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy `STRIPE_WEBHOOK_SECRET`

### 3. Local Development

Create `.env.local` file:

```bash
# Database
DATABASE_URL="postgresql://user:pass@ep-xxxxx.region.aws.neon.tech/polarisiq?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-xxxxx.region.aws.neon.tech/polarisiq?sslmode=require"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="PolarisIQ"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxx"
CLERK_SECRET_KEY="sk_test_xxxxx"
CLERK_WEBHOOK_SECRET="whsec_xxxxx"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/assistant"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxx"
STRIPE_SECRET_KEY="sk_test_xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"
STRIPE_PRICE_ID_STARTER="price_xxxxx"
STRIPE_PRICE_ID_PROFESSIONAL="price_xxxxx"
STRIPE_PRICE_ID_ENTERPRISE="price_xxxxx"
```

Install dependencies and run migrations:

```bash
npm install
npx prisma generate
npx prisma db push
```

Start development server:

```bash
npm run dev
```

Visit http://localhost:3000

### 4. Deploy to Vercel

#### Option A: Automated Deployment

```bash
npm run deploy
```

#### Option B: Manual Deployment

1. Login to Vercel:
```bash
vercel login
```

2. Link project:
```bash
vercel link
```

3. Add environment variables:
```bash
# For each variable, run:
vercel env add VARIABLE_NAME production
# Then paste the value when prompted

# Required variables:
vercel env add DATABASE_URL production
vercel env add DIRECT_URL production
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
vercel env add CLERK_SECRET_KEY production
vercel env add CLERK_WEBHOOK_SECRET production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add STRIPE_PRICE_ID_STARTER production
vercel env add STRIPE_PRICE_ID_PROFESSIONAL production
vercel env add STRIPE_PRICE_ID_ENTERPRISE production
vercel env add NEXT_PUBLIC_APP_URL production
```

4. Deploy:
```bash
vercel --prod
```

### 5. Post-Deployment

After deployment, you'll get a URL like: `https://polarisiq-xxxxx.vercel.app`

#### Update Webhook URLs

1. **Clerk Dashboard** → Webhooks → Edit Endpoint
   - Change URL to: `https://your-actual-domain.vercel.app/api/webhooks/clerk`

2. **Stripe Dashboard** → Webhooks → Edit Endpoint
   - Change URL to: `https://your-actual-domain.vercel.app/api/webhooks/stripe`

3. **Vercel Environment**
   - Update `NEXT_PUBLIC_APP_URL` to your actual domain

#### Test the Application

1. **Sign Up Flow**
   - Go to `/sign-up`
   - Create account
   - Verify user created in Clerk
   - Verify FREE subscription created in database

2. **Upgrade Flow**
   - Go to `/pricing`
   - Click upgrade to Professional
   - Complete Stripe checkout (use test card: 4242 4242 4242 4242)
   - Verify subscription updated in database

3. **Usage Tracking**
   - Use text assistant (`/assistant`)
   - Check usage in dashboard (`/dashboard`)
   - Verify counts increment

4. **Voice Features** (Professional/Enterprise only)
   - Go to `/voice`
   - Test voice interface on iPad
   - Verify voice queries tracked

### 6. Custom Domain (Optional)

1. In Vercel Dashboard:
   - Go to your project → Settings → Domains
   - Add your custom domain: `polarisiq.com`

2. Update DNS records as instructed

3. Update environment variables:
```bash
vercel env add NEXT_PUBLIC_APP_URL production
# Enter: https://polarisiq.com
```

4. Update webhook URLs in Clerk and Stripe

### 7. Monitoring & Analytics

#### PostHog (Optional)

1. Go to https://posthog.com
2. Create project
3. Add to Vercel:
```bash
vercel env add NEXT_PUBLIC_POSTHOG_KEY production
vercel env add NEXT_PUBLIC_POSTHOG_HOST production
```

#### Sentry (Optional)

1. Go to https://sentry.io
2. Create project for Next.js
3. Follow integration instructions
4. Add to Vercel:
```bash
vercel env add NEXT_PUBLIC_SENTRY_DSN production
```

## Troubleshooting

### Database Connection Issues

```bash
# Test connection locally
npx prisma db push --skip-generate
```

### Webhook Not Working

1. Check webhook URL is correct
2. Verify signing secret matches
3. Check Vercel logs: `vercel logs`
4. Test webhook in dashboard

### Stripe Checkout Fails

1. Verify all STRIPE_PRICE_ID_* variables are set
2. Check Stripe dashboard for errors
3. Ensure customer was created in Stripe

### Build Fails

```bash
# Common fix - regenerate Prisma client
npm run postinstall
```

## Support

For issues:
1. Check Vercel logs: `vercel logs --follow`
2. Check database: `npm run db:studio`
3. Review webhook logs in Clerk/Stripe dashboards

## Security Checklist

Before going live:

- [ ] Enable Stripe live mode (not test mode)
- [ ] Set up proper CORS in production
- [ ] Enable rate limiting
- [ ] Set up monitoring (Sentry)
- [ ] Configure proper backup schedule (Neon)
- [ ] Review Terms of Service
- [ ] Review Privacy Policy
- [ ] Test payment refund flow
- [ ] Test subscription cancellation
- [ ] Set up uptime monitoring
- [ ] Configure proper logging

## Cost Estimates

### Free Tier Limits

- **Vercel**: 100GB bandwidth/month
- **Neon**: 10 projects, 3GB storage
- **Clerk**: 10,000 MAU (Monthly Active Users)
- **Stripe**: No monthly fee, 2.9% + $0.30 per transaction

### Estimated Monthly Costs (100 paying users)

- Vercel Pro: $20/month (if exceeded free tier)
- Neon Scale: $19/month (for production database)
- Clerk Pro: $25/month (if > 10k users)
- Stripe: ~$300/month (on $10k revenue)

**Total**: ~$364/month for infrastructure
**Revenue** (100 users @ avg $50): $5,000/month
**Profit Margin**: ~93%

## Next Steps

1. ✅ Deploy application
2. ⬜ Set up custom domain
3. ⬜ Configure monitoring
4. ⬜ Add email notifications (Resend)
5. ⬜ Set up analytics (PostHog)
6. ⬜ Create marketing materials
7. ⬜ Launch!

---

**Your PolarisIQ app is ready to make money! 🚀**

For questions: support@polarisiq.com
