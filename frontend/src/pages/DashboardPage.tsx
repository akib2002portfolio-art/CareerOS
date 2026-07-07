import { Dashboard } from "@/features/dashboard/components/Dashboard";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export function DashboardPage() {
  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-zinc-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-red-500">{error ?? "Failed to load dashboard."}</p>
      </div>
    );
  }

  return <Dashboard dashboard={dashboard} />;
}
