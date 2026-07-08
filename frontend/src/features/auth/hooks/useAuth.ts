import type { AuthUser } from "../types/auth";

export interface UseAuthResult {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export function useAuth(): UseAuthResult {
  return {
    user: null,
    loading: false,
    error: null,
  };
}
