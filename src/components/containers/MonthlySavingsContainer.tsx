"use client";

import { useMemo } from "react";
import { calculatorService } from "@/services/calculatorService";
import SectionCard from "@/components/ui/SectionCard";
import MonthlySavingsCard from "@/components/presentational/MonthlySavingsCard";
import MonthlySavingsTable from "@/components/presentational/MonthlySavingsTable";
import MonthlySavingsChart from "@/components/presentational/MonthlySavingsChart";
import type { YearlyRow } from "@/lib/calculations";
import type { MonthlySavingsData } from "@/types/calculator";

interface MonthlySavingsContainerProps {
  yearlyRows: YearlyRow[];
  monthlyMortgagePayment: number | null;
  monthlySavingsData: MonthlySavingsData | null;
  viewMode: "table" | "graph";
}

export default function MonthlySavingsContainer({
  yearlyRows,
  monthlyMortgagePayment,
  monthlySavingsData,
  viewMode,
}: MonthlySavingsContainerProps) {
  const savingsWithAppreciation = useMemo(() => {
    if (yearlyRows.length === 0) return null;
    return calculatorService.spreadsheetToSavingsWithAppreciation(yearlyRows);
  }, [yearlyRows]);

  const totalSavedWithAppreciation = useMemo(() => {
    if (yearlyRows.length === 0) return null;
    const lastRow = yearlyRows[yearlyRows.length - 1];
    return lastRow.cumulativeSavingsWithAppreciation;
  }, [yearlyRows]);

  return (
    <SectionCard title="Average Monthly Savings from Buying">
      <MonthlySavingsCard
        monthlyMortgagePayment={monthlyMortgagePayment}
        monthlySavingsData={monthlySavingsData}
        totalSavedWithAppreciation={totalSavedWithAppreciation}
      />
      {monthlySavingsData?.yearlyBreakdown && monthlySavingsData.yearlyBreakdown.length > 0 && (
        <>
          {viewMode === "table" ? (
            <MonthlySavingsTable
              monthlySavingsData={monthlySavingsData}
              savingsWithAppreciation={savingsWithAppreciation}
            />
          ) : (
            <MonthlySavingsChart monthlySavingsData={monthlySavingsData} />
          )}
        </>
      )}
    </SectionCard>
  );
}
