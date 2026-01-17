"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { ComparisonData } from "@/types/calculator";

interface ComparisonCardProps {
  comparisonData: ComparisonData;
  stampDuty: number;
}

export default function ComparisonCard({ comparisonData, stampDuty }: ComparisonCardProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[200px]">
          <p className="mb-1 text-xs font-medium text-zinc-500 dark:text-zinc-500">
            Difference between Rent or Buying
          </p>
          <p
            className={`text-3xl font-bold ${
              comparisonData.totalDifference >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            £{Math.abs(comparisonData.totalDifference).toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
            {comparisonData.totalDifference >= 0
              ? "Buying is better"
              : "Renting is better"}
          </p>
        </div>
        <div className="flex-1 min-w-[200px]">
          <p className="mb-1 text-xs font-medium text-zinc-500 dark:text-zinc-500">
            Winner
          </p>
          <p
            className={`text-3xl font-bold ${
              comparisonData.winner === "buy"
                ? "text-green-600 dark:text-green-400"
                : "text-blue-600 dark:text-blue-400"
            }`}
          >
            {comparisonData.winner === "buy" ? "Buy" : "Rent"}
          </p>
        </div>
        <MetricCard
          label="Stamp Duty Paid"
          value={stampDuty}
        />
      </div>
  );
}
