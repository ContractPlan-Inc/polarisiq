#!/bin/bash
# PolarisIQ Automated Vercel & Services Setup
# This script sets up Vercel, Neon, Clerk, and Stripe automatically

set -e  # Exit on error

echo "🚀 PolarisIQ Commercial Deployment Setup"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run from project root.${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Installing dependencies...${NC}"
npm install

echo ""
echo -e "${BLUE}Step 2: Checking Vercel authentication...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}Please authenticate with Vercel:${NC}"
    vercel login
fi

echo ""
echo -e "${GREEN}✓ Authenticated with Vercel${NC}"
VERCEL_USER=$(vercel whoami)
echo -e "  Logged in as: ${VERCEL_USER}"

echo ""
echo -e "${BLUE}Step 3: Linking Vercel project...${NC}"
# Link or create Vercel project
vercel link --yes

echo ""
echo -e "${BLUE}Step 4: Setting up Neon Database...${NC}"
echo -e "${YELLOW}Opening Neon console to create database...${NC}"
echo "1. Go to: https://console.neon.tech"
echo "2. Create a new project named: polarisiq-production"
echo "3. Copy the connection string"
echo ""
read -p "Press ENTER when you have your Neon connection string..."
read -p "Paste your DATABASE_URL (will be hidden): " -s DATABASE_URL
echo ""
read -p "Paste your DIRECT_URL (will be hidden): " -s DIRECT_URL
echo ""

# Set Neon database variables
vercel env add DATABASE_URL production <<< "$DATABASE_URL"
vercel env add DATABASE_URL preview <<< "$DATABASE_URL"
vercel env add DIRECT_URL production <<< "$DIRECT_URL"
vercel env add DIRECT_URL preview <<< "$DIRECT_URL"
echo -e "${GREEN}✓ Neon database configured${NC}"

echo ""
echo -e "${BLUE}Step 5: Setting up Clerk Authentication...${NC}"
echo -e "${YELLOW}Opening Clerk console...${NC}"
echo "1. Go to: https://dashboard.clerk.com"
echo "2. Create a new application named: PolarisIQ"
echo "3. Enable Email/Password authentication"
echo "4. Get your keys from API Keys section"
echo ""
read -p "Press ENTER when ready..."
read -p "Paste NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: " CLERK_PUB_KEY
read -p "Paste CLERK_SECRET_KEY (will be hidden): " -s CLERK_SECRET
echo ""

# Set Clerk variables
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production <<< "$CLERK_PUB_KEY"
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY preview <<< "$CLERK_PUB_KEY"
vercel env add CLERK_SECRET_KEY production <<< "$CLERK_SECRET"
vercel env add CLERK_SECRET_KEY preview <<< "$CLERK_SECRET"

echo ""
echo -e "${YELLOW}Setting Clerk URLs...${NC}"
# Get the Vercel deployment URL
VERCEL_URL=$(vercel inspect --token $(vercel whoami --token) 2>/dev/null | grep -o 'https://[^"]*' | head -1 || echo "")
if [ -z "$VERCEL_URL" ]; then
    read -p "Enter your Vercel app URL (e.g., https://polarisiq.vercel.app): " VERCEL_URL
fi

# Set Clerk URL variables
vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production <<< "/sign-in"
vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL production <<< "/sign-up"
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL production <<< "/assistant"
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL production <<< "/onboarding"

echo -e "${GREEN}✓ Clerk configured${NC}"

echo ""
echo -e "${BLUE}Step 6: Setting up Stripe Payments...${NC}"
echo -e "${YELLOW}Opening Stripe console...${NC}"
echo "1. Go to: https://dashboard.stripe.com"
echo "2. Get your API keys (use Test mode for now)"
echo "3. Create products for Starter, Professional, Enterprise plans"
echo ""
read -p "Press ENTER when ready..."
read -p "Paste NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: " STRIPE_PUB_KEY
read -p "Paste STRIPE_SECRET_KEY (will be hidden): " -s STRIPE_SECRET
echo ""

# Set Stripe variables
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production <<< "$STRIPE_PUB_KEY"
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY preview <<< "$STRIPE_PUB_KEY"
vercel env add STRIPE_SECRET_KEY production <<< "$STRIPE_SECRET"
vercel env add STRIPE_SECRET_KEY preview <<< "$STRIPE_SECRET"

echo ""
echo -e "${YELLOW}Now create Stripe products and prices...${NC}"
echo "Create 3 products with these prices:"
echo "  - Starter: \$29/month"
echo "  - Professional: \$99/month"
echo "  - Enterprise: \$299/month"
echo ""
read -p "Press ENTER when products are created..."
read -p "Paste STARTER price_id (price_xxx): " PRICE_STARTER
read -p "Paste PROFESSIONAL price_id (price_xxx): " PRICE_PRO
read -p "Paste ENTERPRISE price_id (price_xxx): " PRICE_ENT
echo ""

# Set Stripe price IDs
vercel env add STRIPE_PRICE_ID_STARTER production <<< "$PRICE_STARTER"
vercel env add STRIPE_PRICE_ID_PROFESSIONAL production <<< "$PRICE_PRO"
vercel env add STRIPE_PRICE_ID_ENTERPRISE production <<< "$PRICE_ENT"

echo -e "${GREEN}✓ Stripe configured${NC}"

echo ""
echo -e "${BLUE}Step 7: Setting application URL...${NC}"
vercel env add NEXT_PUBLIC_APP_URL production <<< "$VERCEL_URL"
vercel env add NEXT_PUBLIC_APP_URL preview <<< "$VERCEL_URL"
vercel env add NEXT_PUBLIC_APP_NAME production <<< "PolarisIQ"

echo ""
echo -e "${BLUE}Step 8: Setting up webhooks...${NC}"
echo -e "${YELLOW}Configure these webhooks:${NC}"
echo ""
echo "Clerk Webhook:"
echo "  URL: ${VERCEL_URL}/api/webhooks/clerk"
echo "  Events: user.created, user.updated, user.deleted"
echo ""
echo "Stripe Webhook:"
echo "  URL: ${VERCEL_URL}/api/webhooks/stripe"
echo "  Events: customer.subscription.created, customer.subscription.updated, customer.subscription.deleted"
echo ""
read -p "Press ENTER when webhooks are configured..."
read -p "Paste CLERK_WEBHOOK_SECRET (whsec_xxx): " CLERK_WEBHOOK
read -p "Paste STRIPE_WEBHOOK_SECRET (whsec_xxx): " STRIPE_WEBHOOK
echo ""

vercel env add CLERK_WEBHOOK_SECRET production <<< "$CLERK_WEBHOOK"
vercel env add STRIPE_WEBHOOK_SECRET production <<< "$STRIPE_WEBHOOK"

echo -e "${GREEN}✓ Webhooks configured${NC}"

echo ""
echo -e "${BLUE}Step 9: Running Prisma migrations...${NC}"
# Create local .env for migration
cat > .env.local << EOL
DATABASE_URL="$DATABASE_URL"
DIRECT_URL="$DIRECT_URL"
EOL

npx prisma generate
npx prisma db push --skip-generate

echo -e "${GREEN}✓ Database schema deployed${NC}"

echo ""
echo -e "${BLUE}Step 10: Deploying to Vercel...${NC}"
vercel --prod

echo ""
echo -e "${GREEN}========================================"
echo "🎉 Deployment Complete!"
echo "========================================${NC}"
echo ""
echo "Your PolarisIQ app is live at:"
echo -e "${BLUE}${VERCEL_URL}${NC}"
echo ""
echo "Next steps:"
echo "1. Test signup flow: ${VERCEL_URL}/sign-up"
echo "2. Test upgrade flow: ${VERCEL_URL}/pricing"
echo "3. View dashboard: ${VERCEL_URL}/dashboard"
echo "4. Test webhooks in Stripe/Clerk dashboards"
echo ""
echo -e "${YELLOW}Important: Update your Clerk/Stripe webhook URLs if your final domain is different!${NC}"
echo ""
