"use client";

import { useState } from "react";
import AdvancedForm, { type AdvancedInputs } from "@/components/advanced/AdvancedForm";
import InputField from "@/components/InputField";

export default function AdvancedPage() {
  const [mode, setMode] = useState<"buy" | "rent">("buy");
  const [scenarioName, setScenarioName] = useState("");
  const [inputs, setInputs] = useState<AdvancedInputs>({
    initialCapital: "40000",
    propertyPrice: "200000",
    interestRate: "4.5",
    mortgageLength: "25",
    timeInProperty: "10",
    propertyAppreciation: "2",
    serviceCharge: "2000",
    serviceChargeIncrease: "5",
    investmentAppreciationBuying: "5",
    investmentAppreciationRenting: "3",
    rentPcm: "800",
    rentInflation: "3",
    renovationCost: "5000",
    renovationReturn: "0",
    legalConveyancingSurveyCost: "1750",
    estateAgentFeesPercent: "1.5",
    monthlySavings: "0",
    isFirstTimeBuyer: true,
    isAdditionalProperty: false,
  });

  const handleInputChange = (key: string, value: string | boolean) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = () => {
    console.log("Add scenario:", { scenarioName, mode, inputs });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-10 border-b border-zinc-200 bg-zinc-50 px-8 py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-end gap-4">
          <label
            htmlFor="initial-capital"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Initial Capital:
          </label>
          <input
            id="initial-capital"
            type="text"
            value={inputs.initialCapital}
            onChange={(e) => handleInputChange("initialCapital", e.target.value)}
            placeholder="Enter initial capital"
            className="w-48 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400"
          />
        </div>
      </div>

      <div className="flex flex-1 pt-[73px]">
        <AdvancedForm
          mode={mode}
          onModeChange={setMode}
          inputs={inputs}
          onInputChange={handleInputChange}
          onAdd={handleAdd}
          scenarioName={scenarioName}
          onScenarioNameChange={setScenarioName}
        />
        
        <div className="w-full md:w-3/4 h-screen overflow-y-auto bg-white dark:bg-zinc-900">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
                Results
              </h2>
            </div>
            <p className="text-lg text-zinc-500 dark:text-zinc-500">
              Results will appear here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
