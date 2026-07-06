import { useMemo } from "react";
import type {
  CareerHealthCheck,
  CareerHealthResult,
} from "../types/careerHealth";
import { careerHealthService } from "../services/careerHealthService";

export interface UseCareerHealthResult {
  data: CareerHealthResult | null;
  loading: boolean;
  error: string | null;
}

export function useCareerHealth(
  checks: CareerHealthCheck[],
): UseCareerHealthResult {
  const data = useMemo(
    () => careerHealthService.calculateCareerHealth(checks),
    [checks],
  );

  return {
    data,
    loading: false,
    error: null,
  };
}