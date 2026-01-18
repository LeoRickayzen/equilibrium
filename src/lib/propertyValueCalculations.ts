/**
 * Calculates the value added to property from renovation
 * @param renovationCost - The cost of renovation
 * @param renovationReturn - The percentage return on renovation (e.g., 50 for 50%)
 * @returns The value added to the property from renovation
 */
export function calculateRenovationValueAdded(
  renovationCost: number,
  renovationReturn: number
): number {
  return renovationCost * (renovationReturn / 100);
}

/**
 * Calculates the final property value after renovation and appreciation
 * @param propertyPrice - Initial property price
 * @param renovationCost - The cost of renovation
 * @param renovationReturn - The percentage return on renovation (e.g., 50 for 50%)
 * @param propertyAppreciation - Annual property appreciation percentage (e.g., 1.5 for 1.5%)
 * @param timeInProperty - Number of years in the property
 * @returns The final property value after renovation and appreciation
 */
export function calculateFinalPropertyValue(
  propertyPrice: number,
  renovationCost: number,
  renovationReturn: number,
  propertyAppreciation: number,
  timeInProperty: number
): number {
  const renovationValue = calculateRenovationValueAdded(renovationCost, renovationReturn);
  const adjustedPropertyPrice = propertyPrice + renovationValue;
  return adjustedPropertyPrice * Math.pow(1 + propertyAppreciation / 100, timeInProperty);
}
