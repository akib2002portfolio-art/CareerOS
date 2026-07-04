import { FileText, MessageSquare, Send, Award } from "lucide-react";
import type { RecentActivityItem } from "../types/dashboard";

const ACTIVITY_ICONS = [FileText, Send, MessageSquare, Award];

interface RecentActivityProps {
  activities: RecentActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <h2 className="text-sm font-semibold text-zinc-900">Recent Activity</h2>

      <ol className="mt-4 flex flex-col">
        {activities.map((item, index) => {
          const Icon = ACTIVITY_ICONS[index % ACTIVITY_ICONS.length];
          const isLast = index === activities.length - 1;
          return (
            <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
              {!isLast && (
                <span className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-zinc-100" />
              )}
              <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-800">{item.title}</p>
                  <span className="shrink-0 font-mono text-[11px] text-zinc-400">{item.timestamp}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
