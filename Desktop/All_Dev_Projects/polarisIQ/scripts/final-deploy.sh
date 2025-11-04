#!/bin/bash
# PolarisIQ - Final Production Deployment
# This script deploys your app to Vercel with all services configured

set -e

echo "════════════════════════════════════════════════════════════"
echo "  PolarisIQ - Production Deployment Starting..."
echo "════════════════════════════════════════════════════════════"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if running from project root
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Must run from project root${NC}"
    exit 1
fi

# Check for Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Installing Vercel CLI globally...${NC}"
    npm install -g vercel
fi

echo -e "${BLUE}Step 1/7: Vercel Authentication${NC}"
echo "──────────────────────────────────────────────────"
vercel whoami 2>/dev/null || {
    echo "Please login to Vercel..."
    vercel login
}
echo -e "${GREEN}✓ Authenticated with Vercel${NC}\n"

echo -e "${BLUE}Step 2/7: Link Project to Vercel${NC}"
echo "──────────────────────────────────────────────────"
vercel link --yes
echo -e "${GREEN}✓ Project linked${NC}\n"

echo -e "${BLUE}Step 3/7: Service Configuration${NC}"
echo "──────────────────────────────────────────────────"
echo ""
echo "You need to set up 3 services:"
echo "1. Neon (Database)     - https://console.neon.tech"
echo "2. Clerk (Auth)        - https://dashboard.clerk.com"
echo "3. Stripe (Payments)   - https://dashboard.stripe.com"
echo ""
echo "I'll guide you through each one..."
echo ""

# Neon Setup
echo -e "${YELLOW}━━━ Neon Database Setup ━━━${NC}"
echo "1. Go to: https://console.neon.tech"
echo "2. Create project: 'polarisiq-production'"
echo "3. Copy connection string"
echo ""
read -p "Press ENTER when ready..."
read -p "Paste DATABASE_URL: " DATABASE_URL
echo ""

vercel env add DATABASE_URL production <<< "$DATABASE_URL" --yes
vercel env add DATABASE_URL preview <<< "$DATABASE_URL" --yes
vercel env add DIRECT_URL production <<< "$DATABASE_URL" --yes
vercel env add DIRECT_URL preview <<< "$DATABASE_URL" --yes
echo -e "${GREEN}✓ Database configured${NC}\n"

# Clerk Setup
echo -e "${YELLOW}━━━ Clerk Authentication Setup ━━━${NC}"
echo "1. Go to: https://dashboard.clerk.com"
echo "2. Create application: 'PolarisIQ'"
echo "3. Enable Email sign-in"
echo "4. Get API keys"
echo ""
read -p "Press ENTER when ready..."
read -p "Paste NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: " CLERK_PUB
read -p "Paste CLERK_SECRET_KEY: " -s CLERK_SECRET
echo ""

vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production <<< "$CLERK_PUB" --yes
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY preview <<< "$CLERK_PUB" --yes
vercel env add CLERK_SECRET_KEY production <<< "$CLERK_SECRET" --yes
vercel env add CLERK_SECRET_KEY preview <<< "$CLERK_SECRET" --yes

# Clerk URLs
vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production <<< "/sign-in" --yes
vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL production <<< "/sign-up" --yes
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL production <<< "/dashboard" --yes
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL production <<< "/onboarding" --yes
echo -e "${GREEN}✓ Clerk configured${NC}\n"

# Stripe Setup
echo -e "${YELLOW}━━━ Stripe Payment Setup ━━━${NC}"
echo "1. Go to: https://dashboard.stripe.com"
echo "2. Get API keys (use Test mode)"
echo ""
read -p "Press ENTER when ready..."
read -p "Paste NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: " STRIPE_PUB
read -p "Paste STRIPE_SECRET_KEY: " -s STRIPE_SECRET
echo ""

vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production <<< "$STRIPE_PUB" --yes
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY preview <<< "$STRIPE_PUB" --yes
vercel env add STRIPE_SECRET_KEY production <<< "$STRIPE_SECRET" --yes
vercel env add STRIPE_SECRET_KEY preview <<< "$STRIPE_SECRET" --yes

echo ""
echo "Now create 3 subscription products in Stripe:"
echo "  - Starter: \$29/month"
echo "  - Professional: \$99/month"
echo "  - Enterprise: \$299/month"
echo ""
read -p "Press ENTER when products created..."
read -p "Paste STRIPE_PRICE_ID_STARTER (price_xxx): " PRICE_START
read -p "Paste STRIPE_PRICE_ID_PROFESSIONAL (price_xxx): " PRICE_PRO
read -p "Paste STRIPE_PRICE_ID_ENTERPRISE (price_xxx): " PRICE_ENT
echo ""

vercel env add STRIPE_PRICE_ID_STARTER production <<< "$PRICE_START" --yes
vercel env add STRIPE_PRICE_ID_PROFESSIONAL production <<< "$PRICE_PRO" --yes
vercel env add STRIPE_PRICE_ID_ENTERPRISE production <<< "$PRICE_ENT" --yes
echo -e "${GREEN}✓ Stripe configured${NC}\n"

# App Configuration
echo -e "${BLUE}Step 4/7: App Configuration${NC}"
echo "──────────────────────────────────────────────────"
vercel env add NEXT_PUBLIC_APP_NAME production <<< "PolarisIQ" --yes
echo -e "${GREEN}✓ App config set${NC}\n"

# Deploy
echo -e "${BLUE}Step 5/7: Deploying to Production${NC}"
echo "──────────────────────────────────────────────────"
DEPLOY_URL=$(vercel --prod --yes 2>&1 | tee /dev/tty | grep -oP 'https://[^\s]+' | tail -1)
echo -e "${GREEN}✓ Deployed!${NC}\n"

# Set APP_URL
echo -e "${BLUE}Step 6/7: Updating App URL${NC}"
echo "──────────────────────────────────────────────────"
vercel env add NEXT_PUBLIC_APP_URL production <<< "$DEPLOY_URL" --yes
echo -e "${GREEN}✓ App URL set${NC}\n"

# Webhooks
echo -e "${BLUE}Step 7/7: Configure Webhooks${NC}"
echo "──────────────────────────────────────────────────"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Set up webhooks now!${NC}"
echo ""
echo "Clerk Webhook:"
echo "  URL: ${DEPLOY_URL}/api/webhooks/clerk"
echo "  Events: user.created, user.updated, user.deleted"
echo "  Go to: https://dashboard.clerk.com -> Webhooks"
echo ""
echo "Stripe Webhook:"
echo "  URL: ${DEPLOY_URL}/api/webhooks/stripe"
echo "  Events: customer.subscription.*"
echo "  Go to: https://dashboard.stripe.com/webhooks"
echo ""
read -p "Press ENTER after webhooks are set up..."

read -p "Paste CLERK_WEBHOOK_SECRET (whsec_xxx): " CLERK_WH
read -p "Paste STRIPE_WEBHOOK_SECRET (whsec_xxx): " STRIPE_WH
echo ""

vercel env add CLERK_WEBHOOK_SECRET production <<< "$CLERK_WH" --yes
vercel env add STRIPE_WEBHOOK_SECRET production <<< "$STRIPE_WH" --yes

# Redeploy with webhooks
echo "Redeploying with webhook secrets..."
vercel --prod --yes > /dev/null 2>&1
echo -e "${GREEN}✓ Webhooks configured${NC}\n"

# Success!
echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}🎉  DEPLOYMENT COMPLETE!${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Your PolarisIQ app is live at:"
echo -e "${BLUE}${DEPLOY_URL}${NC}"
echo ""
echo "Test these flows:"
echo "1. Sign up: ${DEPLOY_URL}/sign-up"
echo "2. Pricing: ${DEPLOY_URL}/pricing"
echo "3. Dashboard: ${DEPLOY_URL}/dashboard"
echo ""
echo -e "${GREEN}Your app is ready to make money! 💰${NC}"
echo ""
