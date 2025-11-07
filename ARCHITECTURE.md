# PolarisIQ - Legendary Multi-Industry Sales & Meeting Assistant

## Vision
A legendary AI-powered sales and meeting assistant with deep, industry-specific skill packs that provide expert-level support across multiple verticals. Built for sales professionals who need intelligent, context-aware assistance in real-time conversations and meetings.

## Core Features

### 1. **AI Sales Assistant**
- Real-time conversational AI during sales calls/meetings
- Context-aware responses based on uploaded materials
- Multi-persona expert system
- Voice-enabled for hands-free operation
- Intelligent interjections and suggestions

### 2. **Meeting Assistant**
- Meeting recording and transcription
- Real-time meeting notes and action items
- Post-meeting insights and analysis
- Follow-up recommendations
- CRM integration ready

### 3. **Skill Pack System**
Dynamic, deep knowledge bases for specific industries:
- **Food & Beverage Sales**: Products, pairings, pricing, seasonality, suppliers
- **Contractors**: Materials, pricing, building codes, project estimation
- **Real Estate**: Property valuations, market trends, financing options, legal requirements
- **Technology Sales**: Product specs, competitive analysis, ROI calculators
- **Healthcare Services**: Compliance, equipment, pricing, regulations
- **Financial Services**: Products, regulations, risk assessment
- And more...

### 4. **Context Upload Engine**
- Upload catalogs, price sheets, product specs
- Process PDFs, spreadsheets, images, documents
- Automatic knowledge extraction and indexing
- Semantic search across all uploaded content
- Version control for updated materials

### 5. **Database & Memory**
- Conversation history and context
- Customer profiles and preferences
- Meeting recordings and transcripts
- Skill pack knowledge bases
- User-uploaded content library

## Technical Architecture

### Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **UI**: Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Next.js API Routes (Edge & Serverless)
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **AI**: OpenAI GPT-4, Anthropic Claude (multi-model support)
- **Vector DB**: Pinecone or Supabase Vector for embeddings
- **File Storage**: Vercel Blob or AWS S3
- **Auth**: Clerk
- **Payments**: Stripe
- **Meeting Recording**: Daily.co or Twilio
- **Transcription**: Deepgram or AssemblyAI
- **Voice**: Web Speech API + ElevenLabs

### Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  Sales Assistant UI | Meeting UI | Skill Pack Manager       │
│  Context Uploader | Voice Interface | Dashboard             │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      API Layer (Next.js)                     │
│  /api/assistant | /api/meetings | /api/skillpacks           │
│  /api/upload | /api/search | /api/transcribe                │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  AI Engine | Skill Pack Manager | Context Processor          │
│  Meeting Analyzer | Voice Handler | Search Engine            │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  PostgreSQL (User, Meetings, Context)                        │
│  Vector DB (Embeddings, Semantic Search)                     │
│  Blob Storage (Files, Recordings)                            │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Core Tables
1. **users** - User accounts, subscription tiers, preferences
2. **skill_packs** - Industry-specific knowledge packs
3. **conversations** - Sales conversation history
4. **meetings** - Meeting metadata, recordings, transcripts
5. **context_files** - Uploaded documents and their metadata
6. **embeddings** - Vector embeddings for semantic search
7. **knowledge_items** - Extracted knowledge from uploaded content
8. **interjections** - AI suggestions during conversations
9. **action_items** - Tasks extracted from meetings
10. **analytics** - Usage metrics and insights

## Skill Pack Structure

Each skill pack contains:
```typescript
{
  id: string
  name: string
  industry: string
  version: string
  icon: string
  description: string

  // Knowledge base
  products: Product[]
  pricing: PricingRule[]
  competitors: Competitor[]
  objectionHandlers: ObjectionHandler[]
  salesScripts: SalesScript[]
  faqs: FAQ[]
  regulations: Regulation[]

  // AI Configuration
  systemPrompt: string
  expertPersonas: Persona[]
  interjectionRules: Rule[]

  // Custom fields per industry
  customData: Record<string, any>
}
```

### Example: Food & Beverage Skill Pack
```typescript
{
  name: "Food & Beverage Sales Pro",
  industry: "food_beverage",
  products: [
    {
      name: "Artisan Olive Oils",
      category: "Oils & Vinegars",
      suppliers: ["Mediterranean Imports", "Local Olive Co"],
      pricing: { wholesale: 12.50, retail: 24.99, bulk: 10.00 },
      seasonality: "Year-round, peak fall",
      pairings: ["Bread", "Salads", "Grilled vegetables"],
      certifications: ["USDA Organic", "Non-GMO"],
      shelfLife: "18 months",
      storage: "Cool, dark place",
      allergens: []
    }
  ],
  objectionHandlers: [
    {
      objection: "Price is too high",
      responses: [
        "Premium quality justifies cost",
        "Compare per-ounce value",
        "Volume discount options"
      ],
      data: { costComparison: [], volumeBreaks: [] }
    }
  ],
  expertPersonas: ["Executive Chef", "Sommelier", "Purchasing Manager"]
}
```

## User Experience Flow

### Sales Call Flow
1. User starts sales call, activates PolarisIQ
2. Selects relevant skill pack(s)
3. Voice recognition captures conversation
4. AI provides real-time suggestions and data
5. User can tap suggestions to expand or speak them
6. Post-call summary with action items
7. CRM integration for follow-up

### Meeting Assistant Flow
1. User schedules or starts meeting
2. Recording begins (with consent)
3. Real-time transcription and note-taking
4. AI identifies key points, decisions, action items
5. Post-meeting report generated
6. Follow-up tasks created
7. Meeting insights added to knowledge base

### Context Upload Flow
1. User uploads documents (PDF, Excel, images)
2. AI extracts text and structured data
3. Content is indexed and embedded
4. Knowledge is integrated into skill packs
5. Available for semantic search during calls

## Monetization

### Subscription Tiers
1. **Starter** ($49/month)
   - 1 skill pack
   - 10 hours meeting recording/month
   - 1GB context storage
   - Basic AI assistant

2. **Professional** ($149/month)
   - 3 skill packs
   - 50 hours meeting recording/month
   - 10GB context storage
   - Advanced AI with multiple models
   - CRM integration

3. **Enterprise** ($499/month)
   - Unlimited skill packs
   - Unlimited meetings
   - 100GB context storage
   - Custom skill pack creation
   - Team collaboration
   - API access
   - Dedicated support

4. **Custom** (Contact sales)
   - White-label options
   - Custom integrations
   - On-premise deployment
   - Training and consulting

## Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [x] Repository setup
- [ ] Core Next.js app structure
- [ ] Database schema design
- [ ] Authentication system
- [ ] Basic UI components

### Phase 2: Core Features (Weeks 3-4)
- [ ] AI assistant engine
- [ ] Voice interface
- [ ] Context upload system
- [ ] Basic skill pack implementation
- [ ] User dashboard

### Phase 3: Meeting Assistant (Weeks 5-6)
- [ ] Meeting recording integration
- [ ] Real-time transcription
- [ ] Meeting analysis engine
- [ ] Action item extraction
- [ ] Meeting dashboard

### Phase 4: Skill Packs (Weeks 7-8)
- [ ] Food & Beverage skill pack
- [ ] Contractor skill pack
- [ ] Real Estate skill pack
- [ ] Skill pack manager UI
- [ ] Custom skill pack creator

### Phase 5: Polish & Deploy (Weeks 9-10)
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Production deployment
- [ ] Documentation
- [ ] Marketing site

## Success Metrics

### User Metrics
- Active users per month
- Average session duration
- Skill packs used per user
- Context uploads per user
- Meeting recordings per user

### Business Metrics
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Churn rate
- Net Promoter Score (NPS)

### Technical Metrics
- API response time (<200ms)
- Transcription accuracy (>95%)
- Search relevance score (>0.8)
- Uptime (99.9%)
- Error rate (<0.1%)

## Competitive Advantages

1. **Deep Industry Knowledge**: Pre-built skill packs with expert-level depth
2. **Context-Aware**: Learns from uploaded materials and past conversations
3. **Real-Time Voice**: Hands-free operation during calls
4. **Multi-Industry**: One platform for multiple sales verticals
5. **Meeting Intelligence**: Beyond transcription - actionable insights
6. **Easy Onboarding**: Upload your materials, start selling in minutes

## Future Enhancements

- Mobile apps (iOS/Android)
- Browser extension for web conferencing
- Integration with major CRMs (Salesforce, HubSpot)
- Email assistant for follow-ups
- Proposal generator
- ROI calculator
- Team collaboration features
- Coaching and training mode
- Multilingual support
- Industry-specific analytics dashboards
