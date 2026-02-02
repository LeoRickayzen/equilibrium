import type { YearlyRow, SpreadsheetInputs } from "./types";
import { calculateMonthlyMortgagePayment, calculateAvailableDownPayment, calculateLoanAmount } from "./mortgage";

// ============================================================================
// Helper Interfaces
// ============================================================================

interface InitialMortgageDetails {
  loanAmount: number;
  monthlyMortgagePayment: number | null;
  adjustedPropertyPrice: number;
  monthlyInterestRate: number;
  isBoughtOutright: boolean;
}

interface YearlyRentAndServiceCharge {
  monthlyRent: number;
  monthlyServiceCharge: number;
}

interface YearlySavingsResult {
  monthlySavings: number;
  cumulativeSavings: number;
  cumulativeSavingsWithAppreciation: number;
}

interface SavingsParams {
  monthlyRent: number;
  monthlyServiceCharge: number;
  monthlyMortgagePayment: number | null;
  previousCumulativeSavings: number;
  previousCumulativeSavingsWithAppreciation: number;
  investmentAppreciationBuying: number;
}

interface YearlyMortgagePayments {
  principalPaid: number;
  interestPaid: number;
  newMortgageBalance: number;
}

interface YearlyPropertyValue {
  propertyValue: number;
  equityInProperty: number;
}

interface PropertyValueParams {
  adjustedPropertyPrice: number;
  propertyAppreciation: number;
  mortgageBalance: number;
  estateAgentFeesPercent: number;
  year: number;
}

interface YearlyComparisonValues {
  sizeOfEquityBuying: number;
  sizeOfEquityIfInvested: number;
  difference: number;
  winner: "buy" | "rent";
}

interface SpreadsheetState {
  mortgageBalance: number;
  cumulativeSavings: number;
  cumulativeSavingsWithAppreciation: number;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Calculates inflation multiplier for a given year
 */
function calculateInflationMultiplier(
  inflationRate: number,
  year: number
): number {
  return Math.pow(1 + inflationRate / 100, year - 1);
}

/**
 * Validates spreadsheet inputs
 */
function validateSpreadsheetInputs(inputs: SpreadsheetInputs): boolean {
  return (
    inputs.propertyPrice > 0 &&
    inputs.initialCapital >= 0 &&
    inputs.interestRate >= 0 &&
    inputs.mortgageLength > 0 &&
    inputs.timeInProperty > 0 &&
    inputs.rentPcm > 0 &&
    inputs.rentInflation >= 0 &&
    inputs.serviceCharge >= 0 &&
    inputs.serviceChargeIncrease >= 0
  );
}

/**
 * Calculates initial mortgage details
 */
function calculateInitialMortgageDetails(
  inputs: SpreadsheetInputs
): InitialMortgageDetails {
  const {
    propertyPrice,
    initialCapital,
    interestRate,
    mortgageLength,
    renovationCost,
    renovationReturn,
    legalConveyancingSurveyCost,
  } = inputs;

  const availableSavings = calculateAvailableDownPayment(
    initialCapital,
    inputs.stampDuty,
    legalConveyancingSurveyCost,
    renovationCost
  );
  const loanAmount = calculateLoanAmount(propertyPrice, availableSavings);

  // Calculate monthly mortgage payment
  const monthlyMortgagePayment = calculateMonthlyMortgagePayment(
    loanAmount,
    interestRate,
    mortgageLength
  );

  // Renovation return increases property value (and this value will appreciate over time)
  const renovationValue = renovationCost * (renovationReturn / 100);
  const adjustedPropertyPrice = propertyPrice + renovationValue;

  const monthlyInterestRate = interestRate / 100 / 12;
  const isBoughtOutright = loanAmount <= 0 || monthlyMortgagePayment === null;

  return {
    loanAmount,
    monthlyMortgagePayment,
    adjustedPropertyPrice,
    monthlyInterestRate,
    isBoughtOutright,
  };
}

/**
 * Calculates rent and service charge for a given year
 */
function calculateYearlyRentAndServiceCharge(
  inputs: SpreadsheetInputs,
  year: number
): YearlyRentAndServiceCharge {
  const { rentPcm, rentInflation, serviceCharge, serviceChargeIncrease } = inputs;

  const rentMultiplier = calculateInflationMultiplier(rentInflation, year);
  const monthlyRent = rentPcm * rentMultiplier;

  const serviceChargeMultiplier = calculateInflationMultiplier(
    serviceChargeIncrease,
    year
  );
  const serviceChargeAnnualForYear = serviceCharge * serviceChargeMultiplier;
  const monthlyServiceCharge = serviceChargeAnnualForYear / 12;

  return {
    monthlyRent,
    monthlyServiceCharge,
  };
}

/**
 * Calculates yearly savings and updates cumulative values
 */
function calculateYearlySavings(params: SavingsParams): YearlySavingsResult {
  const {
    monthlyRent,
    monthlyServiceCharge,
    monthlyMortgagePayment,
    previousCumulativeSavings,
    previousCumulativeSavingsWithAppreciation,
    investmentAppreciationBuying,
  } = params;

  const mortgagePayment = monthlyMortgagePayment ?? 0;
  const monthlySavings = monthlyRent - mortgagePayment - monthlyServiceCharge;

  const cumulativeSavings = previousCumulativeSavings + monthlySavings * 12;

  let cumulativeSavingsWithAppreciation: number;
  if (investmentAppreciationBuying > 0) {
    const monthlyRateBuying = investmentAppreciationBuying / 100 / 12;
    // Previous cumulative savings with appreciation grows for 12 months
    cumulativeSavingsWithAppreciation =
      previousCumulativeSavingsWithAppreciation *
      Math.pow(1 + monthlyRateBuying, 12);

    // Add this year's monthly savings with appreciation
    for (let month = 1; month <= 12; month++) {
      const monthsRemaining = 12 - month + 1;
      cumulativeSavingsWithAppreciation +=
        monthlySavings * Math.pow(1 + monthlyRateBuying, monthsRemaining);
    }
  } else {
    cumulativeSavingsWithAppreciation = cumulativeSavings;
  }

  return {
    monthlySavings,
    cumulativeSavings,
    cumulativeSavingsWithAppreciation,
  };
}

/**
 * Calculates yearly mortgage payments (principal and interest)
 */
function calculateYearlyMortgagePayments(
  mortgageBalance: number,
  monthlyMortgagePayment: number | null,
  monthlyInterestRate: number,
  isBoughtOutright: boolean
): YearlyMortgagePayments {
  let principalPaid = 0;
  let interestPaid = 0;
  let newMortgageBalance = mortgageBalance;

  if (!isBoughtOutright && monthlyMortgagePayment !== null) {
    let currentBalance = mortgageBalance;

    for (let month = 1; month <= 12; month++) {
      if (currentBalance <= 0) break;

      const interestPayment = currentBalance * monthlyInterestRate;
      const principalPayment = monthlyMortgagePayment - interestPayment;

      currentBalance = Math.max(0, currentBalance - principalPayment);
      principalPaid += principalPayment;
      interestPaid += interestPayment;
    }

    newMortgageBalance = currentBalance;
  }

  return {
    principalPaid,
    interestPaid,
    newMortgageBalance,
  };
}

/**
 * Calculates property value and equity for a given year
 */
function calculateYearlyPropertyValue(
  params: PropertyValueParams
): YearlyPropertyValue {
  const {
    adjustedPropertyPrice,
    propertyAppreciation,
    mortgageBalance,
    estateAgentFeesPercent,
    year,
  } = params;

  const propertyValue =
    adjustedPropertyPrice * Math.pow(1 + propertyAppreciation / 100, year);
  const estateAgentFees = propertyValue * (estateAgentFeesPercent / 100);
  
  const equityInProperty =
    propertyValue -
    mortgageBalance -
    estateAgentFees;

  return {
    propertyValue,
    equityInProperty,
  };
}

/**
 * Calculates investment value for renting scenario
 */
function calculateYearlyInvestmentValue(
  initialCapital: number,
  investmentAppreciationRenting: number,
  year: number
): number {
  return initialCapital * Math.pow(1 + investmentAppreciationRenting / 100, year);
}

/**
 * Calculates comparison values between buying and renting
 */
function calculateYearlyComparison(
  equityInProperty: number,
  cumulativeSavingsWithAppreciation: number,
  investmentValue: number
): YearlyComparisonValues {
  const sizeOfEquityBuying = equityInProperty + cumulativeSavingsWithAppreciation;
  const sizeOfEquityIfInvested = investmentValue;
  const difference = sizeOfEquityBuying - sizeOfEquityIfInvested;
  const winner: "buy" | "rent" = difference >= 0 ? "buy" : "rent";

  return {
    sizeOfEquityBuying,
    sizeOfEquityIfInvested,
    difference,
    winner,
  };
}

/**
 * Builds a single yearly row
 */
function buildYearlyRow(
  year: number,
  monthlyMortgagePayment: number | null,
  mortgageBalance: number,
  principalPaid: number,
  interestPaid: number,
  monthlyRent: number,
  monthlyServiceCharge: number,
  monthlySavings: number,
  cumulativeSavings: number,
  cumulativeSavingsWithAppreciation: number,
  propertyValue: number,
  equityInProperty: number,
  investmentValue: number,
  investmentAppreciation: number,
  comparison: YearlyComparisonValues
): YearlyRow {
  return {
    year,
    monthlyMortgagePayment,
    mortgageBalance,
    principalPaid,
    interestPaid,
    monthlyRent,
    monthlyServiceCharge,
    monthlySavings,
    cumulativeSavings,
    cumulativeSavingsWithAppreciation,
    propertyValue,
    equityInProperty,
    investmentValue,
    investmentAppreciation,
    sizeOfEquityBuying: comparison.sizeOfEquityBuying,
    sizeOfEquityIfInvested: comparison.sizeOfEquityIfInvested,
    difference: comparison.difference,
    winner: comparison.winner,
  };
}

// ============================================================================
// Main Spreadsheet Builder
// ============================================================================

/**
 * Builds the complete spreadsheet in a single pass
 * This consolidates all calculations to eliminate duplication
 */
export function buildSpreadsheet(inputs: SpreadsheetInputs): YearlyRow[] {
  // Validation
  if (!validateSpreadsheetInputs(inputs)) {
    return [];
  }

  // Calculate initial mortgage details
  const mortgageDetails = calculateInitialMortgageDetails(inputs);
  const {
    loanAmount,
    monthlyMortgagePayment,
    adjustedPropertyPrice,
    monthlyInterestRate,
    isBoughtOutright,
  } = mortgageDetails;

  // Initialize state
  const state: SpreadsheetState = {
    mortgageBalance: loanAmount,
    cumulativeSavings: 0,
    cumulativeSavingsWithAppreciation: 0,
  };

  const rows: YearlyRow[] = [];
  let previousInvestmentValue = inputs.initialCapital;

  for (let year = 1; year <= inputs.timeInProperty; year++) {
    // Calculate rent and service charge
    const { monthlyRent, monthlyServiceCharge } =
      calculateYearlyRentAndServiceCharge(inputs, year);

    // Calculate savings
    const savingsResult = calculateYearlySavings({
      monthlyRent,
      monthlyServiceCharge,
      monthlyMortgagePayment,
      previousCumulativeSavings: state.cumulativeSavings,
      previousCumulativeSavingsWithAppreciation:
        state.cumulativeSavingsWithAppreciation,
      investmentAppreciationBuying: inputs.investmentAppreciationBuying,
    });
    state.cumulativeSavings = savingsResult.cumulativeSavings;
    state.cumulativeSavingsWithAppreciation =
      savingsResult.cumulativeSavingsWithAppreciation;

    // Calculate mortgage payments
    const mortgagePayments = calculateYearlyMortgagePayments(
      state.mortgageBalance,
      monthlyMortgagePayment,
      monthlyInterestRate,
      isBoughtOutright
    );
    state.mortgageBalance = mortgagePayments.newMortgageBalance;

    // Calculate property value and equity
    const propertyValue = calculateYearlyPropertyValue({
      adjustedPropertyPrice,
      propertyAppreciation: inputs.propertyAppreciation,
      mortgageBalance: state.mortgageBalance,
      estateAgentFeesPercent: inputs.estateAgentFeesPercent,
      year,
    });

    // Calculate investment value
    const investmentValue = calculateYearlyInvestmentValue(
      inputs.initialCapital,
      inputs.investmentAppreciationRenting,
      year
    );

    const investmentAppreciation = investmentValue - previousInvestmentValue;
    
    previousInvestmentValue = investmentValue;

    const comparison = calculateYearlyComparison(
      propertyValue.equityInProperty,
      state.cumulativeSavingsWithAppreciation,
      investmentValue
    );

    const row = buildYearlyRow(
      year,
      monthlyMortgagePayment,
      state.mortgageBalance,
      mortgagePayments.principalPaid,
      mortgagePayments.interestPaid,
      monthlyRent,
      monthlyServiceCharge,
      savingsResult.monthlySavings,
      state.cumulativeSavings,
      state.cumulativeSavingsWithAppreciation,
      propertyValue.propertyValue,
      propertyValue.equityInProperty,
      investmentValue,
      investmentAppreciation,
      comparison
    );

    rows.push(row);
  }

  return rows;
}
