import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Briefcase,
  Bot,
  Settings,
 Archive,
  User,
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Resumes",
    path: "/resumes",
    icon: FileText,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Career Vault",
    path: "/career-vault",
    icon: Archive,
  },
  {
    label: "Job Tracker",
    path: "/job-tracker",
    icon: Briefcase,
  },
  {
    label: "AI Assistant",
    path: "/ai-assistant",
    icon: Bot,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-200 bg-white">

      {/* Brand */}
      <div className="border-b border-zinc-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-sm">
            🚀
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              CareerOS
            </h1>

            <p className="text-xs text-zinc-500">
              Personal Career Operating System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `
              group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
              transition-all duration-200

              ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }
            `
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                )}

                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 group-hover:text-zinc-900"
                  }`}
                />

                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-zinc-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100">
            <User className="h-5 w-5 text-indigo-600" />
          </div>

          <div className="flex-1 text-left">
            <p className="truncate text-sm font-semibold text-zinc-900">
              Akib Al Imran
            </p>

            <p className="truncate text-xs text-zinc-500">
              Software Engineer
            </p>
          </div>

          <span className="text-zinc-400">›</span>
        </button>
      </div>
    </aside>
  );
}