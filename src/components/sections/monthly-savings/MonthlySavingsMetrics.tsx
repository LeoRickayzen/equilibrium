"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { CalculationResults } from "@/types/calculator";

interface MonthlySavingsMetricsProps {
  data: CalculationResults;
}

export default function MonthlySavingsMetrics({ data }: MonthlySavingsMetricsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-6">
      {data.monthlyMortgagePayment !== null ? (
        <MetricCard
          label="Monthly Mortgage Payment"
          value={data.monthlyMortgagePayment}
        />
      ) : (
        <div className="flex-1 min-w-[200px]">
          <p className="mb-1 text-xs font-medium text-zinc-500 dark:text-zinc-500">
            Monthly Mortgage Payment
          </p>
          <p className="text-3xl font-bold text-zinc-500 dark:text-zinc-400">
            No Mortgage
          </p>
        </div>
      )}
      <MetricCard
        label="Average Monthly Service Charge"
        value={data.averages.monthlyServiceCharge}
      />
      <MetricCard
        label="Average Monthly Savings"
        value={data.averages.monthlySavings}
      />
      <MetricCard
        label="Total Saved, with Appreciation"
        value={data.final.cumulativeSavingsWithAppreciation}
      />
    </div>
  );
}
