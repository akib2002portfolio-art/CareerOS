import type { CareerHealthStatus } from "../types/careerHealth";

import { getStatusColors } from "../constants/statusColors";
import {
  getCircleGeometry,
  getPercentage,
} from "../utils/circleProgress";

interface CircularScoreProps {
  score: number;
  maxScore: number;
  status: CareerHealthStatus;
}

export default function CircularScore({
  score,
  maxScore,
  status,
}: CircularScoreProps) {
  const percentage = getPercentage(score, maxScore);
  const { radius, circumference, offset } = getCircleGeometry(percentage);
  const colors = getStatusColors(status);
  const statusLabel = {
  excellent: "Excellent",
  good: "Good",
  "needs-attention": "Needs Attention",
  "at-risk": "At Risk",
}[status];

  return (
    <div className="relative flex h-44 w-44 items-center justify-center sm:h-48 sm:w-48">
      <svg
        viewBox="0 0 160 160"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="12"
          className="stroke-zinc-100"
        />
        {/* Progress ring */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-700 ease-out ${colors.ring}`}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-zinc-900 sm:text-5xl">
          {percentage}
          <span className="text-xl font-semibold text-zinc-400">%</span>
        </span>
        <span
          className={`mt-2 rounded-full px-3 py-1 text-xs font-medium ${colors.badge}`}
        >
          {statusLabel}
        </span>
      </div>
    </div>
  );
}