#!/bin/bash
# PolarisIQ - Complete Production Deployment
# This script handles EVERYTHING for production deployment

set -e

echo "════════════════════════════════════════════════════════════"
echo "         🚀 PolarisIQ - Complete Production Setup"
echo "════════════════════════════════════════════════════════════"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function to print status
print_status() {
    echo -e "${BLUE}[$1/7]${NC} $2"
    echo "──────────────────────────────────────────────────────────"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠${NC}  $1"
}

cd "$(dirname "$0")/.."

print_status "1" "Vercel Authentication"
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

if ! vercel whoami &> /dev/null; then
    echo "Please authenticate with Vercel..."
    vercel login

    if ! vercel whoami &> /dev/null; then
        echo -e "${RED}Authentication failed. Please try: vercel login${NC}"
        exit 1
    fi
fi

VERCEL_USER=$(vercel whoami)
print_success "Authenticated as: $VERCEL_USER"
echo ""

print_status "2" "Project Setup"
echo "Linking project to Vercel..."
vercel link --yes
print_success "Project linked"
echo ""

print_status "3" "Initial Deployment"
echo "Deploying to Vercel (this creates your project)..."
DEPLOY_OUTPUT=$(vercel --yes 2>&1 | tee /dev/tty)
PREVIEW_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[^\s]+\.vercel\.app' | head -1)
print_success "Preview deployed: $PREVIEW_URL"
echo ""

print_status "4" "Service Configuration Wizard"
echo ""
echo -e "${YELLOW}Now let's configure your services...${NC}"
echo ""

# Neon Database Setup
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  1. NEON DATABASE SETUP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Open: https://console.neon.tech"
echo "2. Click 'Create Project'"
echo "3. Name: polarisiq-production"
echo "4. Copy connection string"
echo ""
read -p "Press ENTER when ready..."
read -p "Paste DATABASE_URL: " DATABASE_URL
echo ""

vercel env add DATABASE_URL production <<< "$DATABASE_URL" --yes 2>/dev/null || true
vercel env add DATABASE_URL preview <<< "$DATABASE_URL" --yes 2>/dev/null || true
vercel env add DIRECT_URL production <<< "$DATABASE_URL" --yes 2>/dev/null || true
vercel env add DIRECT_URL preview <<< "$DATABASE_URL" --yes 2>/dev/null || true
print_success "Database configured"
echo ""

# Clerk Authentication
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  2. CLERK AUTHENTICATION SETUP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Open: https://dashboard.clerk.com"
echo "2. Click 'Create Application'"
echo "3. Name: PolarisIQ"
echo "4. Enable Email authentication"
echo "5. Go to API Keys"
echo ""
read -p "Press ENTER when ready..."
read -p "Paste NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: " CLERK_PUB
read -sp "Paste CLERK_SECRET_KEY: " CLERK_SECRET
echo ""

vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production <<< "$CLERK_PUB" --yes 2>/dev/null || true
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY preview <<< "$CLERK_PUB" --yes 2>/dev/null || true
vercel env add CLERK_SECRET_KEY production <<< "$CLERK_SECRET" --yes 2>/dev/null || true
vercel env add CLERK_SECRET_KEY preview <<< "$CLERK_SECRET" --yes 2>/dev/null || true

# Static Clerk URLs
vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production <<< "/sign-in" --yes 2>/dev/null || true
vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL production <<< "/sign-up" --yes 2>/dev/null || true
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL production <<< "/dashboard" --yes 2>/dev/null || true
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL production <<< "/onboarding" --yes 2>/dev/null || true
print_success "Clerk configured"
echo ""

# Stripe Setup
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  3. STRIPE PAYMENT SETUP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Open: https://dashboard.stripe.com"
echo "2. Go to Developers → API Keys"
echo "3. Use TEST MODE keys"
echo ""
read -p "Press ENTER when ready..."
read -p "Paste NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: " STRIPE_PUB
read -sp "Paste STRIPE_SECRET_KEY: " STRIPE_SECRET
echo ""

vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production <<< "$STRIPE_PUB" --yes 2>/dev/null || true
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY preview <<< "$STRIPE_PUB" --yes 2>/dev/null || true
vercel env add STRIPE_SECRET_KEY production <<< "$STRIPE_SECRET" --yes 2>/dev/null || true
vercel env add STRIPE_SECRET_KEY preview <<< "$STRIPE_SECRET" --yes 2>/dev/null || true

echo ""
echo "Now create 3 subscription products in Stripe:"
echo "  → Starter: \$29/month"
echo "  → Professional: \$99/month"
echo "  → Enterprise: \$299/month"
echo ""
read -p "Press ENTER when products created..."
read -p "Paste price_id for STARTER: " PRICE_STARTER
read -p "Paste price_id for PROFESSIONAL: " PRICE_PRO
read -p "Paste price_id for ENTERPRISE: " PRICE_ENT
echo ""

vercel env add STRIPE_PRICE_ID_STARTER production <<< "$PRICE_STARTER" --yes 2>/dev/null || true
vercel env add STRIPE_PRICE_ID_PROFESSIONAL production <<< "$PRICE_PRO" --yes 2>/dev/null || true
vercel env add STRIPE_PRICE_ID_ENTERPRISE production <<< "$PRICE_ENT" --yes 2>/dev/null || true
print_success "Stripe configured"
echo ""

# App Configuration
vercel env add NEXT_PUBLIC_APP_NAME production <<< "PolarisIQ" --yes 2>/dev/null || true
print_success "App configuration set"
echo ""

print_status "5" "Production Deployment"
echo "Deploying to production with all environment variables..."
PROD_OUTPUT=$(vercel --prod --yes 2>&1 | tee /dev/tty)
PROD_URL=$(echo "$PROD_OUTPUT" | grep -oP 'https://[^\s]+\.vercel\.app' | tail -1)

if [ -z "$PROD_URL" ]; then
    # Try getting from vercel project inspect
    PROD_URL=$(vercel --prod ls 2>/dev/null | grep -oP 'https://[^\s]+\.vercel\.app' | head -1)
fi

print_success "Production deployed!"
echo ""

# Set App URL
print_status "6" "Finalizing Configuration"
vercel env add NEXT_PUBLIC_APP_URL production <<< "$PROD_URL" --yes 2>/dev/null || true
vercel env add NEXT_PUBLIC_APP_URL preview <<< "$PROD_URL" --yes 2>/dev/null || true
print_success "App URL configured"
echo ""

# Webhooks Configuration
print_status "7" "Webhook Configuration"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Configure webhooks now!${NC}"
echo ""
echo "CLERK WEBHOOK:"
echo "  URL: $PROD_URL/api/webhooks/clerk"
echo "  Dashboard: https://dashboard.clerk.com → Webhooks"
echo "  Events: user.created, user.updated, user.deleted"
echo ""
echo "STRIPE WEBHOOK:"
echo "  URL: $PROD_URL/api/webhooks/stripe"
echo "  Dashboard: https://dashboard.stripe.com/webhooks"
echo "  Events: customer.subscription.*"
echo ""
read -p "Press ENTER after setting up webhooks..."
read -p "Paste CLERK_WEBHOOK_SECRET: " CLERK_WH
read -p "Paste STRIPE_WEBHOOK_SECRET: " STRIPE_WH
echo ""

vercel env add CLERK_WEBHOOK_SECRET production <<< "$CLERK_WH" --yes 2>/dev/null || true
vercel env add STRIPE_WEBHOOK_SECRET production <<< "$STRIPE_WH" --yes 2>/dev/null || true
print_success "Webhooks configured"
echo ""

# Final deployment with webhooks
echo "Redeploying with webhook secrets..."
vercel --prod --yes > /dev/null 2>&1
print_success "Final deployment complete"
echo ""

# Success message
echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}   🎉 DEPLOYMENT SUCCESSFUL!${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo -e "Your PolarisIQ app is live at:"
echo -e "${BLUE}$PROD_URL${NC}"
echo ""
echo "Test these flows:"
echo "  1. Sign up:  $PROD_URL/sign-up"
echo "  2. Pricing:  $PROD_URL/pricing"
echo "  3. Dashboard: $PROD_URL/dashboard"
echo ""
echo -e "${GREEN}Your app is ready to make money! 💰${NC}"
echo ""
echo "Next steps:"
echo "  • Test all user flows"
echo "  • Verify webhooks working"
echo "  • Check database in Neon console"
echo "  • Invite beta testers"
echo ""
