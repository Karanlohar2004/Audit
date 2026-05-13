# Automated Testing Disclosure - AI Spend Audit Tool

## Framework & Environment Setup
Our testing suite is built using **Jest** integrated with **ts-jest** to seamlessly execute core mathematical verification functions directly against native TypeScript files without demanding upfront static compile actions.

### How to Run Automated Tests
Execute the full suite locally using standard npm script maps:
```bash
npm test
```
*(Continuous Integration pipelines execute this exact command automatically within `.github/workflows/ci.yml` upon every push to the `main` branch).*

---

## Complete Test Matrix

All deterministic audit rules are aggregated within **`src/lib/audit-engine.test.ts`**. The matrix consists of the following 5 mandatory verification sequences:

### 1. Parallel Coding Assistants Consolidation
- **Target Function:** `runSpendAudit()`
- **Coverage Goal:** Validates cost de-duplication rules when an organization reports concurrent usage of GitHub Copilot and Cursor AI.
- **Assertion:** Asserts that duplicate base seat outlays are perfectly eliminated from `totalOptimizedMonthly` counters and correctly assigned to `monthlySavings` fields under the `redundancy` category.

### 2. Claude Pro Premature Team Tier Upgrade Trap
- **Target Function:** `runSpendAudit()`
- **Coverage Goal:** Identifies upgrade traps for low-headcount groups holding between 2 and 4 individual Claude Pro subscriptions.
- **Assertion:** Asserts that the system detects the flat $150 minimum boundary condition, preventing early standalone team upgrades and recommending open UI API client routing to yield a strict 60% savings delta.

### 3. Overlapping Consumer Web UI Redundancy
- **Target Function:** `runSpendAudit()`
- **Coverage Goal:** Analyzes redundant overlapping consumer contexts when teams maintain parallel individual seats across both ChatGPT Plus and Claude Pro.
- **Assertion:** Asserts that general context lookups are consolidated, yielding a direct 50% duplicate cost line-item reduction.

### 4. Raw API Spend Structural Prompt Caching Arbitrage
- **Target Function:** `runSpendAudit()`
- **Coverage Goal:** Monitors raw inference input totals crossing the baseline threshold of `$300.00` per month.
- **Assertion:** Asserts that exceeding the baseline trigger engages structural prompt caching architectural guidance, programmatically applying a 75% savings ratio factor to raw API billing calculations.

### 5. Credex Enterprise CTA Activation Threshold
- **Target Function:** `runSpendAudit()`
- **Coverage Goal:** Evaluates aggregate cumulative savings across all active tool layers.
- **Assertion:** Asserts that when cumulative identified monthly savings reach or surpass `$500.00`, the returning report output object toggles `triggerCredexCta` to `true`, activating custom high-touch lead capture overlay wrappers.
