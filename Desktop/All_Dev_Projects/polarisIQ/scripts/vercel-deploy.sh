#!/bin/bash
# PolarisIQ - Automated Vercel Deployment
# This script creates a Vercel project and deploys your app

set -e

echo "═══════════════════════════════════════════════════"
echo "  🚀 PolarisIQ - Vercel Deployment Automation"
echo "═══════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check for required commands
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

# Check authentication
echo -e "${BLUE}Checking Vercel authentication...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}Please authenticate with Vercel${NC}"
    echo "Opening browser for authentication..."
    vercel login

    if ! vercel whoami &> /dev/null; then
        echo -e "${RED}Authentication failed. Please try again.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Authenticated with Vercel${NC}"
VERCEL_USER=$(vercel whoami)
echo "  User: $VERCEL_USER"
echo ""

# Create/link project
echo -e "${BLUE}Setting up Vercel project...${NC}"
if [ ! -d ".vercel" ] || [ ! -f ".vercel/project.json" ]; then
    echo "Creating new Vercel project..."
    vercel link --yes
else
    echo "Using existing Vercel project..."
fi
echo -e "${GREEN}✓ Project linked${NC}\n"

# Deploy to production
echo -e "${BLUE}Deploying to Vercel...${NC}"
echo "This may take a few minutes..."
echo ""

# Deploy and capture URL
DEPLOY_OUTPUT=$(vercel --prod --yes 2>&1)
echo "$DEPLOY_OUTPUT"

# Extract URL from output
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[^\s]+\.vercel\.app' | tail -1)

if [ -z "$DEPLOY_URL" ]; then
    # Try alternative extraction
    DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'Production: \Khttps://[^\s]+' | head -1)
fi

echo ""
if [ -n "$DEPLOY_URL" ]; then
    echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  🎉 DEPLOYMENT SUCCESSFUL!${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "Your app is live at:"
    echo -e "${BLUE}$DEPLOY_URL${NC}"
    echo ""

    # Save URL to file
    echo "$DEPLOY_URL" > .vercel/deployment-url.txt

    echo -e "${YELLOW}⚠️  NEXT STEPS:${NC}"
    echo ""
    echo "1. Add Environment Variables in Vercel Dashboard:"
    echo "   https://vercel.com/dashboard → Your Project → Settings → Environment Variables"
    echo ""
    echo "2. Required Environment Variables (22 total):"
    echo "   - DATABASE_URL (from Neon)"
    echo "   - DIRECT_URL (same as DATABASE_URL)"
    echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (from Clerk)"
    echo "   - CLERK_SECRET_KEY (from Clerk)"
    echo "   - CLERK_WEBHOOK_SECRET (from Clerk)"
    echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (from Stripe)"
    echo "   - STRIPE_SECRET_KEY (from Stripe)"
    echo "   - STRIPE_WEBHOOK_SECRET (from Stripe)"
    echo "   - STRIPE_PRICE_ID_STARTER (from Stripe)"
    echo "   - STRIPE_PRICE_ID_PROFESSIONAL (from Stripe)"
    echo "   - STRIPE_PRICE_ID_ENTERPRISE (from Stripe)"
    echo "   - NEXT_PUBLIC_APP_URL (set to: $DEPLOY_URL)"
    echo ""
    echo "3. Configure Webhooks:"
    echo "   Clerk: $DEPLOY_URL/api/webhooks/clerk"
    echo "   Stripe: $DEPLOY_URL/api/webhooks/stripe"
    echo ""
    echo "4. Redeploy after adding env vars:"
    echo "   vercel --prod"
    echo ""
    echo "See DEPLOY-NOW.md for detailed setup instructions."
    echo ""
else
    echo -e "${YELLOW}Deployment completed but URL not detected.${NC}"
    echo "Check your Vercel dashboard: https://vercel.com/dashboard"
fi
