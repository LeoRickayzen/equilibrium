import { useMemo } from "react";
import { calculatorService } from "@/services/calculatorService";
import type { ParsedCalculatorInputs, CalculatorResults } from "@/types/calculator";
import type { YearlyRow } from "@/lib/calculations";

/**
 * Computation hook for calculator
 * Uses the spreadsheet model to compute all values in a single pass
 */
export function useCalculator(
  parsedInputs: ParsedCalculatorInputs
): CalculatorResults {
  // Build the complete spreadsheet in one pass
  const yearlyRows = useMemo(() => {
    const {
      propertyPrice,
      downPayment,
      interestRate,
      mortgageLength,
      timeInProperty,
      rentPcm,
      rentInflation,
      serviceCharge,
      serviceChargeIncrease,
      propertyAppreciation,
      investmentAppreciationBuying,
      investmentAppreciationRenting,
      renovationCost,
      renovationReturn,
      legalConveyancingSurveyCost,
      estateAgentFeesPercent,
    } = parsedInputs;

    // Calculate stamp duty first (needed for spreadsheet)
    const stampDuty = calculatorService.computeStampDuty(
      propertyPrice,
      parsedInputs.isFirstTimeBuyer,
      parsedInputs.isAdditionalProperty
    );

    return calculatorService.buildSpreadsheet({
      propertyPrice,
      downPayment,
      interestRate,
      mortgageLength,
      timeInProperty,
      rentPcm,
      rentInflation,
      serviceCharge,
      serviceChargeIncrease,
      propertyAppreciation,
      investmentAppreciationBuying,
      investmentAppreciationRenting,
      stampDuty,
      renovationCost,
      renovationReturn,
      legalConveyancingSurveyCost,
      estateAgentFeesPercent,
    });
  }, [
    parsedInputs.propertyPrice,
    parsedInputs.downPayment,
    parsedInputs.interestRate,
    parsedInputs.mortgageLength,
    parsedInputs.timeInProperty,
    parsedInputs.rentPcm,
    parsedInputs.rentInflation,
    parsedInputs.serviceCharge,
    parsedInputs.serviceChargeIncrease,
    parsedInputs.propertyAppreciation,
    parsedInputs.investmentAppreciationBuying,
    parsedInputs.investmentAppreciationRenting,
    parsedInputs.renovationCost,
    parsedInputs.renovationReturn,
    parsedInputs.legalConveyancingSurveyCost,
    parsedInputs.estateAgentFeesPercent,
    parsedInputs.isFirstTimeBuyer,
    parsedInputs.isAdditionalProperty,
  ]);

  // Convert spreadsheet to required formats
  const monthlyMortgagePayment = useMemo(() => {
    return yearlyRows.length > 0 ? yearlyRows[0].monthlyMortgagePayment : null;
  }, [yearlyRows]);

  const monthlySavingsData = useMemo(() => {
    return calculatorService.spreadsheetToMonthlySavingsData(yearlyRows);
  }, [yearlyRows]);

  const equityData = useMemo(() => {
    return calculatorService.spreadsheetToEquityData(yearlyRows);
  }, [yearlyRows]);

  const stampDuty = useMemo(() => {
    return calculatorService.computeStampDuty(
      parsedInputs.propertyPrice,
      parsedInputs.isFirstTimeBuyer,
      parsedInputs.isAdditionalProperty
    );
  }, [
    parsedInputs.propertyPrice,
    parsedInputs.isFirstTimeBuyer,
    parsedInputs.isAdditionalProperty,
  ]);

  return {
    monthlyMortgagePayment,
    monthlySavingsData,
    equityData,
    savingsWithAppreciation: null, // Calculated in containers from spreadsheet
    savingsInvestmentPerformance: null, // Calculated in containers from spreadsheet
    stampDuty,
    parsedInputs,
    yearlyRows: yearlyRows as YearlyRow[], // Include spreadsheet data for containers
  };
}
