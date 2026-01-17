"use client";

import DataTable from "@/components/ui/DataTable";
import type { EquityData } from "@/types/calculator";

interface EquityTableProps {
  equityData: EquityData;
}

export default function EquityTable({ equityData }: EquityTableProps) {
  const headers = [
    "Year",
    "Equity Gained",
    "Interest Paid",
    "Remaining Balance",
    "Property Sold Price",
  ];

  const rows = equityData.yearlyBreakdown.map((yearData) => (
    <tr
      key={yearData.year}
      className="border-b border-zinc-200 dark:border-zinc-700"
    >
      <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">
        {yearData.year}
      </td>
      <td className="px-4 py-2 text-right font-medium text-green-600 dark:text-green-400">
        £{yearData.equityGained.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{yearData.interestPaid.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
        £{yearData.remainingBalance.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-4 py-2 text-right font-medium text-green-600 dark:text-green-400">
        £{yearData.propertySoldPrice.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Breakdown
      </h4>
      <DataTable headers={headers} rows={rows} />
    </div>
  );
}
