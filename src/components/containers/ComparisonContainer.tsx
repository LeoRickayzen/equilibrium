"use client";

import { useMemo } from "react";
import { calculatorService } from "@/services/calculatorService";
import SectionCard from "@/components/ui/SectionCard";
import ComparisonCard from "@/components/presentational/ComparisonCard";
import ComparisonTable from "@/components/presentational/ComparisonTable";
import ComparisonChart from "@/components/presentational/ComparisonChart";
import type { YearlyRow } from "@/lib/calculations";

interface ComparisonContainerProps {
  yearlyRows: YearlyRow[];
  stampDuty: number;
  viewMode: "table" | "graph";
}

export default function ComparisonContainer({
  yearlyRows,
  stampDuty,
  viewMode,
}: ComparisonContainerProps) {
  const comparisonData = useMemo(() => {
    if (yearlyRows.length === 0) return null;
    return calculatorService.spreadsheetToComparisonData(yearlyRows);
  }, [yearlyRows]);

  if (!comparisonData) {
    return null;
  }

  return (
    <SectionCard title="Comparison: Rent vs Buy">
      <ComparisonCard comparisonData={comparisonData} stampDuty={stampDuty} />
      {comparisonData.yearlyBreakdown.length > 0 && (
        <>
          {viewMode === "table" ? (
            <ComparisonTable comparisonData={comparisonData} />
          ) : (
            <ComparisonChart comparisonData={comparisonData} />
          )}
        </>
      )}
    </SectionCard>
  );
}
