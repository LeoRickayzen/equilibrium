"use client";

import SectionCard from "@/components/ui/SectionCard";
import SavingsInvestmentCard from "@/components/presentational/SavingsInvestmentCard";
import SavingsInvestmentTable from "@/components/presentational/SavingsInvestmentTable";
import SavingsInvestmentChart from "@/components/presentational/SavingsInvestmentChart";
import type { CalculationResults } from "@/types/calculator";

interface SavingsInvestmentContainerProps {
  data: CalculationResults;
  viewMode: "table" | "graph";
}

export default function SavingsInvestmentContainer({
  data,
  viewMode,
}: SavingsInvestmentContainerProps) {
  if (data.rows.length === 0) {
    return null;
  }

  return (
    <SectionCard title="Savings Total Investment Performance">
      <SavingsInvestmentCard data={data} />
      {data.rows.length > 0 && (
        <>
          {viewMode === "table" ? (
            <SavingsInvestmentTable rows={data.rows} totals={data.totals} />
          ) : (
            <SavingsInvestmentChart rows={data.rows} totals={data.totals} />
          )}
        </>
      )}
    </SectionCard>
  );
}
