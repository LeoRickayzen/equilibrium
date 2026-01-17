import {
  buildSpreadsheet as buildSpreadsheetImpl,
  yearlyRowsToMonthlySavingsData,
  yearlyRowsToEquityData,
  yearlyRowsToSavingsWithAppreciation,
  yearlyRowsToSavingsInvestmentPerformance,
  yearlyRowsToComparisonData,
  calculateStampDuty,
  type SpreadsheetInputs,
  type YearlyRow,
} from "@/lib/calculations";
import type {
  MonthlySavingsData,
  EquityData,
  SavingsWithAppreciation,
  SavingsInvestmentPerformance,
  ComparisonData,
} from "@/types/calculator";

/**
 * Service for calculator utility computations
 * Uses the spreadsheet model to eliminate duplication
 */
export const calculatorService = {
  /**
   * Builds the complete spreadsheet
   * This is the main entry point - all calculations happen in one pass
   */
  buildSpreadsheet(inputs: SpreadsheetInputs): YearlyRow[] {
    return buildSpreadsheetImpl(inputs);
  },

  /**
   * Converts spreadsheet to MonthlySavingsData format
   */
  spreadsheetToMonthlySavingsData(
    yearlyRows: YearlyRow[]
  ): MonthlySavingsData | null {
    return yearlyRowsToMonthlySavingsData(yearlyRows);
  },

  /**
   * Converts spreadsheet to EquityData format
   */
  spreadsheetToEquityData(
    yearlyRows: YearlyRow[]
  ): EquityData | null {
    return yearlyRowsToEquityData(yearlyRows);
  },

  /**
   * Converts spreadsheet to SavingsWithAppreciation format
   */
  spreadsheetToSavingsWithAppreciation(
    yearlyRows: YearlyRow[]
  ): SavingsWithAppreciation[] {
    return yearlyRowsToSavingsWithAppreciation(yearlyRows);
  },

  /**
   * Converts spreadsheet to SavingsInvestmentPerformance format
   */
  spreadsheetToSavingsInvestmentPerformance(
    yearlyRows: YearlyRow[]
  ): SavingsInvestmentPerformance | null {
    return yearlyRowsToSavingsInvestmentPerformance(yearlyRows);
  },

  /**
   * Converts spreadsheet to ComparisonData format
   */
  spreadsheetToComparisonData(
    yearlyRows: YearlyRow[]
  ): ComparisonData | null {
    return yearlyRowsToComparisonData(yearlyRows);
  },

  /**
   * Computes stamp duty
   */
  computeStampDuty(
    propertyPrice: number,
    isFirstTimeBuyer: boolean,
    isAdditionalProperty: boolean
  ): number {
    return calculateStampDuty(propertyPrice, isFirstTimeBuyer, isAdditionalProperty);
  },
};
