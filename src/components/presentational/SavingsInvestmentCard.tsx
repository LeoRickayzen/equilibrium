"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { SavingsInvestmentPerformance } from "@/types/calculator";

interface SavingsInvestmentCardProps {
  performanceData: SavingsInvestmentPerformance;
}

export default function SavingsInvestmentCard({ performanceData }: SavingsInvestmentCardProps) {
  return (
    <div className="mb-6">
      <MetricCard
        label="Total"
        value={performanceData.totalValue}
      />
    </div>
  );
}
