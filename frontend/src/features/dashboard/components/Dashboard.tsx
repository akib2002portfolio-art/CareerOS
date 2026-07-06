import { useDashboard } from "../hooks/useDashboard";
import { DashboardHeader } from "./DashboardHeader";
import { StatsCard } from "./StatsCard";
import { TodaysFocus } from "./TodaysFocus";
import { ResumeProgress } from "./ResumeProgress";
import { CareerCoach } from "./CareerCoach";
import { WeeklyGoals } from "./WeeklyGoals";
import { RecentActivity } from "./RecentActivity";
import CareerHealthCard from "./CareerHealthCard";
import { careerHealthChecks } from "../data/careerHealthData";

export function Dashboard() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-zinc-500">Loading dashboard...</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-red-500">Failed to load dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHeader />

        <section className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {dashboard.stats.map((stat) => (
            <StatsCard key={stat.id} {...stat} />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <TodaysFocus tasks={dashboard.focusTasks} />
            <RecentActivity activities={dashboard.recentActivities} />
          </div>

          <div className="flex flex-col gap-6">
            <CareerCoach coach={dashboard.coach} />
            <ResumeProgress resumeHealth={dashboard.resumeHealth} />
            <CareerHealthCard checks={careerHealthChecks} />
            <WeeklyGoals goals={dashboard.weeklyGoals} />
          </div>
        </section>
      </div>
    </div>
  );
}
