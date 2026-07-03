import { Check, ArrowRight } from "lucide-react";
import type { ResumeSection } from "../types/types";

const SECTIONS: ResumeSection[] = [
  { id: "1", label: "Contact info", complete: true },
  { id: "2", label: "Summary", complete: true },
  { id: "3", label: "Experience", complete: true },
  { id: "4", label: "Skills", complete: true },
  { id: "5", label: "Projects", complete: false },
  { id: "6", label: "Education", complete: false },
];

export function ResumeProgress() {
  const completed = SECTIONS.filter((s) => s.complete).length;
  const percent = Math.round((completed / SECTIONS.length) * 100);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Resume Health</h2>
        <span className="font-mono text-xs font-medium text-[#5B5FEF]">{percent}%</span>
      </div>

      <div className="mt-4 flex gap-1">
        {SECTIONS.map((section) => (
          <span
            key={section.id}
            title={section.label}
            className={`h-1.5 flex-1 rounded-full ${section.complete ? "bg-[#5B5FEF]" : "bg-zinc-150 bg-zinc-100"}`}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {SECTIONS.map((section) => (
          <li key={section.id} className="flex items-center gap-2 text-sm">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                section.complete ? "bg-[#5B5FEF] text-white" : "border border-zinc-300 text-transparent"
              }`}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <span className={section.complete ? "text-zinc-600" : "text-zinc-400"}>{section.label}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Improve Resume
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
