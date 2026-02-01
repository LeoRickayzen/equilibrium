"use client";

import SectionCard from "@/components/ui/SectionCard";
import ComparisonCard from "@/components/presentational/ComparisonCard";
import ComparisonTable from "@/components/presentational/ComparisonTable";
import ComparisonChart from "@/components/presentational/ComparisonChart";
import type { CalculationResults } from "@/types/calculator";

interface ComparisonContainerProps {
  data: CalculationResults;
  viewMode: "table" | "graph";
}

export default function ComparisonContainer({
  data,
  viewMode,
}: ComparisonContainerProps) {
  if (data.rows.length === 0) {
    return null;
  }

  return (
    <SectionCard title="Comparison: Rent vs Buy">
      <ComparisonCard data={data} />
      {data.rows.length > 0 && (
        <>
          {viewMode === "table" ? (
            <ComparisonTable rows={data.rows} />
          ) : (
            <ComparisonChart rows={data.rows} />
          )}
        </>
      )}
    </SectionCard>
  );
}
