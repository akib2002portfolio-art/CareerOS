import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, type LoginFormData } from '../components/LoginForm';
import { authService } from '../services/authService';

type LoginStatus = 'idle' | 'loading' | 'success' | 'error';

export function LoginPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<LoginStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: LoginFormData) => {
    setStatus('loading');
    setErrorMessage(null);

    const { error } = await authService.login(data.email, data.password);

    if (error) {
      setStatus('error');
      setErrorMessage(error.message ?? 'Unable to sign in. Please try again.');
      return;
    }

    setStatus('success');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
          <p className="mt-1 text-sm text-slate-600">
            Welcome back to CareerOS.
          </p>
        </div>

        {status === 'success' && (
          <div
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            Signed in successfully.
          </div>
        )}

        {status === 'error' && errorMessage && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {errorMessage}
          </div>
        )}

        <LoginForm
          onSubmit={handleSubmit}
          onCreateAccount={() => navigate('/register')}
        />

        {status === 'loading' && (
          <p className="text-center text-sm text-slate-500" role="status">
            Signing in...
          </p>
        )}
      </div>
    </div>
  );
}