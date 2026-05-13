# Operational & Conversion Metrics: AI Spend Audit Tool

To rigorously quantify product-led acquisition velocity and ensure high conversion efficiency for downstream infrastructure partners, we track **4 core performance parameters** continuously.

---

## 1. Primary Conversion Velocity

### Progression Conversion Rates
- **Target Value Gate Overlay Conversion:** **`\ge 35%`**
- **Definition:** The percentage of visitors who complete a baseline interactive assessment (Stage 1) and subsequently enter a valid corporate email address to unlock custom line-item paths (Stage 2).
- **Measurement Method:** Ratio of successful `POST /api/leads` database writes against unique hydrated `localStorage` initialization sessions.

---

## 2. Infrastructure Resilience Metrics

### Upstream LLM Fallback Trigger Frequency
- **Target Fallback Ratio:** **`< 2.5%`** under standard operating envelopes
- **Definition:** The frequency with which downstream synthesis proxies (`/api/summarize`) trigger our client-side deterministic templated string assembler due to external gateway timeouts or missing environment keys.
- **Measurement Method:** Tracking event occurrences returning `{ isFallback: true }` JSON block payloads.

---

## 3. Network Latency Boundaries

### Gateway Roundtrip Response Time (RTT)
- **Target Response Ceiling:** **`< 4,500ms`** (Hard `AbortController` bound)
- **Target Median Latency (P50):** **`< 1,200ms`**
- **Definition:** Total synchronous time elapsed from user form submission clicking to interface view rendering. Fast execution eliminates drop-off windows while operators wait for server responses.

---

## 4. Ultimate Payback Sinks

### Secondary Enterprise Infrastructure Sign-Ups
- **Target Infrastructure Click-Through Rate (CTR):** **`\ge 12%`** of verified email leads
- **Definition:** The proportion of validated founders who click co-branded **Credex API Routing CTA Banners** or localized cloud credit links embedded inside their itemized dashboard views.
- **Measurement Method:** Unique referral tracking hashes appended to external routing href paths (`?ref=audit_engine_lead`).
