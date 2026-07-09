import { useState, type FormEvent } from 'react';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit(data: LoginFormData): void;
  onCreateAccount(): void;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: LoginFormData): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!data.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export function LoginForm({ onSubmit, onCreateAccount }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const handleChange = (field: keyof LoginFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-sm mx-auto flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="login-email"
          className="text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'login-email-error' : undefined}
          className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition-colors focus:ring-2 focus:ring-offset-0 ${
            errors.email
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-slate-500 focus:ring-slate-200'
          }`}
        />
        {errors.email && (
          <p id="login-email-error" role="alert" className="text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="login-password"
          className="text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange('password')}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'login-password-error' : undefined}
          className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition-colors focus:ring-2 focus:ring-offset-0 ${
            errors.password
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-slate-500 focus:ring-slate-200'
          }`}
        />
        {errors.password && (
          <p id="login-password-error" role="alert" className="text-sm text-red-600">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        Sign In
      </button>

      <p className="text-center text-sm text-slate-600">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onCreateAccount}
          className="font-medium text-slate-900 hover:underline"
        >
          Create one
        </button>
      </p>
    </form>
  );
}