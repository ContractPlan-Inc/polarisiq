// Sales Pitch Support System
// Pre-established pitches with fact support for voice interjections

export interface SalesPitch {
  id: string
  name: string
  category: string
  targetCustomer: string
  keyPoints: string[]
  supportingFacts: SupportingFact[]
  objectionHandlers: ObjectionHandler[]
  closingStatement: string
}

export interface SupportingFact {
  trigger: string  // Keyword or phrase that triggers this fact
  fact: string
  priority: 'critical' | 'important' | 'nice-to-have'
  timing: 'early' | 'mid' | 'late' | 'anytime'
}

export interface ObjectionHandler {
  objection: string
  response: string
  supportingData: string[]
}

// Pre-loaded sales pitches for Saval Foodservice
export const SALES_PITCHES: SalesPitch[] = [
  {
    id: 'european-butter-pastry',
    name: 'European Butter for Pastry Excellence',
    category: 'Pastry',
    targetCustomer: 'High-end bakeries, French patisseries, hotel pastry kitchens',
    keyPoints: [
      'European butter contains 82% butterfat vs 80% in American butter',
      'Higher fat content means better lamination and flakier pastries',
      'Cultured butter adds complex flavor profile',
      'Professional pastry chefs worldwide standard',
      'Better yield and less water content reduces waste'
    ],
    supportingFacts: [
      {
        trigger: 'butter',
        fact: 'European butter with 82% butterfat creates 15-20% better layers in croissants compared to standard butter.',
        priority: 'critical',
        timing: 'early'
      },
      {
        trigger: 'expensive',
        fact: 'Cost per croissant is actually comparable because you need less butter and get better yield - professional bakeries save money on labor redos.',
        priority: 'critical',
        timing: 'mid'
      },
      {
        trigger: 'lamination',
        fact: 'The lower water content means butter stays pliable at the right temperature, making lamination significantly easier and more consistent.',
        priority: 'important',
        timing: 'anytime'
      },
      {
        trigger: 'flavor',
        fact: 'Cultured butter develops lactic acid during fermentation, adding subtle tangy complexity that elevates both sweet and savory applications.',
        priority: 'nice-to-have',
        timing: 'late'
      }
    ],
    objectionHandlers: [
      {
        objection: 'too expensive',
        response: 'Let me show you the cost per pastry. The yield improvement actually makes it cost-comparable, plus you eliminate waste from failed batches.',
        supportingData: [
          'Standard butter: $4/lb = $0.25 per croissant with 15% waste',
          'European butter: $6/lb = $0.27 per croissant with 5% waste',
          'Labor savings from fewer redos: $50-100 per batch'
        ]
      },
      {
        objection: 'current butter works fine',
        response: 'Absolutely, and imagine if your croissants could be even better. Many pastry chefs who switch never go back because the difference is noticeable to customers.',
        supportingData: [
          'Chef testimonial: "Customers immediately noticed the difference"',
          'Flakier, more defined layers',
          'Better rise and oven spring',
          'Easier to work with - more forgiving temperature range'
        ]
      }
    ],
    closingStatement: 'For serious pastry work, European butter is the professional standard. Would you like to try a case and compare your results?'
  },

  {
    id: 'belgian-chocolate-premium',
    name: 'Belgian Chocolate for Premium Desserts',
    category: 'Pastry',
    targetCustomer: 'Fine dining restaurants, chocolatiers, high-end dessert programs',
    keyPoints: [
      'Belgian couverture 70% cacao with optimal cocoa butter content',
      'Superior tempering characteristics for professional work',
      'Consistent quality batch to batch',
      'Allows premium menu pricing',
      'Elevates dessert program reputation'
    ],
    supportingFacts: [
      {
        trigger: 'chocolate',
        fact: 'Belgian couverture has a specific cocoa butter ratio that creates the perfect snap and glossy finish when properly tempered.',
        priority: 'critical',
        timing: 'early'
      },
      {
        trigger: 'tempering',
        fact: 'This chocolate tempers at 88-90°F and holds temper longer, giving you a wider working window than commodity chocolate.',
        priority: 'important',
        timing: 'anytime'
      },
      {
        trigger: 'price',
        fact: 'A $14 dessert with premium chocolate can be priced at $18-22. The $2 ingredient cost increase generates $6-10 more revenue.',
        priority: 'critical',
        timing: 'mid'
      },
      {
        trigger: 'customers',
        fact: 'Discerning diners can taste the quality difference. Premium chocolate signals serious dessert program.',
        priority: 'nice-to-have',
        timing: 'late'
      }
    ],
    objectionHandlers: [
      {
        objection: 'too expensive',
        response: 'Think of it as a menu pricing opportunity. Premium chocolate allows you to charge $4-6 more per dessert. Let me show you the revenue increase.',
        supportingData: [
          'Standard chocolate dessert: $14 menu price, $2 ingredient cost = $12 margin',
          'Belgian chocolate dessert: $20 menu price, $4 ingredient cost = $16 margin',
          'Additional profit per dessert: $4',
          'On 50 desserts/week: $200 additional weekly profit = $10,400/year'
        ]
      },
      {
        objection: 'customers wont notice',
        response: 'Actually, chocolate is one area where quality is very noticeable. The flavor complexity and mouthfeel are distinctly different.',
        supportingData: [
          'Blind taste tests show 80% customer preference',
          'Richer, more complex flavor profile',
          'Smoother melt in mouth',
          'Professional pastry chefs can immediately taste the difference'
        ]
      }
    ],
    closingStatement: 'Belgian chocolate is an investment in your dessert program reputation. Shall I include a case for you to test in your signature dessert?'
  },

  {
    id: 'halal-mediterranean',
    name: 'Halal-Certified Mediterranean Products',
    category: 'Ethnic',
    targetCustomer: 'Middle Eastern restaurants, halal establishments, Mediterranean concepts',
    keyPoints: [
      'Full halal certification (IFANCA certified)',
      'Authentic Lebanese and Turkish sourcing',
      'Premium quality tahini, olive oil, and specialty items',
      'Meets religious dietary requirements',
      'Builds trust with Muslim customers'
    ],
    supportingFacts: [
      {
        trigger: 'halal',
        fact: 'Our Lebanese tahini is IFANCA halal certified and also meets kosher standards, making it versatile for diverse customers.',
        priority: 'critical',
        timing: 'early'
      },
      {
        trigger: 'tahini',
        fact: 'Premium tahini makes or breaks hummus quality. Ours is 100% pure sesame with no additives - you can taste the difference.',
        priority: 'important',
        timing: 'mid'
      },
      {
        trigger: 'authentic',
        fact: 'Direct sourcing from Lebanon ensures authentic flavor profile that your Middle Eastern customers expect.',
        priority: 'important',
        timing: 'anytime'
      },
      {
        trigger: 'certification',
        fact: 'We provide full certification documentation for each batch, which you can display or provide to customers who ask.',
        priority: 'nice-to-have',
        timing: 'late'
      }
    ],
    objectionHandlers: [
      {
        objection: 'current tahini works',
        response: 'Let me ask - do you taste your tahini before making hummus? The difference in flavor between commodity and premium is significant.',
        supportingData: [
          'Premium tahini: Smooth, rich, nutty flavor',
          'Commodity tahini: Often bitter, inconsistent',
          'Customer complaints about "bitter hummus" usually trace to tahini quality',
          'Chef blind taste test: 95% prefer premium tahini'
        ]
      },
      {
        objection: 'price difference',
        response: 'Hummus is a high-profit item. An extra $1 per batch allows you to charge $1-2 more and customers notice the quality.',
        supportingData: [
          'Premium hummus commands $2-3 higher price',
          'Builds reputation for authenticity',
          'Reduces complaints about bitter or grainy hummus',
          'Many authentic Middle Eastern restaurants use this tahini'
        ]
      }
    ],
    closingStatement: 'For authentic Mediterranean cuisine, ingredient quality matters. Would you like to try our tahini in your next hummus batch?'
  },

  {
    id: 'japanese-miso-fusion',
    name: 'Japanese Miso for Modern Fusion',
    category: 'Ethnic',
    targetCustomer: 'Modern American restaurants, fusion concepts, progressive chefs',
    keyPoints: [
      'White miso: sweet, mild, versatile',
      'Perfect for marinades, glazes, and dressings',
      'Adds umami depth to non-Japanese dishes',
      'Authentic Japanese fermentation',
      'Trending ingredient in modern cuisine'
    ],
    supportingFacts: [
      {
        trigger: 'miso',
        fact: 'White miso is the most versatile variety - sweet enough for desserts, savory enough for proteins, perfect for modern fusion applications.',
        priority: 'critical',
        timing: 'early'
      },
      {
        trigger: 'umami',
        fact: 'Miso is one of the purest sources of natural umami, adding depth without MSG. Chefs use it to elevate everything from caramel to steak.',
        priority: 'important',
        timing: 'mid'
      },
      {
        trigger: 'glaze',
        fact: 'A miso-honey glaze on salmon or black cod is restaurant-signature level - customers rave about the complex sweet-savory balance.',
        priority: 'important',
        timing: 'anytime'
      },
      {
        trigger: 'trending',
        fact: 'Miso is appearing on top restaurant menus nationwide - it\'s familiar enough that customers recognize it, unique enough to be special.',
        priority: 'nice-to-have',
        timing: 'late'
      }
    ],
    objectionHandlers: [
      {
        objection: 'not a japanese restaurant',
        response: 'Exactly - that\'s the beauty of white miso. It crosses cuisines. Use it in American, Italian, or French dishes for umami depth.',
        supportingData: [
          'Miso-butter for steak',
          'Miso-caramel for desserts',
          'Miso-maple glaze for pork',
          'Miso vinaigrette for salads',
          'Famous chefs use miso outside Japanese cuisine'
        ]
      },
      {
        objection: 'customers unfamiliar',
        response: 'Menu it as "umami glaze" or "fermented soybean sauce" - customers love it when they try it. It\'s not foreign anymore.',
        supportingData: [
          'Miso appeared in 35% more American restaurant menus in 2023',
          'Younger diners especially embrace umami flavors',
          'Can be subtle - customers taste the effect, not the ingredient',
          'Great conversation starter for servers'
        ]
      }
    ],
    closingStatement: 'Miso is your secret weapon for adding depth to any dish. Want to try it in your signature glaze or marinade?'
  },

  {
    id: 'value-over-price',
    name: 'Value Selling Framework (Generic)',
    category: 'Sales Technique',
    targetCustomer: 'All customers facing price objections',
    keyPoints: [
      'Focus on cost per serving, not unit price',
      'Highlight yield advantages and waste reduction',
      'Emphasize menu pricing power',
      'Calculate labor savings',
      'Position as investment in reputation'
    ],
    supportingFacts: [
      {
        trigger: 'expensive',
        fact: 'Premium products typically yield 15-20% better, meaning cost per serving is often comparable to cheaper alternatives.',
        priority: 'critical',
        timing: 'early'
      },
      {
        trigger: 'budget',
        fact: 'Many chefs start with premium ingredients on signature dishes only - creates a halo effect for the entire menu.',
        priority: 'important',
        timing: 'mid'
      },
      {
        trigger: 'labor',
        fact: 'Better ingredients are often easier to work with and more consistent, saving labor time and reducing waste from mistakes.',
        priority: 'important',
        timing: 'anytime'
      },
      {
        trigger: 'customers',
        fact: 'Customers pay premium prices for quality they can taste. A $2 ingredient upgrade can justify $5-8 higher menu price.',
        priority: 'critical',
        timing: 'late'
      }
    ],
    objectionHandlers: [
      {
        objection: 'too expensive',
        response: 'I understand. Let me show you the actual cost per serving and the revenue opportunity. The numbers might surprise you.',
        supportingData: [
          'Break down cost per serving',
          'Show yield advantages',
          'Calculate menu price increase potential',
          'Demonstrate annual profit impact',
          'Offer sample or small trial order'
        ]
      },
      {
        objection: 'need to think about it',
        response: 'Absolutely. What if I leave you with a sample and some cost breakdowns? Try it and see if you notice the difference.',
        supportingData: [
          'No-risk sample offer',
          'Written ROI calculation',
          'Chef testimonials',
          '30-day trial offer',
          'Follow-up in one week'
        ]
      }
    ],
    closingStatement: 'Quality ingredients are an investment in your reputation and profitability. What would you like to try first?'
  }
]

// Helper function to find relevant pitch
export function findRelevantPitch(keywords: string[]): SalesPitch | null {
  for (const keyword of keywords) {
    const pitch = SALES_PITCHES.find(p =>
      p.category.toLowerCase().includes(keyword.toLowerCase()) ||
      p.name.toLowerCase().includes(keyword.toLowerCase()) ||
      p.keyPoints.some(kp => kp.toLowerCase().includes(keyword.toLowerCase()))
    )
    if (pitch) return pitch
  }
  return null
}

// Helper function to find supporting fact
export function findSupportingFact(pitch: SalesPitch, trigger: string, timing?: string): SupportingFact | null {
  const facts = pitch.supportingFacts.filter(f =>
    trigger.toLowerCase().includes(f.trigger.toLowerCase()) &&
    (!timing || f.timing === timing || f.timing === 'anytime')
  ).sort((a, b) => {
    const priorityOrder = { critical: 3, important: 2, 'nice-to-have': 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  return facts[0] || null
}

// Helper function to find objection handler
export function findObjectionHandler(pitch: SalesPitch, objection: string): ObjectionHandler | null {
  return pitch.objectionHandlers.find(oh =>
    objection.toLowerCase().includes(oh.objection.toLowerCase())
  ) || null
}

// Get all pitches by category
export function getPitchesByCategory(category: string): SalesPitch[] {
  return SALES_PITCHES.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

// Get pitch by ID
export function getPitchById(id: string): SalesPitch | null {
  return SALES_PITCHES.find(p => p.id === id) || null
}
