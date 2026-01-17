// Stamp Duty Land Tax (SDLT) constants for 2026 UK rates
export const SDLT_THRESHOLDS = {
  FIRST_BAND: 125000,
  SECOND_BAND: 250000,
  THIRD_BAND: 925000,
  FOURTH_BAND: 1500000,
  FIRST_TIME_BUYER_MAX: 500000,
  FIRST_TIME_BUYER_RELIEF: 300000,
} as const;

export const SDLT_RATES = {
  STANDARD: {
    FIRST_BAND: 0,
    SECOND_BAND: 0.02, // 2%
    THIRD_BAND: 0.05, // 5%
    FOURTH_BAND: 0.10, // 10%
    ABOVE_FOURTH: 0.12, // 12%
  },
  FIRST_TIME_BUYER: {
    BELOW_RELIEF: 0,
    ABOVE_RELIEF: 0.05, // 5%
  },
  ADDITIONAL_PROPERTY: {
    FIRST_BAND: 0.03, // 3% (0% + 3% surcharge)
    SECOND_BAND: 0.05, // 5% (2% + 3% surcharge)
    THIRD_BAND: 0.08, // 8% (5% + 3% surcharge)
    FOURTH_BAND: 0.13, // 13% (10% + 3% surcharge)
    ABOVE_FOURTH: 0.15, // 15% (12% + 3% surcharge)
  },
} as const;

export const DEFAULT_INPUTS = {
  downPayment: "20000",
  propertyPrice: "140000",
  rentPcm: "550",
  rentInflation: "6",
  interestRate: "4.5",
  mortgageLength: "25",
  timeInProperty: "10",
  investmentAppreciationBuying: "5",
  investmentAppreciationRenting: "2",
  propertyAppreciation: "1.5",
  serviceCharge: "1800",
  serviceChargeIncrease: "5",
  isFirstTimeBuyer: true,
  isAdditionalProperty: false,
  renovationCost: "25000",
  renovationReturn: "0",
  legalConveyancingSurveyCost: "1750",
  estateAgentFeesPercent: "1.5",
} as const;
