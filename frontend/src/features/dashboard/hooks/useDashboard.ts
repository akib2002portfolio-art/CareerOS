import { useEffect, useState } from "react";

import { dashboardService } from "../services/dashboardService";
import type { DashboardData } from "../types/dashboard";

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await dashboardService.getDashboardData();
        setDashboard(data);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
  };
}