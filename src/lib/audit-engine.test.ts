import { runSpendAudit } from './audit-engine';
import { DEFAULT_SPEND_STATE, UserSpendState } from './pricing-constants';

describe('Audit Engine Core Logic', () => {
  // Test 1: Parallel Coding Assistants Consolidation
  test('eliminates duplicate base seat costs when Cursor and Copilot are both active', () => {
    const state: UserSpendState = {
      ...DEFAULT_SPEND_STATE,
      cursorSeats: 5,
      copilotSeats: 5,
    };

    const report = runSpendAudit(state);
    
    // Total current should be 5*20 + 5*10 = 150
    expect(report.totalCurrentMonthly).toBe(150);
    
    // Optimized should cut Cursor duplicate entirely (0) while retaining Copilot base (50)
    expect(report.totalOptimizedMonthly).toBe(50);
    expect(report.totalMonthlySavings).toBe(100);
    
    const overlapItem = report.items.find(i => i.toolName === 'Cursor AI');
    expect(overlapItem).toBeDefined();
    expect(overlapItem?.category).toBe('redundancy');
    expect(overlapItem?.monthlySavings).toBe(100);
  });

  // Test 2: Claude Pro Premature Team Tier Upgrade Trap
  test('identifies upgrade traps for teams with 2 to 4 Claude Pro seats', () => {
    const state: UserSpendState = {
      ...DEFAULT_SPEND_STATE,
      claudeSeats: 3,
    };

    const report = runSpendAudit(state);
    
    // Current spend: 3 * 20 = 60
    expect(report.totalCurrentMonthly).toBe(60);
    
    // Optimized spend using API UI client approach saves 60% -> 24
    expect(report.totalOptimizedMonthly).toBe(24);
    expect(report.totalMonthlySavings).toBe(36);
    
    const claudeItem = report.items.find(i => i.toolName.includes('Claude Pro'));
    expect(claudeItem?.recommendationTitle).toBe('Avoid Premature Team Tier Upgrades');
  });

  // Test 3: ChatGPT Plus + Claude Overlapping Web UI Redundancy
  test('consolidates 50% of overlapping general context tools when both ChatGPT and Claude are active', () => {
    const state: UserSpendState = {
      ...DEFAULT_SPEND_STATE,
      claudeSeats: 2,
      chatgptSeats: 2,
    };

    const report = runSpendAudit(state);
    
    // Current: Claude (40) + ChatGPT (40) = 80
    expect(report.totalCurrentMonthly).toBe(80);
    
    const chatgptItem = report.items.find(i => i.toolName === 'ChatGPT Plus');
    expect(chatgptItem?.category).toBe('redundancy');
    expect(chatgptItem?.optimizedMonthlySpend).toBe(20); // 50% of 40
    expect(chatgptItem?.monthlySavings).toBe(20);
  });

  // Test 4: Raw API Spend Structural Prompt Caching Arbitrage
  test('triggers prompt caching structural arbitrage when raw API spend exceeds threshold', () => {
    const state: UserSpendState = {
      ...DEFAULT_SPEND_STATE,
      rawApiSpend: 400, // threshold is 300
    };

    const report = runSpendAudit(state);
    
    expect(report.totalCurrentMonthly).toBe(400);
    // 75% savings -> 300 savings, optimized spend -> 100
    expect(report.totalMonthlySavings).toBe(300);
    expect(report.totalOptimizedMonthly).toBe(100);
    
    const apiItem = report.items.find(i => i.category === 'api_arbitrage');
    expect(apiItem?.recommendationTitle).toBe('Deploy Structural Prompt Caching Arbitrage');
  });

  // Test 5: Credex CTA Trigger Threshold
  test('enables enterprise Credex routing CTA when total monthly savings exceed $500', () => {
    const state: UserSpendState = {
      ...DEFAULT_SPEND_STATE,
      cursorSeats: 20, // 400 spend -> optimized to 0 if Copilot active
      copilotSeats: 20, // 200 spend
      rawApiSpend: 500, // 375 savings
    };

    const report = runSpendAudit(state);
    
    // Cursor savings: 400. API savings: 375. Total savings: 775.
    expect(report.totalMonthlySavings).toBeGreaterThanOrEqual(500);
    expect(report.triggerCredexCta).toBe(true);
  });
});
