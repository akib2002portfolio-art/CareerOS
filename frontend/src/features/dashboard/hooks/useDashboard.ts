import { useEffect, useState } from "react";

import { dashboardService } from "../services/dashboardService";
import type { Dashboard } from "../types/dashboard";

export interface UseDashboardResult {
  dashboard: Dashboard | null;
  loading: boolean;
  error: string | null;
}

export function useDashboard(): UseDashboardResult {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const data = await dashboardService.getDashboard();

        if (isMounted) {
          setDashboard(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load dashboard data.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    dashboard,
    loading,
    error,
  };
}