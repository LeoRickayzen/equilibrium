"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { CalculationResults } from "@/types/calculator";

interface MonthlySavingsMetricsProps {
  data: CalculationResults;
}

export default function MonthlySavingsMetrics({ data }: MonthlySavingsMetricsProps) {
  const isNegativeSavings = data.averages.monthlySavings < 0;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-6">
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
      {isNegativeSavings && (
        <div className="mt-4 rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> Negative values indicate that due to high mortgage and service charge costs, you have less money to put towards savings each month compared to renting.
          </p>
        </div>
      )}
    </div>
  );
}
