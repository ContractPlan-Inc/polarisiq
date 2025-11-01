#!/bin/bash
# One-command deployment script for PolarisIQ
# Run this script to deploy everything automatically

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}"
cat << "EOF"
╔═══════════════════════════════════════╗
║     PolarisIQ Quick Deploy v2.0      ║
║  Commercial SaaS Deployment System   ║
╚═══════════════════════════════════════╝
EOF
echo -e "${NC}"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}No .env.local found. Running interactive setup...${NC}"
    npm run setup
else
    echo -e "${GREEN}✓ Found existing .env.local${NC}"
    echo "Using existing configuration..."
fi

# Load environment variables
source .env.local 2>/dev/null || true

# Install dependencies
echo -e "\n${BLUE}Installing dependencies...${NC}"
npm install

# Generate Prisma client
echo -e "\n${BLUE}Generating Prisma client...${NC}"
npx prisma generate

# Push database schema
echo -e "\n${BLUE}Deploying database schema...${NC}"
npx prisma db push --skip-generate

echo -e "\n${GREEN}✓ Database ready${NC}"

# Check Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "\n${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

# Check Vercel authentication
echo -e "\n${BLUE}Checking Vercel authentication...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}Please login to Vercel:${NC}"
    vercel login

    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}⚠️  Vercel login failed. Continuing with project setup...${NC}"
        echo "You can deploy manually later with: vercel --prod"
    fi
fi

# Link or create project
echo -e "\n${BLUE}Setting up Vercel project...${NC}"
if [ ! -d ".vercel" ]; then
    echo "Creating new Vercel project..."
    vercel link --yes 2>/dev/null || vercel link || true
fi

# Set environment variables in Vercel
echo -e "\n${BLUE}Configuring Vercel environment variables...${NC}"

# Function to set Vercel env var
set_vercel_env() {
    local key=$1
    local value=$2
    if [ -n "$value" ]; then
        echo "Setting $key..."
        echo "$value" | vercel env add "$key" production --force 2>/dev/null || true
        echo "$value" | vercel env add "$key" preview --force 2>/dev/null || true
    fi
}

# Set all environment variables
set_vercel_env "DATABASE_URL" "$DATABASE_URL"
set_vercel_env "DIRECT_URL" "$DIRECT_URL"
set_vercel_env "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
set_vercel_env "CLERK_SECRET_KEY" "$CLERK_SECRET_KEY"
set_vercel_env "CLERK_WEBHOOK_SECRET" "$CLERK_WEBHOOK_SECRET"
set_vercel_env "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
set_vercel_env "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY"
set_vercel_env "STRIPE_WEBHOOK_SECRET" "$STRIPE_WEBHOOK_SECRET"
set_vercel_env "STRIPE_PRICE_ID_STARTER" "$STRIPE_PRICE_ID_STARTER"
set_vercel_env "STRIPE_PRICE_ID_PROFESSIONAL" "$STRIPE_PRICE_ID_PROFESSIONAL"
set_vercel_env "STRIPE_PRICE_ID_ENTERPRISE" "$STRIPE_PRICE_ID_ENTERPRISE"
set_vercel_env "NEXT_PUBLIC_APP_URL" "$NEXT_PUBLIC_APP_URL"
set_vercel_env "NEXT_PUBLIC_APP_NAME" "PolarisIQ"

# Additional static env vars
set_vercel_env "NEXT_PUBLIC_CLERK_SIGN_IN_URL" "/sign-in"
set_vercel_env "NEXT_PUBLIC_CLERK_SIGN_UP_URL" "/sign-up"
set_vercel_env "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL" "/assistant"
set_vercel_env "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL" "/onboarding"

echo -e "\n${GREEN}✓ Environment variables configured${NC}"

# Deploy to production
echo -e "\n${BLUE}Deploying to Vercel production...${NC}"
DEPLOY_URL=$(vercel --prod --yes 2>&1 | tee /dev/tty | grep -o 'https://[^"]*' | tail -1)

if [ -z "$DEPLOY_URL" ]; then
    echo -e "${YELLOW}Could not detect deployment URL. Checking Vercel project...${NC}"
    DEPLOY_URL=$(vercel inspect --token $(cat ~/.vercel/auth.json 2>/dev/null | jq -r '.token' 2>/dev/null) 2>/dev/null | grep -o 'https://[^"]*' | head -1 || echo "")
fi

echo -e "\n${GREEN}══════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉  Deployment Complete!${NC}"
echo -e "${GREEN}══════════════════════════════════════════${NC}"

if [ -n "$DEPLOY_URL" ]; then
    echo -e "\nYour app is live at:"
    echo -e "${BLUE}$DEPLOY_URL${NC}"

    echo -e "\n${YELLOW}⚠️  IMPORTANT: Update webhook URLs!${NC}"
    echo ""
    echo "Clerk Webhook:"
    echo "  URL: $DEPLOY_URL/api/webhooks/clerk"
    echo "  Dashboard: https://dashboard.clerk.com"
    echo ""
    echo "Stripe Webhook:"
    echo "  URL: $DEPLOY_URL/api/webhooks/stripe"
    echo "  Dashboard: https://dashboard.stripe.com/webhooks"
else
    echo -e "\nDeployment initiated. Check status with: vercel ls"
fi

echo -e "\n${BLUE}Next Steps:${NC}"
echo "1. Update webhook URLs in Clerk and Stripe dashboards"
echo "2. Test signup: ${DEPLOY_URL}/sign-up"
echo "3. Test pricing: ${DEPLOY_URL}/pricing"
echo "4. View dashboard: ${DEPLOY_URL}/dashboard"
echo ""
echo -e "${GREEN}Your PolarisIQ app is ready to make money! 💰${NC}"
echo ""
