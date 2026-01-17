import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "number" | "text";
  step?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const inputClassName =
  "w-full rounded-lg border bg-white px-4 py-3 text-black placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-opacity-20";
const inputClassNameNormal =
  "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-600";
const inputClassNameError =
  "border-red-500 focus:border-red-600 focus:ring-red-500 dark:border-red-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-red-500 dark:focus:ring-red-600";

const labelClassName =
  "mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

const errorClassName =
  "mt-1 text-sm text-red-600 dark:text-red-400";

export default function InputField({
  id,
  label,
  value,
  onChange,
  type = "number",
  step,
  placeholder,
  required = false,
  error,
}: InputFieldProps) {
  const inputClass = error
    ? `${inputClassName} ${inputClassNameError}`
    : `${inputClassName} ${inputClassNameNormal}`;

  return (
    <div>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        step={step}
        required={required}
        className={inputClass}
      />
      {error && <p className={errorClassName}>{error}</p>}
    </div>
  );
}
