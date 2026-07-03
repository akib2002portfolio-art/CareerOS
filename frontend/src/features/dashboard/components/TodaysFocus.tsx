import { useState } from "react";
import { CheckCircle2, Circle, Video, Send, Users, BookOpen } from "lucide-react";
import type { FocusTask } from "../types/types";

const TAG_ICON: Record<FocusTask["tag"], typeof Video> = {
  interview: Video,
  application: Send,
  networking: Users,
  prep: BookOpen,
};

const TAG_LABEL: Record<FocusTask["tag"], string> = {
  interview: "Interview",
  application: "Application",
  networking: "Networking",
  prep: "Prep",
};

const INITIAL_TASKS: FocusTask[] = [
  { id: "1", title: "Improve Resume Keywords", meta: "Target role: Frontend Engineer", time: "10:00 AM", done: false, tag: "prep" },
  { id: "2", title: "Push CareerOS to GitHub", meta: "Publish README + CI", time: "12:30 PM", done: false, tag: "prep" },
  { id: "3", title: "Apply to 5 Frontend Jobs", meta: "Prioritize tailored resumes", time: "2:00 PM", done: false, tag: "application" },
  { id: "4", title: "Complete LinkedIn Profile", meta: "Add projects and highlights", time: "4:30 PM", done: false, tag: "networking" },
];

export function TodaysFocus() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const remaining = tasks.filter((t) => !t.done).length;

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Today's Focus</h2>
        <span className="font-mono text-xs text-zinc-400">{remaining} remaining</span>
      </div>

      <ul className="mt-4 flex flex-col divide-y divide-zinc-100">
        {tasks.map((task) => {
          const TagIcon = TAG_ICON[task.tag];
          return (
            <li key={task.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggle(task.id)}
                aria-label={task.done ? "Mark incomplete" : "Mark complete"}
                className="shrink-0 text-zinc-300 hover:text-[#5B5FEF]"
              >
                {task.done ? (
                  <CheckCircle2 className="h-5 w-5 text-[#5B5FEF]" strokeWidth={2} />
                ) : (
                  <Circle className="h-5 w-5" strokeWidth={1.5} />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-medium ${task.done ? "text-zinc-400 line-through" : "text-zinc-800"}`}>
                  {task.title}
                </p>
                <p className="truncate text-xs text-zinc-400">{task.meta}</p>
              </div>

              <div className="hidden shrink-0 items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-zinc-500 sm:flex">
                <TagIcon className="h-3 w-3" />
                <span className="font-mono text-[11px]">{TAG_LABEL[task.tag]}</span>
              </div>

              <span className="shrink-0 font-mono text-xs text-zinc-400">{task.time}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
