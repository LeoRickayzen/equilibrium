import type { CalculatorInputs } from "@/types/calculator";
import type { ParsedCalculatorInputs } from "@/types/calculator";
import { parseNumber } from "@/lib/validation";

export function getParsedInputs(inputs: CalculatorInputs): ParsedCalculatorInputs {
  return {
    downPayment: parseNumber(inputs.downPayment),
    propertyPrice: parseNumber(inputs.propertyPrice),
    rentPcm: parseNumber(inputs.rentPcm),
    rentInflation: parseNumber(inputs.rentInflation),
    interestRate: parseNumber(inputs.interestRate),
    mortgageLength: parseNumber(inputs.mortgageLength),
    timeInProperty: parseNumber(inputs.timeInProperty),
    investmentAppreciationBuying: parseNumber(inputs.investmentAppreciationBuying),
    investmentAppreciationRenting: parseNumber(inputs.investmentAppreciationRenting),
    propertyAppreciation: parseNumber(inputs.propertyAppreciation, 0),
    serviceCharge: parseNumber(inputs.serviceCharge, 0),
    serviceChargeIncrease: parseNumber(inputs.serviceChargeIncrease, 0),
    isFirstTimeBuyer: inputs.isFirstTimeBuyer,
    isAdditionalProperty: inputs.isAdditionalProperty,
    renovationCost: parseNumber(inputs.renovationCost, 0),
    renovationReturn: parseNumber(inputs.renovationReturn, 0),
    legalConveyancingSurveyCost: parseNumber(inputs.legalConveyancingSurveyCost, 0),
    estateAgentFeesPercent: parseNumber(inputs.estateAgentFeesPercent, 0),
  };
}
