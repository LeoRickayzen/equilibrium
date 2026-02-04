"use client";

import AdvancedBuyForm from "./AdvancedBuyForm";
import AdvancedRentForm from "./AdvancedRentForm";

export interface AdvancedInputs {
  initialCapital: string;
  propertyPrice: string;
  interestRate: string;
  mortgageLength: string;
  timeInProperty: string;
  propertyAppreciation: string;
  serviceCharge: string;
  serviceChargeIncrease: string;
  investmentAppreciationBuying: string;
  investmentAppreciationRenting: string;
  rentPcm: string;
  rentInflation: string;
  renovationCost: string;
  renovationReturn: string;
  legalConveyancingSurveyCost: string;
  estateAgentFeesPercent: string;
  monthlySavings: string;
  isFirstTimeBuyer: boolean;
  isAdditionalProperty: boolean;
}

interface AdvancedFormProps {
  mode: "buy" | "rent";
  onModeChange: (mode: "buy" | "rent") => void;
  inputs: AdvancedInputs;
  onInputChange: (key: string, value: string | boolean) => void;
  onAdd: () => void;
  scenarioName: string;
  onScenarioNameChange: (name: string) => void;
}

export default function AdvancedForm({
  mode,
  onModeChange,
  inputs,
  onInputChange,
  onAdd,
  scenarioName,
  onScenarioNameChange,
}: AdvancedFormProps) {

  return (
    <div className="w-full md:w-1/4 h-screen overflow-y-auto border-r border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-6 flex items-center justify-between gap-3">
        <input
          type="text"
          value={scenarioName}
          onChange={(e) => onScenarioNameChange(e.target.value)}
          placeholder="Scenario Name"
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base font-semibold text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400"
        />
        <button
          onClick={onAdd}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="mb-6 flex rounded-lg border border-zinc-300 dark:border-zinc-700">
        <button
          onClick={() => onModeChange("buy")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mode === "buy"
              ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50"
              : "bg-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => onModeChange("rent")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mode === "rent"
              ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50"
              : "bg-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          }`}
        >
          Rent
        </button>
      </div>

      {mode === "buy" ? (
        <AdvancedBuyForm inputs={inputs} onInputChange={onInputChange} />
      ) : (
        <AdvancedRentForm inputs={inputs} onInputChange={onInputChange} />
      )}
    </div>
  );
}
