"use client";

import SectionCard from "@/components/ui/SectionCard";
import EquityCard from "@/components/presentational/EquityCard";
import EquityTable from "@/components/presentational/EquityTable";
import EquityChart from "@/components/presentational/EquityChart";
import type { EquityData } from "@/types/calculator";

interface EquityContainerProps {
  equityData: EquityData | null;
  viewMode: "table" | "graph";
}

export default function EquityContainer({
  equityData,
  viewMode,
}: EquityContainerProps) {
  return (
    <SectionCard title="Equity Gained">
      <EquityCard equityData={equityData} />
      {equityData?.yearlyBreakdown && equityData.yearlyBreakdown.length > 0 && (
        <>
          {viewMode === "table" ? (
            <EquityTable equityData={equityData} />
          ) : (
            <EquityChart equityData={equityData} />
          )}
        </>
      )}
    </SectionCard>
  );
}
