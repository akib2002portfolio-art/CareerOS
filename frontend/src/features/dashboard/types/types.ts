import type { LucideIcon } from "lucide-react";

export interface StatItem {
  id: string;
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  accent: "violet" | "emerald" | "amber" | "zinc";
}

export interface FocusTask {
  id: string;
  title: string;
  meta: string;
  time: string;
  done: boolean;
  tag: "interview" | "application" | "networking" | "prep";
}

export interface ResumeSection {
  id: string;
  label: string;
  complete: boolean;
}

export interface WeeklyGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: LucideIcon;
}
