import {
  buildSpreadsheet as buildSpreadsheetImpl,
  calculateStampDuty,
  yearlyRowsToSpreadsheetData,
  type SpreadsheetInputs,
  type YearlyRow,
} from "@/lib/calculations";
import type {
  CalculationResults,
  ParsedCalculatorInputs,
} from "@/types/calculator";

export const calculatorService = {
  buildSpreadsheet(inputs: SpreadsheetInputs): YearlyRow[] {
    return buildSpreadsheetImpl(inputs);
  },

  toSpreadsheetData(
    yearlyRows: YearlyRow[],
    stampDuty: number,
    parsedInputs: ParsedCalculatorInputs
  ): CalculationResults {
    return yearlyRowsToSpreadsheetData(yearlyRows, stampDuty, parsedInputs);
  },

  computeStampDuty(
    propertyPrice: number,
    isFirstTimeBuyer: boolean,
    isAdditionalProperty: boolean
  ): number {
    return calculateStampDuty(propertyPrice, isFirstTimeBuyer, isAdditionalProperty);
  },
};
