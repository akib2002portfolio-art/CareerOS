import type { LucideIcon } from "lucide-react";

export interface StatItem {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  accent: "indigo" | "emerald" | "amber" | "zinc";
}

export interface FocusTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ResumeHealth {
  score: number;
  title: string;
  description: string;
}

export interface CareerCoachMessage {
  title: string;
  message: string;
}

export interface WeeklyGoal {
  id: string;
  title: string;
  current: number;
  target: number;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  timestamp: string;
}

export interface DashboardData {
  stats: StatItem[];
  focusTasks: FocusTask[];
  resumeHealth: ResumeHealth;
  coach: CareerCoachMessage;
  weeklyGoals: WeeklyGoal[];
  recentActivities: RecentActivityItem[];
}