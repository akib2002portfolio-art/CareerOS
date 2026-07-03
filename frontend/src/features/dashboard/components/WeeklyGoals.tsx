import { Target } from "lucide-react";
import type { WeeklyGoal } from "../types/types";

const GOALS: WeeklyGoal[] = [
  { id: "1", label: "Applications Submitted", current: 3, target: 5, unit: "" },
  { id: "2", label: "GitHub Commits", current: 12, target: 20, unit: "" },
  { id: "3", label: "Resume Improvements", current: 2, target: 4, unit: "" },
  { id: "4", label: "Networking Messages", current: 5, target: 10, unit: "" },
];

export function WeeklyGoals() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Weekly Goals</h2>
        <Target className="h-4 w-4 text-zinc-400" />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {GOALS.map((goal) => {
          const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const isDone = goal.current >= goal.target;
          return (
            <div key={goal.id}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-zinc-600">{goal.label}</span>
                <span className="font-mono text-xs text-zinc-400">
                  {goal.current}
                  {goal.unit} / {goal.target}
                  {goal.unit}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                <div
                  className={`h-full rounded-full transition-all ${isDone ? "bg-emerald-500" : "bg-[#5B5FEF]"}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
