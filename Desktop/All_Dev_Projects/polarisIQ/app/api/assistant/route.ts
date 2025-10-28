import { NextRequest, NextResponse } from 'next/server'

// Specialty foods knowledge base
const SPECIALTY_FOODS_CONTEXT = `
You are PolarisIQ, an expert specialty foods assistant supporting broadline sales representatives.
Your role is to help sales reps during customer visits, especially with demanding customers who have special needs.

EXPERTISE AREAS:
- Specialty and artisanal food products
- Allergen information (gluten, dairy, nuts, soy, eggs, fish, shellfish, sesame)
- Dietary restrictions (kosher, halal, vegan, vegetarian, paleo, keto)
- Product substitutions and alternatives
- Food pairing recommendations
- Ingredient sourcing and quality grades
- Shelf life and storage requirements
- Seasonal availability
- Pricing guidance and value propositions
- Restaurant and foodservice requirements

SALES REP SUPPORT:
- Quick answers during customer meetings
- Handle objections professionally
- Provide technical product knowledge
- Suggest alternatives when primary product unavailable
- Help navigate special dietary requests
- Support menu planning discussions
- Address food safety concerns

TONE: Professional, confident, helpful, and concise. Prioritize actionable information.
`

export async function POST(request: NextRequest) {
  try {
    const { message, context, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Build conversation history for context
    const conversationHistory = history?.slice(-5).map((msg: any) =>
      `${msg.role === 'user' ? 'Rep' : 'Assistant'}: ${msg.content}`
    ).join('\n') || ''

    // For now, provide intelligent mock responses
    // TODO: Integrate with Anthropic Claude API or OpenAI
    const response = await generateResponse(message, context, conversationHistory)

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Assistant API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Intelligent response generator (mock - replace with actual AI API)
async function generateResponse(message: string, context: string, history: string): Promise<string> {
  const lowerMessage = message.toLowerCase()

  // Allergen queries
  if (lowerMessage.includes('allergen') || lowerMessage.includes('allergy')) {
    return `For allergen information, I need to know the specific product. However, here are key points to remember:

🔴 **Top 9 Allergens** (FDA required disclosure):
- Milk, Eggs, Fish, Shellfish, Tree nuts, Peanuts, Wheat, Soybeans, Sesame

**Best Practices:**
- Always verify current product labels
- Check for "may contain" warnings
- Confirm manufacturing facility practices
- Document customer's specific allergen concerns

What specific product would you like allergen information on?`
  }

  // Dietary compliance
  if (lowerMessage.includes('gluten-free') || lowerMessage.includes('kosher') || lowerMessage.includes('halal') || lowerMessage.includes('vegan')) {
    return `**Dietary Compliance Guidance:**

🌾 **Gluten-Free**: Look for certified GF products (<20ppm). Watch for cross-contamination in facilities.

✡️ **Kosher**: Requires proper certification (OU, OK, Kof-K). Meat/dairy separation matters.

☪️ **Halal**: Must be halal-certified. No pork, alcohol, or non-halal animal products.

🌱 **Vegan**: No animal products or by-products (including honey, gelatin, some food colorings).

**Pro Tip:** Keep a quick-reference list of certified products in each category. Many customers appreciate proactive suggestions.

What type of establishment are you working with?`
  }

  // Product substitution
  if (lowerMessage.includes('substitute') || lowerMessage.includes('alternative') || lowerMessage.includes('replace')) {
    return `**Product Substitution Strategy:**

1️⃣ **Understand the Need:**
   - What's driving the substitution? (allergy, preference, availability, cost)
   - What's the end use? (cooking method, dish type)

2️⃣ **Key Substitution Categories:**
   - **Proteins**: Comparable grade, similar fat content
   - **Dairy**: Match fat % and function (cooking vs. finishing)
   - **Produce**: Consider seasonality and local availability
   - **Specialty Items**: Find similar flavor profiles

3️⃣ **Value Approach:**
   - Show comparable or better value
   - Highlight unique benefits
   - Offer samples when possible

What product category needs a substitute?`
  }

  // Pairing/menu suggestions
  if (lowerMessage.includes('pair') || lowerMessage.includes('menu') || lowerMessage.includes('recommend')) {
    return `**Product Pairing Recommendations:**

🍽️ **Pairing Principles:**
- **Complement**: Match intensity (bold with bold, delicate with delicate)
- **Contrast**: Sweet/savory, rich/acidic balance
- **Regional**: Traditional pairings from same cuisine

**Popular Specialty Pairings:**
- Artisan cheeses + dried fruits + nuts
- Cured meats + pickled vegetables + crusty bread
- Fresh seafood + citrus + herbs
- Gourmet chocolates + coffee + berries

**Sales Approach:**
- Bundle complementary items for better value
- Suggest seasonal pairings
- Create ready-to-use solutions for chef's convenience

Tell me about the customer's concept or cuisine style?`
  }

  // Pricing/value
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
    return `**Value Conversation Framework:**

💰 **Don't Compete on Price Alone:**
1. **Quality**: Yield, consistency, less waste
2. **Labor Savings**: Pre-portioned, ready-to-use
3. **Menu Differentiation**: Unique offerings attract customers
4. **Brand Value**: Premium products justify higher menu prices

**Effective Phrases:**
- "This quality grade yields 15% more usable product"
- "Your cost per serving is actually comparable"
- "This allows you to charge $X more on the menu"
- "Reduces prep time by X hours per week"

**When Budget is Tight:**
- Offer strategic substitutions (not full menu change)
- Suggest feature items vs. full integration
- Show total cost of ownership, not just unit price

What's the customer's main price concern?`
  }

  // Customer objections
  if (lowerMessage.includes('objection') || lowerMessage.includes('concern') || lowerMessage.includes('problem')) {
    return `**Handling Customer Objections:**

✅ **The LAER Method:**
1. **Listen**: Let them fully explain the concern
2. **Acknowledge**: "I understand that's important to you"
3. **Explore**: Ask questions to understand the root issue
4. **Respond**: Address with specific solutions

**Common Objections:**
- "Too expensive" → Focus on value, not price
- "Current supplier is fine" → Show differentiation, not criticism
- "Too risky to change" → Offer trial periods, samples
- "Don't have time" → Simplify the solution, reduce friction

**Key Phrases:**
- "What if I could show you how..."
- "Many customers felt that way until..."
- "Let's start small with..."

What specific objection are you facing?`
  }

  // General help
  return `I'm here to help with:

📋 **Quick Support:**
- Allergen & dietary information
- Product substitutions & alternatives
- Menu & pairing suggestions
- Price/value conversations
- Customer objection handling

💼 **For Better Assistance:**
${context ? `I see you're working with: ${context}` : 'Tell me about your customer (type, cuisine, special needs)'}

Ask me anything specific about:
- A product or ingredient
- Dietary requirements
- Customer situation you're facing
- Technical food questions

What can I help you with right now?`
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'PolarisIQ Assistant API',
    version: '1.0.0'
  })
}
