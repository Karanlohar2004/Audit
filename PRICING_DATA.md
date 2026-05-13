# Pricing Data & Hardcoded Audit Rules

This document serves as the canonical repository for base retail pricing matrices and specific, deterministic financial optimization formulas utilized by the **Audit Engine**. 

---

## SaaS Tier Pricing Matrices

### 1. Cursor
*   **Pro Plan:** `$20.00` / user / month
*   **Business Plan:** `$40.00` / user / month
*   *Optimization Target:* Consolidate individual developer reimbursements into centralized billing for IP protection, or reduce duplicate developer assistant costs if active GitHub Copilot seats are identical.

### 2. GitHub Copilot
*   **Individual Plan:** `$10.00` / user / month
*   **Business Plan:** `$19.00` / user / month
*   **Enterprise Plan:** `$39.00` / user / month
*   *Optimization Target:* Discard overlapping tool overhead for software engineers running parallel IDE assistant platforms.

### 3. Claude (Anthropic)
*   **Pro Plan:** `$20.00` / user / month
*   **Team Plan:** `$30.00` / user / month (Minimum requirement: **5 seats** = `$150.00` / month)
*   *Mathematical Rule:* If user inputs $2 \le \text{seats} \le 4$, upgrading to Team requires paying for unused baseline seats.
    $$\text{Savings Loss} = \$150.00 - (\text{seats} \times \$20.00)$$
    *Recommendation:* Remain on individual Pro subscriptions until team scales to 5+, OR switch to a shared custom UI client connected directly to the Anthropic API to slash seat costs.

### 4. ChatGPT (OpenAI)
*   **Plus Plan:** `$20.00` / user / month
*   **Team Plan:** `$35.00` / user / month billed monthly (or `$30.00` annual equivalent; min **2 seats** = `$70.00` / month)
*   *Optimization Target:* Redundant consumer web subscriptions for general context lookups.

### 5. Windsurf / v0
*   **Windsurf Pro:** `$15.00` / user / month
*   **v0 Premium:** `$20.00` / user / month
*   *Optimization Target:* Identify dedicated UI/component code generation tools vs multi-file integrated workspace assistant redundancy.

---

## Raw API Spend Arbitrage (Anthropic / OpenAI / Gemini)

When organizations report raw API expenses exceeding **`$300.00` / month**, the engine exposes structural architectural optimizations:

### Prompt Caching Arbitrage
*   **Rule:** Applying prompt caching to highly persistent system prompts or documentation reference files yields an average **`80% to 90%`** reduction in raw input token pricing.
*   **Formula:** 
    $$\text{Optimized Spend} = \text{Current API Spend} \times 0.25$$

### Startup Credit Program Equivalencies
Startups scaling API operations frequently bypass free tier infrastructure benefits:
*   **Tier 1 Eligibility:** Cloud provider starter tracks (e.g., AWS Activate Founders, Google Cloud Startups) supply **`$1,000` to `$5,000`** in accessible API credits.
*   **Tier 2 Scale:** VC-backed teams qualify for immediate **`$100,000` to `$350,000`** allocations covering primary foundation model inference layers.

---

## CTA Activation Threshold

*   **Trigger Condition:** If $\sum \text{Potential Monthly Savings} > \$500.00$, the interface transitions into high-touch enterprise capture mode, dynamically surfacing the **Credex Integration CTA** banner to broker immediate infrastructure routing.
