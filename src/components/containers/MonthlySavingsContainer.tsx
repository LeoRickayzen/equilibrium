"use client";

import SectionCard from "@/components/ui/SectionCard";
import MonthlySavingsCard from "@/components/presentational/MonthlySavingsCard";
import MonthlySavingsTable from "@/components/presentational/MonthlySavingsTable";
import MonthlySavingsChart from "@/components/presentational/MonthlySavingsChart";
import type { CalculationResults } from "@/types/calculator";

interface MonthlySavingsContainerProps {
  data: CalculationResults;
  viewMode: "table" | "graph";
}

export default function MonthlySavingsContainer({
  data,
  viewMode,
}: MonthlySavingsContainerProps) {
  return (
    <SectionCard title="Average Monthly Savings from Buying">
      <MonthlySavingsCard data={data} />
      {data.rows.length > 0 && (
        <>
          {viewMode === "table" ? (
            <MonthlySavingsTable rows={data.rows} averages={data.averages} />
          ) : (
            <MonthlySavingsChart rows={data.rows} averages={data.averages} />
          )}
        </>
      )}
    </SectionCard>
  );
}
