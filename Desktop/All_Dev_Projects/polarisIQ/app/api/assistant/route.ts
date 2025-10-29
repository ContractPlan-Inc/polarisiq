import { NextRequest, NextResponse } from 'next/server'
import { PRODUCTS, CUISINES, TECHNIQUES, DIETARY_INFO, ALLERGENS } from '@/lib/knowledge/specialtyFoods'
import { EXPERT_PERSONAS, selectExpert } from '@/lib/experts/personas'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AssistantRequest {
  message: string
  context?: string
  history?: Message[]
  currentExpert?: string
  meetingMode?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { message, context, history = [], currentExpert, meetingMode = false }: AssistantRequest = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Select appropriate expert based on query
    const expert = selectExpert(message, currentExpert)

    // Build conversation context
    const conversationHistory = history.slice(-10).map((msg: Message) =>
      `${msg.role === 'user' ? 'Rep' : 'Expert'}: ${msg.content}`
    ).join('\n')

    // Generate expert response
    const response = await generateExpertResponse(
      message,
      expert.id,
      context,
      conversationHistory,
      meetingMode
    )

    return NextResponse.json({
      response: response.answer,
      expert: {
        id: expert.id,
        name: expert.name,
        role: expert.role,
        avatar: expert.avatar
      },
      suggestions: response.suggestions,
      relatedProducts: response.relatedProducts,
      actionItems: response.actionItems
    })
  } catch (error) {
    console.error('Assistant API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Advanced AI Response Generator for Saval Foodservice
async function generateExpertResponse(
  query: string,
  expertId: string,
  context?: string,
  history?: string,
  meetingMode?: boolean
): Promise<{
  answer: string
  suggestions: string[]
  relatedProducts: typeof PRODUCTS
  actionItems: string[]
}> {
  const lowerQuery = query.toLowerCase()
  const expert = EXPERT_PERSONAS.find(e => e.id === expertId)!

  let answer = ''
  let suggestions: string[] = []
  let relatedProducts = []
  let actionItems: string[] = []

  // ALLERGEN QUERIES
  if (lowerQuery.includes('allergen') || lowerQuery.includes('allergy')) {
    if (lowerQuery.includes('chocolate') || lowerQuery.includes('cocoa')) {
      answer = `**${expert.name}** (${expert.role}):\n\n` +
        `Chocolate allergen information is critical for specialty sales. Here's what you need to know:\n\n` +
        `🔴 **Common Allergens in Chocolate:**\n` +
        `- **Milk** - Present in milk chocolate, often in dark chocolate due to shared equipment\n` +
        `- **Soy Lecithin** - Used as emulsifier in most commercial chocolate\n` +
        `- **Tree Nuts** - Many facilities process nuts; check "may contain" warnings\n\n` +
        `✅ **For Saval Customers:**\n` +
        `- Belgian Dark 70% (p001): Contains milk, soy - not suitable for dairy-free\n` +
        `- Always verify current batch allergen statements\n` +
        `- Cross-contamination risk in shared facilities\n` +
        `- For truly dairy-free: recommend certified vegan chocolate\n\n` +
        `💡 **Sales Tip:** When a chef mentions chocolate for desserts, proactively ask about allergen requirements - shows professionalism and prevents issues.`

      relatedProducts = PRODUCTS.filter(p => p.category === 'Pastry' && p.subcategory === 'Chocolate')
      actionItems = ['Verify current allergen statement on specific batch', 'Ask customer about allergen restrictions upfront']
    } else {
      answer = `**${expert.name}** (${expert.role}):\n\n` +
        `For Saval specialty sales, allergen knowledge is non-negotiable. Here's your quick reference:\n\n` +
        `📋 **FDA Top 9 Major Allergens:**\n` +
        `${ALLERGENS.top9.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\n` +
        `⚠️ **Additional Allergens to Know:**\n${ALLERGENS.additional.join(', ')}\n\n` +
        `**Best Practices for Sales Calls:**\n` +
        `1. Ask about allergen requirements early in conversation\n` +
        `2. Check "may contain" warnings - cross-contamination matters\n` +
        `3. Verify certifications (especially for gluten-free <20ppm)\n` +
        `4. Document customer's allergen needs in notes\n` +
        `5. When in doubt, offer to get written confirmation from supplier\n\n` +
        `Which specific product or allergen are you concerned about?`

      suggestions = ['Tell me about a specific product', 'Gluten-free options', 'Dairy-free alternatives', 'Nut-free products']
    }
  }

  // DIETARY COMPLIANCE
  else if (lowerQuery.match(/\b(kosher|halal|vegan|vegetarian|gluten-free|gluten free)\b/)) {
    if (lowerQuery.includes('kosher')) {
      answer = `**${expert.name}** (${expert.role}):\n\n` +
        `Kosher compliance for Saval specialty products - here's what your customer needs:\n\n` +
        `✡️ **Kosher Basics:**\n` +
        `- **Meat & Dairy Separation:** Never mix or use same equipment without kashering\n` +
        `- **Pareve Products:** Neither meat nor dairy (safe for any kosher meal)\n` +
        `- **Certification Required:** Look for OU, OK, Kof-K, Star-K symbols\n\n` +
        `**From Our Catalog:**\n` +
        `- Lebanese Tahini (e002): Certified Kosher Pareve - perfect for any kosher kitchen\n` +
        `- Many specialty items available with certification\n\n` +
        `**Key Certifications:**\n` +
        `${DIETARY_INFO.kosher.certifications.join(', ')}\n\n` +
        `**Wait Times:**\n` +
        `- Meat to Dairy: ${DIETARY_INFO.kosher.timing[0]}\n` +
        `- Dairy to Meat: ${DIETARY_INFO.kosher.timing[1]}\n\n` +
        `💼 **For Your Customer:** If they're kosher, they likely know the requirements better than us. Focus on which products have certifications and can get documentation quickly.`

      relatedProducts = PRODUCTS.filter(p => p.dietary.includes('Kosher'))
      actionItems = ['Identify products with kosher certification', 'Offer to provide certification documentation']
    } else if (lowerQuery.includes('halal')) {
      answer = `**${expert.name}** (${expert.role}):\n\n` +
        `Halal requirements for specialty foodservice - critical for Muslim customers:\n\n` +
        `☪️ **Halal Core Principles:**\n` +
        `${DIETARY_INFO.halal.principles.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n` +
        `🚫 **Strictly Avoid:**\n` +
        `${DIETARY_INFO.halal.avoid.map(a => `- ${a}`).join('\n')}\n\n` +
        `✅ **Our Halal-Friendly Products:**\n` +
        `- Lebanese Tahini (e002): Halal certified\n` +
        `- Many specialty items naturally halal or certifiable\n\n` +
        `**Trusted Certifications:**\n` +
        `${DIETARY_INFO.halal.certifications.join(', ')}\n\n` +
        `💡 **Sales Approach:** Many Middle Eastern restaurants require halal. If discussing Mediterranean or Middle Eastern cuisine, proactively mention halal availability - shows cultural awareness.`

      relatedProducts = PRODUCTS.filter(p => p.dietary.includes('Halal'))
      actionItems = ['Confirm halal certification status', 'Provide certification documentation']
    } else if (lowerQuery.match(/\b(vegan|plant-based)\b/)) {
      answer = `**${expert.name}** (${expert.role}):\n\n` +
        `Vegan options for specialty foodservice - growing market opportunity:\n\n` +
        `🌱 **What Vegans Avoid:**\n` +
        `${DIETARY_INFO.vegan.avoid.join(', ')}\n\n` +
        `**Smart Substitutions:**\n` +
        `${Object.entries(DIETARY_INFO.vegan.alternatives).map(([key, vals]) =>
          `**${key.charAt(0).toUpperCase() + key.slice(1)}:** ${vals.join(', ')}`
        ).join('\n')}\n\n` +
        `⚠️ **Hidden Non-Vegan Ingredients:**\n` +
        `${DIETARY_INFO.vegan.watchFor.map(w => `- ${w}`).join('\n')}\n\n` +
        `**Saval Vegan Products:**\n` +
        `- Japanese Miso (e001): Pure vegan umami\n` +
        `- Lebanese Tahini (e002): Vegan protein powerhouse\n` +
        `- Thai Curry Paste (e003): Check specific brand - some contain fish\n\n` +
        `💼 **For Specialty Sales:** High-end vegan is premium pricing. Focus on quality, flavor, and menu differentiation rather than price.`

      relatedProducts = PRODUCTS.filter(p => p.dietary.includes('Vegan'))
      suggestions = ['Vegan egg replacements', 'Vegan dairy alternatives', 'Vegan protein options']
    } else if (lowerQuery.match(/\b(gluten-free|gluten free|celiac)\b/)) {
      answer = `**${expert.name}** (${expert.role}):\n\n` +
        `Gluten-free for specialty foodservice - requires strict attention:\n\n` +
        `⚠️ **Foods to Avoid:**\n` +
        `${DIETARY_INFO['gluten-free'].avoid.join(', ')}\n\n` +
        `✅ **Safe Ingredients:**\n` +
        `${DIETARY_INFO['gluten-free'].safe.join(', ')}\n\n` +
        `🔍 **Critical Watch Points:**\n` +
        `${DIETARY_INFO['gluten-free'].watchFor.map(w => `- ${w}`).join('\n')}\n\n` +
        `**Certification Standards:**\n` +
        `${DIETARY_INFO['gluten-free'].certifications.join(', ')}\n` +
        `- Must be <20ppm gluten for certification\n\n` +
        `**Saval GF Products:**\n` +
        `Many specialty items naturally gluten-free:\n` +
        `- Tahini, miso (check brands), fresh proteins, produce\n` +
        `- Issue is cross-contamination in processing facilities\n\n` +
        `💡 **Critical:** For celiac customers, "gluten-free" isn't optional - it's medical. If unsure about cross-contamination, be honest and offer to verify with supplier.`

      relatedProducts = PRODUCTS.filter(p => p.dietary.includes('Gluten-Free'))
      actionItems = ['Verify <20ppm certification', 'Check cross-contamination protocols', 'Get facility statement']
    }
  }

  // PRODUCT SUBSTITUTIONS
  else if (lowerQuery.match(/\b(substitute|alternative|replace|instead of|out of stock)\b/)) {
    answer = `**${expert.name}** (${expert.role}):\n\n` +
      `Product substitutions for specialty sales - never lose a sale:\n\n` +
      `🎯 **Substitution Strategy:**\n\n` +
      `**1. Understand the Need:**\n` +
      `- Why substitute? (out of stock / cost / dietary / preference)\n` +
      `- End use? (baking vs. cooking / temperature / technique)\n` +
      `- Acceptable variance? (exact match vs. creative alternative)\n\n` +
      `**2. Key Product Substitutions:**\n\n` +
      `**Butter (European 82%):**\n` +
      `- Same level: Plugra, Vermont Creamery\n` +
      `- Step down: Quality domestic butter (less flavor, more water)\n` +
      `- Vegan: Miyoko's cultured vegan butter (surprisingly good for pastry)\n\n` +
      `**Belgian Chocolate:**\n` +
      `- Same level: Valrhona, Callebaut\n` +
      `- Different profile: Guittard (American, different taste)\n` +
      `- Budget: Quality couverture (Cacao Barry)\n\n` +
      `**Italian 00 Flour:**\n` +
      `- Pasta/Pizza: Can use bread flour (different texture)\n` +
      `- Pastry: Mix AP flour + cornstarch for similar delicacy\n\n` +
      `**Specialty Proteins:**\n` +
      `- Duck Confit: Fresh duck legs (requires prep time)\n` +
      `- Jamón Ibérico: Prosciutto di Parma (different but excellent)\n\n` +
      `💼 **Sales Approach:**\n` +
      `1. "I understand [original] is your preference..."\n` +
      `2. "Let me suggest an alternative that maintains quality..."\n` +
      `3. Explain the difference honestly\n` +
      `4. Offer sample if possible\n` +
      `5. Position as solution, not compromise\n\n` +
      `What specific product needs a substitute?`

    suggestions = ['Chocolate substitutes', 'Butter alternatives', 'Flour substitutions', 'Protein alternatives']
  }

  // CUISINE-SPECIFIC QUERIES
  else if (lowerQuery.match(/\b(japanese|sushi|miso|asian)\b/)) {
    const cuisine = CUISINES.find(c => c.name === 'Japanese')!
    answer = `**${expert.name}** (${expert.role}):\n\n` +
      `Japanese cuisine for specialty sales - authenticity matters:\n\n` +
      `🇯🇵 **Key Characteristics:**\n${cuisine.characteristics.map(c => `- ${c}`).join('\n')}\n\n` +
      `**Essential Ingredients:**\n${cuisine.keyIngredients.join(', ')}\n\n` +
      `**Core Techniques:**\n${cuisine.commonTechniques.join(', ')}\n\n` +
      `**Popular Dishes:**\n${cuisine.popularDishes.join(', ')}\n\n` +
      `**Saval Japanese Products:**\n` +
      `- White Miso (e001): Sweet, versatile - perfect for modern fusion\n` +
      `- Use in marinades, glazes, soups, dressings\n\n` +
      `💡 **Sales Tip:** Japanese chefs appreciate when you know quality grades. For sushi restaurants, talk about:\n` +
      `- Sushi-grade fish standards\n` +
      `- Japanese rice varieties (short-grain, proper starch)\n` +
      `- Quality soy sauce (not supermarket grade)\n` +
      `- Authentic wasabi vs. horseradish mix\n\n` +
      `What specific Japanese ingredient or technique are you discussing?`

    relatedProducts = PRODUCTS.filter(p => p.subcategory === 'Japanese')
    suggestions = ['Sushi-grade fish requirements', 'Miso types and uses', 'Japanese vs. Chinese soy sauce', 'Authentic wasabi']
  }

  else if (lowerQuery.match(/\b(middle eastern|mediterranean|tahini|hummus|halal)\b/)) {
    const cuisine = CUISINES.find(c => c.name === 'Middle Eastern')!
    answer = `**${expert.name}** (${expert.role}):\n\n` +
      `Middle Eastern & Mediterranean cuisine - rich opportunity for specialty sales:\n\n` +
      `🫒 **Cuisine Characteristics:**\n${cuisine.characteristics.map(c => `- ${c}`).join('\n')}\n\n` +
      `**Foundation Ingredients:**\n${cuisine.keyIngredients.join(', ')}\n\n` +
      `**Essential Techniques:**\n${cuisine.commonTechniques.join(', ')}\n\n` +
      `**Popular Dishes:**\n${cuisine.popularDishes.join(', ')}\n\n` +
      `**Saval Middle Eastern Products:**\n` +
      `- Lebanese Tahini (e002): 100% pure sesame\n` +
      `  • Kosher & Halal certified\n` +
      `  • Foundation for hummus, baba ganoush, tahini sauce\n` +
      `  • Premium quality vs. grocery brands\n\n` +
      `📋 **Dietary Considerations:**\n${cuisine.dietaryConsiderations.map(d => `- ${d}`).join('\n')}\n\n` +
      `💼 **For Mediterranean Restaurants:**\n` +
      `- Quality tahini is KEY to good hummus\n` +
      `- Many items naturally vegan (great for modern menus)\n` +
      `- Halal certification matters for authentic restaurants\n` +
      `- Olive oil quality dramatically affects dishes\n\n` +
      `What aspect of Middle Eastern cuisine are we focusing on?`

    relatedProducts = PRODUCTS.filter(p => p.subcategory === 'Middle Eastern')
    suggestions = ['Tahini quality grades', 'Halal protein sources', 'Za\'atar and spice blends', 'Olive oil selection']
  }

  else if (lowerQuery.match(/\b(thai|curry|lemongrass|asian)\b/)) {
    const cuisine = CUISINES.find(c => c.name === 'Thai')!
    answer = `**${expert.name}** (${expert.role}):\n\n` +
      `Thai cuisine - balance and complexity for specialty sales:\n\n` +
      `🇹🇭 **The Four Flavors Balance:**\n${cuisine.characteristics.map(c => `- ${c}`).join('\n')}\n\n` +
      `**Essential Thai Ingredients:**\n${cuisine.keyIngredients.join(', ')}\n\n` +
      `**Core Techniques:**\n${cuisine.commonTechniques.join(', ')}\n\n` +
      `**Signature Dishes:**\n${cuisine.popularDishes.join(', ')}\n\n` +
      `**Saval Thai Products:**\n` +
      `- Thai Red Curry Paste (e003): Authentic blend\n` +
      `  • Contains fish sauce & shrimp paste (allergen alert!)\n` +
      `  • Mix with coconut milk for instant curry base\n` +
      `  • Also works for marinades and stir-fry\n\n` +
      `⚠️ **Dietary Notes:**\n${cuisine.dietaryConsiderations.map(d => `- ${d}`).join('\n')}\n\n` +
      `💡 **Sales Tip:** Thai restaurants often make their own pastes for authenticity. Position prepared paste as:\n` +
      `- Consistency backup when chef is out\n` +
      `- Labor savings during peak service\n` +
      `- Quality baseline for kitchen staff\n\n` +
      `What Thai ingredients or dishes are you discussing?`

    relatedProducts = PRODUCTS.filter(p => p.subcategory === 'Thai')
    suggestions = ['Fish sauce quality levels', 'Coconut milk grades', 'Fresh vs. dried lemongrass', 'Thai basil varieties']
  }

  // TECHNIQUE QUERIES
  else if (lowerQuery.match(/\b(tempering|lamination|technique|how to|preparation)\b/)) {
    if (lowerQuery.includes('tempering') || lowerQuery.includes('chocolate')) {
      const technique = TECHNIQUES.pastry.tempering
      answer = `**${expert.name}** (${expert.role}):\n\n` +
        `Chocolate tempering - the foundation of professional pastry work:\n\n` +
        `🍫 **${technique.name}**\n` +
        `${technique.description}\n\n` +
        `**Difficulty:** ${technique.difficulty.toUpperCase()}\n\n` +
        `**Critical Temperature Points:**\n${technique.keyPoints.map(p => `• ${p}`).join('\n')}\n\n` +
        `**Applications:**\n${technique.applications.join(', ')}\n\n` +
        `⚠️ **Common Mistakes:**\n${technique.commonMistakes.map(m => `- ${m}`).join('\n')}\n\n` +
        `💼 **For Your Customer:**\n` +
        `If discussing chocolate work with a pastry chef, ask:\n` +
        `- "Are you tempering by hand or using a tempering machine?"\n` +
        `- "What's your preferred chocolate brand?" (shows you know brands matter)\n` +
        `- Professional chefs respect reps who understand technique challenges\n\n` +
        `**Recommended:** Belgian Dark Couverture (p001) - excellent for tempering with stable cocoa butter crystals.`

      relatedProducts = PRODUCTS.filter(p => p.subcategory === 'Chocolate')
      suggestions = ['Chocolate brands comparison', 'Tempering alternatives', 'Cocoa butter percentages']
    } else if (lowerQuery.includes('lamination') || lowerQuery.includes('croissant') || lowerQuery.includes('puff pastry')) {
      const technique = TECHNIQUES.pastry.lamination
      answer = `**${expert.name}** (${expert.role}):\n\n` +
        `Lamination - the art of creating flaky, layered pastries:\n\n` +
        `🥐 **${technique.name}**\n` +
        `${technique.description}\n\n` +
        `**Difficulty:** ${technique.difficulty.toUpperCase()}\n\n` +
        `**Essential Points:**\n${technique.keyPoints.map(p => `• ${p}`).join('\n')}\n\n` +
        `**Applications:**\n${technique.applications.join(', ')}\n\n` +
        `❌ **Common Problems:**\n${technique.commonMistakes.map(m => `- ${m}`).join('\n')}\n\n` +
        `🧈 **Critical Ingredient:**\n` +
        `European butter (82% butterfat) is ESSENTIAL for proper lamination:\n` +
        `- Higher fat = more pliable butter\n` +
        `- Less water = better layers\n` +
        `- Cultured = better flavor\n\n` +
        `**Recommended:** French Cultured Butter (p002) - professional standard for croissants and puff pastry.\n\n` +
        `💼 **Sales Angle:** If customer uses standard butter for lamination, they're fighting an uphill battle. European butter is a game-changer - worth the premium for serious pastry.`

      relatedProducts = PRODUCTS.filter(p => p.name.includes('Butter'))
      suggestions = ['European vs. American butter', 'Lamination troubleshooting', 'Puff pastry shortcuts']
    }
  }

  // PAIRING SUGGESTIONS
  else if (lowerQuery.match(/\b(pairing|pair|goes with|match|complement)\b/)) {
    answer = `**${expert.name}** (${expert.role}):\n\n` +
      `Food pairing principles for specialty sales - help customers create winning combinations:\n\n` +
      `🎨 **Core Pairing Principles:**\n\n` +
      `**1. Complement (Similar Intensities)**\n` +
      `- Bold with bold: Blue cheese + dark chocolate\n` +
      `- Delicate with delicate: Fresh mozzarella + ripe tomatoes\n\n` +
      `**2. Contrast (Opposite Profiles)**\n` +
      `- Sweet + Salty: Prosciutto + melon\n` +
      `- Rich + Acidic: Duck confit + cherry gastrique\n` +
      `- Fatty + Bright: Salmon + lemon\n\n` +
      `**3. Regional Harmony**\n` +
      `- What grows together, goes together\n` +
      `- Italian: Tomato + basil + mozzarella\n` +
      `- Japanese: Soy + ginger + sesame\n\n` +
      `**Saval Product Pairings:**\n\n` +
      `**Belgian Dark Chocolate (p001):**\n` +
      `${PRODUCTS.find(p => p.id === 'p001')?.pairings?.join(', ')}\n\n` +
      `**Jamón Ibérico (s002):**\n` +
      `${PRODUCTS.find(p => p.id === 's002')?.pairings?.join(', ')}\n\n` +
      `**Burrata (d001):**\n` +
      `${PRODUCTS.find(p => p.id === 'd001')?.pairings?.join(', ')}\n\n` +
      `💼 **Sales Strategy:**\n` +
      `- Suggest complementary items (increases order value)\n` +
      `- "With this jamón, many customers also order..."\n` +
      `- Offer to create pairing suggestions for their menu\n` +
      `- Bundle items for chef's convenience\n\n` +
      `What specific item needs pairing suggestions?`

    suggestions = ['Cheese pairings', 'Protein accompaniments', 'Dessert pairings', 'Wine pairings']
  }

  // PRICING & VALUE CONVERSATIONS
  else if (lowerQuery.match(/\b(price|cost|expensive|cheaper|budget|value)\b/)) {
    answer = `**${expert.name}** (${expert.role}):\n\n` +
      `Handling price conversations in specialty sales - sell value, not price:\n\n` +
      `💰 **Value Framework for Saval Sales:**\n\n` +
      `**1. Quality Metrics:**\n` +
      `- Yield: "Premium grade yields 15-20% more usable product"\n` +
      `- Consistency: "Eliminates waste from batch variation"\n` +
      `- Flavor: "Allows higher menu pricing"\n\n` +
      `**2. Labor Savings:**\n` +
      `- "Pre-portioned saves X hours of prep per week"\n` +
      `- "Ready-to-use = less skilled labor needed"\n` +
      `- "Calculate labor cost at $15-20/hour"\n\n` +
      `**3. Menu Differentiation:**\n` +
      `- "Specialty items justify premium menu prices"\n` +
      `- "Customers pay $8 more for authentic vs. standard"\n` +
      `- "Menu distinction attracts higher-value customers"\n\n` +
      `**4. Total Cost Per Serving:**\n` +
      `Don't compare unit price - compare serving cost:\n` +
      `- Belgian chocolate: Higher price, but richer (use less)\n` +
      `- European butter: Better yield in lamination\n` +
      `- Premium protein: Better trim loss ratio\n\n` +
      `🎯 **Effective Phrases:**\n` +
      `❌ "Yes, it's expensive, but..."\n` +
      `✅ "The cost per serving is actually comparable because..."\n\n` +
      `❌ "This is our premium option"\n` +
      `✅ "This is our professional standard for serious [pastry/cuisine]"\n\n` +
      `❌ "Can you afford this?"\n` +
      `✅ "Many customers find the quality difference justifies the investment"\n\n` +
      `**When Budget IS Tight:**\n` +
      `- Strategic substitution (premium items as features, not full menu)\n` +
      `- Start with samples to prove value\n` +
      `- Smaller initial order to test\n` +
      `- "Let's start with your signature dishes"\n\n` +
      `💼 Remember: Specialty sales is NOT about being cheapest. It's about being worth it.`

    suggestions = ['Calculate cost per serving', 'Value vs. budget alternatives', 'Sample program', 'Volume pricing']
    actionItems = ['Prepare cost-per-serving breakdown', 'Offer sample of premium product']
  }

  // MEETING MODE - GENERATE SUMMARY
  else if (meetingMode && lowerQuery.includes('summary')) {
    answer = `**${expert.name}** (${expert.role}):\n\n` +
      `📋 **Meeting Summary**\n\n` +
      `Based on our conversation, here's what we covered:\n\n` +
      `**Topics Discussed:**\n` +
      `- Specialty foods expertise\n` +
      `- Customer requirements and needs\n` +
      `- Product recommendations\n\n` +
      `**Action Items:**\n` +
      `${actionItems.length > 0 ? actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n') : '- Follow up with customer on product samples'}\n\n` +
      `**Next Steps:**\n` +
      `- Send product information and pricing\n` +
      `- Schedule follow-up call\n` +
      `- Prepare samples if requested\n\n` +
      `Would you like me to add anything to this summary?`
  }

  // DEFAULT HELPFUL RESPONSE
  else {
    answer = `**${expert.name}** (${expert.role}):\n\n` +
      `${context ? `I see you're working with: ${context}\n\n` : ''}` +
      `I'm here to support your Saval specialty sales calls. I can help with:\n\n` +
      `**🎯 Immediate Support:**\n` +
      `• Allergen & dietary information (kosher, halal, vegan, GF)\n` +
      `• Product knowledge (techniques, quality grades, uses)\n` +
      `• Substitution recommendations\n` +
      `• Pairing suggestions\n` +
      `• Pricing & value conversations\n\n` +
      `**👨‍🍳 Expert Topics:**\n` +
      `• Pastry techniques (lamination, tempering, etc.)\n` +
      `• Cuisine-specific knowledge (Japanese, Thai, Middle Eastern, Italian, Latin, Indian)\n` +
      `• Protein & butchery expertise\n` +
      `• Wine & beverage pairing\n\n` +
      `**📋 Meeting Features:**\n` +
      `• Real-time notes during customer calls\n` +
      `• Action item tracking\n` +
      `• Meeting summaries\n\n` +
      `What can I help you with for your next customer visit?`

    suggestions = [
      'Allergen information',
      'Dietary requirements (kosher/halal/vegan)',
      'Product substitutions',
      'Cuisine expertise',
      'Value selling strategies',
      'Pairing recommendations'
    ]
  }

  return {
    answer,
    suggestions,
    relatedProducts: relatedProducts.slice(0, 3),
    actionItems
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'PolarisIQ - Saval Foodservice Expert Assistant',
    version: '2.0.0',
    experts: EXPERT_PERSONAS.length,
    products: PRODUCTS.length,
    cuisines: CUISINES.length
  })
}
