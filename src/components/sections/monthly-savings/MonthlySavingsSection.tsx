"use client";

import SectionCard from "@/components/ui/SectionCard";
import MonthlySavingsMetrics from "./MonthlySavingsMetrics";
import MonthlySavingsTable from "./MonthlySavingsTable";
import MonthlySavingsChart from "./MonthlySavingsChart";
import type { CalculationResults } from "@/types/calculator";

interface MonthlySavingsSectionProps {
  data: CalculationResults;
  viewMode: "table" | "graph";
}

export default function MonthlySavingsSection({
  data,
  viewMode,
}: MonthlySavingsSectionProps) {
  return (
    <SectionCard title="Average Monthly Savings from Buying">
      {data.rows.length === 0 ? (
        <p className="text-lg text-zinc-500 dark:text-zinc-500">
          Enter values to calculate
        </p>
      ) : (
        <>
          <MonthlySavingsMetrics data={data} />
          {viewMode === "table" ? (
            <MonthlySavingsTable rows={data.rows} />
          ) : (
            <MonthlySavingsChart rows={data.rows} />
          )}
        </>
      )}
    </SectionCard>
  );
}
