import type { YearlyRow } from "@/lib/calculations/types";
import type { CalculationResults, ParsedCalculatorInputs } from "@/types/calculator";

export function yearlyRowsToSpreadsheetData(
  yearlyRows: YearlyRow[],
  stampDuty: number,
  parsedInputs: ParsedCalculatorInputs
): CalculationResults {
  if (yearlyRows.length === 0) {
    return {
      rows: [],
      totals: {
        equityGained: 0,
        interestPaid: 0,
        investmentValue: 0,
      },
      averages: {
        monthlySavings: 0,
        monthlyServiceCharge: 0,
      },
      final: {
        difference: 0,
        winner: "rent",
        cumulativeSavingsWithAppreciation: 0,
      },
      monthlyMortgagePayment: null,
      stampDuty,
      parsedInputs,
    };
  }

  const totalEquityGained = yearlyRows.reduce((sum, row) => sum + row.principalPaid, 0);
  const totalInterestPaid = yearlyRows.reduce((sum, row) => sum + row.interestPaid, 0);
  
  const totalMonthlySavings = yearlyRows.reduce((sum, row) => sum + row.monthlySavings, 0);
  const totalServiceCharge = yearlyRows.reduce((sum, row) => sum + row.monthlyServiceCharge * 12, 0);
  
  const averageMonthlySavings = totalMonthlySavings / yearlyRows.length;
  const averageMonthlyServiceCharge = totalServiceCharge / yearlyRows.length / 12;
  
  const finalRow = yearlyRows[yearlyRows.length - 1];

  return {
    rows: yearlyRows,
    totals: {
      equityGained: totalEquityGained,
      interestPaid: totalInterestPaid,
      investmentValue: finalRow.investmentValue,
    },
    averages: {
      monthlySavings: averageMonthlySavings,
      monthlyServiceCharge: averageMonthlyServiceCharge,
    },
    final: {
      difference: finalRow.difference,
      winner: finalRow.winner,
      cumulativeSavingsWithAppreciation: finalRow.cumulativeSavingsWithAppreciation,
    },
    monthlyMortgagePayment: yearlyRows[0].monthlyMortgagePayment,
    stampDuty,
    parsedInputs,
  };
}
