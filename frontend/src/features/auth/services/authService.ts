export class AuthService {
  async signIn(): Promise<void> {
    return Promise.resolve();
  }

  async signOut(): Promise<void> {
    return Promise.resolve();
  }
}

export const authService = new AuthService();
