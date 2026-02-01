"use client";

import DataChart from "@/components/ui/DataChart";
import type { YearlyRow } from "@/lib/calculations/types";

interface SavingsInvestmentChartProps {
  rows: YearlyRow[];
  totals: { equityGained: number; interestPaid: number; investmentValue: number };
}

export default function SavingsInvestmentChart({ rows }: SavingsInvestmentChartProps) {
  const chartData = rows.map((row) => ({
    year: row.year,
    value: row.investmentValue,
    appreciation: row.investmentAppreciation,
  }));

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
        data={chartData}
        series={series}
        xAxisKey="year"
      />
    </div>
  );
}
