"use client";

import { useState } from "react";
import ViewModeToggle from "@/components/ui/ViewModeToggle";
import ComparisonSection from "@/components/sections/comparison/ComparisonSection";
import MonthlySavingsSection from "@/components/sections/monthly-savings/MonthlySavingsSection";
import EquitySection from "@/components/sections/equity/EquitySection";
import SavingsInvestmentSection from "@/components/sections/savings-investment/SavingsInvestmentSection";
import type { CalculationResults } from "@/types/calculator";

interface ResultsProps {
  data: CalculationResults;
}

export default function Results({ data }: ResultsProps) {
  const [viewMode, setViewMode] = useState<"table" | "graph">("table");

  return (
    <div className="w-full md:w-3/4 overflow-y-auto bg-white dark:bg-zinc-900">
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
            Results
          </h2>
          <ViewModeToggle
            viewMode={viewMode}
            onToggle={() => setViewMode(viewMode === "table" ? "graph" : "table")}
          />
        </div>

        <div className="space-y-6">
          <ComparisonSection
            data={data}
            viewMode={viewMode}
          />

          <MonthlySavingsSection
            data={data}
            viewMode={viewMode}
          />

          <EquitySection
            data={data}
            viewMode={viewMode}
          />

          <SavingsInvestmentSection
            data={data}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
}
