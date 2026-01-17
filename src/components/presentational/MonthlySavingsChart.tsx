"use client";

import DataChart from "@/components/ui/DataChart";
import type { MonthlySavingsData } from "@/types/calculator";

interface MonthlySavingsChartProps {
  monthlySavingsData: MonthlySavingsData;
}

export default function MonthlySavingsChart({ monthlySavingsData }: MonthlySavingsChartProps) {
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
        data={monthlySavingsData.yearlyBreakdown}
        series={series}
        xAxisKey="year"
      />
    </div>
  );
}
