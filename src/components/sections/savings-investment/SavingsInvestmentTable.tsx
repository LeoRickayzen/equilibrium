"use client";

import DataTable from "@/components/ui/DataTable";
import type { YearlyRow } from "@/lib/calculations/types";

interface SavingsInvestmentTableProps {
  rows: YearlyRow[];
}

function renderRow(row: YearlyRow) {
  return (
    <tr
      key={row.year}
      className="border-b border-zinc-200 dark:border-zinc-700"
    >
      <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">
        {row.year}
      </td>
      <td className="px-4 py-2 text-right font-medium text-green-600 dark:text-green-400">
        £{row.investmentValue.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{row.investmentAppreciation.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  );
}

export default function SavingsInvestmentTable({ rows }: SavingsInvestmentTableProps) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Performance
      </h4>
      <DataTable
        headers={["Year", "Value", "Appreciation"]}
        rows={rows.map(renderRow)}
      />
    </div>
  );
}
