// src/features/dashboard/types/dashboard.ts

import type { LucideIcon } from "lucide-react";
import type { CareerHealthResult } from "./careerHealth";

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

/**
 * Root dashboard model.
 * This is the single source of truth for everything rendered
 * on the Dashboard page.
 */
export interface Dashboard {
  // Existing dashboard widgets
  stats: StatItem[];
  focusTasks: FocusTask[];
  resumeHealth: ResumeHealth;
  coach: CareerCoachMessage;
  weeklyGoals: WeeklyGoal[];
  recentActivities: RecentActivityItem[];

  // Sprint 6
  careerHealth: CareerHealthResult;

  // Future widgets
  // github?: GitHubActivity;
  // portfolio?: PortfolioOverview;
  // certificates?: CertificateSummary;
  // jobApplications?: JobApplicationSummary;
  // aiCoach?: AICoachData;
}

/**
 * Generic helper types for future dashboard utilities.
 */
export type DashboardWidgetKey = keyof Dashboard;

export type DashboardWidgetData<K extends DashboardWidgetKey> =
  Dashboard[K];

export type PartialDashboard = Partial<Dashboard>;