# PolarisIQ - Specialty Foods Expert Assistant

AI-powered virtual meeting assistant designed for broadline sales representatives working with specialty foods and demanding customers with special dietary needs.

## Overview

PolarisIQ provides real-time expertise during customer visits, helping sales reps:
- Answer allergen and dietary requirement questions instantly
- Suggest product substitutions and alternatives
- Handle demanding customers with special needs
- Navigate complex specialty foods knowledge
- Close more deals with confidence

## Features

### Core Capabilities
- **Instant Allergen Intelligence**: FDA top 9 allergen coverage, cross-contamination warnings
- **Dietary Compliance**: Kosher, halal, gluten-free, vegan, and more
- **Smart Product Substitutions**: Never lose a sale to out-of-stock items
- **Menu & Pairing Suggestions**: Help customers create winning menus
- **Sales Support Tools**: Objection handling, value conversations, technical knowledge

### Mobile-First Design
- Optimized for smartphone and tablet use
- Touch-friendly interface
- Fast responses during live meetings
- Works in the field where sales happen

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 with TypeScript
- **Styling**: Tailwind CSS (mobile-first responsive)
- **Deployment**: Vercel-ready
- **AI Integration**: Ready for Anthropic Claude or OpenAI API

## Project Structure

```
polarisIQ/
├── app/
│   ├── layout.tsx              # Root layout with mobile optimizations
│   ├── page.tsx                # Homepage with feature showcase
│   ├── assistant/
│   │   └── page.tsx            # Main chat assistant interface
│   ├── features/
│   │   └── page.tsx            # Detailed features page
│   └── api/
│       └── assistant/
│           └── route.ts        # AI assistant API endpoint
├── styles/
│   └── globals.css             # Global styles with mobile optimizations
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## API Integration

The assistant currently uses intelligent mock responses. To integrate with a real AI service:

1. Add your AI provider SDK:
```bash
npm install @anthropic-ai/sdk
# or
npm install openai
```

2. Update `app/api/assistant/route.ts` with your API key and implementation:
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Replace generateResponse() with actual API calls
```

3. Add environment variables:
```bash
# .env.local
ANTHROPIC_API_KEY=your_api_key_here
```

## Use Cases

Perfect for sales reps working with:
- High-end restaurants with demanding chefs
- Healthcare facilities with strict dietary requirements
- Specialty cafes focused on alternative diets
- Catering companies with event-specific needs
- Schools and universities with diverse populations
- Hotels and resorts serving international guests

## Key Features for Sales Reps

### Quick Actions
- Allergen Info
- Product Substitutes
- Dietary Compliance
- Pairing Suggestions

### Customer Context
Add customer details for personalized recommendations:
- Customer type (restaurant, cafe, catering, etc.)
- Cuisine style
- Special requirements
- Budget considerations

### Meeting Support
- Real-time answers during customer visits
- Professional, confident responses
- Technical product knowledge
- Objection handling frameworks

## Development

### Key Files
- `app/assistant/page.tsx`: Main assistant UI with chat interface
- `app/api/assistant/route.ts`: Backend logic and AI responses
- `styles/globals.css`: Mobile-optimized styles and animations

### Customization
- Modify quick actions in `app/assistant/page.tsx`
- Extend specialty knowledge in `app/api/assistant/route.ts`
- Add new features pages as needed
- Customize branding in `app/layout.tsx`

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The app is a standard Next.js application and can be deployed to any platform supporting Node.js 18+.

## Future Enhancements

- [ ] Offline mode for areas with poor connectivity
- [ ] Voice input for hands-free operation
- [ ] Product catalog integration
- [ ] CRM integration
- [ ] Meeting notes and follow-up tracking
- [ ] Customer history and preferences
- [ ] Multi-language support
- [ ] Advanced analytics for sales managers

## Support

Built on the ContractPlan/AccordIQ platform architecture.

## License

Proprietary - ContractPlan Inc.

---

**Built for sales reps, by people who understand the challenges of specialty foods sales.**
