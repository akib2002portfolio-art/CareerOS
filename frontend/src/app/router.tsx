import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";
import { ProfessionalIdentityPage } from "@/features/professional-identity";
import { DashboardPage } from "@/pages/DashboardPage";
import { ResumePage } from "@/pages/ResumePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { CareerVaultPage } from "@/pages/CareerVaultPage";
import { JobTrackerPage } from "@/pages/JobTrackerPage";
import { AIAssistantPage } from "@/pages/AIAssistantPage";
import { SettingsPage } from "@/pages/SettingsPage";

import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

const router = createBrowserRouter([
  // TODO: Replace with LandingPage in Phase 4.
{
  path: "/",
  element: <Navigate to="/login" replace />,
},
  {
  path: "/professional-identity",
  element: <ProfessionalIdentityPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  // Protected Application
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/resumes",
        element: <ResumePage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/career-vault",
        element: <CareerVaultPage />,
      },
      {
        path: "/job-tracker",
        element: <JobTrackerPage />,
      },
      {
        path: "/ai-assistant",
        element: <AIAssistantPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;