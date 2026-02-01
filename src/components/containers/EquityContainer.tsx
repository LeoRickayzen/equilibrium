"use client";

import SectionCard from "@/components/ui/SectionCard";
import EquityCard from "@/components/presentational/EquityCard";
import EquityTable from "@/components/presentational/EquityTable";
import EquityChart from "@/components/presentational/EquityChart";
import type { CalculationResults } from "@/types/calculator";

interface EquityContainerProps {
  data: CalculationResults;
  viewMode: "table" | "graph";
}

export default function EquityContainer({
  data,
  viewMode,
}: EquityContainerProps) {
  return (
    <SectionCard title="Equity Gained">
      <EquityCard data={data} />
      {data.rows.length > 0 && (
        <>
          {viewMode === "table" ? (
            <EquityTable rows={data.rows} totals={data.totals} />
          ) : (
            <EquityChart rows={data.rows} totals={data.totals} />
          )}
        </>
      )}
    </SectionCard>
  );
}
