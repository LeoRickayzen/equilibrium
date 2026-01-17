"use client";

import { ReactNode } from "react";

interface DataTableProps {
  headers: string[];
  rows: ReactNode[];
  maxHeight?: string;
  className?: string;
}

export default function DataTable({ headers, rows, maxHeight = "225px", className }: DataTableProps) {
  return (
    <div className={`overflow-x-auto overflow-y-auto ${className || ""}`} style={{ maxHeight }}>
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-800 z-10">
          <tr className="border-b border-zinc-300 dark:border-zinc-600">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}
