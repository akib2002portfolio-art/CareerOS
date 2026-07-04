import { Calendar, FileText, FolderGit2, Target } from "lucide-react";

import type { DashboardData } from "../types/dashboard";

export const mockDashboard: DashboardData = {
  stats: [
    {
      id: "career-score",
      title: "Career Score",
      value: "82",
      change: "+4",
      trend: "up",
      icon: Target,
      accent: "indigo",
    },
    {
      id: "resume-health",
      title: "Resume Health",
      value: "91%",
      change: "Excellent",
      trend: "up",
      icon: FileText,
      accent: "emerald",
    },
    {
      id: "projects-ready",
      title: "Projects Ready",
      value: "8",
      change: "+2",
      trend: "up",
      icon: FolderGit2,
      accent: "amber",
    },
    {
      id: "ats-match",
      title: "ATS Match",
      value: "87%",
      change: "+6%",
      trend: "up",
      icon: Calendar,
      accent: "zinc",
    },
  ],

  focusTasks: [
    {
      id: "1",
      title: "Improve Resume Keywords",
      completed: false,
    },
    {
      id: "2",
      title: "Push CareerOS to GitHub",
      completed: true,
    },
    {
      id: "3",
      title: "Apply to 5 Frontend Jobs",
      completed: false,
    },
    {
      id: "4",
      title: "Complete LinkedIn Profile",
      completed: true,
    },
  ],

  resumeHealth: {
    score: 91,
    title: "Resume Health",
    description:
      "Your resume is strong. Improve ATS keywords to reach 95%.",
  },

  coach: {
    title: "AI Career Coach",
    message:
      "Your Career Score has improved this week. Strengthen your resume keywords and continue building CareerOS to improve your ATS Match.",
  },

  weeklyGoals: [
    {
      id: "1",
      title: "Applications Submitted",
      current: 3,
      target: 5,
    },
    {
      id: "2",
      title: "GitHub Commits",
      current: 4,
      target: 7,
    },
    {
      id: "3",
      title: "Resume Improvements",
      current: 2,
      target: 3,
    },
    {
      id: "4",
      title: "Networking Messages",
      current: 1,
      target: 5,
    },
  ],

  recentActivities: [
    {
      id: "1",
      title: "Updated CareerOS dashboard",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Improved resume keywords",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      title: "Applied to Frontend Developer role",
      timestamp: "2 days ago",
    },
  ],
};