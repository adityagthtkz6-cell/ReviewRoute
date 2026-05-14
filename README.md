# ReviewRoute

An AI-powered review sentiment routing app built with Next.js 14. It collects customer reviews, analyzes sentiment using OpenAI GPT-4o-mini, and intelligently routes customers based on their experience.

## How It Works

| Sentiment | Stars | Action |
|-----------|-------|--------|
| ✅ Positive | 4–5 ⭐ | Redirected to Google Review page |
| 🔄 Neutral | 3 ⭐ | Internal feedback form with improvement categories |
| ❌ Negative | 1–2 ⭐ | Support escalation form with direct contact options |

## Features

- **AI Sentiment Analysis** — Combines star rating + NLP text analysis via GPT-4o-mini
- **Smart Routing** — Directs customers to the right outcome automatically
- **Business Dashboard** — Real-time review feed with stats, filters, and CSV export
- **Conflict Detection** — Flags mismatches between star rating and text sentiment
- **Fallback Mode** — Works without an OpenAI key using keyword-based classification
- **Google Review Deep-link** — One-click redirect to your Google Business review page
- **Mobile-first UI** — Dark theme, responsive design

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/review` | Embeddable review widget |
| `/review/positive` | Google Review redirect |
| `/review/neutral` | Improvement feedback form |
| `/review/negative` | Support escalation form |
| `/dashboard` | Business analytics dashboard |

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/adityagthtkz6-cell/ReviewRoute.git
cd ReviewRoute
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
OPENAI_API_KEY=sk-...           # From platform.openai.com/api-keys
NEXT_PUBLIC_GOOGLE_REVIEW_URL=https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
```

> Find your Google Place ID at: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **AI** — OpenAI GPT-4o-mini
- **Icons** — Lucide React
- **Data** — In-memory store (demo MVP)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Optional | Enables GPT-4o-mini NLP sentiment analysis |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | Recommended | Google Business review deep-link URL |

> ⚠️ Never commit `.env.local` — it is git-ignored by default.
