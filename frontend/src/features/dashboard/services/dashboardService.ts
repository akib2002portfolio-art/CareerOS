import { mockDashboard } from "../data/mockDashboard";
import { careerHealthChecks } from "../data/careerHealthData";

import type { Dashboard } from "../types/dashboard";

import { careerHealthService } from "./careerHealthService";

export class DashboardService {
  /**
   * Returns the complete Dashboard.
   *
   * Currently composes data from mock sources.
   * Later this method will fetch everything from Supabase.
   */
  async getDashboard(): Promise<Dashboard> {
    const careerHealth =
      careerHealthService.calculateCareerHealth(careerHealthChecks);

    return {
      ...mockDashboard,
      careerHealth,
    };
  }
}

export const dashboardService = new DashboardService();