"use client";

import SectionCard from "@/components/ui/SectionCard";
import ComparisonMetrics from "./ComparisonMetrics";
import ComparisonTable from "./ComparisonTable";
import ComparisonChart from "./ComparisonChart";
import type { CalculationResults } from "@/types/calculator";

interface ComparisonSectionProps {
  data: CalculationResults;
  viewMode: "table" | "graph";
}

export default function ComparisonSection({
  data,
  viewMode,
}: ComparisonSectionProps) {
  if (data.rows.length === 0) {
    return null;
  }

  return (
    <SectionCard title="Comparison: Rent vs Buy">
      <ComparisonMetrics data={data} />
      {viewMode === "table" ? (
        <ComparisonTable rows={data.rows} />
      ) : (
        <ComparisonChart rows={data.rows} />
      )}
    </SectionCard>
  );
}
