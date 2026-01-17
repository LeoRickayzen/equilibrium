"use client";

import DataTable from "@/components/ui/DataTable";
import type { MonthlySavingsData, SavingsWithAppreciation } from "@/types/calculator";

interface MonthlySavingsTableProps {
  monthlySavingsData: MonthlySavingsData;
  savingsWithAppreciation: SavingsWithAppreciation[] | null;
}

export default function MonthlySavingsTable({
  monthlySavingsData,
  savingsWithAppreciation,
}: MonthlySavingsTableProps) {
  const headers = [
    "Year",
    "Monthly Rent",
    "Service Charge Paid",
    "Monthly Savings",
    "Total Saved",
    "Total Saved, with Appreciation",
  ];

  const rows = monthlySavingsData.yearlyBreakdown.map((yearData, index) => {
    const savingsData = savingsWithAppreciation?.[index];
    return (
      <tr
        key={yearData.year}
        className="border-b border-zinc-200 dark:border-zinc-700"
      >
        <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100">
          {yearData.year}
        </td>
        <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
          £{yearData.rent.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
        <td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">
          £{yearData.serviceChargePaid.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-500">
            (annual)
          </span>
        </td>
        <td
          className={`px-4 py-2 text-right font-medium ${
            yearData.monthlySavings >= 0
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          £{yearData.monthlySavings.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
        <td className="px-4 py-2 text-right font-medium text-green-600 dark:text-green-400">
          £{(savingsData?.totalSaved ?? 0).toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
        <td className="px-4 py-2 text-right font-medium text-green-600 dark:text-green-400">
          £{(savingsData?.totalSavedWithAppreciation ?? 0).toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Yearly Breakdown
      </h4>
      <DataTable headers={headers} rows={rows} />
    </div>
  );
}
