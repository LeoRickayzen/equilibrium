"use client";

import DataChart from "@/components/ui/DataChart";
import type { SavingsInvestmentPerformance } from "@/types/calculator";

interface SavingsInvestmentChartProps {
  performanceData: SavingsInvestmentPerformance;
}

export default function SavingsInvestmentChart({ performanceData }: SavingsInvestmentChartProps) {
  const series = [
    { dataKey: "value", stroke: "#10b981", name: "Value" },
    { dataKey: "appreciation", stroke: "#3b82f6", name: "Appreciation" },
  ];

  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Performance
      </h4>
      <DataChart
        data={performanceData.yearlyBreakdown}
        series={series}
        xAxisKey="year"
      />
    </div>
  );
}
