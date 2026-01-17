"use client";

import { useMemo } from "react";
import { calculatorService } from "@/services/calculatorService";
import SectionCard from "@/components/ui/SectionCard";
import SavingsInvestmentCard from "@/components/presentational/SavingsInvestmentCard";
import SavingsInvestmentTable from "@/components/presentational/SavingsInvestmentTable";
import SavingsInvestmentChart from "@/components/presentational/SavingsInvestmentChart";
import type { YearlyRow } from "@/lib/calculations";

interface SavingsInvestmentContainerProps {
  yearlyRows: YearlyRow[];
  viewMode: "table" | "graph";
}

export default function SavingsInvestmentContainer({
  yearlyRows,
  viewMode,
}: SavingsInvestmentContainerProps) {
  const performanceData = useMemo(() => {
    if (yearlyRows.length === 0) {
      return null;
    }
    return calculatorService.spreadsheetToSavingsInvestmentPerformance(yearlyRows);
  }, [yearlyRows]);

  if (!performanceData) {
    return null;
  }

  return (
    <SectionCard title="Savings Total Investment Performance">
      <SavingsInvestmentCard performanceData={performanceData} />
      {performanceData.yearlyBreakdown.length > 0 && (
        <>
          {viewMode === "table" ? (
            <SavingsInvestmentTable performanceData={performanceData} />
          ) : (
            <SavingsInvestmentChart performanceData={performanceData} />
          )}
        </>
      )}
    </SectionCard>
  );
}
