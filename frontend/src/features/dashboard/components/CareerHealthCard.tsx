import type { CareerHealthResult } from "../types/careerHealth";
import CircularScore from "./CircularScore";
import ProgressBar from "./ProgressBar";

export interface CareerHealthCardProps {
  careerHealth: CareerHealthResult;
}

/**
 * Pure presentational component. It receives already-computed
 * career health data and renders the dashboard card.
 */
export default function CareerHealthCard({
  careerHealth,
}: CareerHealthCardProps) {
  const { score, maxScore, status, strengths, improvements, recommendation } =
    careerHealth;

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 sm:p-8">
      {/* Title */}
      <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-zinc-900 sm:mb-8">
        <span aria-hidden="true">💚</span> Career Health
      </h2>

      {/* Circular score */}
      <div className="mb-8 flex justify-center">
        <CircularScore score={score} maxScore={maxScore} status={status} />
      </div>

      {/* Horizontal progress bar */}
      <div className="mb-8 sm:mb-10">
        <ProgressBar score={score} maxScore={maxScore} status={status} />
      </div>

      {/* Two-column: strengths / improvements */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 sm:gap-8">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
            <span aria-hidden="true" className="text-indigo-500">
              ✓
            </span>
            Strengths
          </h3>
          <ul className="space-y-2.5">
            {strengths.length ? (
              strengths.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                  {item}
                </li>
              ))
            ) : (
              <li className="text-sm text-zinc-400">
                No strengths identified yet.
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900">
            <span aria-hidden="true">🎯</span>
            Improve Next
          </h3>
          <ul className="space-y-2.5">
            {improvements.length ? (
              improvements.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
                  {item}
                </li>
              ))
            ) : (
              <li className="text-sm text-zinc-400">
                Nothing pressing right now.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* AI recommendation panel */}
      <div className="rounded-xl bg-indigo-50/60 p-5 ring-1 ring-indigo-100 sm:p-6">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-700">
          <span aria-hidden="true">🤖</span>
          AI Recommendation
        </h3>
        <p className="text-sm leading-relaxed text-zinc-700">
          {recommendation}
        </p>
      </div>
    </div>
  );
}