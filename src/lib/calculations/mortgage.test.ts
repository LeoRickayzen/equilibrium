import { describe, it, expect } from "vitest";
import { calculateMonthlyMortgagePayment } from "./mortgage";

describe("calculateMonthlyMortgagePayment", () => {
  const testCases = [
    {
      principal: 200000,
      interestRate: 5,
      years: 30,
      expected: 1073.64,
      description: "Standard mortgage: £200k, 5%, 30 years",
    },
    {
      principal: 200000,
      interestRate: 5,
      years: 15,
      expected: 1581.59,
      description: "15-year mortgage: £200k, 5%, 15 years",
    },
    {
      principal: 100000,
      interestRate: 8,
      years: 25,
      expected: 771.82,
      description: "High interest rate: £100k, 8%, 25 years",
    },
    {
      principal: 300000,
      interestRate: 2.5,
      years: 20,
      expected: 1589.71,
      description: "Low interest rate: £300k, 2.5%, 20 years",
    },
    {
      principal: 100000,
      interestRate: 0,
      years: 10,
      expected: 833.33,
      description: "Zero interest rate: simple division",
    },
    {
      principal: 10000,
      interestRate: 3,
      years: 5,
      expected: 179.69,
      description: "Small loan amount: £10k, 3%, 5 years",
    },
    {
      principal: 1000000,
      interestRate: 4,
      years: 30,
      expected: 4774.15,
      description: "Large loan amount: £1M, 4%, 30 years",
    },
    {
      principal: 150000,
      interestRate: 4.75,
      years: 25,
      expected: 855.18,
      description: "Decimal interest rate: £150k, 4.75%, 25 years",
    },
    {
      principal: 200000,
      interestRate: 5,
      years: 5,
      expected: 3774.25,
      description: "Short mortgage term: £200k, 5%, 5 years",
    },
    {
      principal: 200000,
      interestRate: 5,
      years: 40,
      expected: 964.39,
      description: "Very long mortgage term: £200k, 5%, 40 years",
    },
  ];

  it("should calculate correct monthly payment", () => {
    testCases.forEach(({ principal, interestRate, years, expected, description }) => {
      const result = calculateMonthlyMortgagePayment(principal, interestRate, years);
      expect(result, description).toBeCloseTo(expected, 2);
    });
  });

  const invalidTestCases = [
    {
      principal: 0,
      interestRate: 5,
      years: 30,
      description: "Zero principal",
    },
    {
      principal: -100000,
      interestRate: 5,
      years: 30,
      description: "Negative principal",
    },
    {
      principal: 200000,
      interestRate: -1,
      years: 30,
      description: "Negative interest rate",
    },
    {
      principal: 200000,
      interestRate: 5,
      years: 0,
      description: "Zero years",
    },
    {
      principal: 200000,
      interestRate: 5,
      years: -10,
      description: "Negative years",
    },
  ];

  it("should return null for invalid inputs", () => {
    invalidTestCases.forEach(({ principal, interestRate, years, description }) => {
      const result = calculateMonthlyMortgagePayment(principal, interestRate, years);
      expect(result, description).toBeNull();
    });
  });
});
