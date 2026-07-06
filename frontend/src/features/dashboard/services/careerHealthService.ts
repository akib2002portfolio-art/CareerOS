import type {
  CareerHealthCheck,
  CareerHealthResult,
  CareerHealthStatus,
} from "../types/careerHealth";

const EXCELLENT_SCORE = 80;
const GOOD_SCORE = 60;
const NEEDS_ATTENTION_SCORE = 40;

export class CareerHealthService {
  public calculateCareerHealth(
    checks: CareerHealthCheck[],
  ): CareerHealthResult {
    const maxScore = checks.reduce(
      (sum, check) => sum + check.points,
      0,
    );

    const score = checks
      .filter((check) => check.completed)
      .reduce((sum, check) => sum + check.points, 0);

    const strengths = checks
      .filter((check) => check.completed)
      .map((check) => check.title);

    const improvements = checks
      .filter((check) => !check.completed)
      .map((check) => check.title);

    const status = this.getStatus(score);

    return {
      score,
      maxScore,
      status,
      strengths,
      improvements,
      recommendation: this.getRecommendation(status),
    };
  }

  private getStatus(score: number): CareerHealthStatus {
    if (score >= EXCELLENT_SCORE) {
      return "excellent";
    }

    if (score >= GOOD_SCORE) {
      return "good";
    }

    if (score >= NEEDS_ATTENTION_SCORE) {
      return "needs-attention";
    }

    return "at-risk";
  }

  private getRecommendation(status: CareerHealthStatus): string {
    switch (status) {
      case "excellent":
        return "Excellent progress. Focus on consistency.";

      case "good":
        return "Good progress. Complete a few more career tasks.";

      case "needs-attention":
        return "Focus on completing your resume, portfolio, and GitHub profile.";

      case "at-risk":
        return "Your career health needs attention. Start with the highest-impact tasks below.";
    }
  }
}

export const careerHealthService = new CareerHealthService();