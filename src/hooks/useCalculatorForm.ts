import { useState, useCallback } from "react";
import { CalculatorInputs } from "@/types/calculator";
import { DEFAULT_INPUTS } from "@/lib/constants";
import { parseNumber } from "@/lib/validation";

export function useCalculatorForm(initialInputs?: Partial<CalculatorInputs>) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...DEFAULT_INPUTS,
    ...initialInputs,
  });

  const updateInput = useCallback(
    <K extends keyof CalculatorInputs>(
      key: K,
      value: CalculatorInputs[K]
    ) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const getParsedInputs = useCallback(() => {
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
  }, [inputs]);

  return {
    inputs,
    updateInput,
    getParsedInputs,
  };
}
