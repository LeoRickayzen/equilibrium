import { describe, it, expect } from "vitest";
import {
  yearlyRowsToMonthlySavingsData,
  yearlyRowsToEquityData,
  yearlyRowsToSavingsWithAppreciation,
  yearlyRowsToSavingsInvestmentPerformance,
  yearlyRowsToComparisonData,
} from "./adapters";
import { createMockYearlyRow } from "./__fixtures__";

describe("Adapter Functions", () => {
  describe("yearlyRowsToMonthlySavingsData", () => {
    it("should return null for empty array", () => {
      const result = yearlyRowsToMonthlySavingsData([]);
      expect(result).toBeNull();
    });

    it("should calculate averages correctly", () => {
      const testCases = [
        {
          rows: [
            createMockYearlyRow({
              year: 1,
              monthlySavings: 100,
              monthlyServiceCharge: 150,
            }),
          ],
          expectedAvgSavings: 100,
          expectedAvgServiceCharge: 150,
          description: "Single year",
        },
        {
          rows: [
            createMockYearlyRow({
              year: 1,
              monthlySavings: 100,
              monthlyServiceCharge: 150,
            }),
            createMockYearlyRow({
              year: 2,
              monthlySavings: 200,
              monthlyServiceCharge: 200,
            }),
            createMockYearlyRow({
              year: 3,
              monthlySavings: 300,
              monthlyServiceCharge: 250,
            }),
          ],
          expectedAvgSavings: 200,
          expectedAvgServiceCharge: 200,
          description: "Multiple years: average of all years",
        },
      ];

      testCases.forEach(({ rows, expectedAvgSavings, expectedAvgServiceCharge, description }) => {
        const result = yearlyRowsToMonthlySavingsData(rows);
        expect(result, description).not.toBeNull();
        expect(result?.averageMonthlySavings, description).toBe(expectedAvgSavings);
        expect(result?.averageMonthlyServiceCharge, description).toBe(expectedAvgServiceCharge);
        expect(result?.yearlyBreakdown, description).toHaveLength(rows.length);
      });
    });

    it("should map yearly breakdown correctly", () => {
      const rows = [
        createMockYearlyRow({
          year: 1,
          monthlySavings: 100,
          monthlyRent: 800,
          monthlyServiceCharge: 150,
        }),
      ];
      const result = yearlyRowsToMonthlySavingsData(rows);
      expect(result?.yearlyBreakdown[0]).toEqual({
        year: 1,
        monthlySavings: 100,
        rent: 800,
        serviceChargePaid: 150 * 12,
      });
    });
  });

  describe("yearlyRowsToEquityData", () => {
    it("should return null for empty array", () => {
      const result = yearlyRowsToEquityData([]);
      expect(result).toBeNull();
    });

    it("should calculate totals correctly", () => {
      const rows = [
        createMockYearlyRow({
          year: 1,
          principalPaid: 5000,
          interestPaid: 7000,
        }),
        createMockYearlyRow({
          year: 2,
          principalPaid: 6000,
          interestPaid: 6500,
        }),
      ];
      const result = yearlyRowsToEquityData(rows);
      expect(result?.totalEquityGained).toBe(11000);
      expect(result?.totalInterestPaid).toBe(13500);
      expect(result?.yearlyBreakdown).toHaveLength(2);
    });

    it("should map yearly breakdown correctly", () => {
      const rows = [
        createMockYearlyRow({
          year: 1,
          principalPaid: 5000,
          interestPaid: 7000,
          mortgageBalance: 150000,
          propertyValue: 204000,
        }),
      ];
      const result = yearlyRowsToEquityData(rows);
      expect(result?.yearlyBreakdown[0]).toEqual({
        year: 1,
        equityGained: 5000,
        interestPaid: 7000,
        remainingBalance: 150000,
        propertySoldPrice: 204000,
      });
    });
  });

  describe("yearlyRowsToSavingsWithAppreciation", () => {
    it("should return empty array for empty input", () => {
      const result = yearlyRowsToSavingsWithAppreciation([]);
      expect(result).toEqual([]);
    });

    it("should map savings correctly", () => {
      const rows = [
        createMockYearlyRow({
          year: 1,
          cumulativeSavings: 1000,
          cumulativeSavingsWithAppreciation: 1050,
        }),
        createMockYearlyRow({
          year: 2,
          cumulativeSavings: 2000,
          cumulativeSavingsWithAppreciation: 2100,
        }),
      ];
      const result = yearlyRowsToSavingsWithAppreciation(rows);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        year: 1,
        totalSaved: 1000,
        totalSavedWithAppreciation: 1050,
      });
      expect(result[1]).toEqual({
        year: 2,
        totalSaved: 2000,
        totalSavedWithAppreciation: 2100,
      });
    });
  });

  describe("yearlyRowsToSavingsInvestmentPerformance", () => {
    it("should return null for empty array", () => {
      const result = yearlyRowsToSavingsInvestmentPerformance([]);
      expect(result).toBeNull();
    });

    it("should calculate appreciation correctly", () => {
      const testCases = [
        {
          rows: [
            createMockYearlyRow({
              year: 1,
              investmentValue: 40000,
            }),
            createMockYearlyRow({
              year: 2,
              investmentValue: 42000,
            }),
            createMockYearlyRow({
              year: 3,
              investmentValue: 44100,
            }),
          ],
          expectedTotalValue: 44100,
          expectedYear2Appreciation: 2000,
          expectedYear3Appreciation: 2100,
          description: "Multiple years with 5% annual appreciation",
        },
      ];

      testCases.forEach(({ rows, expectedTotalValue, expectedYear2Appreciation, expectedYear3Appreciation, description }) => {
        const result = yearlyRowsToSavingsInvestmentPerformance(rows);
        expect(result, description).not.toBeNull();
        expect(result?.totalValue, description).toBe(expectedTotalValue);
        expect(result?.yearlyBreakdown, description).toHaveLength(3);
        expect(result?.yearlyBreakdown[1].appreciation, description).toBe(expectedYear2Appreciation);
        expect(result?.yearlyBreakdown[2].appreciation, description).toBe(expectedYear3Appreciation);
      });
    });
  });

  describe("yearlyRowsToComparisonData", () => {
    it("should return null for empty array", () => {
      const result = yearlyRowsToComparisonData([]);
      expect(result).toBeNull();
    });

    it("should map comparison data correctly", () => {
      const rows = [
        createMockYearlyRow({
          year: 1,
          sizeOfEquityBuying: 50000,
          sizeOfEquityIfInvested: 40000,
          difference: 10000,
          winner: "buy",
        }),
        createMockYearlyRow({
          year: 2,
          sizeOfEquityBuying: 55000,
          sizeOfEquityIfInvested: 45000,
          difference: 10000,
          winner: "buy",
        }),
      ];
      const result = yearlyRowsToComparisonData(rows);
      expect(result).not.toBeNull();
      expect(result?.totalDifference).toBe(10000);
      expect(result?.winner).toBe("buy");
      expect(result?.yearlyBreakdown).toHaveLength(2);
      expect(result?.yearlyBreakdown[0]).toEqual({
        year: 1,
        sizeOfEquityBuying: 50000,
        sizeOfEquityIfInvested: 40000,
        difference: 10000,
        winner: "buy",
      });
    });

    it("should use final row for total difference and winner", () => {
      const rows = [
        createMockYearlyRow({
          year: 1,
          difference: 5000,
          winner: "buy",
        }),
        createMockYearlyRow({
          year: 2,
          difference: -2000,
          winner: "rent",
        }),
      ];
      const result = yearlyRowsToComparisonData(rows);
      expect(result?.totalDifference).toBe(-2000);
      expect(result?.winner).toBe("rent");
    });
  });
});
