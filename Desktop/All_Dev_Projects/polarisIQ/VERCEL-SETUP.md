# 🚀 Deploy PolarisIQ to Vercel - Step by Step

Your PolarisIQ app is ready to deploy! Follow these simple steps to go live in 15 minutes.

---

## Option 1: One-Click Deploy (Easiest)

### Step 1: Click the Deploy Button

Click this button to deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ContractPlan-Inc/polarisiq&project-name=polarisiq&repository-name=polarisiq)

This will:
1. Fork the repository to your GitHub
2. Create a new Vercel project
3. Prompt you for environment variables
4. Deploy automatically

### Step 2: Set Environment Variables

When prompted, enter these values:

#### Database (Neon)
```
DATABASE_URL=postgresql://user:password@ep-xxx.aws.neon.tech/polarisiq?sslmode=require
DIRECT_URL=postgresql://user:password@ep-xxx.aws.neon.tech/polarisiq?sslmode=require
```
Get from: https://console.neon.tech (create project: polarisiq-production)

#### Authentication (Clerk)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxx
```
Get from: https://dashboard.clerk.com (create app: PolarisIQ)

#### Payments (Stripe)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_ID_STARTER=price_xxxxx
STRIPE_PRICE_ID_PROFESSIONAL=price_xxxxx
STRIPE_PRICE_ID_ENTERPRISE=price_xxxxx
```
Get from: https://dashboard.stripe.com

#### App Config
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME=PolarisIQ
```

---

## Option 2: Deploy via Command Line

### Prerequisites

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```
This opens your browser for authentication.

### Step 1: Navigate to Project

```bash
cd /home/user/polarisiq/Desktop/All_Dev_Projects/polarisIQ
```

### Step 2: Run Deployment Script

```bash
bash scripts/vercel-deploy.sh
```

This will:
- Link your project to Vercel
- Deploy to production
- Give you your live URL

### Step 3: Add Environment Variables

After deployment, go to your Vercel dashboard:

1. Open: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add all 22 required variables (see list above)

### Step 4: Redeploy

After adding environment variables:

```bash
vercel --prod
```

---

## Option 3: Manual Deployment via Vercel Dashboard

### Step 1: Create Account

1. Go to https://vercel.com/signup
2. Sign up with GitHub (recommended)

### Step 2: Import Project

1. Click **"Add New Project"**
2. Select **"Import Git Repository"**
3. Connect your GitHub account
4. Select `ContractPlan-Inc/polarisiq` repository
5. Select branch: `claude/init-polarisiq-project-011CUZugWxGtHcYaJvxzgWgM`

### Step 3: Configure Project

**Framework Preset**: Next.js

**Build Command**:
```bash
npx prisma generate && next build
```

**Install Command**:
```bash
npm install --legacy-peer-deps
```

**Output Directory**:
```
.next
```

**Root Directory**:
```
(leave empty - use root)
```

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add all 22 variables.

See `.env.example` file for the complete list.

### Step 5: Deploy

Click **"Deploy"** button.

Deployment takes about 3-5 minutes.

---

## Required Services Setup

Before deploying, set up these free services:

### 1. Neon Database (2 minutes)

1. Go to: https://console.neon.tech
2. Sign up with GitHub
3. Click **"Create Project"**
4. Name: `polarisiq-production`
5. Select region closest to you
6. Copy connection string

**Connection String Format:**
```
postgresql://username:password@ep-xxxxx.region.aws.neon.tech/polarisiq?sslmode=require
```

Use this for both `DATABASE_URL` and `DIRECT_URL`.

### 2. Clerk Authentication (3 minutes)

1. Go to: https://dashboard.clerk.com/sign-up
2. Click **"Create Application"**
3. Name: `PolarisIQ`
4. Enable **"Email"** sign-in method
5. Go to **"API Keys"** section
6. Copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with pk_)
   - `CLERK_SECRET_KEY` (starts with sk_)

**Set up Webhook** (after deployment):
1. Go to **"Webhooks"** → **"Add Endpoint"**
2. URL: `https://your-app.vercel.app/api/webhooks/clerk`
3. Events: Select `user.created`, `user.updated`, `user.deleted`
4. Copy signing secret → `CLERK_WEBHOOK_SECRET`

### 3. Stripe Payments (5 minutes)

1. Go to: https://dashboard.stripe.com/register
2. Complete account setup
3. Go to **"Developers"** → **"API Keys"**
4. Use **Test Mode** keys:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (starts with pk_test_)
   - `STRIPE_SECRET_KEY` (starts with sk_test_)

**Create Products:**
1. Go to **"Products"** → **"Add Product"**
2. Create 3 subscription products:

**Product 1: Starter**
- Name: PolarisIQ Starter
- Price: $29/month (recurring)
- Description: 100 text queries per month
- Copy Price ID → `STRIPE_PRICE_ID_STARTER`

**Product 2: Professional**
- Name: PolarisIQ Professional
- Price: $99/month (recurring)
- Description: 500 queries + voice features
- Copy Price ID → `STRIPE_PRICE_ID_PROFESSIONAL`

**Product 3: Enterprise**
- Name: PolarisIQ Enterprise
- Price: $299/month (recurring)
- Description: 2000 queries + voice + teams
- Copy Price ID → `STRIPE_PRICE_ID_ENTERPRISE`

**Set up Webhook** (after deployment):
1. Go to **"Developers"** → **"Webhooks"** → **"Add Endpoint"**
2. URL: `https://your-app.vercel.app/api/webhooks/stripe`
3. Events: Select all `customer.subscription.*` events
4. Copy signing secret → `STRIPE_WEBHOOK_SECRET`

---

## Environment Variables Checklist

Make sure you have all 22 environment variables:

### Database (2 vars)
- [ ] DATABASE_URL
- [ ] DIRECT_URL

### Clerk Authentication (7 vars)
- [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- [ ] CLERK_SECRET_KEY
- [ ] CLERK_WEBHOOK_SECRET
- [ ] NEXT_PUBLIC_CLERK_SIGN_IN_URL (set to: `/sign-in`)
- [ ] NEXT_PUBLIC_CLERK_SIGN_UP_URL (set to: `/sign-up`)
- [ ] NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL (set to: `/dashboard`)
- [ ] NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL (set to: `/onboarding`)

### Stripe Payments (6 vars)
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_WEBHOOK_SECRET
- [ ] STRIPE_PRICE_ID_STARTER
- [ ] STRIPE_PRICE_ID_PROFESSIONAL
- [ ] STRIPE_PRICE_ID_ENTERPRISE

### App Configuration (2 vars)
- [ ] NEXT_PUBLIC_APP_URL (your Vercel URL)
- [ ] NEXT_PUBLIC_APP_NAME (set to: `PolarisIQ`)

---

## Post-Deployment Steps

After successful deployment:

### 1. Test the Application

Visit your live URL and test:

**Sign Up Flow:**
```
https://your-app.vercel.app/sign-up
```
- Create account
- Verify email
- Complete onboarding
- Check dashboard shows FREE plan

**Upgrade Flow:**
```
https://your-app.vercel.app/pricing
```
- Click "Upgrade to Professional"
- Use test card: `4242 4242 4242 4242`
- Verify redirected to dashboard
- Check plan updated to Professional

**Text Assistant:**
```
https://your-app.vercel.app/assistant
```
- Ask a question
- Check response from expert
- Verify query count increases

**Voice Interface** (Professional+ only):
```
https://your-app.vercel.app/voice
```
- Click "Start Listening"
- Test voice recognition
- Check voice query tracked

### 2. Verify Webhooks

**Check Clerk Webhook:**
1. Go to Clerk Dashboard → Webhooks
2. View webhook logs
3. Verify user.created events working

**Check Stripe Webhook:**
1. Go to Stripe Dashboard → Webhooks
2. View webhook logs
3. Verify subscription events working

### 3. Run Database Migrations

The Prisma schema will be automatically generated during build.

To view your database:
```bash
npx prisma studio
```

---

## Troubleshooting

### Build Fails

**Error: "Prisma generate failed"**
- Check DATABASE_URL is set correctly
- Verify connection string has `?sslmode=require`
- Check Neon database is active

**Error: "Module not found"**
- Ensure install command uses `--legacy-peer-deps`
- Check package.json is committed

### Authentication Issues

**Can't sign up:**
- Verify Clerk keys are correct
- Check Clerk webhook URL is correct
- Ensure webhook secret is set

**Webhook failures:**
- Verify webhook URL matches deployment URL
- Check webhook signing secrets
- View webhook logs in Clerk/Stripe dashboards

### Payment Issues

**Checkout fails:**
- Check all Stripe price IDs are set
- Verify Stripe keys are correct (test mode)
- Ensure customer was created in Stripe

**Subscription not updating:**
- Check Stripe webhook is configured
- Verify webhook secret is correct
- View webhook logs for errors

---

## Going Live

Once everything works in test mode:

### 1. Switch to Live Mode

**Stripe:**
1. Toggle to "Live Mode" in Stripe dashboard
2. Get live API keys
3. Update environment variables in Vercel:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_live_)
   - `STRIPE_SECRET_KEY` (sk_live_)
4. Recreate products in live mode
5. Update price ID environment variables

**Clerk:**
1. Switch to production instance
2. Update environment variables if needed

### 2. Add Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable
5. Update webhook URLs in Clerk and Stripe

### 3. Enable Monitoring

**Vercel Analytics:**
1. Go to Project Settings → Analytics
2. Enable Web Analytics

**Error Tracking** (optional):
- Set up Sentry
- Add `SENTRY_DSN` environment variable

---

## Support

Need help?

1. **Check logs:** `vercel logs --follow`
2. **View builds:** Vercel Dashboard → Deployments
3. **Database:** Neon Dashboard → Monitoring
4. **Webhooks:** Check Stripe/Clerk webhook logs

---

## Success!

Once deployed, you have a fully functional SaaS application with:

✅ User authentication & registration
✅ Payment processing & subscriptions
✅ Usage tracking & limits
✅ Professional UI/UX
✅ Voice & text interfaces
✅ Expert AI system
✅ Legal compliance pages

**Your app is ready to make money!** 💰

---

**Estimated deployment time:** 15 minutes
**Monthly infrastructure cost:** $0-$64 (depending on usage)
**Revenue potential:** $4,550+/month

🎉 **You're ready to launch!**
