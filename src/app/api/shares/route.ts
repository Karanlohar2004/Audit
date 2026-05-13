import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { spendData, auditResults } = body;

    if (!spendData || !auditResults) {
      return NextResponse.json(
        { error: 'Missing source payload entities.' },
        { status: 400 }
      );
    }

    // Stripping out Personally Identifiable Information (PII)
    // Completely omit email, explicit company titles, or user string traces
    const anonymizedPayload = {
      headcount: spendData.headcount,
      cursorSeats: spendData.cursorSeats,
      copilotSeats: spendData.copilotSeats,
      claudeSeats: spendData.claudeSeats,
      chatgptSeats: spendData.chatgptSeats,
      windsurfSeats: spendData.windsurfSeats,
      v0Seats: spendData.v0Seats,
      rawApiSpend: spendData.rawApiSpend,
      isVCBacked: spendData.isVCBacked,
      // Results summary preserved safely
      auditSummary: {
        totalCurrentMonthly: auditResults.totalCurrentMonthly,
        totalOptimizedMonthly: auditResults.totalOptimizedMonthly,
        totalMonthlySavings: auditResults.totalMonthlySavings,
        efficiencyRatio: auditResults.efficiencyRatio,
        itemsCount: auditResults.items?.length || 0,
      },
      indexedAt: new Date().toISOString(),
    };

    // Construct a crisp short identifier for seamless URL broadcasting
    const randomBuffer = Math.random().toString(36).substring(2, 8);
    const shareId = `audit_${randomBuffer}`;

    // Database index insertion mock
    console.log(`[Shareable DB Index] Serialized public view schema mapped to key: ${shareId}`);

    // Return the absolute or relative broadcast link string
    return NextResponse.json({
      success: true,
      shareId,
      shareUrl: `/audit/${shareId}`,
      anonymizedSize: JSON.stringify(anonymizedPayload).length,
    });
  } catch (error: unknown) {
    console.error('[API Error] Shareable URL allocation execution fault:', error);
    return NextResponse.json(
      { error: 'Failed to instantiate public access gateway links.' },
      { status: 500 }
    );
  }
}
