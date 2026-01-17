"use client";

interface MetricCardProps {
  label: string;
  value: string | number;
  valueClassName?: string;
  className?: string;
}

export default function MetricCard({ label, value, valueClassName, className }: MetricCardProps) {
  const formattedValue = typeof value === "number" 
    ? `£${value.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : value;

  return (
    <div className={`flex-1 min-w-[200px] ${className || ""}`}>
      <p className="mb-1 text-xs font-medium text-zinc-500 dark:text-zinc-500">
        {label}
      </p>
      <p className={`text-3xl font-bold ${valueClassName || "text-black dark:text-zinc-50"}`}>
        {formattedValue}
      </p>
    </div>
  );
}
