"use client";

import DataChart from "@/components/ui/DataChart";
import type { YearlyRow } from "@/lib/calculations/types";

interface EquityChartProps {
  rows: YearlyRow[];
}

function prepareChartData(rows: YearlyRow[]) {
  return rows.map((row) => ({
    year: row.year,
    equityGained: row.principalPaid,
    interestPaid: row.interestPaid,
    remainingBalance: row.mortgageBalance,
    propertySoldPrice: row.propertyValue,
  }));
}

export default function EquityChart({ rows }: EquityChartProps) {
  const chartData = prepareChartData(rows);
  
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
        data={chartData}
        series={series}
        xAxisKey="year"
      />
    </div>
  );
}
