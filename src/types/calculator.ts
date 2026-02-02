import type { YearlyRow } from "@/lib/calculations/types";

export interface CalculatorInputs {
  initialCapital: string;
  propertyPrice: string;
  rentPcm: string;
  rentInflation: string;
  interestRate: string;
  mortgageLength: string;
  timeInProperty: string;
  investmentAppreciationBuying: string;
  investmentAppreciationRenting: string;
  propertyAppreciation: string;
  serviceCharge: string;
  serviceChargeIncrease: string;
  isFirstTimeBuyer: boolean;
  isAdditionalProperty: boolean;
  renovationCost: string;
  renovationReturn: string;
  legalConveyancingSurveyCost: string;
  estateAgentFeesPercent: string;
}

// Parsed calculator inputs (numbers)
export interface ParsedCalculatorInputs {
  initialCapital: number;
  propertyPrice: number;
  rentPcm: number;
  rentInflation: number;
  interestRate: number;
  mortgageLength: number;
  timeInProperty: number;
  investmentAppreciationBuying: number;
  investmentAppreciationRenting: number;
  propertyAppreciation: number;
  serviceCharge: number;
  serviceChargeIncrease: number;
  isFirstTimeBuyer: boolean;
  isAdditionalProperty: boolean;
  renovationCost: number;
  renovationReturn: number;
  legalConveyancingSurveyCost: number;
  estateAgentFeesPercent: number;
}

export interface CalculationResults {
  rows: YearlyRow[];
  
  totals: {
    equityGained: number;
    interestPaid: number;
    investmentValue: number;
  };
  
  averages: {
    monthlySavings: number;
    monthlyServiceCharge: number;
  };
  
  final: {
    difference: number;
    winner: "buy" | "rent";
    cumulativeSavingsWithAppreciation: number;
  };
  
  monthlyMortgagePayment: number | null;
  stampDuty: number;
  parsedInputs: ParsedCalculatorInputs;
}

export interface MonthlySavingsData {
  averageMonthlySavings: number;
  averageMonthlyServiceCharge: number;
  yearlyBreakdown: YearlySavings[];
}

export interface YearlySavings {
  year: number;
  monthlySavings: number;
  rent: number;
  serviceChargePaid: number;
}

export interface EquityData {
  totalEquityGained: number;
  totalInterestPaid: number;
  yearlyBreakdown: YearlyEquity[];
}

export interface YearlyEquity {
  year: number;
  equityGained: number;
  interestPaid: number;
  remainingBalance: number;
  propertySoldPrice: number;
}

export interface SavingsInvestmentPerformance {
  totalValue: number;
  yearlyBreakdown: YearlyInvestmentPerformance[];
}

export interface YearlyInvestmentPerformance {
  year: number;
  value: number;
  appreciation: number;
}

export interface SavingsWithAppreciation {
  year: number;
  totalSaved: number;
  totalSavedWithAppreciation: number;
}

export interface YearlyComparison {
  year: number;
  sizeOfEquityBuying: number;
  sizeOfEquityIfInvested: number;
  difference: number;
  winner: "buy" | "rent";
}

export interface ComparisonData {
  totalDifference: number;
  winner: "buy" | "rent";
  yearlyBreakdown: YearlyComparison[];
}

// Combined results interface
export interface CalculatorResults {
  monthlyMortgagePayment: number | null;
  monthlySavingsData: MonthlySavingsData | null;
  equityData: EquityData | null;
  savingsWithAppreciation: SavingsWithAppreciation[] | null;
  savingsInvestmentPerformance: SavingsInvestmentPerformance | null;
  stampDuty: number;
  parsedInputs: ParsedCalculatorInputs;
  yearlyRows?: any[]; // Internal spreadsheet data (optional for backward compatibility)
}
