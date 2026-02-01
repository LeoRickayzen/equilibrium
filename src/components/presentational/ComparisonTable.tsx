"use client";

import DataTable from "@/components/ui/DataTable";
import type { YearlyRow } from "@/lib/calculations/types";

interface ComparisonTableProps {
  rows: YearlyRow[];
}

export default function ComparisonTable({ rows }: ComparisonTableProps) {
  const headers = [
    "Year",
    "Size of Equity Buying",
    "Size of Equity if Invested",
    "Difference",
    "Winner",
  ];

  const tableRows = rows.map((row) => (
    <tr
      key={row.year}
      className="border-b border-zinc-200 dark:border-zinc-700"
    >
      <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">
        {row.year}
      </td>
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{row.sizeOfEquityBuying.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{row.sizeOfEquityIfInvested.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td
        className={`px-4 py-2 text-right font-medium ${
          row.difference >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        £{Math.abs(row.difference).toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        <span className="ml-1 text-xs">
          ({row.difference >= 0 ? "Buy" : "Rent"})
        </span>
      </td>
      <td
        className={`px-4 py-2 text-right font-medium ${
          row.winner === "buy"
            ? "text-green-600 dark:text-green-400"
            : "text-blue-600 dark:text-blue-400"
        }`}
      >
        {row.winner === "buy" ? "Buy" : "Rent"}
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Comparison
      </h4>
      <DataTable headers={headers} rows={tableRows} />
    </div>
  );
}
