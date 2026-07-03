import { Search, Bell, Flame } from "lucide-react";

const WEEK_ACTIVITY: { day: string; level: 0 | 1 | 2 | 3 }[] = [
  { day: "M", level: 2 },
  { day: "T", level: 3 },
  { day: "W", level: 1 },
  { day: "T", level: 3 },
  { day: "F", level: 2 },
  { day: "S", level: 0 },
  { day: "S", level: 1 },
];

const LEVEL_STYLES: Record<0 | 1 | 2 | 3, string> = {
  0: "bg-zinc-100",
  1: "bg-[#5B5FEF]/25",
  2: "bg-[#5B5FEF]/60",
  3: "bg-[#5B5FEF]",
};

export function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-zinc-400">
          {today}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
          Good morning, Akib 👋
        </h1>
        <p className="mt-1 text-sm text-zinc-600">Build your career one commit at a time.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 sm:flex">
          <Flame className="h-3.5 w-3.5 text-amber-500" strokeWidth={2.5} />
          <span className="font-mono text-xs font-medium text-zinc-600">
            12 day streak
          </span>
          <div className="ml-2 flex items-center gap-1">
            {WEEK_ACTIVITY.map((d, i) => (
              <span
                key={i}
                title={d.day}
                className={`h-3.5 w-1.5 rounded-full ${LEVEL_STYLES[d.level]}`}
              />
            ))}
          </div>
        </div>

        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-56 rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-[#5B5FEF] focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/20"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg border border-zinc-200 bg-white p-2 text-zinc-500 hover:text-zinc-900"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
        </button>

        <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-[#5B5FEF] to-[#8B8FFF] text-center font-mono text-sm font-medium leading-9 text-white">
          A
        </div>
      </div>
    </header>
  );
}
