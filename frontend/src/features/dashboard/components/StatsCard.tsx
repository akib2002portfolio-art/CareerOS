import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import type { StatItem } from "../types/dashboard";

const ACCENT_STYLES: Record<StatItem["accent"], string> = {
  indigo: "bg-[#5B5FEF]/10 text-[#5B5FEF]",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  zinc: "bg-zinc-100 text-zinc-600",
};

const TREND_STYLES: Record<NonNullable<StatItem["trend"]>, string> = {
  up: "text-emerald-600",
  down: "text-red-500",
  neutral: "text-zinc-400",
};

const TREND_ICON = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
};

export function StatsCard({ title, value, change, trend, icon: Icon, accent }: StatItem) {
  const TrendIcon = trend ? TREND_ICON[trend] : null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300">
      <div className="flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${ACCENT_STYLES[accent]}`}>
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        {change && trend && TrendIcon && (
          <span className={`flex items-center gap-0.5 font-mono text-xs font-medium ${TREND_STYLES[trend]}`}>
            <TrendIcon className="h-3 w-3" />
            {change}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">{value}</p>
      <p className="mt-0.5 text-sm text-zinc-500">{title}</p>
    </div>
  );
}
