"use client";

import SectionCard from "@/components/ui/SectionCard";
import SavingsInvestmentMetrics from "./SavingsInvestmentMetrics";
import SavingsInvestmentTable from "./SavingsInvestmentTable";
import SavingsInvestmentChart from "./SavingsInvestmentChart";
import type { CalculationResults } from "@/types/calculator";

interface SavingsInvestmentSectionProps {
  data: CalculationResults;
  viewMode: "table" | "graph";
}

export default function SavingsInvestmentSection({
  data,
  viewMode,
}: SavingsInvestmentSectionProps) {
  if (data.rows.length === 0) {
    return null;
  }

  return (
    <SectionCard title="Savings Total Investment Performance">
      <SavingsInvestmentMetrics data={data} />
      {viewMode === "table" ? (
        <SavingsInvestmentTable rows={data.rows} />
      ) : (
        <SavingsInvestmentChart rows={data.rows} />
      )}
    </SectionCard>
  );
}
