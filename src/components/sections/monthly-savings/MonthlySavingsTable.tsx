"use client";

import DataTable from "@/components/ui/DataTable";
import type { YearlyRow } from "@/lib/calculations/types";

interface MonthlySavingsTableProps {
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
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{row.monthlyRent.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{(row.monthlyServiceCharge * 12).toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-500">
          (annual)
        </span>
      </td>
      <td
        className={`px-4 py-2 text-right font-medium ${
          row.monthlySavings >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        £{row.monthlySavings.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td
        className={`px-4 py-2 text-right font-medium ${
          row.cumulativeSavings >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        £{row.cumulativeSavings.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td
        className={`px-4 py-2 text-right font-medium ${
          row.cumulativeSavingsWithAppreciation >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        £{row.cumulativeSavingsWithAppreciation.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  );
}

export default function MonthlySavingsTable({ rows }: MonthlySavingsTableProps) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Breakdown
      </h4>
      <DataTable
        headers={[
          "Year",
          "Monthly Rent",
          "Service Charge Paid",
          "Monthly Savings",
          "Total Saved",
          "Total Saved, with Appreciation",
        ]}
        rows={rows.map(renderRow)}
      />
    </div>
  );
}
