import { useState } from 'react';
import { authService } from '../services/authService';

export function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setErrorMessage(null);

    const { error } = await authService.logout();

    if (error) {
      setErrorMessage(error.message ?? 'Unable to sign out. Please try again.');
      setIsLoggingOut(false);
      return;
    }

    // No manual state clearing here — AuthProvider reacts to the
    // session change and ProtectedRoute redirects accordingly.
  };

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoggingOut ? 'Signing out...' : 'Sign out'}
      </button>

      {errorMessage && (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
