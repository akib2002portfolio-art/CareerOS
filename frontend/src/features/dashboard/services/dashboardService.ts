import { mockDashboard } from "../data/mockDashboard";
import type { DashboardData } from "../types/dashboard";

export class DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    // Future:
    // Fetch data from Supabase API

    return Promise.resolve(mockDashboard);
  }
}

export const dashboardService = new DashboardService();