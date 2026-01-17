"use client";

import { useCalculatorForm } from "@/hooks/useCalculatorForm";
import { useCalculator } from "@/hooks/computation/useCalculator";
import { useRenovationCostValidation } from "@/hooks/useRenovationCostValidation";
import InputField from "@/components/InputField";
import Results from "@/components/Results";

export default function Home() {
  const { inputs, updateInput, getParsedInputs } = useCalculatorForm();
  const parsedInputs = getParsedInputs();
  const calculationResults = useCalculator(parsedInputs);

  // Renovation cost validation
  const { error: renovationCostError, handleChange: handleRenovationCostChange } =
    useRenovationCostValidation(inputs, updateInput);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left side - Inputs */}
        <div className="w-full md:w-1/4 overflow-y-auto border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
          <div className="p-8">
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                This calculator is for illustrative purposes only. The numbers and calculations may be inaccurate and should not be relied upon for financial decisions. This is not financial advice or a recommendation to rent or buy a property. You should consult a qualified financial advisor before making any financial decisions. The author accepts no liability for any loss or damage resulting from the use of this tool.
              </p>
            </div>
            <h1 className="mb-8 text-3xl font-bold text-black dark:text-zinc-50">
              Rent or Buy Calculator
            </h1>

            <div className="space-y-6">
              <InputField
                id="down-payment"
                label="Down Payment"
                value={inputs.downPayment}
                onChange={(value) => updateInput("downPayment", value)}
                placeholder="Enter down payment amount"
              />

              <InputField
                id="property-price"
                label="Property Price"
                value={inputs.propertyPrice}
                onChange={(value) => updateInput("propertyPrice", value)}
                placeholder="Enter property price"
              />

              <InputField
                id="rent-pcm"
                label="Rent PCM (Per Calendar Month)"
                value={inputs.rentPcm}
                onChange={(value) => updateInput("rentPcm", value)}
                placeholder="Enter monthly rent"
              />

              <InputField
                id="rent-inflation"
                label="Rent Inflation Annual Percentage"
                value={inputs.rentInflation}
                onChange={(value) => updateInput("rentInflation", value)}
                placeholder="Enter annual rent inflation %"
                step="0.1"
              />

              <InputField
                id="interest-rate"
                label="Interest Rate (Percentage)"
                value={inputs.interestRate}
                onChange={(value) => updateInput("interestRate", value)}
                placeholder="Enter interest rate %"
                step="0.1"
              />

              <InputField
                id="mortgage-length"
                label="Mortgage Length (Years)"
                value={inputs.mortgageLength}
                onChange={(value) => updateInput("mortgageLength", value)}
                placeholder="Enter mortgage length in years"
              />

              <InputField
                id="time-in-property"
                label="Time in Property (Years)"
                value={inputs.timeInProperty}
                onChange={(value) => updateInput("timeInProperty", value)}
                placeholder="Enter time in property in years"
              />

              <InputField
                id="investment-appreciation-buying"
                label="Investment Appreciation - Buying (Annual Percentage)"
                value={inputs.investmentAppreciationBuying}
                onChange={(value) => updateInput("investmentAppreciationBuying", value)}
                placeholder="Enter annual investment appreciation %"
                step="0.1"
              />

              <InputField
                id="investment-appreciation-renting"
                label="Investment Appreciation - Renting (Annual Percentage)"
                value={inputs.investmentAppreciationRenting}
                onChange={(value) => updateInput("investmentAppreciationRenting", value)}
                placeholder="Enter annual investment appreciation %"
                step="0.1"
              />

              <InputField
                id="property-appreciation"
                label="Property Appreciation (Annual Percentage)"
                value={inputs.propertyAppreciation}
                onChange={(value) => updateInput("propertyAppreciation", value)}
                placeholder="Enter annual property appreciation %"
                step="0.1"
              />

              <InputField
                id="service-charge"
                label="Service Charge (Annual)"
                value={inputs.serviceCharge}
                onChange={(value) => updateInput("serviceCharge", value)}
                placeholder="Enter annual service charge"
              />

              <InputField
                id="service-charge-increase"
                label="Service Charge Annual Percentage Increase"
                value={inputs.serviceChargeIncrease}
                onChange={(value) => updateInput("serviceChargeIncrease", value)}
                placeholder="Enter annual service charge increase %"
                step="0.1"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Buyer Status
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={inputs.isFirstTimeBuyer}
                      onChange={(e) => updateInput("isFirstTimeBuyer", e.target.checked)}
                      className="mr-2 h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-700"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      First-Time Buyer
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={inputs.isAdditionalProperty}
                      onChange={(e) => updateInput("isAdditionalProperty", e.target.checked)}
                      className="mr-2 h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-700"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      Additional Property (Second Home/Buy-to-Let)
                    </span>
                  </label>
                </div>
              </div>

              <InputField
                id="renovation-cost"
                label="Renovation Cost"
                value={inputs.renovationCost}
                onChange={handleRenovationCostChange}
                placeholder="Enter renovation cost"
                error={renovationCostError}
              />

              <InputField
                id="renovation-return"
                label="Renovation Return (Percentage)"
                value={inputs.renovationReturn}
                onChange={(value) => updateInput("renovationReturn", value)}
                placeholder="Enter expected return %"
                step="0.1"
              />

              <InputField
                id="legal-conveyancing-survey"
                label="Legal/Conveyancing/Surveying Costs"
                value={inputs.legalConveyancingSurveyCost}
                onChange={(value) => updateInput("legalConveyancingSurveyCost", value)}
                placeholder="Enter total legal/conveyancing/surveying costs"
              />

              <InputField
                id="estate-agent-fees"
                label="Estate Agent Fees (Percentage)"
                value={inputs.estateAgentFeesPercent}
                onChange={(value) => updateInput("estateAgentFeesPercent", value)}
                placeholder="Enter estate agent fees %"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Right side - Results */}
        <Results
          calculationResults={calculationResults}
          parsedInputs={parsedInputs}
        />
      </div>
    </div>
  );
}
