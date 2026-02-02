"use client";

import SectionCard from "@/components/ui/SectionCard";
import { calculateAvailableDownPayment, calculateLoanAmount } from "@/lib/calculations/mortgage";
import type { CalculationResults } from "@/types/calculator";

interface MortgageBreakdownSectionProps {
  data: CalculationResults;
}

export default function MortgageBreakdownSection({
  data,
}: MortgageBreakdownSectionProps) {
  const { parsedInputs, stampDuty } = data;
  const {
    initialCapital,
    propertyPrice,
    legalConveyancingSurveyCost,
    renovationCost,
  } = parsedInputs;

  const availableDeposit = calculateAvailableDownPayment(
    initialCapital,
    stampDuty,
    legalConveyancingSurveyCost,
    renovationCost
  );
  const loanAmount = calculateLoanAmount(propertyPrice, availableDeposit);

  return (
    <SectionCard title="Mortgage Breakdown">
      {data.rows.length === 0 ? (
        <p className="text-lg text-zinc-500 dark:text-zinc-500">
          Enter values to calculate
        </p>
      ) : (
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
            <h4 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Available Down Payment Calculation
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-zinc-900 dark:text-zinc-100">
                <span>Initial Capital</span>
                <span className="font-medium">
                  £{initialCapital.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              {stampDuty > 0 && (
                <div className="flex justify-between text-red-600 dark:text-red-400">
                  <span>− Stamp Duty</span>
                  <span className="font-medium">
                    £{stampDuty.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              {legalConveyancingSurveyCost > 0 && (
                <div className="flex justify-between text-red-600 dark:text-red-400">
                  <span>− Legal & Conveyancing Costs</span>
                  <span className="font-medium">
                    £{legalConveyancingSurveyCost.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              {renovationCost > 0 && (
                <div className="flex justify-between text-red-600 dark:text-red-400">
                  <span>− Renovation Costs</span>
                  <span className="font-medium">
                    £{renovationCost.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              <div className="border-t border-zinc-300 pt-2 dark:border-zinc-600">
                <div className="flex justify-between text-lg font-bold text-green-600 dark:text-green-400">
                  <span>= Available Down Payment</span>
                  <span>
                    £{availableDeposit.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
 
          <div className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
            <h4 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Loan Amount Calculation
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-zinc-900 dark:text-zinc-100">
                <span>Property Price</span>
                <span className="font-medium">
                  £{propertyPrice.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>− Available Down Payment</span>
                <span className="font-medium">
                  £{availableDeposit.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t border-zinc-300 pt-2 dark:border-zinc-600">
                <div className="flex justify-between text-lg font-bold text-blue-600 dark:text-blue-400">
                  <span>= Mortgage Loan Amount</span>
                  <span>
                    £{loanAmount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
