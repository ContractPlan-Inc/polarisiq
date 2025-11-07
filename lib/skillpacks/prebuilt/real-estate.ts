// ============================================================================
// Real Estate Skill Pack
// Comprehensive knowledge for real estate professionals
// ============================================================================

import type { SkillPack } from '../types'

export const realEstateSkillPack: Omit<SkillPack, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Real Estate Sales Pro',
  slug: 'real-estate-sales-pro',
  industry: 'real_estate',
  version: '1.0.0',
  icon: '🏡',
  description: 'Expert knowledge for real estate agents and brokers. Market analysis, property valuation, financing options, negotiation strategies, and legal requirements.',
  isPremium: false,
  requiredTier: 'starter',

  content: {
    products: [
      {
        id: 'prod-listing-package-premium-001',
        name: 'Premium Listing Package',
        category: 'Services',
        description: 'Complete listing service with professional photography, drone shots, virtual tour, staging consultation, and multi-platform marketing.',
        pricing: {
          retail: 2500,
          currency: 'USD',
        },
        specifications: {
          photography: 'Professional HDR photos (30-40 images)',
          video: '3D virtual tour + drone footage',
          marketing: 'MLS, Zillow, Realtor.com, social media',
          staging: '2-hour consultation included',
        },
        customFields: {
          deliveryTime: '48 hours',
          includes: ['Property website', 'Social media graphics', 'Brochures'],
        },
        usp: [
          'Homes sell 32% faster with professional media',
          'Average 5-7% higher sale price',
          'Highest quality in market',
          '48-hour turnaround guaranteed',
        ],
      },
      {
        id: 'prod-market-analysis-002',
        name: 'Comprehensive Market Analysis (CMA)',
        category: 'Services',
        description: 'Detailed comparative market analysis with pricing strategy, market trends, and buyer demand indicators.',
        pricing: {
          retail: 0,
          currency: 'USD',
        },
        specifications: {
          comparables: '5-10 similar properties',
          dataPoints: '25+ factors analyzed',
          presentation: 'Professional branded report',
          delivery: 'Digital + printed',
        },
        usp: [
          'Data-driven pricing recommendations',
          'Local market expertise',
          'Professional presentation for listings',
          'Included with listing agreement',
        ],
      },
    ],

    pricing: [],

    competitors: [
      {
        id: 'comp-discount-brokers-001',
        name: 'Discount Brokers (Redfin, etc.)',
        products: ['Basic listing services', 'Lower commission rates'],
        strengths: ['Lower fees', 'Technology platform', 'Brand recognition'],
        weaknesses: ['Limited personal service', 'Less local expertise', 'Generic marketing', 'No negotiation leverage'],
        pricing: 'lower',
        marketShare: 8,
        differentiators: [
          'Full-service personal attention vs automated process',
          'Local market expertise and relationships',
          'Professional negotiation skills',
          'Higher final sale price justifies commission',
        ],
      },
    ],

    objectionHandlers: [
      {
        id: 'obj-commission-too-high-001',
        objection: 'Your commission is too high',
        category: 'price',
        responses: [
          'I understand commission is important. Let me show you how my service typically results in $15,000-$30,000 higher sale prices than discount brokers. That more than covers the difference.',
          'You\'re absolutely right to evaluate cost. Here\'s what you get for that commission [list services]. Would you want any of these missing from your sale?',
          'Fair question. My average listing sells for 7% more than market average and 18 days faster. Would that value be worth the investment?',
        ],
        tactics: [
          'Show data on higher sale prices',
          'List all included services',
          'Share testimonials with specific numbers',
          'Calculate net proceeds comparison',
        ],
        data: {
          statistics: [
            'Homes with professional photography sell for 5-7% more',
            'Average Days on Market: 32 vs 51 (discount brokers)',
            'Client satisfaction: 98% (vs 76% industry average)',
          ],
          testimonials: [
            'John & Sarah M.: "Listed at $500K, sold for $537K in 9 days. Worth every penny."',
            'Maria R.: "Saved $8K in repairs through inspection negotiation alone."',
          ],
        },
      },
      {
        id: 'obj-sell-myself-fsbo-002',
        objection: 'I can sell it myself',
        category: 'need',
        responses: [
          'Absolutely, you can! Many homeowners start that way. Can I ask what research you\'ve done on comparable sales and pricing strategy?',
          'That\'s definitely an option. Are you comfortable with the legal paperwork, negotiations, and managing showings?',
          'You can, and some succeed. The average FSBO sells for 25% less than agent-assisted sales. That\'s about $85,000 on a $340K home. Is that risk worth it?',
        ],
        tactics: [
          'Ask questions to reveal complexity',
          'Share FSBO statistics (lower price, longer time)',
          'Offer to review their pricing as free service',
          'Position as risk mitigation',
        ],
        data: {
          statistics: [
            'FSBO homes sell for average 25% less (NAR data)',
            'Average FSBO time on market: 87 days vs 32 with agent',
            '40% of FSBOs eventually list with agent',
            'Legal issues in 18% of FSBO transactions',
          ],
        },
      },
      {
        id: 'obj-wait-for-better-market-003',
        objection: 'I want to wait for the market to improve',
        category: 'timing',
        responses: [
          'I understand wanting to maximize value. Let me show you current market data - we\'re actually in a strong seller\'s market with low inventory.',
          'That makes sense. What information are you using to time the market? Let me share what local data shows.',
          'Timing can matter, but here\'s what\'s interesting: The mortgage rate difference of waiting 6 months could cost your buyer $200/month. That affects your pool of qualified buyers.',
        ],
        tactics: [
          'Show current market data (low inventory, high demand)',
          'Calculate cost of waiting (maintenance, taxes, opportunity cost)',
          'Explain rate impact on buyer pool',
          'Offer to monitor and alert when timing is "perfect"',
        ],
      },
    ],

    salesScripts: [
      {
        id: 'script-listing-appointment-001',
        name: 'Listing Appointment Opening',
        type: 'opening',
        script: 'Thank you for having me today. I\'ve prepared a comprehensive market analysis for your home. Before we dive into numbers, tell me about your ideal outcome - what would a successful sale look like for you?',
        keyPoints: [
          'Start with gratitude',
          'Mention preparation (CMA ready)',
          'Ask about their goals first',
          'Listen for motivations',
        ],
        dosDonts: {
          dos: [
            'Start with emotional connection',
            'Tour the home with genuine interest',
            'Ask about memories/improvements',
            'Take notes visibly',
          ],
          donts: [
            'Lead with your achievements',
            'Criticize the home',
            'Push for immediate decision',
            'Compare to other listings',
          ],
        },
      },
      {
        id: 'script-buyer-consultation-002',
        name: 'Buyer Consultation',
        type: 'discovery',
        script: 'Let\'s start with the fun part - describe your ideal home. What does it look like? How does it feel when you walk in? What\'s happening in your life there?',
        keyPoints: [
          'Make it emotional/visual',
          'Listen for priorities',
          'Note lifestyle needs',
          'Identify must-haves vs nice-to-haves',
        ],
        dosDonts: {
          dos: [
            'Paint the picture together',
            'Ask "why" questions',
            'Discuss timeline and urgency',
            'Pre-qualify financing early',
          ],
          donts: [
            'Overwhelm with options immediately',
            'Assume budget constraints',
            'Skip financing discussion',
            'Focus only on features not feelings',
          ],
        },
      },
    ],

    faqs: [
      {
        id: 'faq-how-price-home-001',
        question: 'How do you determine the right price for my home?',
        answer: 'I conduct a Comparative Market Analysis (CMA) examining recent sales of similar homes, current competition, market trends, and your home\'s unique features. The goal is to price competitively to attract buyers while maximizing your return.',
        category: 'pricing',
        tags: ['pricing', 'cma', 'valuation'],
      },
      {
        id: 'faq-how-long-to-sell-002',
        question: 'How long will it take to sell my home?',
        answer: 'In our market, professionally marketed homes average 32 days from listing to accepted offer. Factors include pricing, condition, location, and season. I\'ll provide specific projections based on your situation.',
        category: 'timeline',
        tags: ['timeline', 'market', 'expectations'],
      },
      {
        id: 'faq-what-included-003',
        question: 'What\'s included in your service?',
        answer: 'Full-service representation including professional photography, virtual tour, MLS listing, marketing across 100+ websites, open houses, all negotiations, transaction coordination, and guidance through closing. You get white-glove service from listing to keys handover.',
        category: 'services',
        tags: ['services', 'marketing', 'representation'],
      },
    ],

    regulations: [
      {
        id: 'reg-fair-housing-001',
        title: 'Fair Housing Act',
        description: 'Federal law prohibiting discrimination in housing based on race, color, national origin, religion, sex, familial status, or disability.',
        type: 'legal',
        jurisdiction: 'Federal (USA)',
        effectiveDate: '1968-04-11',
        requirements: [
          'Equal treatment for all potential buyers/renters',
          'No discriminatory advertising',
          'No steering or blockbusting',
          'Reasonable accommodations for disabilities',
        ],
        penalties: ['Fines up to $100,000', 'Legal fees', 'License suspension/revocation'],
        complianceChecklist: [
          'Use inclusive language in all marketing',
          'Show all properties without steering',
          'Document all communications',
          'Regular fair housing training',
        ],
      },
      {
        id: 'reg-disclosure-requirements-002',
        title: 'Property Disclosure Requirements',
        description: 'State-specific requirements for sellers to disclose known material defects and property conditions.',
        type: 'legal',
        jurisdiction: 'State-specific (varies)',
        requirements: [
          'Disclosure of known material defects',
          'Environmental hazards (lead paint, asbestos)',
          'Water damage history',
          'HOA rules and fees',
          'Neighborhood issues',
        ],
      },
    ],

    expertPersonas: [
      {
        id: 'persona-luxury-agent-001',
        name: 'Victoria Sterling',
        role: 'Luxury Real Estate Specialist',
        expertise: ['High-end marketing', 'Negotiation', 'Market analysis', 'Luxury buyer psychology'],
        personality: 'Sophisticated, confident, detail-oriented',
        communicationStyle: 'Professional yet warm, emphasizes value and exclusivity, uses market data',
        strengths: ['Relationship building', 'Pricing strategy', 'Marketing luxury properties'],
        systemPrompt: 'You are Victoria Sterling, a top luxury real estate agent with expertise in high-end property marketing and negotiation. You help agents position listings effectively, handle objections professionally, and close deals at optimal prices. You emphasize value, professionalism, and data-driven strategies.',
      },
    ],
  },

  aiConfig: {
    systemPrompt: `You are an expert real estate sales assistant.

Your expertise includes:
- Property valuation and market analysis
- Listing presentations and marketing
- Buyer representation and consultation
- Negotiation strategies
- Real estate law and disclosures
- Financing options and mortgage products
- Market trends and investment analysis

When helping with client conversations:
1. Lead with client goals and emotions
2. Use data to support recommendations
3. Address concerns about commission/value directly
4. Explain complex concepts simply
5. Build trust through expertise and transparency
6. Know when to pivot from features to feelings

Be professional, knowledgeable, and consultative. Real estate is emotional - balance data with empathy.`,

    interjectionRules: [
      {
        id: 'interj-commission-001',
        trigger: 'commission',
        triggerType: 'keyword',
        priority: 5,
        interjectionTemplate: '💡 Show value: Professional service = higher sale price + faster close',
      },
      {
        id: 'interj-pricing-002',
        trigger: 'price',
        triggerType: 'keyword',
        priority: 4,
        interjectionTemplate: '📊 Reference CMA data and comparable sales',
      },
      {
        id: 'interj-fsbo-003',
        trigger: 'sell myself',
        triggerType: 'keyword',
        priority: 5,
        interjectionTemplate: '⚠️ Share FSBO statistics: 25% lower price, 87 days average',
      },
    ],

    preferredModel: 'gpt-4-turbo',
    temperature: 0.7,
    maxTokens: 1000,
  },
}
