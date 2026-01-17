"use client";

import DataChart from "@/components/ui/DataChart";
import type { EquityData } from "@/types/calculator";

interface EquityChartProps {
  equityData: EquityData;
}

export default function EquityChart({ equityData }: EquityChartProps) {
  const series = [
    { dataKey: "equityGained", stroke: "#10b981", name: "Equity Gained" },
    { dataKey: "interestPaid", stroke: "#ef4444", name: "Interest Paid" },
    { dataKey: "remainingBalance", stroke: "#6366f1", name: "Remaining Balance" },
    { dataKey: "propertySoldPrice", stroke: "#f59e0b", name: "Property Sold Price" },
  ];

  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Breakdown
      </h4>
      <DataChart
        data={equityData.yearlyBreakdown}
        series={series}
        xAxisKey="year"
      />
    </div>
  );
}
