import { useMemo } from "react";
import { CalculatorInputs } from "@/types/calculator";
import { parseNumber } from "@/lib/validation";
import { formatCurrency } from "@/lib/formatting";

interface UseRenovationCostValidationResult {
  maxRenovationCost: number;
  error: string | undefined;
  handleChange: (value: string) => void;
}

/**
 * Hook for validating renovation cost against available savings
 * Ensures renovation cost cannot exceed: downPayment - legalConveyancingSurveyCost
 */
export function useRenovationCostValidation(
  inputs: CalculatorInputs,
  updateInput: (key: "renovationCost", value: string) => void
): UseRenovationCostValidationResult {
  // Calculate max allowed renovation cost
  const maxRenovationCost = useMemo(() => {
    const downPayment = parseNumber(inputs.downPayment, 0);
    const legalCosts = parseNumber(inputs.legalConveyancingSurveyCost, 0);
    return Math.max(0, downPayment - legalCosts);
  }, [inputs.downPayment, inputs.legalConveyancingSurveyCost]);

  // Validate renovation cost
  const error = useMemo(() => {
    const renovationCost = parseNumber(inputs.renovationCost, 0);
    if (renovationCost > maxRenovationCost) {
      const formattedMax = formatCurrency(maxRenovationCost);
      return `Renovation cost cannot exceed available savings: ${formattedMax}`;
    }
    return undefined;
  }, [inputs.renovationCost, maxRenovationCost]);

  // Handle renovation cost change with clamping
  const handleChange = (value: string) => {
    const parsed = parseNumber(value, 0);
    if (parsed > maxRenovationCost) {
      // Clamp to maximum
      updateInput("renovationCost", maxRenovationCost.toString());
    } else {
      updateInput("renovationCost", value);
    }
  };

  return {
    maxRenovationCost,
    error,
    handleChange,
  };
}
