import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { spendData, auditResults } = body;

    if (!spendData || !auditResults) {
      return NextResponse.json(
        { error: 'Missing calculation objects required for narrative compilation.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // Construct the context instructions mapping to Anthropic API requirements
    const systemPrompt = `You are a high-level SaaS CFO Consultant auditing a startup's AI tool spend. Write an executive summary (~100 words) using professional, finance-literate tone. Focus strictly on their overspend risks, tier overlaps, and concrete pure cash savings recommendations. Avoid generic platitudes.`;
    const userContent = `Audit these parameters:
    Headcount: ${spendData.headcount}
    Tools utilized: Cursor (${spendData.cursorSeats}), Copilot (${spendData.copilotSeats}), Claude (${spendData.claudeSeats}), ChatGPT (${spendData.chatgptSeats}), Windsurf (${spendData.windsurfSeats}), v0 (${spendData.v0Seats})
    Raw API Spend: $${spendData.rawApiSpend}/mo
    Identified Monthly Savings: $${auditResults.totalMonthlySavings}/mo
    Current Monthly Spend: $${auditResults.totalCurrentMonthly}/mo
    Top recommendations: ${auditResults.items?.map((i: any) => i.recommendationTitle).join(', ')}`;

    // Fallback template builder helper logic function
    const buildFallbackTemplate = () => {
      const parts = [];
      parts.push(`Based on an operational audit of your ${spendData.headcount}-person engineering and ops footprint, your total recurring outlay sits at $${auditResults.totalCurrentMonthly}/mo.`);
      
      if (spendData.cursorSeats > 0 && spendData.copilotSeats > 0) {
        parts.push(`We identified severe seat overlaps between Cursor AI and GitHub Copilot, indicating duplicative developer licensing.`);
      }
      if (spendData.claudeSeats >= 2 && spendData.claudeSeats <= 4) {
        parts.push(`Crucially, maintaining ${spendData.claudeSeats} individual Claude Pro seats exposes you to premature "Team" plan upgrade traps where flat minimums ($150/mo) destroy pure cash efficiency.`);
      }
      if (spendData.rawApiSpend > 300) {
        parts.push(`Furthermore, direct inference costs ($${spendData.rawApiSpend}/mo) cross the threshold for structural prompt caching arbitrage, yielding up to 75% raw token price reductions.`);
      }
      
      parts.push(`Implementing these targeted adjustments reallocates an annualized run-rate buffer of $${auditResults.totalAnnualSavings}, unlocking a SaaS efficiency score of ${auditResults.efficiencyRatio.toFixed(1)}%.`);
      return parts.join(' ');
    };

    // If no API key is specified, route directly to fallback to prevent production client breaking
    if (!apiKey || apiKey === 'mock_or_unconfigured') {
      console.log('[LLM Integration] Anthropic API Key unconfigured. Executing graceful templated synthesis fallback.');
      return NextResponse.json({
        success: true,
        summary: buildFallbackTemplate(),
        isFallback: true,
      });
    }

    // Call real Anthropic API with strict 4.5 second circuit breaker
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    try {
      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 250,
          system: systemPrompt,
          messages: [{ role: 'user', content: userContent }],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!anthropicResponse.ok) {
        throw new Error(`Anthropic endpoint returned HTTP ${anthropicResponse.status}`);
      }

      const data = await anthropicResponse.json();
      const summaryText = data.content?.[0]?.text || buildFallbackTemplate();

      return NextResponse.json({
        success: true,
        summary: summaryText,
        isFallback: false,
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      console.warn('[LLM Timeout/Fault] Anthropic Gateway connection aborted. Safely engaging deterministic fallback template.', fetchError);
      return NextResponse.json({
        success: true,
        summary: buildFallbackTemplate(),
        isFallback: true,
      });
    }
  } catch (error: unknown) {
    console.error('[API Error] Summary controller routing exception:', error);
    return NextResponse.json(
      { error: 'Failed to compile audit response narrative.' },
      { status: 500 }
    );
  }
}
