import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import type { FocusTask } from "../types/dashboard";

interface TodaysFocusProps {
  tasks: FocusTask[];
}

export function TodaysFocus({ tasks: initialTasks }: TodaysFocusProps) {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const remaining = tasks.filter((task) => !task.completed).length;

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Today's Focus</h2>
        <span className="font-mono text-xs text-zinc-400">{remaining} remaining</span>
      </div>

      <ul className="mt-4 flex flex-col divide-y divide-zinc-100">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <button
              type="button"
              onClick={() => toggle(task.id)}
              aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
              className="shrink-0 text-zinc-300 hover:text-[#5B5FEF]"
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-[#5B5FEF]" strokeWidth={2} />
              ) : (
                <Circle className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-medium ${task.completed ? "text-zinc-400 line-through" : "text-zinc-800"}`}>
                {task.title}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
