import type{ CareerHealthCheck, CareerHealthResult } from '../types/careerHealth';

export class CareerHealthService {
  public calculateCareerHealth(checks: CareerHealthCheck[]): CareerHealthResult {
    const maxScore = checks.reduce((sum, check) => sum + check.points, 0);

    const score = checks
      .filter((check) => check.completed === true)
      .reduce((sum, check) => sum + check.points, 0);

    const strengths = checks
      .filter((check) => check.completed === true)
      .map((check) => check.title);

    const improvements = checks
      .filter((check) => check.completed === false)
      .map((check) => check.title);

    let recommendation: string;

    if (score >= 80) {
      recommendation = 'Excellent progress. Focus on consistency.';
    } else if (score >= 60) {
      recommendation = 'Good progress. Complete a few more career tasks.';
    } else {
      recommendation = 'Focus on completing your resume, portfolio, and GitHub profile.';
    }

    return {
      score,
      maxScore,
      strengths,
      improvements,
      recommendation
    };
  }
}

export const careerHealthService = new CareerHealthService();