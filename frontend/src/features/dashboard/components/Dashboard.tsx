import { Send, Users, Calendar, TrendingUp } from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { StatsCard } from "./StatsCard";
import { TodaysFocus } from "./TodaysFocus";
import { ResumeProgress } from "./ResumeProgress";
import { CareerCoach } from "./CareerCoach";
import { WeeklyGoals } from "./WeeklyGoals";
import { RecentActivity } from "./RecentActivity";
import type { StatItem } from "../types/types";

const STATS: StatItem[] = [
  { id: "1", label: "Career Score", value: "82", delta: "+4", trend: "up", icon: TrendingUp, accent: "violet" },
  { id: "2", label: "Resume Health", value: "91%", delta: "Excellent", trend: "up", icon: Send, accent: "emerald" },
  { id: "3", label: "Projects Ready", value: "8", delta: "+2", trend: "up", icon: Calendar, accent: "amber" },
  { id: "4", label: "ATS Match", value: "87%", delta: "+6%", trend: "up", icon: Users, accent: "zinc" },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-50">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHeader />

          <section className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatsCard key={stat.id} {...stat} />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <TodaysFocus />
            <RecentActivity />
          </div>

          <div className="flex flex-col gap-6">
            <CareerCoach />
            <ResumeProgress />
            <WeeklyGoals />
          </div>
        </section>
      </div>
    </div>
  );
}
