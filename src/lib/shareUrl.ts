import type { CalculatorInputs } from "@/types/calculator";

const STRING_KEYS = [
  "initialCapital",
  "propertyPrice",
  "rentPcm",
  "rentInflation",
  "interestRate",
  "mortgageLength",
  "timeInProperty",
  "investmentAppreciationBuying",
  "investmentAppreciationRenting",
  "propertyAppreciation",
  "serviceCharge",
  "serviceChargeIncrease",
  "renovationCost",
  "renovationReturn",
  "legalConveyancingSurveyCost",
  "estateAgentFeesPercent",
] as const satisfies readonly (keyof CalculatorInputs)[];

const BOOLEAN_KEYS = [
  "isFirstTimeBuyer",
  "isAdditionalProperty",
] as const satisfies readonly (keyof CalculatorInputs)[];

type StringKey = (typeof STRING_KEYS)[number];
type BooleanKey = (typeof BOOLEAN_KEYS)[number];

function parseBoolean(value: string | null): boolean | null {
  if (value === null) return null;
  
  const normalized = value.trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  
  return null;
}

export function encodeCalculatorInputs(inputs: CalculatorInputs): string {
  const params = new URLSearchParams();

  for (const key of STRING_KEYS) {
    params.set(key, inputs[key]);
  }

  for (const key of BOOLEAN_KEYS) {
    params.set(key, inputs[key] ? "true" : "false");
  }

  return params.toString();
}

export function decodeCalculatorInputs(
  params: URLSearchParams
): Partial<CalculatorInputs> | null {
  const result: Partial<CalculatorInputs> = {};

  for (const key of STRING_KEYS) {
    const value = params.get(key);
    if (value !== null) {
      result[key] = value;
    }
  }

  for (const key of BOOLEAN_KEYS) {
    const value = parseBoolean(params.get(key));
    if (value !== null) {
      result[key] = value;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

