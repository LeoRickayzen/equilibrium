import type { YearlyRow } from "./types";
import type {
  MonthlySavingsData,
  EquityData,
  SavingsWithAppreciation,
  SavingsInvestmentPerformance,
  ComparisonData,
  YearlySavings,
  YearlyEquity,
  YearlyInvestmentPerformance,
  YearlyComparison,
} from "@/types/calculator";

/**
 * Converts YearlyRow[] to MonthlySavingsData format
 */
export function yearlyRowsToMonthlySavingsData(
  yearlyRows: YearlyRow[]
): MonthlySavingsData | null {
  if (yearlyRows.length === 0) {
    return null;
  }

  const yearlyBreakdown: YearlySavings[] = yearlyRows.map((row) => ({
    year: row.year,
    monthlySavings: row.monthlySavings,
    rent: row.monthlyRent,
    serviceChargePaid: row.monthlyServiceCharge * 12,
  }));

  const totalMonthlySavings = yearlyRows.reduce(
    (sum, row) => sum + row.monthlySavings,
    0
  );
  const totalServiceCharge = yearlyRows.reduce(
    (sum, row) => sum + row.monthlyServiceCharge * 12,
    0
  );
  const averageMonthlySavings = totalMonthlySavings / yearlyRows.length;
  const averageMonthlyServiceCharge = totalServiceCharge / yearlyRows.length / 12;

  return {
    averageMonthlySavings,
    averageMonthlyServiceCharge,
    yearlyBreakdown,
  };
}

/**
 * Converts YearlyRow[] to EquityData format
 */
export function yearlyRowsToEquityData(
  yearlyRows: YearlyRow[]
): EquityData | null {
  if (yearlyRows.length === 0) {
    return null;
  }

  const yearlyBreakdown: YearlyEquity[] = yearlyRows.map((row) => ({
    year: row.year,
    equityGained: row.principalPaid,
    interestPaid: row.interestPaid,
    remainingBalance: row.mortgageBalance,
    propertySoldPrice: row.propertyValue,
  }));

  const totalEquityGained = yearlyRows.reduce(
    (sum, row) => sum + row.principalPaid,
    0
  );
  const totalInterestPaid = yearlyRows.reduce(
    (sum, row) => sum + row.interestPaid,
    0
  );

  return {
    totalEquityGained,
    totalInterestPaid,
    yearlyBreakdown,
  };
}

/**
 * Converts YearlyRow[] to SavingsWithAppreciation format
 */
export function yearlyRowsToSavingsWithAppreciation(
  yearlyRows: YearlyRow[]
): SavingsWithAppreciation[] {
  return yearlyRows.map((row) => ({
    year: row.year,
    totalSaved: row.cumulativeSavings,
    totalSavedWithAppreciation: row.cumulativeSavingsWithAppreciation,
  }));
}

/**
 * Converts YearlyRow[] to SavingsInvestmentPerformance format
 */
export function yearlyRowsToSavingsInvestmentPerformance(
  yearlyRows: YearlyRow[]
): SavingsInvestmentPerformance | null {
  if (yearlyRows.length === 0) {
    return null;
  }

  // Calculate appreciation for each year
  // For year 1, we need to estimate the initial value
  const firstRow = yearlyRows[0];
  let estimatedInitialValue = firstRow.investmentValue;
  if (yearlyRows.length > 1) {
    const year1Value = yearlyRows[0].investmentValue;
    const year2Value = yearlyRows[1].investmentValue;
    const rate = year2Value / year1Value - 1;
    estimatedInitialValue = year1Value / (1 + rate);
  }

  const yearlyBreakdown: YearlyInvestmentPerformance[] = yearlyRows.map(
    (row, index) => {
      const currentValue = row.investmentValue;
      let appreciation = 0;

      if (index === 0) {
        appreciation = currentValue - estimatedInitialValue;
      } else {
        const previousValue = yearlyRows[index - 1].investmentValue;
        appreciation = currentValue - previousValue;
      }

      return {
        year: row.year,
        value: currentValue,
        appreciation,
      };
    }
  );

  const totalValue = yearlyRows[yearlyRows.length - 1].investmentValue;

  return {
    totalValue,
    yearlyBreakdown,
  };
}

/**
 * Converts YearlyRow[] to ComparisonData format
 */
export function yearlyRowsToComparisonData(
  yearlyRows: YearlyRow[]
): ComparisonData | null {
  if (yearlyRows.length === 0) {
    return null;
  }

  const yearlyBreakdown: YearlyComparison[] = yearlyRows.map((row) => ({
    year: row.year,
    sizeOfEquityBuying: row.sizeOfEquityBuying,
    sizeOfEquityIfInvested: row.sizeOfEquityIfInvested,
    difference: row.difference,
    winner: row.winner,
  }));

  const finalRow = yearlyRows[yearlyRows.length - 1];

  return {
    totalDifference: finalRow.difference,
    winner: finalRow.winner,
    yearlyBreakdown,
  };
}
