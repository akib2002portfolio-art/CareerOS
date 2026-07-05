import { useMemo } from 'react';
import type { CareerHealthCheck, CareerHealthResult } from '../types/careerHealth';
import { careerHealthService } from '../services/careerHealthService';

export function useCareerHealth(checks: CareerHealthCheck[]): CareerHealthResult {
  return useMemo(() => {
    return careerHealthService.calculateCareerHealth(checks);
  }, [checks]);
}