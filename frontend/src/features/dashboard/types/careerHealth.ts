export interface CareerHealthCheck {
  id: string;
  title: string;
  completed: boolean;
  points: number;
}
 
export interface CareerHealthResult {
  score: number;
  maxScore: number;
  strengths: string[];
  improvements: string[];
  recommendation: string;
}