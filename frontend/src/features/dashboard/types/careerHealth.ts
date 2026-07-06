export interface CareerHealthCheck {
  id: string;
  title: string;
  completed: boolean;
  points: number;
}

export type CareerHealthStatus =
  | "excellent"
  | "good"
  | "needs-attention"
  | "at-risk";

export interface CareerHealthResult {
  score: number;
  maxScore: number;
  status: CareerHealthStatus;
  strengths: string[];
  improvements: string[];
  recommendation: string;
}