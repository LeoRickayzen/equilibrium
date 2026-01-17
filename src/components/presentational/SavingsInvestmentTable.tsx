"use client";

import DataTable from "@/components/ui/DataTable";
import type { SavingsInvestmentPerformance } from "@/types/calculator";

interface SavingsInvestmentTableProps {
  performanceData: SavingsInvestmentPerformance;
}

export default function SavingsInvestmentTable({ performanceData }: SavingsInvestmentTableProps) {
  const headers = ["Year", "Value", "Appreciation"];

  const rows = performanceData.yearlyBreakdown.map((yearData) => (
    <tr
      key={yearData.year}
      className="border-b border-zinc-200 dark:border-zinc-700"
    >
      <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">
        {yearData.year}
      </td>
      <td className="px-4 py-2 text-right font-medium text-green-600 dark:text-green-400">
        £{yearData.value.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{yearData.appreciation.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Performance
      </h4>
      <DataTable headers={headers} rows={rows} />
    </div>
  );
}
