"use client";

import { useState } from "react";
import type { CalculatorInputs } from "@/types/calculator";
import { encodeCalculatorInputs } from "@/lib/shareUrl";

interface ShareLinkButtonProps {
  inputs: CalculatorInputs;
}

export default function ShareLinkButton({ inputs }: ShareLinkButtonProps) {
  const [didCopy, setDidCopy] = useState(false);

  return (
    <button
      type="button"
      title={didCopy ? "Copied!" : "Copy link"}
      onClick={async () => {
        const query = encodeCalculatorInputs(inputs);
        const url = `${window.location.origin}${window.location.pathname}?${query}`;

        await navigator.clipboard.writeText(url);
        setDidCopy(true);
        window.setTimeout(() => setDidCopy(false), 2000);
      }}
      className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        {didCopy ? (
          <path d="M20 6L9 17l-5-5" />
        ) : (
          <>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </>
        )}
      </svg>
    </button>
  );
}

