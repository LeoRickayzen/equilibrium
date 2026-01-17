import {
  SDLT_THRESHOLDS,
  SDLT_RATES,
} from "../constants";

interface StampDutyRates {
  FIRST_BAND: number;
  SECOND_BAND: number;
  THIRD_BAND: number;
  FOURTH_BAND: number;
  ABOVE_FOURTH: number;
}

/**
 * Calculates stamp duty for a given price using progressive band rates
 */
function calculateStampDutyBands(
  remainingPrice: number,
  rates: StampDutyRates,
  thresholds: typeof SDLT_THRESHOLDS
): number {
  let stampDuty = 0;
  let price = remainingPrice;

  if (price > thresholds.FOURTH_BAND) {
    stampDuty += (price - thresholds.FOURTH_BAND) * rates.ABOVE_FOURTH;
    price = thresholds.FOURTH_BAND;
  }
  if (price > thresholds.THIRD_BAND) {
    stampDuty += (price - thresholds.THIRD_BAND) * rates.FOURTH_BAND;
    price = thresholds.THIRD_BAND;
  }
  if (price > thresholds.SECOND_BAND) {
    stampDuty += (price - thresholds.SECOND_BAND) * rates.THIRD_BAND;
    price = thresholds.SECOND_BAND;
  }
  if (price > thresholds.FIRST_BAND) {
    stampDuty += (price - thresholds.FIRST_BAND) * rates.SECOND_BAND;
    price = thresholds.FIRST_BAND;
  }
  if (price > 0) {
    stampDuty += price * rates.FIRST_BAND;
  }

  return stampDuty;
}

/**
 * Calculates UK Stamp Duty Land Tax (SDLT) based on 2026 rates
 */
export function calculateStampDuty(
  propertyPrice: number,
  isFirstTimeBuyer: boolean = false,
  isAdditionalProperty: boolean = false
): number {
  if (propertyPrice <= 0) {
    return 0;
  }

  if (isAdditionalProperty) {
    return calculateStampDutyBands(
      propertyPrice,
      SDLT_RATES.ADDITIONAL_PROPERTY,
      SDLT_THRESHOLDS
    );
  }

  if (isFirstTimeBuyer && propertyPrice <= SDLT_THRESHOLDS.FIRST_TIME_BUYER_MAX) {
    if (propertyPrice > SDLT_THRESHOLDS.FIRST_TIME_BUYER_RELIEF) {
      return (
        (propertyPrice - SDLT_THRESHOLDS.FIRST_TIME_BUYER_RELIEF) *
        SDLT_RATES.FIRST_TIME_BUYER.ABOVE_RELIEF
      );
    }
    return 0;
  }

  return calculateStampDutyBands(
    propertyPrice,
    SDLT_RATES.STANDARD,
    SDLT_THRESHOLDS
  );
}
