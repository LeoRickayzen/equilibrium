"use client";

import DataChart from "@/components/ui/DataChart";
import type { YearlyRow } from "@/lib/calculations/types";

interface ComparisonChartProps {
  rows: YearlyRow[];
}

export default function ComparisonChart({ rows }: ComparisonChartProps) {
  const series = [
    { dataKey: "sizeOfEquityBuying", stroke: "#10b981", name: "Size of Equity Buying" },
    { dataKey: "sizeOfEquityIfInvested", stroke: "#3b82f6", name: "Size of Equity if Invested" },
  ];

  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Comparison
      </h4>
      <DataChart
        data={rows}
        series={series}
        xAxisKey="year"
      />
    </div>
  );
}
