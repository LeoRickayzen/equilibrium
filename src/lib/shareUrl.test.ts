import { describe, expect, it } from "vitest";
import type { CalculatorInputs } from "@/types/calculator";
import { decodeCalculatorInputs, encodeCalculatorInputs } from "./shareUrl";

describe("shareUrl", () => {
  it("roundtrips calculator inputs", () => {
    const inputs: CalculatorInputs = {
      downPayment: "20000",
      propertyPrice: "140000",
      rentPcm: "550",
      rentInflation: "6",
      interestRate: "4.5",
      mortgageLength: "25",
      timeInProperty: "10",
      investmentAppreciationBuying: "5",
      investmentAppreciationRenting: "2",
      propertyAppreciation: "1.5",
      serviceCharge: "1800",
      serviceChargeIncrease: "5",
      isFirstTimeBuyer: true,
      isAdditionalProperty: false,
      renovationCost: "5000",
      renovationReturn: "0",
      legalConveyancingSurveyCost: "1750",
      estateAgentFeesPercent: "1.5",
    };

    const query = encodeCalculatorInputs(inputs);
    const decoded = decodeCalculatorInputs(new URLSearchParams(query));

    expect(decoded).toEqual(inputs);
  });

  it("returns null for empty/irrelevant payload", () => {
    expect(decodeCalculatorInputs(new URLSearchParams())).toBeNull();
    expect(decodeCalculatorInputs(new URLSearchParams(""))).toBeNull();
    expect(decodeCalculatorInputs(new URLSearchParams("foo=bar"))).toBeNull();
  });

  it("drops unknown keys and rejects wrong types", () => {
    const decoded = decodeCalculatorInputs(
      new URLSearchParams("downPayment=12345&isFirstTimeBuyer=maybe&unknownKey=whatever")
    );
    expect(decoded).toEqual({ downPayment: "12345" });
  });
});

