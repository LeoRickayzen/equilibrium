"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { CalculationResults } from "@/types/calculator";

interface EquityMetricsProps {
  data: CalculationResults;
}

export default function EquityMetrics({ data }: EquityMetricsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-6">
      <MetricCard
        label="Total Equity Gained in Property"
        value={data.totals.equityGained}
      />
      <MetricCard
        label="Interest Paid"
        value={data.totals.interestPaid}
      />
    </div>
  );
}
