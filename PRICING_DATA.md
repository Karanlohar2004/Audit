# Canonical SaaS Pricing Matrix & Audit Core Constants

Every numerical constant utilized within the internal compilation loops of **`src/lib/audit-engine.ts`** traces directly to live retail vendor pricing models.

---

## Tooling Price Sources

## Cursor
- Pro: $20/user/month — https://cursor.sh/pricing — verified 2026-05-07
- Business: $40/user/month — https://cursor.sh/pricing — verified 2026-05-07

## GitHub Copilot
- Individual: $10/user/month — https://github.com/features/copilot#pricing — verified 2026-05-07
- Business: $19/user/month — https://github.com/features/copilot#pricing — verified 2026-05-07
- Enterprise: $39/user/month — https://github.com/features/copilot#pricing — verified 2026-05-07

## Claude (Anthropic)
- Pro: $20/user/month — https://www.anthropic.com/pricing — verified 2026-05-07
- Team: $30/user/month (minimum 5 seats = $150/month) — https://www.anthropic.com/pricing — verified 2026-05-07

## ChatGPT (OpenAI)
- Plus: $20/user/month — https://openai.com/chatgpt/pricing/ — verified 2026-05-07
- Team: $35/user/month billed monthly equivalent — https://openai.com/chatgpt/pricing/ — verified 2026-05-07

## Windsurf
- Pro: $15/user/month — https://codeium.com/pricing — verified 2026-05-07

## v0 by Vercel
- Premium: $20/user/month — https://v0.dev/pricing — verified 2026-05-07

---

## Structural Constants & Hardcoded Rules

### 1. Duplication Thresholds
- Parallel activation of **Cursor** and **GitHub Copilot** triggers an immediate recommendation to standardise deployment onto a single system. The engine zero-bases the duplicated assistant outlays into pure cash efficiency deltas.

### 2. Upward Tier Break-Even Logic
- Subscribing between $2 \le \text{seats} \le 4$ on **Claude Pro** incurs severe losses if upgraded prematurely to Team tiers due to the flat $150 minimum base line. The engine surfaces programmatic guidance advising API-driven workspace UI integrations to unlock up to 60% relative pricing markdowns.

### 3. API Prompt Caching Ratio
- Raw gateway inference expenses exceeding **`$300.00` / month** trigger instruction caching architectural alerts. Applying immutable file contexts drops downstream query pricing by up to **`75%`** (`PRICING_CONSTANTS.API.PROMPT_CACHING_SAVINGS_RATIO`).
