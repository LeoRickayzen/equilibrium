export function calculateAvailableDownPayment(
  initialCapital: number,
  stampDuty: number,
  legalConveyancingSurveyCost: number,
  renovationCost: number
): number {
  return Math.max(
    0,
    initialCapital - stampDuty - legalConveyancingSurveyCost - renovationCost
  );
}

export function calculateLoanAmount(
  propertyPrice: number,
  availableDownPayment: number
): number {
  return Math.max(0, propertyPrice - availableDownPayment);
}

export function calculateMonthlyMortgagePayment(
  principal: number,
  annualInterestRate: number,
  years: number
): number | null {
  if (principal <= 0 || annualInterestRate < 0 || years <= 0) {
    return null;
  }

  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (monthlyInterestRate === 0) {
    return principal / numberOfPayments;
  }

  const monthlyPayment =
    (principal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment;
}
