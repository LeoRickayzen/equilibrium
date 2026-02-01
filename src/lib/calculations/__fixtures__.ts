import type { YearlyRow } from "./types";

/**
 * Creates a mock YearlyRow for testing adapter functions
 */
export function createMockYearlyRow(overrides?: Partial<YearlyRow>): YearlyRow {
  return {
    year: 1,
    monthlyMortgagePayment: 1000,
    mortgageBalance: 150000,
    principalPaid: 5000,
    interestPaid: 7000,
    monthlyRent: 800,
    monthlyServiceCharge: 166.67,
    monthlySavings: -366.67,
    cumulativeSavings: -4400,
    cumulativeSavingsWithAppreciation: -4400,
    propertyValue: 204000,
    equityInProperty: 54000,
    investmentValue: 41200,
    investmentAppreciation: 1200,
    sizeOfEquityBuying: 49600,
    sizeOfEquityIfInvested: 41200,
    difference: 8400,
    winner: "buy",
    ...overrides,
  };
}
