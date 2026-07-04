import { Sparkles, ArrowRight } from "lucide-react";
import type { CareerCoachMessage } from "../types/dashboard";

interface CareerCoachProps {
  coach: CareerCoachMessage;
}

export function CareerCoach({ coach }: CareerCoachProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-[#5B5FEF] to-[#4144C4] p-5 text-white transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -right-2 h-20 w-20 rounded-full bg-white/10" />

      <div className="relative flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <h2 className="text-sm font-semibold">{coach.title}</h2>
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-white/85">{coach.message}</p>

      <button
        type="button"
        className="relative mt-4 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-[#5B5FEF] hover:bg-white/90"
      >
        Get tailored advice
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
