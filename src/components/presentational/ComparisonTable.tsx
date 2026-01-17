"use client";

import DataTable from "@/components/ui/DataTable";
import type { ComparisonData } from "@/types/calculator";

interface ComparisonTableProps {
  comparisonData: ComparisonData;
}

export default function ComparisonTable({ comparisonData }: ComparisonTableProps) {
  const headers = [
    "Year",
    "Size of Equity Buying",
    "Size of Equity if Invested",
    "Difference",
    "Winner",
  ];

  const rows = comparisonData.yearlyBreakdown.map((yearData) => (
    <tr
      key={yearData.year}
      className="border-b border-zinc-200 dark:border-zinc-700"
    >
      <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">
        {yearData.year}
      </td>
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{yearData.sizeOfEquityBuying.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{yearData.sizeOfEquityIfInvested.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td
        className={`px-4 py-2 text-right font-medium ${
          yearData.difference >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        £{Math.abs(yearData.difference).toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        <span className="ml-1 text-xs">
          ({yearData.difference >= 0 ? "Buy" : "Rent"})
        </span>
      </td>
      <td
        className={`px-4 py-2 text-right font-medium ${
          yearData.winner === "buy"
            ? "text-green-600 dark:text-green-400"
            : "text-blue-600 dark:text-blue-400"
        }`}
      >
        {yearData.winner === "buy" ? "Buy" : "Rent"}
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Comparison
      </h4>
      <DataTable headers={headers} rows={rows} />
    </div>
  );
}
