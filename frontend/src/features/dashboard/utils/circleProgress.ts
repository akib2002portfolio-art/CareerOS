export function getSafeMaxScore(maxScore: number): number {
  return maxScore > 0 ? maxScore : 100;
}

export function getPercentage(score: number, maxScore: number): number {
  const safeMax = getSafeMaxScore(maxScore);
  const raw = Math.round((score / safeMax) * 100);
  return Math.max(0, Math.min(100, raw));
}

export interface CircleGeometry {
  radius: number;
  circumference: number;
  offset: number;
}

export function getCircleGeometry(
  percentage: number,
  radius = 70,
): CircleGeometry {
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percentage));
  const offset = circumference - (clamped / 100) * circumference;

  return {
    radius,
    circumference,
    offset,
  };
}