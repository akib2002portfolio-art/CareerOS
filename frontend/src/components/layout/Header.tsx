import { useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/resumes": "Resumes",
  "/projects": "Projects",
  "/career-vault": "Career Vault",
  "/job-tracker": "Job Tracker",
  "/ai-assistant": "AI Assistant",
  "/settings": "Settings",
};

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex w-full flex-col gap-4 border-b border-zinc-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      {/* Title */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-zinc-900 sm:text-xl">
          {title}
        </h1>

        <p className="text-sm text-zinc-500">
          Build your career one commit at a time.
        </p>
      </div>

      {/* Search */}
      <div className="w-full sm:max-w-lg sm:flex-1">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

          <input
            type="text"
            placeholder="Search CareerOS..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 text-sm text-zinc-700 placeholder:text-zinc-400 transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition-all duration-200 hover:bg-zinc-100 hover:text-indigo-600"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-500" />
        </button>

        <button
          type="button"
          aria-label="User menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
        >
          A
        </button>
      </div>
    </header>
  );
}