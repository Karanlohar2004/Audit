/**
 * Definitive pricing matrices and configurations mapped from PRICING_DATA.md
 */

export const PRICING_CONSTANTS = {
  CURSOR: {
    PRO_MONTHLY: 20,
    BUSINESS_MONTHLY: 40,
  },
  COPILOT: {
    INDIVIDUAL_MONTHLY: 10,
    BUSINESS_MONTHLY: 19,
    ENTERPRISE_MONTHLY: 39,
  },
  CLAUDE: {
    PRO_MONTHLY: 20,
    TEAM_MONTHLY_PER_SEAT: 30,
    TEAM_MIN_SEATS: 5,
  },
  CHATGPT: {
    PLUS_MONTHLY: 20,
    TEAM_MONTHLY_PER_SEAT: 35, // billed monthly equivalent
    TEAM_MIN_SEATS: 2,
  },
  WINDSURF: {
    PRO_MONTHLY: 15,
  },
  V0: {
    PREMIUM_MONTHLY: 20,
  },
  API: {
    ARBITRAGE_THRESHOLD: 300, // Monthly spend triggering architectural guidance
    PROMPT_CACHING_SAVINGS_RATIO: 0.75, // Up to 75% savings via prompt caching
  },
  CREDEX_CTA_THRESHOLD: 500, // Total monthly savings threshold triggering enterprise CTA
};

export interface UserSpendState {
  companyName: string;
  headcount: number;
  // Seat-based tooling
  cursorSeats: number;
  copilotSeats: number;
  claudeSeats: number;
  chatgptSeats: number;
  windsurfSeats: number;
  v0Seats: number;
  // API usage
  rawApiSpend: number; // total monthly USD
  // User intent/metadata
  isVCBacked: boolean;
}

export const DEFAULT_SPEND_STATE: UserSpendState = {
  companyName: '',
  headcount: 5,
  cursorSeats: 0,
  copilotSeats: 0,
  claudeSeats: 0,
  chatgptSeats: 0,
  windsurfSeats: 0,
  v0Seats: 0,
  rawApiSpend: 0,
  isVCBacked: false,
};
