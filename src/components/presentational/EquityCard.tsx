"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { EquityData } from "@/types/calculator";

interface EquityCardProps {
  equityData: EquityData | null;
}

export default function EquityCard({ equityData }: EquityCardProps) {
  if (equityData === null) {
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
        value={equityData.totalEquityGained}
      />
      <MetricCard
        label="Interest Paid"
        value={equityData.totalInterestPaid}
      />
    </div>
  );
}
