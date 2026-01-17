"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { MonthlySavingsData } from "@/types/calculator";

interface MonthlySavingsCardProps {
  monthlyMortgagePayment: number | null;
  monthlySavingsData: MonthlySavingsData | null;
  totalSavedWithAppreciation: number | null;
}

export default function MonthlySavingsCard({
  monthlyMortgagePayment,
  monthlySavingsData,
  totalSavedWithAppreciation,
}: MonthlySavingsCardProps) {
  if (monthlySavingsData === null) {
    return (
      <p className="text-lg text-zinc-500 dark:text-zinc-500">
        Enter values to calculate
      </p>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap gap-6">
        {monthlyMortgagePayment !== null ? (
          <MetricCard
            label="Monthly Mortgage Payment"
            value={monthlyMortgagePayment}
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
          value={monthlySavingsData.averageMonthlyServiceCharge}
        />
        <MetricCard
          label="Average Monthly Savings"
          value={monthlySavingsData.averageMonthlySavings}
        />
        <MetricCard
          label="Total Saved, with Appreciation"
          value={totalSavedWithAppreciation ?? 0}
        />
      </div>
  );
}
