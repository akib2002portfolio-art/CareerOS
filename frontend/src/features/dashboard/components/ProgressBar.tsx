import type { CareerHealthStatus } from "../types/careerHealth";
import { getStatusColors } from "../constants/statusColors";
import { getPercentage, getSafeMaxScore } from "../utils/circleProgress";

interface ProgressBarProps {
  score: number;
  maxScore: number;
  status: CareerHealthStatus;
}
export default function ProgressBar({
  score,
  maxScore,
  status,
}: ProgressBarProps) {
  const percentage = getPercentage(score, maxScore);
  const safeMax = getSafeMaxScore(maxScore);
  const colors = getStatusColors(status);

  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-zinc-400">
        <span>Overall Progress</span>
        <span className="text-zinc-500">
          {score}/{safeMax}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}