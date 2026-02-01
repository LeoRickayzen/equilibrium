"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { CalculationResults } from "@/types/calculator";

interface SavingsInvestmentMetricsProps {
  data: CalculationResults;
}

export default function SavingsInvestmentMetrics({ data }: SavingsInvestmentMetricsProps) {
  return (
    <div className="mb-6">
      <MetricCard
        label="Total"
        value={data.totals.investmentValue}
      />
    </div>
  );
}
