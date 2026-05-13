import { PRICING_CONSTANTS, UserSpendState } from './pricing-constants';

export interface AuditItem {
  toolName: string;
  currentMonthlySpend: number;
  optimizedMonthlySpend: number;
  monthlySavings: number;
  recommendationTitle: string;
  recommendationDetails: string;
  category: 'tier_optimization' | 'redundancy' | 'api_arbitrage';
}

export interface AuditReport {
  items: AuditItem[];
  totalCurrentMonthly: number;
  totalOptimizedMonthly: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  efficiencyRatio: number;
  eligibleForCredits: boolean;
  creditProgramDetails: string[];
  triggerCredexCta: boolean;
}

export function runSpendAudit(state: UserSpendState): AuditReport {
  const items: AuditItem[] = [];
  let totalCurrentMonthly = 0;
  let totalOptimizedMonthly = 0;

  // 1. Cursor Analysis
  const cursorSpend = state.cursorSeats * PRICING_CONSTANTS.CURSOR.PRO_MONTHLY;
  totalCurrentMonthly += cursorSpend;
  if (state.cursorSeats > 0) {
    // Check duplication with Copilot
    if (state.copilotSeats > 0) {
      const optimizedSpend = 0; // standardizing on one tool cuts the duplicate
      items.push({
        toolName: 'Cursor AI',
        currentMonthlySpend: cursorSpend,
        optimizedMonthlySpend: optimizedSpend,
        monthlySavings: cursorSpend,
        recommendationTitle: 'Consolidate Parallel Coding Assistants',
        recommendationDetails: `Your team actively holds licenses for both Cursor and GitHub Copilot. Standardizing on a single intelligent code completion platform avoids paying duplicate base seat costs.`,
        category: 'redundancy',
      });
      totalOptimizedMonthly += optimizedSpend;
    } else {
      // Basic optimal usage
      items.push({
        toolName: 'Cursor AI',
        currentMonthlySpend: cursorSpend,
        optimizedMonthlySpend: cursorSpend,
        monthlySavings: 0,
        recommendationTitle: state.cursorSeats >= 5 ? 'Migrate to Centralized Corporate Billing' : 'Optimal Tier Usage',
        recommendationDetails: state.cursorSeats >= 5 
          ? 'With 5+ developers, transitioning to consolidated workspace API routing preserves IP access controls.' 
          : 'Current licensing setup matches standard software contributor deployment profiles.',
        category: 'tier_optimization',
      });
      totalOptimizedMonthly += cursorSpend;
    }
  }

  // 2. Copilot Analysis
  const copilotSpend = state.copilotSeats * PRICING_CONSTANTS.COPILOT.INDIVIDUAL_MONTHLY;
  totalCurrentMonthly += copilotSpend;
  if (state.copilotSeats > 0) {
    if (state.cursorSeats > 0) {
      // Kept Cursor as primary or Copilot as duplicate logic
      // To avoid double counting total optimized spend, if we already eliminated Cursor, let's keep Copilot base
      items.push({
        toolName: 'GitHub Copilot',
        currentMonthlySpend: copilotSpend,
        optimizedMonthlySpend: copilotSpend,
        monthlySavings: 0,
        recommendationTitle: 'Core Integrated Dev Environment Tool',
        recommendationDetails: 'Retained as the core source companion system.',
        category: 'redundancy',
      });
      totalOptimizedMonthly += copilotSpend;
    } else {
      items.push({
        toolName: 'GitHub Copilot',
        currentMonthlySpend: copilotSpend,
        optimizedMonthlySpend: copilotSpend,
        monthlySavings: 0,
        recommendationTitle: 'Streamlined Dev Companion',
        recommendationDetails: 'Active seat mapping perfectly aligns with core enterprise code pipelines.',
        category: 'tier_optimization',
      });
      totalOptimizedMonthly += copilotSpend;
    }
  }

  // 3. Claude Analysis
  const claudeSpend = state.claudeSeats * PRICING_CONSTANTS.CLAUDE.PRO_MONTHLY;
  totalCurrentMonthly += claudeSpend;
  if (state.claudeSeats > 0) {
    if (state.claudeSeats >= 2 && state.claudeSeats <= 4) {
      // High-risk upgrade path analysis
      const teamMinimumCost = PRICING_CONSTANTS.CLAUDE.TEAM_MIN_SEATS * PRICING_CONSTANTS.CLAUDE.TEAM_MONTHLY_PER_SEAT; // $150
      items.push({
        toolName: 'Claude Pro (Anthropic)',
        currentMonthlySpend: claudeSpend,
        optimizedMonthlySpend: claudeSpend * 0.4, // Custom UI approach saves ~60%
        monthlySavings: claudeSpend * 0.6,
        recommendationTitle: 'Avoid Premature Team Tier Upgrades',
        recommendationDetails: `Your team size (${state.claudeSeats} users) currently incurs $${claudeSpend}/mo. Upgrading to a standalone Team plan requires a strict 5-seat minimum ($150/mo), resulting in an immediate financial loss. We highly recommend connecting internal teams via the Anthropic API using an open UI client to reduce seat costs by up to 60%.`,
        category: 'tier_optimization',
      });
      totalOptimizedMonthly += claudeSpend * 0.4;
    } else {
      items.push({
        toolName: 'Claude Pro (Anthropic)',
        currentMonthlySpend: claudeSpend,
        optimizedMonthlySpend: claudeSpend,
        monthlySavings: 0,
        recommendationTitle: 'Validated Anthropic Usage Tier',
        recommendationDetails: 'Maintains full priority token distribution windows.',
        category: 'tier_optimization',
      });
      totalOptimizedMonthly += claudeSpend;
    }
  }

  // 4. ChatGPT Analysis
  const chatgptSpend = state.chatgptSeats * PRICING_CONSTANTS.CHATGPT.PLUS_MONTHLY;
  totalCurrentMonthly += chatgptSpend;
  if (state.chatgptSeats > 0) {
    if (state.claudeSeats > 0) {
      const optimizedSpend = chatgptSpend * 0.5; // consolidate 50% of overlapping general context tools
      items.push({
        toolName: 'ChatGPT Plus',
        currentMonthlySpend: chatgptSpend,
        optimizedMonthlySpend: optimizedSpend,
        monthlySavings: chatgptSpend - optimizedSpend,
        recommendationTitle: 'De-duplicate Consumer Web Interface Overhead',
        recommendationDetails: 'Simultaneous subscriptions to Claude and ChatGPT across non-technical operators introduces unnecessary expense. Assign dedicated model suites based strictly on deep internal requirements.',
        category: 'redundancy',
      });
      totalOptimizedMonthly += optimizedSpend;
    } else {
      items.push({
        toolName: 'ChatGPT Plus',
        currentMonthlySpend: chatgptSpend,
        optimizedMonthlySpend: chatgptSpend,
        monthlySavings: 0,
        recommendationTitle: 'Standard Consumer Subscription Tier',
        recommendationDetails: 'Optimal consumer context integration setup.',
        category: 'tier_optimization',
      });
      totalOptimizedMonthly += chatgptSpend;
    }
  }

  // 5. Windsurf / v0 Analysis
  const windsurfSpend = state.windsurfSeats * PRICING_CONSTANTS.WINDSURF.PRO_MONTHLY;
  const v0Spend = state.v0Seats * PRICING_CONSTANTS.V0.PREMIUM_MONTHLY;
  totalCurrentMonthly += (windsurfSpend + v0Spend);
  totalOptimizedMonthly += (windsurfSpend + v0Spend);

  if (windsurfSpend > 0) {
    items.push({
      toolName: 'Windsurf IDE',
      currentMonthlySpend: windsurfSpend,
      optimizedMonthlySpend: windsurfSpend,
      monthlySavings: 0,
      recommendationTitle: 'Dedicated Agentic Workspace Platform',
      recommendationDetails: 'Maintains native codebase mapping tasks efficiently.',
      category: 'tier_optimization',
    });
  }

  if (v0Spend > 0) {
    items.push({
      toolName: 'v0 by Vercel',
      currentMonthlySpend: v0Spend,
      optimizedMonthlySpend: v0Spend,
      monthlySavings: 0,
      recommendationTitle: 'Specialized Generative UI Framework Companion',
      recommendationDetails: 'Rapidly automates frontend implementation systems directly matching design specs.',
      category: 'tier_optimization',
    });
  }

  // 6. Raw API Arbitrage Analysis
  totalCurrentMonthly += state.rawApiSpend;
  if (state.rawApiSpend > 0) {
    if (state.rawApiSpend >= PRICING_CONSTANTS.API.ARBITRAGE_THRESHOLD) {
      const savings = state.rawApiSpend * PRICING_CONSTANTS.API.PROMPT_CACHING_SAVINGS_RATIO;
      const optimized = state.rawApiSpend - savings;
      items.push({
        toolName: 'Foundation Model APIs (Anthropic/OpenAI/Gemini)',
        currentMonthlySpend: state.rawApiSpend,
        optimizedMonthlySpend: optimized,
        monthlySavings: savings,
        recommendationTitle: 'Deploy Structural Prompt Caching Arbitrage',
        recommendationDetails: `Your direct API billing line item ($${state.rawApiSpend}/mo) unlocks immediate eligibility for persistent instruction prompt caching. Indexing static documentation contexts via ephemeral headers guarantees up to a 75% reduction on incoming reading calculations.`,
        category: 'api_arbitrage',
      });
      totalOptimizedMonthly += optimized;
    } else {
      items.push({
        toolName: 'Foundation Model APIs',
        currentMonthlySpend: state.rawApiSpend,
        optimizedMonthlySpend: state.rawApiSpend,
        monthlySavings: 0,
        recommendationTitle: 'Efficient Lightweight Inference Layer',
        recommendationDetails: 'Sustained throughput stays below threshold boundaries triggering deep infrastructure caching overhauls.',
        category: 'api_arbitrage',
      });
      totalOptimizedMonthly += state.rawApiSpend;
    }
  }

  const totalMonthlySavings = Math.max(0, totalCurrentMonthly - totalOptimizedMonthly);
  const totalAnnualSavings = totalMonthlySavings * 12;
  const efficiencyRatio = totalCurrentMonthly > 0 ? (totalMonthlySavings / totalCurrentMonthly) * 100 : 0;

  const eligibleForCredits = state.isVCBacked || state.rawApiSpend > 200 || totalCurrentMonthly > 400;
  const creditProgramDetails = eligibleForCredits ? [
    'AWS Activate Founders Track: $1,000 to $5,000 instant infrastructure compute allowance',
    'Microsoft Founders Hub: Premium priority allocations scaling up to $150,000 core inference models',
    'Google Cloud for Startups: Tiered access paths granting matching credit buffers up to $350,000'
  ] : [];

  return {
    items,
    totalCurrentMonthly,
    totalOptimizedMonthly,
    totalMonthlySavings,
    totalAnnualSavings,
    efficiencyRatio,
    eligibleForCredits,
    creditProgramDetails,
    triggerCredexCta: totalMonthlySavings >= PRICING_CONSTANTS.CREDEX_CTA_THRESHOLD,
  };
}
