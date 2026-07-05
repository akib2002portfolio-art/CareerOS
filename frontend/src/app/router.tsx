import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";
import { AIAssistantPage } from "@/pages/AIAssistantPage";
import { CareerVaultPage } from "@/pages/CareerVaultPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { JobTrackerPage } from "@/pages/JobTrackerPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ResumePage } from "@/pages/ResumePage";
import { SettingsPage } from "@/pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "resumes", element: <ResumePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "career-vault", element: <CareerVaultPage /> },
      { path: "job-tracker", element: <JobTrackerPage /> },
      { path: "ai-assistant", element: <AIAssistantPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
