// frontend/src/features/auth/components/RegisterForm.tsx

import { useState } from "react";
import type { FormEvent } from "react";

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterFormProps {
  onSubmit(data: RegisterFormData): void;
}

interface RegisterFormFields extends RegisterFormData {
  confirmPassword: string;
}

type RegisterFormErrors = Partial<Record<keyof RegisterFormFields, string>>;

const INITIAL_FIELDS: RegisterFormFields = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function validate(fields: RegisterFormFields): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  const trimmedEmail = fields.email.trim();
  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (!fields.password) {
    errors.password = "Password is required.";
  }

  if (!fields.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (fields.password && fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [fields, setFields] = useState<RegisterFormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const handleChange =
    (field: keyof RegisterFormFields) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFields((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(fields);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      fullName: fields.fullName.trim(),
      email: fields.email.trim(),
      password: fields.password,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full max-w-md flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={fields.fullName}
          onChange={handleChange("fullName")}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className="rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-100"
          placeholder="Jane Doe"
        />
        {errors.fullName && <p id="fullName-error" className="text-sm text-red-600">{errors.fullName}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={handleChange("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-100"
          placeholder="jane@example.com"
        />
        {errors.email && <p id="email-error" className="text-sm text-red-600">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={fields.password}
          onChange={handleChange("password")}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          className="rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-100"
          placeholder="••••••••"
        />
        {errors.password && <p id="password-error" className="text-sm text-red-600">{errors.password}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={fields.confirmPassword}
          onChange={handleChange("confirmPassword")}
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
          className="rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-200 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-100"
          placeholder="••••••••"
        />
        {errors.confirmPassword && <p id="confirmPassword-error" className="text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?
        <button type="button" className="ml-1 font-medium text-indigo-600 hover:underline">
          Sign In
        </button>
      </p>
    </form>
  );
}