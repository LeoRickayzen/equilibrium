import { describe, it, expect } from "vitest";
import { calculateStampDuty } from "./stampDuty";

describe("calculateStampDuty", () => {
  describe("standard property", () => {
    const testCases = [
      {
        propertyPrice: 100000,
        expected: 0,
        description: "Below first band threshold (£125k)",
      },
      {
        propertyPrice: 200000,
        expected: (200000 - 125000) * 0.02,
        description: "Second band: (price - £125k) * 2%",
      },
      {
        propertyPrice: 500000,
        expected: (500000 - 250000) * 0.05 + (250000 - 125000) * 0.02,
        description: "Third band: progressive calculation",
      },
      {
        propertyPrice: 1000000,
        expected:
          (1000000 - 925000) * 0.1 +
          (925000 - 250000) * 0.05 +
          (250000 - 125000) * 0.02,
        description: "Fourth band: progressive calculation",
      },
      {
        propertyPrice: 2000000,
        expected:
          (2000000 - 1500000) * 0.12 +
          (1500000 - 925000) * 0.1 +
          (925000 - 250000) * 0.05 +
          (250000 - 125000) * 0.02,
        description: "Above fourth band: progressive calculation",
      },
    ];

    it("should calculate correct stamp duty", () => {
      testCases.forEach(({ propertyPrice, expected, description }) => {
        const result = calculateStampDuty(propertyPrice);
        expect(result, description).toBe(expected);
      });
    });
  });

  describe("first-time buyer", () => {
    const testCases = [
      {
        propertyPrice: 250000,
        isFirstTimeBuyer: true,
        expected: 0,
        description: "Below relief threshold (£300k)",
      },
      {
        propertyPrice: 400000,
        isFirstTimeBuyer: true,
        expected: (400000 - 300000) * 0.05,
        description: "Above relief but below max (£500k): (price - £300k) * 5%",
      },
      {
        propertyPrice: 600000,
        isFirstTimeBuyer: true,
        expected:
          (600000 - 250000) * 0.05 + (250000 - 125000) * 0.02,
        description: "Above first-time buyer max: uses standard rates",
      },
    ];

    it("should calculate correct stamp duty", () => {
      testCases.forEach(
        ({ propertyPrice, isFirstTimeBuyer, expected, description }) => {
          const result = calculateStampDuty(propertyPrice, isFirstTimeBuyer);
          expect(result, description).toBe(expected);
        }
      );
    });
  });

  describe("additional property", () => {
    const testCases = [
      {
        propertyPrice: 100000,
        isAdditionalProperty: true,
        expected: 100000 * 0.03,
        description: "Below first band: 3% surcharge",
      },
      {
        propertyPrice: 200000,
        isAdditionalProperty: true,
        expected: (200000 - 125000) * 0.05 + 125000 * 0.03,
        description: "Second band: progressive with surcharge",
      },
      {
        propertyPrice: 500000,
        isAdditionalProperty: true,
        expected:
          (500000 - 250000) * 0.08 +
          (250000 - 125000) * 0.05 +
          125000 * 0.03,
        description: "Third band: progressive with surcharge",
      },
    ];

    it("should calculate correct stamp duty", () => {
      testCases.forEach(
        ({ propertyPrice, isAdditionalProperty, expected, description }) => {
          const result = calculateStampDuty(
            propertyPrice,
            false,
            isAdditionalProperty
          );
          expect(result, description).toBe(expected);
        }
      );
    });
  });

  describe("edge cases", () => {
    const testCases = [
      {
        propertyPrice: 0,
        expected: 0,
        description: "Zero property price",
      },
      {
        propertyPrice: -100000,
        expected: 0,
        description: "Negative property price",
      },
      {
        propertyPrice: 125000,
        expected: 0,
        description: "Exactly at first band threshold",
      },
      {
        propertyPrice: 124999,
        expected: 0,
        description: "Just below first band threshold",
      },
      {
        propertyPrice: 125001,
        expected: (125001 - 125000) * 0.02,
        description: "Just above first band threshold",
      },
    ];

    it("should handle edge cases correctly", () => {
      testCases.forEach(({ propertyPrice, expected, description }) => {
        const result = calculateStampDuty(propertyPrice);
        expect(result, description).toBe(expected);
      });
    });
  });
});
