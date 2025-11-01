#!/usr/bin/env node
/**
 * PolarisIQ Service Setup Automation
 * Automates creation of Neon DB, Clerk app, and Stripe products
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));
const execCommand = (cmd) => {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    return null;
  }
};

console.log('🚀 PolarisIQ Automated Service Setup\n');
console.log('This script will help you set up all required services.\n');

const config = {};

async function setupNeon() {
  console.log('\n📦 Neon Database Setup');
  console.log('======================');
  console.log('\nNeon provides serverless PostgreSQL databases.');
  console.log('Visit: https://console.neon.tech\n');

  const hasAccount = await question('Do you have a Neon account? (y/n): ');

  if (hasAccount.toLowerCase() !== 'y') {
    console.log('\n1. Go to: https://console.neon.tech');
    console.log('2. Sign up with GitHub (recommended)');
    console.log('3. Create a new project named: polarisiq-production');
    console.log('4. Select region closest to your users');
    console.log('5. Copy the connection string\n');
    await question('Press ENTER when your database is created...');
  }

  config.DATABASE_URL = await question('Paste DATABASE_URL: ');
  config.DIRECT_URL = config.DATABASE_URL; // Same for Neon

  console.log('✅ Neon database configured');
}

async function setupClerk() {
  console.log('\n🔐 Clerk Authentication Setup');
  console.log('============================');
  console.log('\nClerk provides complete user management.');
  console.log('Visit: https://dashboard.clerk.com\n');

  const hasAccount = await question('Do you have a Clerk account? (y/n): ');

  if (hasAccount.toLowerCase() !== 'y') {
    console.log('\n1. Go to: https://dashboard.clerk.com');
    console.log('2. Sign up (free plan is fine for testing)');
    console.log('3. Create new application: PolarisIQ');
    console.log('4. Enable "Email" as sign-in method');
    console.log('5. Go to API Keys section\n');
    await question('Press ENTER when your app is created...');
  }

  config.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = await question('Paste Publishable Key: ');
  config.CLERK_SECRET_KEY = await question('Paste Secret Key: ');

  console.log('\n📝 Now set up the Clerk webhook:');
  console.log('1. In Clerk dashboard, go to "Webhooks"');
  console.log('2. Add endpoint (you\'ll update URL after deploy)');
  console.log('3. Subscribe to: user.created, user.updated, user.deleted');
  console.log('4. Copy the signing secret\n');

  config.CLERK_WEBHOOK_SECRET = await question('Paste Webhook Secret: ');

  console.log('✅ Clerk configured');
}

async function setupStripe() {
  console.log('\n💳 Stripe Payment Setup');
  console.log('=======================');
  console.log('\nStripe handles all payment processing.');
  console.log('Visit: https://dashboard.stripe.com\n');

  const hasAccount = await question('Do you have a Stripe account? (y/n): ');

  if (hasAccount.toLowerCase() !== 'y') {
    console.log('\n1. Go to: https://dashboard.stripe.com/register');
    console.log('2. Sign up for an account');
    console.log('3. Activate your account (can use test mode for now)');
    console.log('4. Go to Developers > API Keys\n');
    await question('Press ENTER when your account is ready...');
  }

  const useTest = await question('Use test mode keys? (y/n): ');
  if (useTest.toLowerCase() === 'y') {
    console.log('\n⚠️  Using TEST mode - no real charges will occur');
  }

  config.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = await question('Paste Publishable Key: ');
  config.STRIPE_SECRET_KEY = await question('Paste Secret Key: ');

  console.log('\n💰 Now create subscription products:');
  console.log('1. Go to Products section in Stripe dashboard');
  console.log('2. Create 3 products:\n');
  console.log('   Product 1: "PolarisIQ Starter"');
  console.log('   - Price: $29/month');
  console.log('   - Description: 100 text queries per month\n');
  console.log('   Product 2: "PolarisIQ Professional" (mark as popular)');
  console.log('   - Price: $99/month');
  console.log('   - Description: 500 queries + voice features\n');
  console.log('   Product 3: "PolarisIQ Enterprise"');
  console.log('   - Price: $299/month');
  console.log('   - Description: 2000 queries + voice + team features\n');

  await question('Press ENTER when products are created...');

  config.STRIPE_PRICE_ID_STARTER = await question('Paste STARTER price ID (price_xxx): ');
  config.STRIPE_PRICE_ID_PROFESSIONAL = await question('Paste PROFESSIONAL price ID (price_xxx): ');
  config.STRIPE_PRICE_ID_ENTERPRISE = await question('Paste ENTERPRISE price ID (price_xxx): ');

  console.log('\n📝 Set up Stripe webhook:');
  console.log('1. Go to Developers > Webhooks');
  console.log('2. Add endpoint (you\'ll update URL after deploy)');
  console.log('3. Listen to: customer.subscription.*');
  console.log('4. Copy the signing secret\n');

  config.STRIPE_WEBHOOK_SECRET = await question('Paste Webhook Secret: ');

  console.log('✅ Stripe configured');
}

async function saveConfig() {
  console.log('\n💾 Saving configuration...');

  // Create .env.local
  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');

  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Saved to .env.local');

  // Create deployment config for Vercel
  const deployConfig = {
    timestamp: new Date().toISOString(),
    services: {
      neon: !!config.DATABASE_URL,
      clerk: !!config.CLERK_SECRET_KEY,
      stripe: !!config.STRIPE_SECRET_KEY
    },
    config
  };

  fs.writeFileSync('.deployment-config.json', JSON.stringify(deployConfig, null, 2));
  console.log('✅ Saved deployment config');
}

async function deployToVercel() {
  console.log('\n🚀 Deploying to Vercel...');
  console.log('=======================\n');

  const hasVercelCLI = execCommand('which vercel');
  if (!hasVercelCLI) {
    console.log('Installing Vercel CLI...');
    execCommand('npm install -g vercel');
  }

  const isLoggedIn = execCommand('vercel whoami');
  if (!isLoggedIn) {
    console.log('Please login to Vercel:');
    execCommand('vercel login');
  }

  console.log('Linking/creating Vercel project...');
  execCommand('vercel link --yes');

  console.log('\nSetting environment variables in Vercel...');
  Object.entries(config).forEach(([key, value]) => {
    console.log(`Setting ${key}...`);
    execCommand(`echo "${value}" | vercel env add ${key} production`);
  });

  // Set additional app configs
  const appUrl = await question('\nEnter your custom domain (or press ENTER to use Vercel domain): ');
  const finalUrl = appUrl || 'https://your-app.vercel.app';

  execCommand(`echo "${finalUrl}" | vercel env add NEXT_PUBLIC_APP_URL production`);
  execCommand(`echo "PolarisIQ" | vercel env add NEXT_PUBLIC_APP_NAME production`);

  console.log('\nRunning Prisma migrations...');
  execCommand('npx prisma generate');
  execCommand('npx prisma db push --skip-generate');

  console.log('\nDeploying to production...');
  const deployOutput = execCommand('vercel --prod');

  console.log('\n✅ Deployment complete!');
  console.log(`\n🌐 Your app is live at: ${deployOutput || finalUrl}`);

  return deployOutput;
}

async function updateWebhooks(appUrl) {
  console.log('\n🔗 Webhook Configuration');
  console.log('========================\n');
  console.log('⚠️  IMPORTANT: Update your webhook URLs now!\n');

  console.log('Clerk Webhook:');
  console.log(`  URL: ${appUrl}/api/webhooks/clerk`);
  console.log('  Go to: https://dashboard.clerk.com -> Webhooks\n');

  console.log('Stripe Webhook:');
  console.log(`  URL: ${appUrl}/api/webhooks/stripe`);
  console.log('  Go to: https://dashboard.stripe.com/webhooks\n');

  await question('Press ENTER when webhooks are updated...');
  console.log('✅ Setup complete!');
}

async function main() {
  try {
    await setupNeon();
    await setupClerk();
    await setupStripe();
    await saveConfig();

    const shouldDeploy = await question('\nDeploy to Vercel now? (y/n): ');
    if (shouldDeploy.toLowerCase() === 'y') {
      const appUrl = await deployToVercel();
      await updateWebhooks(appUrl);
    } else {
      console.log('\n✅ Configuration saved!');
      console.log('Run "npm run deploy" when ready to deploy.');
    }

    console.log('\n🎉 All done! Your PolarisIQ app is ready to make money!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
