"use client";

import SectionCard from "@/components/ui/SectionCard";
import EquityMetrics from "./EquityMetrics";
import EquityTable from "./EquityTable";
import EquityChart from "./EquityChart";
import type { CalculationResults } from "@/types/calculator";

interface EquitySectionProps {
  data: CalculationResults;
  viewMode: "table" | "graph";
}

export default function EquitySection({
  data,
  viewMode,
}: EquitySectionProps) {
  return (
    <SectionCard title="Equity Gained">
      {data.rows.length === 0 ? (
        <p className="text-lg text-zinc-500 dark:text-zinc-500">
          Enter values to calculate
        </p>
      ) : (
        <>
          <EquityMetrics data={data} />
          {viewMode === "table" ? (
            <EquityTable rows={data.rows} />
          ) : (
            <EquityChart rows={data.rows} />
          )}
        </>
      )}
    </SectionCard>
  );
}
