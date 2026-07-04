import { ArrowRight } from "lucide-react";
import type { ResumeHealth } from "../types/dashboard";

interface ResumeProgressProps {
  resumeHealth: ResumeHealth;
}

export function ResumeProgress({ resumeHealth }: ResumeProgressProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Resume Health</h2>
        <span className="font-mono text-xs font-medium text-[#5B5FEF]">{resumeHealth.score}%</span>
      </div>

      <div className="mt-4 rounded-lg bg-zinc-50 p-3">
        <p className="text-sm font-medium text-zinc-700">{resumeHealth.title}</p>
        <p className="mt-1 text-sm text-zinc-500">{resumeHealth.description}</p>
      </div>

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
