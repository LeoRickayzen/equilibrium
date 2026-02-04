"use client";

import InputField from "@/components/InputField";

interface AdvancedRentFormProps {
  inputs: {
    initialCapital: string;
    rentPcm: string;
    rentInflation: string;
    timeInProperty: string;
    investmentAppreciationRenting: string;
  };
  onInputChange: (key: string, value: string | boolean) => void;
}

export default function AdvancedRentForm({
  inputs,
  onInputChange,
}: AdvancedRentFormProps) {
  return (
    <div className="space-y-6">
      <InputField
        id="rent-pcm"
        label="Monthly Rent (£)"
        value={inputs.rentPcm}
        onChange={(value) => onInputChange("rentPcm", value)}
        placeholder="Enter monthly rent"
      />

      <InputField
        id="rent-inflation"
        label="Rent Inflation (%)"
        value={inputs.rentInflation}
        onChange={(value) => onInputChange("rentInflation", value)}
        placeholder="Enter annual rent inflation"
      />

      <InputField
        id="time-in-property"
        label="Time Renting (years)"
        value={inputs.timeInProperty}
        onChange={(value) => onInputChange("timeInProperty", value)}
        placeholder="Enter time renting"
      />

      <InputField
        id="investment-appreciation-renting"
        label="Investment Appreciation While Renting (%)"
        value={inputs.investmentAppreciationRenting}
        onChange={(value) => onInputChange("investmentAppreciationRenting", value)}
        placeholder="Enter investment appreciation"
      />
    </div>
  );
}
