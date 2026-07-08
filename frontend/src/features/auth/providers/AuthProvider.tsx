import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { authService } from "../services/authService";
import type { AuthUser } from "../types/auth";

export interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAuthenticated: false,
});

function mapSessionUser(session: Session | null): AuthUser | null {
  if (!session?.user?.id) {
    return null;
  }

  const metadata = session.user.user_metadata ?? {};
  const name = typeof metadata.full_name === "string"
    ? metadata.full_name
    : typeof metadata.name === "string"
      ? metadata.name
      : undefined;

  return {
    id: session.user.id,
    email: session.user.email ?? "",
    name,
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const syncAuthState = (session: Session | null) => {
      const nextUser = mapSessionUser(session);
      if (!isMounted) {
        return;
      }

      setUser(nextUser);
      setIsAuthenticated(Boolean(nextUser));
      setLoading(false);
    };

    const initializeAuth = async () => {
      try {
        const { data } = await authService.getSession();
        syncAuthState(data.session);
      } catch {
        if (isMounted) {
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
        }
      }
    };

    void initializeAuth();

    const { data: authSubscription } = authService.subscribeToAuthStateChange((_event, session) => {
      syncAuthState(session);
    });

    return () => {
      isMounted = false;
      authSubscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated,
    }),
    [user, loading, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
