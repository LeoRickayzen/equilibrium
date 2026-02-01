"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { CalculationResults } from "@/types/calculator";

interface EquityCardProps {
  data: CalculationResults;
}

export default function EquityCard({ data }: EquityCardProps) {
  if (data.rows.length === 0) {
    return (
      <p className="text-lg text-zinc-500 dark:text-zinc-500">
        Enter values to calculate
      </p>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap gap-6">
      <MetricCard
        label="Total Equity Gained"
        value={data.totals.equityGained}
      />
      <MetricCard
        label="Interest Paid"
        value={data.totals.interestPaid}
      />
    </div>
  );
}
