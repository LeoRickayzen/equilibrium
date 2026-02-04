"use client";

import InputField from "@/components/InputField";

interface AdvancedBuyFormProps {
  inputs: {
    initialCapital: string;
    propertyPrice: string;
    interestRate: string;
    mortgageLength: string;
    timeInProperty: string;
    propertyAppreciation: string;
    serviceCharge: string;
    serviceChargeIncrease: string;
    investmentAppreciationBuying: string;
    renovationCost: string;
    renovationReturn: string;
    legalConveyancingSurveyCost: string;
    estateAgentFeesPercent: string;
    monthlySavings: string;
    isFirstTimeBuyer: boolean;
    isAdditionalProperty: boolean;
  };
  onInputChange: (key: string, value: string | boolean) => void;
}

export default function AdvancedBuyForm({
  inputs,
  onInputChange,
}: AdvancedBuyFormProps) {
  return (
    <div className="space-y-6">
      <InputField
        id="property-price"
        label="Property Price"
        value={inputs.propertyPrice}
        onChange={(value) => onInputChange("propertyPrice", value)}
        placeholder="Enter property price"
      />

      <InputField
        id="interest-rate"
        label="Interest Rate (%)"
        value={inputs.interestRate}
        onChange={(value) => onInputChange("interestRate", value)}
        placeholder="Enter interest rate"
      />

      <InputField
        id="mortgage-length"
        label="Mortgage Length (years)"
        value={inputs.mortgageLength}
        onChange={(value) => onInputChange("mortgageLength", value)}
        placeholder="Enter mortgage length"
      />

      <InputField
        id="time-in-property"
        label="Time in Property (years)"
        value={inputs.timeInProperty}
        onChange={(value) => onInputChange("timeInProperty", value)}
        placeholder="Enter time in property"
      />

      <InputField
        id="monthly-savings"
        label="Monthly Savings (£)"
        value={inputs.monthlySavings}
        onChange={(value) => onInputChange("monthlySavings", value)}
        placeholder="Enter monthly savings"
      />

      <InputField
        id="property-appreciation"
        label="Property Appreciation (%)"
        value={inputs.propertyAppreciation}
        onChange={(value) => onInputChange("propertyAppreciation", value)}
        placeholder="Enter property appreciation"
      />

      <InputField
        id="service-charge"
        label="Service Charge (annual)"
        value={inputs.serviceCharge}
        onChange={(value) => onInputChange("serviceCharge", value)}
        placeholder="Enter annual service charge"
      />

      <InputField
        id="service-charge-increase"
        label="Service Charge Increase (%)"
        value={inputs.serviceChargeIncrease}
        onChange={(value) => onInputChange("serviceChargeIncrease", value)}
        placeholder="Enter service charge increase"
      />

      <InputField
        id="investment-appreciation-buying"
        label="Investment Appreciation While Buying (%)"
        value={inputs.investmentAppreciationBuying}
        onChange={(value) => onInputChange("investmentAppreciationBuying", value)}
        placeholder="Enter investment appreciation"
      />

      <InputField
        id="renovation-cost"
        label="Renovation Cost"
        value={inputs.renovationCost}
        onChange={(value) => onInputChange("renovationCost", value)}
        placeholder="Enter renovation cost"
      />

      <InputField
        id="renovation-return"
        label="Renovation Return (%)"
        value={inputs.renovationReturn}
        onChange={(value) => onInputChange("renovationReturn", value)}
        placeholder="Enter renovation return"
      />

      <InputField
        id="legal-conveyancing-survey-cost"
        label="Legal & Conveyancing/Survey Cost"
        value={inputs.legalConveyancingSurveyCost}
        onChange={(value) => onInputChange("legalConveyancingSurveyCost", value)}
        placeholder="Enter legal costs"
      />

      <InputField
        id="estate-agent-fees"
        label="Estate Agent Fees (%)"
        value={inputs.estateAgentFeesPercent}
        onChange={(value) => onInputChange("estateAgentFeesPercent", value)}
        placeholder="Enter estate agent fees"
      />

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={inputs.isFirstTimeBuyer}
            onChange={(e) => onInputChange("isFirstTimeBuyer", e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-zinc-700 dark:text-zinc-300">
            First Time Buyer
          </span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={inputs.isAdditionalProperty}
            onChange={(e) => onInputChange("isAdditionalProperty", e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-zinc-700 dark:text-zinc-300">
            Additional Property
          </span>
        </label>
      </div>
    </div>
  );
}
