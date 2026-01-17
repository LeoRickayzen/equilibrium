// Re-export all public APIs
export { calculateStampDuty } from "./stampDuty";
export { calculateMonthlyMortgagePayment } from "./mortgage";
export { buildSpreadsheet } from "./spreadsheet";
export {
  yearlyRowsToMonthlySavingsData,
  yearlyRowsToEquityData,
  yearlyRowsToSavingsWithAppreciation,
  yearlyRowsToSavingsInvestmentPerformance,
  yearlyRowsToComparisonData,
} from "./adapters";
export type { YearlyRow, SpreadsheetInputs } from "./types";
