import { describe, it, expect } from "vitest";
import { calculateMonthlyMortgagePayment } from "./calculations";

describe("calculateMonthlyMortgagePayment", () => {
  it("should calculate correct monthly payment for standard mortgage", () => {
    // Example: £200,000 loan, 5% interest, 30 years
    const result = calculateMonthlyMortgagePayment(200000, 5, 30);
    expect(result).toBeCloseTo(1073.64, 2);
  });

  it("should calculate correct monthly payment for 15-year mortgage", () => {
    // Example: £200,000 loan, 5% interest, 15 years
    const result = calculateMonthlyMortgagePayment(200000, 5, 15);
    expect(result).toBeCloseTo(1581.59, 2);
  });

  it("should calculate correct monthly payment for high interest rate", () => {
    // Example: £100,000 loan, 8% interest, 25 years
    const result = calculateMonthlyMortgagePayment(100000, 8, 25);
    expect(result).toBeCloseTo(771.82, 2);
  });

  it("should calculate correct monthly payment for low interest rate", () => {
    // Example: £300,000 loan, 2.5% interest, 20 years
    const result = calculateMonthlyMortgagePayment(300000, 2.5, 20);
    expect(result).toBeCloseTo(1589.71, 2);
  });

  it("should handle zero interest rate", () => {
    // Example: £100,000 loan, 0% interest, 10 years
    const result = calculateMonthlyMortgagePayment(100000, 0, 10);
    expect(result).toBe(100000 / (10 * 12)); // £833.33
  });

  it("should return null for zero principal", () => {
    const result = calculateMonthlyMortgagePayment(0, 5, 30);
    expect(result).toBeNull();
  });

  it("should return null for negative principal", () => {
    const result = calculateMonthlyMortgagePayment(-100000, 5, 30);
    expect(result).toBeNull();
  });

  it("should return null for negative interest rate", () => {
    const result = calculateMonthlyMortgagePayment(200000, -1, 30);
    expect(result).toBeNull();
  });

  it("should return null for zero years", () => {
    const result = calculateMonthlyMortgagePayment(200000, 5, 0);
    expect(result).toBeNull();
  });

  it("should return null for negative years", () => {
    const result = calculateMonthlyMortgagePayment(200000, 5, -10);
    expect(result).toBeNull();
  });

  it("should handle small loan amounts", () => {
    // Example: £10,000 loan, 3% interest, 5 years
    const result = calculateMonthlyMortgagePayment(10000, 3, 5);
    expect(result).toBeCloseTo(179.69, 2);
  });

  it("should handle large loan amounts", () => {
    // Example: £1,000,000 loan, 4% interest, 30 years
    const result = calculateMonthlyMortgagePayment(1000000, 4, 30);
    expect(result).toBeCloseTo(4774.15, 2);
  });

  it("should handle decimal interest rates", () => {
    // Example: £150,000 loan, 4.75% interest, 25 years
    const result = calculateMonthlyMortgagePayment(150000, 4.75, 25);
    expect(result).toBeCloseTo(855.18, 2);
  });

  it("should handle short mortgage terms", () => {
    // Example: £200,000 loan, 5% interest, 5 years
    const result = calculateMonthlyMortgagePayment(200000, 5, 5);
    expect(result).toBeCloseTo(3774.25, 2);
  });

  it("should handle very long mortgage terms", () => {
    // Example: £200,000 loan, 5% interest, 40 years
    const result = calculateMonthlyMortgagePayment(200000, 5, 40);
    expect(result).toBeCloseTo(964.39, 2);
  });
});

