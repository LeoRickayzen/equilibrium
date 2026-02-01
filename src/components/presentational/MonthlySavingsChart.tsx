"use client";

import DataChart from "@/components/ui/DataChart";
import type { YearlyRow } from "@/lib/calculations/types";

interface MonthlySavingsChartProps {
  rows: YearlyRow[];
  averages: { monthlySavings: number; monthlyServiceCharge: number };
}

export default function MonthlySavingsChart({ rows }: MonthlySavingsChartProps) {
  const chartData = rows.map((row) => ({
    year: row.year,
    rent: row.monthlyRent,
    monthlySavings: row.monthlySavings,
    serviceChargePaid: row.monthlyServiceCharge * 12,
  }));

  const series = [
    { dataKey: "rent", stroke: "#3b82f6", name: "Monthly Rent" },
    { dataKey: "monthlySavings", stroke: "#10b981", name: "Monthly Savings" },
    { dataKey: "serviceChargePaid", stroke: "#f59e0b", name: "Service Charge Paid (Annual)" },
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
