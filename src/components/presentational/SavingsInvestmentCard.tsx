"use client";

import MetricCard from "@/components/ui/MetricCard";
import type { CalculationResults } from "@/types/calculator";

interface SavingsInvestmentCardProps {
  data: CalculationResults;
}

export default function SavingsInvestmentCard({ data }: SavingsInvestmentCardProps) {
  return (
    <div className="mb-6">
      <MetricCard
        label="Total"
        value={data.totals.investmentValue}
      />
    </div>
  );
}
