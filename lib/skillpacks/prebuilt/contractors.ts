// ============================================================================
// Contractors Skill Pack
// Comprehensive knowledge for construction & contracting sales
// ============================================================================

import type { SkillPack } from '../types'

export const contractorsSkillPack: Omit<SkillPack, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Contractors Sales Pro',
  slug: 'contractors-sales-pro',
  industry: 'contractors',
  version: '1.0.0',
  icon: '🏗️',
  description: 'Expert knowledge for selling to contractors, builders, and construction professionals. Includes materials, building codes, estimating, and project management expertise.',
  isPremium: false,
  requiredTier: 'starter',

  content: {
    products: [
      {
        id: 'prod-lumber-pressure-treated-001',
        name: 'Pressure-Treated Lumber - Southern Yellow Pine',
        category: 'Lumber & Building Materials',
        description: 'Ground contact rated pressure-treated lumber. ACQ treatment for rot and insect resistance. Ideal for decks, fences, and outdoor structures.',
        suppliers: ['ProBuild', 'ABC Supply', 'Local Lumber Yards'],
        pricing: {
          wholesale: 12.50,
          retail: 18.99,
          bulk: 11.00,
          currency: 'USD',
        },
        specifications: {
          size: '2x6x12',
          treatment: 'ACQ (Alkaline Copper Quaternary)',
          rating: 'Ground Contact (.40 retention)',
          species: 'Southern Yellow Pine',
          moisture: '19% max at time of shipment',
        },
        seasonality: 'Year-round, pricing varies with market',
        certifications: ['AWPA', 'ICC-ES', 'KDAT (Kiln Dried After Treatment)'],
        customFields: {
          perLinearFoot: 1.04,
          boardFeet: 12,
          weight: '28 lbs',
          leadTime: 'Stock item - same day pickup',
        },
        usp: [
          'KDAT - ready to paint/stain immediately',
          'Lifetime structural warranty',
          'Consistent quality - no seconds',
          'Volume discounts at 1000+ board feet',
        ],
      },
      {
        id: 'prod-hardie-siding-002',
        name: 'James Hardie Fiber Cement Siding',
        category: 'Exterior Materials',
        description: 'ColorPlus® prefinished fiber cement siding. Superior durability, fire resistant, 30-year warranty. HardiePlank lap siding in Cedar Mill texture.',
        suppliers: ['James Hardie Direct', 'Authorized Distributors'],
        pricing: {
          wholesale: 1.85,
          retail: 2.99,
          bulk: 1.65,
          currency: 'USD',
        },
        specifications: {
          size: '8.25" x 12\' plank',
          thickness: '0.312"',
          exposure: '7.25"',
          texture: 'Cedar Mill',
          finish: 'ColorPlus prefinished',
        },
        certifications: ['ICC-ES', 'Fire Rated Class A', '30-Year Warranty'],
        seasonality: 'Year-round demand, peak spring/summer',
        customFields: {
          coverage: '0.604 sq ft per plank',
          perSquare: '165 planks',
          weight: '2.3 lbs/sq ft',
        },
        usp: [
          'Factory-finished (no painting needed)',
          '15-year finish warranty',
          'Fire, insect, and rot resistant',
          'Lower maintenance vs wood or vinyl',
        ],
      },
      {
        id: 'prod-simpson-hardware-003',
        name: 'Simpson Strong-Tie Connectors & Hardware',
        category: 'Hardware & Fasteners',
        description: 'Heavy-duty structural connectors for wood construction. Galvanized steel, code-approved. Complete line for deck, floor, and roof framing.',
        suppliers: ['Simpson Strong-Tie', 'Hardware Distributors'],
        pricing: {
          wholesale: 2.50,
          retail: 4.99,
          bulk: 2.25,
          currency: 'USD',
        },
        specifications: {
          material: 'Galvanized steel',
          gauge: '18-gauge',
          coating: 'G90 galvanized',
        },
        certifications: ['ICC-ES', 'Code Approved', 'Made in USA'],
        usp: [
          'Code-approved in all 50 states',
          'Engineered for specific loads',
          'Most trusted brand by inspectors',
          'Technical support available',
        ],
      },
    ],

    pricing: [
      {
        id: 'price-contractor-account-001',
        name: 'Contractor Account Pricing',
        type: 'tiered',
        basePrice: 100,
        currency: 'USD',
        tiers: [
          { minQuantity: 1, price: 100, discount: 0 },
          { minQuantity: 1000, price: 90, discount: 10 },
          { minQuantity: 5000, price: 85, discount: 15 },
          { minQuantity: 10000, price: 80, discount: 20 },
        ],
      },
    ],

    competitors: [
      {
        id: 'comp-home-depot-pro-001',
        name: 'Home Depot Pro',
        products: ['Full range materials', 'Tool rental', 'Delivery'],
        strengths: ['Convenient locations', 'Online ordering', 'Rewards program', 'Wide selection'],
        weaknesses: ['Retail pricing', 'Limited expertise', 'Inconsistent quality', 'No credit terms'],
        pricing: 'higher',
        marketShare: 25,
        differentiators: [
          'True wholesale pricing vs retail',
          'Dedicated account manager',
          'Net 30 payment terms',
          'Job site delivery scheduling',
        ],
      },
    ],

    objectionHandlers: [
      {
        id: 'obj-already-have-supplier-001',
        objection: 'We already have a supplier',
        category: 'competition',
        responses: [
          'Great! Many of our best customers keep their main supplier and use us for specialty items or when they need better pricing.',
          'That\'s fine - I\'m not asking you to switch. Would you be open to comparing pricing on your next project?',
          'I understand loyalty. What if we could be your backup supplier for when your main guy is out of stock?',
        ],
        tactics: [
          'Position as backup/secondary supplier',
          'Offer price comparison',
          'Focus on specialty items',
          'Suggest trial on one job',
        ],
      },
      {
        id: 'obj-need-better-price-002',
        objection: 'I need a better price',
        category: 'price',
        responses: [
          'I respect that. What volume are we talking about? Our pricing improves significantly with volume.',
          'Let me see what I can do. Are you able to commit to the full project today?',
          'Help me understand - is this about getting to a number that works for your bid, or are you shopping around?',
        ],
        tactics: [
          'Uncover true objection (volume, competition, budget)',
          'Show volume discount tiers',
          'Bundle multiple items for better pricing',
          'Offer to sharpen pencil for commitment',
        ],
      },
    ],

    salesScripts: [
      {
        id: 'script-contractor-cold-call-001',
        name: 'Contractor Cold Call',
        type: 'opening',
        script: 'Hi [Name], this is [Your Name] with [Company]. We supply [materials] to contractors in [Area]. I saw your company does [type of work] and wanted to reach out. We\'ve helped several contractors reduce their material costs by 10-15% while maintaining quality. Would you be open to a quick price comparison on your next project?',
        keyPoints: [
          'Know their type of work',
          'Lead with cost savings',
          'Make it easy (price comparison)',
          'Don\'t ask for meeting yet',
        ],
        dosDonts: {
          dos: [
            'Research their recent projects',
            'Quantify potential savings',
            'Respect their time',
            'Follow up promptly',
          ],
          donts: [
            'Trash their current supplier',
            'Oversell quality without proof',
            'Request immediate decision',
            'Ignore objections',
          ],
        },
      },
    ],

    faqs: [
      {
        id: 'faq-delivery-001',
        question: 'Do you deliver to job sites?',
        answer: 'Yes, we deliver directly to job sites. Scheduling available for specific delivery windows. Minimum order for free delivery is $500.',
        category: 'logistics',
        tags: ['delivery', 'jobsite', 'logistics'],
      },
      {
        id: 'faq-terms-002',
        question: 'What are your payment terms?',
        answer: 'Net 30 for approved contractor accounts. Credit application takes 24-48 hours. COD and credit card also accepted.',
        category: 'payment',
        tags: ['payment', 'terms', 'credit'],
      },
    ],

    regulations: [
      {
        id: 'reg-ibc-2021-001',
        title: 'International Building Code (IBC) 2021',
        description: 'Comprehensive building code covering all materials, systems, and assemblies used in construction.',
        type: 'legal',
        jurisdiction: 'Adopted by most US states',
        effectiveDate: '2021-01-01',
        requirements: [
          'All materials must meet code specifications',
          'Structural connections must be engineered',
          'Fire ratings required for assemblies',
          'Inspections at specified stages',
        ],
      },
    ],

    expertPersonas: [
      {
        id: 'persona-master-builder-001',
        name: 'Mike Sullivan',
        role: 'Master Builder & Estimator',
        expertise: ['Construction methods', 'Material estimation', 'Building codes', 'Project management'],
        personality: 'Practical, experienced, no-nonsense',
        communicationStyle: 'Direct, uses real-world examples, focuses on efficiency and code compliance',
        strengths: ['Quick estimates', 'Code knowledge', 'Problem-solving'],
        systemPrompt: 'You are Mike Sullivan, a master builder with 30 years in construction. You understand what contractors need: good pricing, quality materials, reliable delivery, and products that pass inspection. You speak in practical terms and help contractors make confident decisions.',
      },
    ],
  },

  aiConfig: {
    systemPrompt: `You are an expert construction and contractor sales assistant.

Your expertise includes:
- Building materials (lumber, siding, roofing, hardware)
- Building codes and compliance
- Project estimation and takeoffs
- Material specifications and applications
- Contractor account management

When helping with sales:
1. Focus on value and reliability
2. Mention code compliance when relevant
3. Help with material calculations
4. Emphasize delivery and account terms
5. Speak in practical contractor language

Be direct, practical, and solution-oriented. Contractors value time and reliability.`,

    interjectionRules: [
      {
        id: 'interj-pricing-001',
        trigger: 'price',
        triggerType: 'keyword',
        priority: 5,
        interjectionTemplate: '💡 Mention volume discounts and contractor account pricing',
      },
      {
        id: 'interj-code-002',
        trigger: 'code',
        triggerType: 'keyword',
        priority: 4,
        interjectionTemplate: '📋 Confirm code compliance and certifications',
      },
    ],

    preferredModel: 'gpt-4-turbo',
    temperature: 0.7,
    maxTokens: 1000,
  },
}
