// frontend/src/features/auth/services/authService.ts

import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

/**
 * AuthService
 *
 * Framework-agnostic authentication service wrapping the shared Supabase client.
 * Contains no React imports and no UI logic — safe to use from hooks, services,
 * or any other consumer layer.
 *
 * Errors are intentionally NOT caught here; callers are responsible for handling
 * auth errors (e.g. invalid credentials, network failures) as they see fit.
 */
export class AuthService {
  async register(email: string, password: string) {
    // TODO:
    // After successful sign-up, create the user's
    // Professional Identity profile.
    return supabase.auth.signUp({ email, password });
  }

  async login(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async logout() {
    return supabase.auth.signOut();
  }

  async getCurrentUser() {
    return supabase.auth.getUser();
  }

  async getSession() {
    return supabase.auth.getSession();
  }

  subscribeToAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();
