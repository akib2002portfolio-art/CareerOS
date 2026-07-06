import type { CareerHealthStatus } from "../types/careerHealth";

export interface StatusColorSet {
  ring: string;
  bar: string;
  badge: string;
}

const DEFAULT_COLORS: StatusColorSet = {
  ring: "stroke-indigo-500",
  bar: "bg-indigo-500",
  badge: "bg-indigo-50 text-indigo-600",
};

const STATUS_COLORS: Record<CareerHealthStatus, StatusColorSet> = {
  excellent: {
    ring: "stroke-emerald-500",
    bar: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-600",
  },
  good: {
    ring: "stroke-indigo-500",
    bar: "bg-indigo-500",
    badge: "bg-indigo-50 text-indigo-600",
  },
  "needs-attention": {
    ring: "stroke-amber-500",
    bar: "bg-amber-500",
    badge: "bg-amber-50 text-amber-600",
  },
  "at-risk": {
    ring: "stroke-rose-500",
    bar: "bg-rose-500",
    badge: "bg-rose-50 text-rose-600",
  },
};

export function getStatusColors(status: CareerHealthStatus): StatusColorSet {
  return STATUS_COLORS[status] ?? DEFAULT_COLORS;
}