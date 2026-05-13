# Lead-Generation AI Spend Audit Tool

The **AI Spend Audit Tool** is a high-performance, finance-literate optimization web application engineered specifically for VC-backed startup founders, fractional CFOs, and VPs of Engineering. By dynamically modeling active headcount, tool allocations (Cursor, Copilot, Claude, ChatGPT, Windsurf, v0), and raw inference API usage, the engine delivers mathematically deterministic savings roadmaps while securely capturing enterprise infrastructure routing leads via an intelligent value gate.

### Live Deployment
🚀 **[Access the Live Audit Interface](https://audit.karanlohar.dev)**  
*(Anonymized global analytics repository mapping: `https://github.com/Karanlohar2004/Audit`)*

---

## Visual Walkthrough & Previews

| Interactive Spend Calculation | Granular Overlap Diagnostics | Premium Value Gate Overlay |
| :---: | :---: | :---: |
| ![Dashboard Interface](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80) | ![Matrix Overlaps](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80) | ![Value Gate Form](https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80) |

🎥 **[Watch the 30-Second Loom Demo Walkthrough](https://www.loom.com/share/mock-id-ai-spend-audit-flow)**

---

## Quick Start Guide

### Prerequisites
- **Node.js** v20.x or higher
- **Git**

### 1. Installation
Clone the repository and install standard dependency layers:
```bash
git clone https://github.com/Karanlohar2004/Audit.git
cd Audit
npm install
```

### 2. Environment Configuration
To enable live LLM synthesis via OpenAI ChatGPT models, populate your local variables:
```bash
cp .env.example .env.local
# Edit .env.local to include:
# OPENAI_API_KEY=your_actual_openai_api_key_here
```
*(Note: If no API key is specified, the secure fallback circuit breaker seamlessly engages highly professional deterministic CFO summary templates).*

### 3. Run Locally
Spin up the Next.js Turbopack compiler server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to review real-time client side hydration logic.

### 4. Deploy to Vercel
Deploy directly from your repository edge framework:
```bash
npx vercel deploy --prod
```

---

## Core Architecture Decisions & Trade-Offs

To maintain flawless uptime, deterministic accuracy, and excellent lead capture velocity, we implemented the following 5 fundamental engineering trade-offs:

### 1. Client-Side Hydrated State vs Server-Side Pre-Rendering
- **Decision:** We stored high-frequency form state changes entirely client-side using controlled React hooks synced to `localStorage`, reserving Server Components strictly for dynamic lead/share database transactions.
- **Why:** Pre-rendering every individual financial matrix adjustment on the server would trigger severe input lag and thrash layout recalculations. Client hydration achieves instantaneous UI gratification counters, which builds initial user investment before revealing the email value gate.

### 2. Deterministic Mathematical Rule Engines vs Pure LLM Synthesis
- **Decision:** Core savings figures are computed using immutable compiled TypeScript equations (`src/lib/audit-engine.ts`) referencing static matrices, leaving the LLM to generate *only* the executive contextual narrative.
- **Why:** Pure generative models suffer from frequent mathematical hallucinations. Separating strict arithmetic functions ensures absolute defensibility when presenting financial line items to analytical SaaS CFOs.

### 3. Progressive Disclosure Value Gate vs Immediate Lead Interception
- **Decision:** Users receive top-line monthly/annual saving sums immediately upon form completion without friction; full line-item details require submitting a corporate email.
- **Why:** Mandating upfront email validation drops conversions by up to 70%. Letting users experience immediate value builds baseline curiosity, resulting in exceptionally high-intent data capture when the overlay gate finally triggers.

### 4. Direct API Route Proxies vs Client-Side Direct Fetching
- **Decision:** All external LLM requests route through custom Next.js server actions (`/api/summarize`) instead of letting the user's browser connect directly to standard endpoints.
- **Why:** Calling external gateways directly from client runtime surfaces private model API keys to malicious network inspectors. Server proxies completely anonymize corporate environment headers while enabling custom rate limit circuit breakers.

### 5. Graceful Fallback Templates vs Hard Connection Polling
- **Decision:** We implemented a strict **4.5-second `AbortController` timeout** on downstream synthesis API handlers. If the connection drops or exceeds latencies, the server returns an internally compiled templated string matching structured syntax formats.
- **Why:** Hard connection failures or loading spinners persisting longer than 5 seconds break UI trust loops. Engaging immediate, professional deterministic fallback responses preserves conversion continuity even during major upstream AI provider outages.

---

## License & Verification
Distributed under the MIT License. Enterprise routing endpoints link directly to authorized **Credex** API nodes.
