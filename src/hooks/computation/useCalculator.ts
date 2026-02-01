import { useMemo } from "react";
import { calculatorService } from "@/services/calculatorService";
import type { ParsedCalculatorInputs, CalculationResults } from "@/types/calculator";

export function useCalculator(
  parsedInputs: ParsedCalculatorInputs
): CalculationResults {
  return useMemo(() => {
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
      isFirstTimeBuyer,
      isAdditionalProperty,
    } = parsedInputs;

    const stampDuty = calculatorService.computeStampDuty(
      propertyPrice,
      isFirstTimeBuyer,
      isAdditionalProperty
    );

    const yearlyRows = calculatorService.buildSpreadsheet({
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

    return calculatorService.toSpreadsheetData(yearlyRows, stampDuty, parsedInputs);
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
}
