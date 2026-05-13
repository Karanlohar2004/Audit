# Production LLM Prompt Engineering Disclosure

The **AI Spend Audit Tool** invokes dynamic synthesis strictly to compose concise, finance-literate executive narrative wrappers based upon structured numeric output arrays.

---

## 1. Production System & User Prompts

### System Instructions
```text
You are a high-level SaaS CFO Consultant auditing a startup's AI tool spend. Write an executive summary (~100 words) using professional, finance-literate tone. Focus strictly on their overspend risks, tier overlaps, and concrete pure cash savings recommendations. Avoid generic platitudes.
```

### User Context Template
```javascript
`Audit these parameters:
Headcount: ${spendData.headcount}
Tools utilized: Cursor (${spendData.cursorSeats}), Copilot (${spendData.copilotSeats}), Claude (${spendData.claudeSeats}), ChatGPT (${spendData.chatgptSeats}), Windsurf (${spendData.windsurfSeats}), v0 (${spendData.v0Seats})
Raw API Spend: $${spendData.rawApiSpend}/mo
Identified Monthly Savings: $${auditResults.totalMonthlySavings}/mo
Current Monthly Spend: $${auditResults.totalCurrentMonthly}/mo
Top recommendations: ${auditResults.items?.map(i => i.recommendationTitle).join(', ')}`
```

---

## 2. Architectural Rationale: Why They Were Written This Way

### Extremely Concise Constraint (~100 words)
- **Rationale:** Startups and financial directors review dashboard summaries within tight 10-second attention envelopes. Setting a strict length constraint prevents conversational preamble ("Sure, here is your audit..."), forcing the model to lead with absolute dollar values and actionable overlap findings.

### Persona Enforcement ("SaaS CFO Consultant")
- **Rationale:** Instructing the model to adopt a finance-literate posture ensures the vocabulary utilizes precise accounting primitives (e.g., *arbitrage*, *run-rate buffers*, *duplicative licensing*, *flat minimum base lines*) rather than generic developer terminology. This builds enterprise credibility instantly.

### Injection of Pre-Calculated Math Arrays
- **Rationale:** We strictly avoid asking the LLM to perform mathematical subtraction or token fee calculations natively within the prompt. Providing the explicit pre-calculated output string array guarantees zero probabilistic calculation errors.

---

## 3. Failed Prompt Iterations: What Didn't Work

### Iteration A: Unconstrained Conversational Request
- **Prompt:** `"Analyze this company's software stack and write a detailed audit explaining what tools they should keep or drop."`
- **Result:** The model produced dense, multi-paragraph essays explaining what each software tool does (e.g., "GitHub Copilot is an AI pair programmer...") which completely diluted the cash-saving conversion narrative.

### Iteration B: JSON Output Forcing via Pure System Prompts
- **Prompt:** `"Output a valid JSON block containing an array of savings line items alongside a text narrative."`
- **Result:** While fine for structured extraction routes, forcing mixed JSON output formats on downstream generation layers occasionally led to escaped string syntax crashes during client side hydration unmarshalling. Moving strict object creation entirely to native TypeScript runtime layers proved infinitely safer and substantially faster.
