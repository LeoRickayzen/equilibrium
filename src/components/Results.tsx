"use client";

import { useState, useMemo } from "react";
import { calculatorService } from "@/services/calculatorService";
import ViewModeToggle from "@/components/ui/ViewModeToggle";
import ComparisonContainer from "@/components/containers/ComparisonContainer";
import MonthlySavingsContainer from "@/components/containers/MonthlySavingsContainer";
import EquityContainer from "@/components/containers/EquityContainer";
import SavingsInvestmentContainer from "@/components/containers/SavingsInvestmentContainer";
import { CalculatorResults, ParsedCalculatorInputs } from "@/types/calculator";
import type { YearlyRow } from "@/lib/calculations";

interface ResultsProps {
  calculationResults: CalculatorResults;
  parsedInputs: ParsedCalculatorInputs;
}

export default function Results({
  calculationResults,
  parsedInputs,
}: ResultsProps) {
  const [viewMode, setViewMode] = useState<"table" | "graph">("table");

  const {
    monthlyMortgagePayment,
    monthlySavingsData,
    equityData,
    stampDuty,
  } = calculationResults;

  // Get savings with appreciation and investment performance from the spreadsheet
  const yearlyRows = (calculationResults.yearlyRows || []) as YearlyRow[];
  
  const savingsWithAppreciation = useMemo(() => {
    if (yearlyRows.length === 0) return null;
    return calculatorService.spreadsheetToSavingsWithAppreciation(yearlyRows);
  }, [yearlyRows]);

  const savingsInvestmentPerformance = useMemo(() => {
    if (yearlyRows.length === 0) return null;
    return calculatorService.spreadsheetToSavingsInvestmentPerformance(yearlyRows);
  }, [yearlyRows]);

  return (
    <div className="w-full md:w-3/4 overflow-y-auto bg-white dark:bg-zinc-900">
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
            Results
          </h2>
          <ViewModeToggle
            viewMode={viewMode}
            onToggle={() => setViewMode(viewMode === "table" ? "graph" : "table")}
          />
        </div>

        <div className="space-y-6">
          <ComparisonContainer
            yearlyRows={yearlyRows}
            stampDuty={stampDuty}
            viewMode={viewMode}
          />

          <MonthlySavingsContainer
            yearlyRows={yearlyRows}
            monthlyMortgagePayment={monthlyMortgagePayment}
            monthlySavingsData={monthlySavingsData}
            viewMode={viewMode}
          />

          <EquityContainer equityData={equityData} viewMode={viewMode} />

          <SavingsInvestmentContainer
            yearlyRows={yearlyRows}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
}
