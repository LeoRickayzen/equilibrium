/**
 * Parses a string to a number, returning a default value if parsing fails
 */
export function parseNumber(
  value: string,
  defaultValue: number = 0
): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Validation constraints for number inputs
 */
export interface ValidationConstraints {
  min?: number;
  max?: number;
  allowZero?: boolean;
  allowNegative?: boolean;
}

/**
 * Validates if a number meets the given constraints
 */
export function isValidNumber(
  value: number,
  constraints: ValidationConstraints = {}
): boolean {
  const {
    min,
    max,
    allowZero = true,
    allowNegative = false,
  } = constraints;

  if (!allowZero && value === 0) return false;
  if (!allowNegative && value < 0) return false;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;

  return true;
}

/**
 * Validates and parses a number input with constraints
 */
export function parseAndValidateNumber(
  value: string,
  constraints: ValidationConstraints = {},
  defaultValue: number = 0
): number | null {
  const parsed = parseNumber(value, defaultValue);
  return isValidNumber(parsed, constraints) ? parsed : null;
}
