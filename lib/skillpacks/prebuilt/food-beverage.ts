// ============================================================================
// Food & Beverage Sales Skill Pack
// Comprehensive knowledge base for specialty food sales professionals
// ============================================================================

import type { SkillPack } from '../types'

export const foodBeverageSkillPack: Omit<SkillPack, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Food & Beverage Sales Pro',
  slug: 'food-beverage-sales-pro',
  industry: 'food_beverage',
  version: '1.0.0',
  icon: '🍷',
  description: 'Deep expertise in specialty food and beverage sales including wines, artisan products, gourmet ingredients, and premium culinary items. Perfect for sales reps selling to restaurants, hotels, and retailers.',
  isPremium: false,
  requiredTier: 'starter',

  content: {
    products: [
      {
        id: 'prod-olive-oil-001',
        name: 'Tuscan Extra Virgin Olive Oil',
        category: 'Oils & Vinegars',
        description: 'Premium cold-pressed EVOO from Tuscany, Italy. First cold press with fruity notes and peppery finish. Perfect for finishing dishes and dipping.',
        suppliers: ['Mediterranean Imports Co', 'Tuscan Harvest Ltd'],
        pricing: {
          wholesale: 18.50,
          retail: 34.99,
          bulk: 15.00,
          currency: 'USD',
        },
        specifications: {
          size: '750ml',
          acidity: '0.3%',
          origin: 'Tuscany, Italy',
          harvest: 'November 2023',
        },
        seasonality: 'Year-round availability, best pricing Sept-Dec after harvest',
        certifications: ['USDA Organic', 'PDO Certified', 'Non-GMO'],
        allergens: [],
        shelfLife: '18 months from bottling',
        storage: 'Cool, dark place away from heat and light',
        pairings: ['Artisan bread', 'Fresh vegetables', 'Grilled fish', 'Caprese salad'],
        competitors: ['California Olive Ranch', 'Colavita', 'Bertolli'],
        usp: [
          'Single estate certified',
          'Award-winning (Gold Medal NYIOOC 2023)',
          'Direct from producer - no middlemen',
          'Harvest date on every bottle',
        ],
        customFields: {
          minOrder: 12,
          caseSize: 12,
          leadTime: '2-3 weeks',
        },
      },
      {
        id: 'prod-truffle-salt-002',
        name: 'Black Truffle Sea Salt',
        category: 'Seasonings & Spices',
        description: 'Italian sea salt infused with real black truffle pieces. Adds luxurious umami depth to any dish. A small pinch elevates ordinary to extraordinary.',
        suppliers: ['Truffle & More', 'Gourmet Imports'],
        pricing: {
          wholesale: 12.00,
          retail: 24.99,
          bulk: 10.50,
          currency: 'USD',
        },
        specifications: {
          size: '3.5oz (100g)',
          truffleContent: '3% real truffle',
          saltType: 'Mediterranean sea salt',
        },
        seasonality: 'Year-round, peak demand Oct-Feb',
        certifications: ['All Natural', 'Gluten-Free'],
        allergens: [],
        shelfLife: '24 months',
        storage: 'Cool, dry place in airtight container',
        pairings: ['Pasta', 'Eggs', 'Popcorn', 'Roasted vegetables', 'Steak'],
        competitors: ['La Tourangelle', 'Urbani', 'Sabatino'],
        usp: [
          'Real truffle pieces (not just flavoring)',
          'Restaurant-quality at wholesale price',
          'Elegant packaging for retail',
          'Consistent truffle flavor year-round',
        ],
        customFields: {
          minOrder: 24,
          caseSize: 24,
          marginPercent: 52,
        },
      },
      {
        id: 'prod-balsamic-vinegar-003',
        name: 'Aged Balsamic Vinegar of Modena DOP',
        category: 'Oils & Vinegars',
        description: '12-year aged authentic balsamic from Modena. Thick, complex, sweet-tart with notes of fig and cherry. Traditional production methods.',
        suppliers: ['Italian Gourmet Imports', 'Modena Direct'],
        pricing: {
          wholesale: 28.00,
          retail: 54.99,
          bulk: 24.00,
          currency: 'USD',
        },
        specifications: {
          age: '12 years',
          size: '250ml',
          density: 'Very dense (1.34)',
          grapeVariety: 'Trebbiano & Lambrusco',
        },
        seasonality: 'Year-round',
        certifications: ['DOP Certified', 'Traditional Production'],
        allergens: ['Contains sulfites'],
        shelfLife: 'Indefinite when stored properly',
        storage: 'Room temperature, away from light',
        pairings: ['Parmesan cheese', 'Strawberries', 'Ice cream', 'Aged meats'],
        competitors: ['Giuseppe Giusti', 'Acetaia Leonardi', 'Villa Manodori'],
        usp: [
          'True DOP certification',
          'Family-owned acetaia',
          '12+ year aging verified',
          'Stunning gift packaging',
        ],
        customFields: {
          minOrder: 6,
          caseSize: 6,
          vipGift: true,
        },
      },
    ],

    pricing: [
      {
        id: 'price-volume-discount-001',
        name: 'Volume Discount - Standard',
        type: 'tiered',
        basePrice: 100,
        currency: 'USD',
        tiers: [
          { minQuantity: 1, maxQuantity: 49, price: 100, discount: 0 },
          { minQuantity: 50, maxQuantity: 99, price: 95, discount: 5 },
          { minQuantity: 100, maxQuantity: 249, price: 90, discount: 10 },
          { minQuantity: 250, price: 85, discount: 15 },
        ],
      },
      {
        id: 'price-seasonal-promo-002',
        name: 'Fall Harvest Promotion',
        type: 'dynamic',
        basePrice: 100,
        currency: 'USD',
        validFrom: '2024-09-01',
        validUntil: '2024-11-30',
        conditions: {
          categories: ['Oils & Vinegars'],
          discount: 20,
        },
      },
    ],

    competitors: [
      {
        id: 'comp-sysco-001',
        name: 'Sysco',
        products: ['Generic olive oils', 'Standard balsamic', 'Commodity ingredients'],
        strengths: ['Huge selection', 'Next-day delivery', 'One-stop-shop', 'Well-known brand'],
        weaknesses: ['Lower quality products', 'Less personal service', 'Higher minimums', 'No specialty focus'],
        pricing: 'similar',
        marketShare: 18,
        differentiators: [
          'Our products are artisan/specialty vs their commodity focus',
          'Direct relationships with producers vs their distribution network',
          'Product education and tasting support vs their transactional approach',
          'Flexible minimums for specialty items',
        ],
      },
      {
        id: 'comp-us-foods-002',
        name: 'US Foods',
        products: ['Mid-tier specialty items', 'Standard gourmet line', 'Some imports'],
        strengths: ['Good selection', 'Reliable delivery', 'Chef support programs', 'Competitive pricing'],
        weaknesses: ['Limited high-end selection', 'Less authentic sources', 'Larger territories', 'Generic product knowledge'],
        pricing: 'similar',
        marketShare: 15,
        differentiators: [
          'True specialty focus vs their broad commodity approach',
          'Direct import relationships ensure authenticity',
          'Deep product knowledge and storytelling',
          'Exclusive items they cannot access',
        ],
      },
    ],

    objectionHandlers: [
      {
        id: 'obj-price-too-high-001',
        objection: 'Your prices are too high',
        category: 'price',
        responses: [
          'I understand price is important. Let me show you the cost per serving - it\'s actually quite competitive.',
          'These are premium products that command higher menu prices. Your margin per dish actually increases.',
          'Quality ingredients reduce waste and improve consistency. Many of our clients find their food costs actually decrease.',
        ],
        tactics: [
          'Show side-by-side quality comparison',
          'Calculate margin per dish vs commodity alternative',
          'Share testimonial from similar customer',
          'Offer trial period to prove value',
        ],
        data: {
          statistics: [
            'Premium ingredients allow 30-40% higher menu pricing',
            'Customers report 15% reduction in waste with our products',
            '92% of clients reorder after trying',
          ],
          testimonials: [
            'Chef Marco, Bella Vista: "The Tuscan olive oil lets me charge $3 more per appetizer. Pays for itself."',
            'Sarah Chen, The Garden: "Quality means consistency. No more disappointed diners."',
          ],
          caseStudies: [
            'Riverside Bistro increased appetizer margin by 8% after switching to our oils',
          ],
        },
        relatedProducts: ['prod-olive-oil-001'],
      },
      {
        id: 'obj-happy-current-supplier-002',
        objection: 'We\'re happy with our current supplier',
        category: 'competition',
        responses: [
          'That\'s great to hear! I\'m not here to replace them entirely. Many clients use us for specialty items while keeping their main distributor.',
          'I understand loyalty. Would you be open to a side-by-side tasting? Let the products speak for themselves.',
          'Even satisfied customers benefit from having options. What if I could help you with items your current supplier struggles with?',
        ],
        tactics: [
          'Position as complementary not competitive',
          'Offer no-risk product trial',
          'Ask about gaps in current service',
          'Focus on specialty items',
        ],
        data: {
          statistics: [
            '73% of our clients maintain relationships with multiple suppliers',
            'Average client adds 12 SKUs from us in first 6 months',
          ],
        },
      },
      {
        id: 'obj-no-budget-003',
        objection: 'We don\'t have budget right now',
        category: 'timing',
        responses: [
          'I completely understand. When does your next budget review typically happen?',
          'Would it help if we started with one or two hero items that can drive revenue?',
          'Many clients fund premium ingredients through menu price adjustments. The products pay for themselves.',
        ],
        tactics: [
          'Set future follow-up date',
          'Propose small pilot program',
          'Show ROI calculation',
          'Offer flexible payment terms',
        ],
      },
    ],

    salesScripts: [
      {
        id: 'script-opening-call-001',
        name: 'Initial Outreach - Restaurant',
        type: 'opening',
        script: 'Hi [Name], this is [Your Name] with [Company]. I work with restaurants in [Area] to source authentic artisan ingredients directly from producers in Italy, Spain, and France. I noticed your menu features [specific item] and thought you might be interested in our award-winning [product] that several chefs use to elevate similar dishes. Would you have 10 minutes this week for a quick conversation?',
        keyPoints: [
          'Mention specific menu observation',
          'Highlight direct sourcing',
          'Reference other chefs',
          'Keep time commitment low',
        ],
        dosDonts: {
          dos: [
            'Research their menu beforehand',
            'Be specific about products',
            'Mention local success stories',
            'Offer convenient timing',
          ],
          donts: [
            'Generic pitch',
            'Criticize current suppliers',
            'Oversell on first contact',
            'Request immediate meeting',
          ],
        },
      },
      {
        id: 'script-discovery-002',
        name: 'Discovery Questions',
        type: 'discovery',
        script: 'Tell me about your current menu focus... What ingredients are you most passionate about?... How do you typically source specialty items?... What would make your life easier when it comes to sourcing?',
        keyPoints: [
          'Listen more than talk',
          'Identify pain points',
          'Understand their vision',
          'Note specific needs',
        ],
        dosDonts: {
          dos: [
            'Ask open-ended questions',
            'Take detailed notes',
            'Show genuine interest',
            'Let them talk',
          ],
          donts: [
            'Pitch too early',
            'Interrupt',
            'Assume needs',
            'Rush the process',
          ],
        },
      },
    ],

    faqs: [
      {
        id: 'faq-001',
        question: 'What are your minimum order requirements?',
        answer: 'Minimums vary by product but generally start at $250 for specialty items. We\'re flexible for first orders and sample requests.',
        category: 'ordering',
        tags: ['minimums', 'ordering', 'getting-started'],
      },
      {
        id: 'faq-002',
        question: 'How long does delivery take?',
        answer: 'Stock items ship within 2-3 business days. Direct imports take 2-3 weeks. We offer expedited shipping for urgent needs.',
        category: 'logistics',
        tags: ['delivery', 'shipping', 'timing'],
      },
      {
        id: 'faq-003',
        question: 'Do you offer samples?',
        answer: 'Yes! We provide samples for qualified prospects. We want you to taste the quality before committing.',
        category: 'samples',
        tags: ['samples', 'tasting', 'trial'],
      },
      {
        id: 'faq-004',
        question: 'What certifications do your products have?',
        answer: 'Our products carry various certifications including USDA Organic, DOP/PDO, Non-GMO, Kosher, and Gluten-Free depending on the item. All documentation is available.',
        category: 'certifications',
        tags: ['certifications', 'organic', 'quality'],
      },
    ],

    regulations: [
      {
        id: 'reg-fda-food-safety-001',
        title: 'FDA Food Safety Modernization Act (FSMA)',
        description: 'All food products must comply with FSMA preventive controls and supplier verification requirements.',
        type: 'legal',
        jurisdiction: 'Federal (USA)',
        effectiveDate: '2011-01-04',
        requirements: [
          'Written food safety plan',
          'Hazard analysis',
          'Preventive controls',
          'Supplier verification program',
          'Recall procedures',
        ],
        penalties: ['Fines up to $1,000 per violation', 'Facility shutdown', 'Criminal prosecution for serious violations'],
        complianceChecklist: [
          'All suppliers are FSMA compliant',
          'COAs (Certificates of Analysis) available',
          'Lot tracking in place',
          'Temperature monitoring for perishables',
        ],
        resources: ['FDA.gov/FSMA', 'SafeFood Alliance'],
      },
    ],

    expertPersonas: [
      {
        id: 'persona-sommelier-001',
        name: 'Antonio Rossi',
        role: 'Master Sommelier & Culinary Expert',
        expertise: ['Wine pairing', 'Italian cuisine', 'Olive oil tasting', 'Product authentication'],
        personality: 'Passionate, knowledgeable, detail-oriented',
        communicationStyle: 'Uses vivid sensory descriptions, references traditional techniques, emphasizes authenticity',
        strengths: ['Product storytelling', 'Quality assessment', 'Pairing recommendations'],
        systemPrompt: 'You are Antonio Rossi, a master sommelier with 25 years experience in Italian culinary arts. You have deep knowledge of artisan food production, traditional methods, and authentic sourcing. You speak with passion about terroir, craftsmanship, and the stories behind great ingredients. You help sales professionals communicate the value and authenticity of premium food products.',
      },
    ],
  },

  aiConfig: {
    systemPrompt: `You are an expert food and beverage sales assistant specializing in specialty, artisan, and gourmet products.

Your expertise includes:
- Premium olive oils, vinegars, and condiments
- Artisan ingredients and gourmet foods
- Wine and beverage products
- Restaurant and hospitality sales
- Product authentication and quality assessment

When helping with sales conversations:
1. Emphasize quality, authenticity, and artisan production
2. Tell the story behind products (origin, producer, traditional methods)
3. Suggest pairings and applications
4. Handle price objections by focusing on value and margin
5. Reference certifications and awards when relevant
6. Use sensory language (taste, aroma, texture)

Always be professional, passionate, and knowledgeable. Position products as investments in quality, not expenses.`,

    interjectionRules: [
      {
        id: 'interj-price-objection-001',
        trigger: 'price',
        triggerType: 'keyword',
        priority: 5,
        interjectionTemplate: '💡 Tip: Show cost per serving and menu price potential',
      },
      {
        id: 'interj-quality-question-002',
        trigger: 'quality',
        triggerType: 'keyword',
        priority: 4,
        interjectionTemplate: '⭐ Mention certifications and awards',
      },
      {
        id: 'interj-competitor-003',
        trigger: 'sysco',
        triggerType: 'keyword',
        priority: 5,
        interjectionTemplate: '🎯 Position as specialty/artisan vs commodity',
      },
    ],

    preferredModel: 'gpt-4-turbo',
    temperature: 0.7,
    maxTokens: 1000,
  },
}
