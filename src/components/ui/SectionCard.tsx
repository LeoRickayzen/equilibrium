"use client";

import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ title, children, className }: SectionCardProps) {
  return (
    <div className={`rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800 ${className || ""}`}>
      <h3 className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {title}
      </h3>
      {children}
    </div>
  );
}
