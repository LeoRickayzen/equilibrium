/**
 * Represents all calculated values for a single year in the calculator
 */
export interface YearlyRow {
  year: number;
  
  monthlyMortgagePayment: number | null;
  mortgageBalance: number;
  principalPaid: number;
  interestPaid: number;
  
  monthlyRent: number;
  monthlyServiceCharge: number;
  monthlySavings: number;
  cumulativeSavings: number;
  cumulativeSavingsWithAppreciation: number;
  
  propertyValue: number;
  equityInProperty: number;
  
  investmentValue: number;
  investmentAppreciation: number;
  
  sizeOfEquityBuying: number;
  sizeOfEquityIfInvested: number;
  difference: number;
  winner: "buy" | "rent";
}

/**
 * Input parameters for building the spreadsheet
 */
export interface SpreadsheetInputs {
  propertyPrice: number;
  downPayment: number;
  interestRate: number;
  mortgageLength: number;
  timeInProperty: number;
  rentPcm: number;
  rentInflation: number;
  serviceCharge: number;
  serviceChargeIncrease: number;
  propertyAppreciation: number;
  investmentAppreciationBuying: number;
  investmentAppreciationRenting: number;
  stampDuty: number;
  renovationCost: number;
  renovationReturn: number;
  legalConveyancingSurveyCost: number;
  estateAgentFeesPercent: number;
}
