"use client";

interface ViewModeToggleProps {
  viewMode: "table" | "graph";
  onToggle: () => void;
}

export default function ViewModeToggle({ viewMode, onToggle }: ViewModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
    >
      {viewMode === "table" ? "Show Graphs" : "Show Tables"}
    </button>
  );
}
