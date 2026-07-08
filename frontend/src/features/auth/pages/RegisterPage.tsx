// frontend/src/features/auth/pages/RegisterPage.tsx

import { useState } from "react";

import { RegisterForm } from "../components/RegisterForm";
import type { RegisterFormData } from "../components/RegisterForm";
import { authService } from "../services/authService";

type RegisterStatus = "idle" | "loading" | "error" | "success";

export function RegisterPage() {
  const [status, setStatus] = useState<RegisterStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: RegisterFormData) => {
    setStatus("loading");
    setErrorMessage(null);

    const { error } = await authService.register(data.email, data.password);

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
      return;
    }

    // TODO:
    // After successful registration, create the user's
    // Professional Identity profile using data.fullName.

    setStatus("success");
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4 py-10">
      <h1 className="text-xl font-semibold text-slate-900">
        Create your account
      </h1>

      {status === "success" ? (
        <p
          role="status"
          className="w-full max-w-md rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          🎉 Your CareerOS account has been created! Please check your email
          to verify your account before signing in.
        </p>
      ) : (
        <>
          {status === "error" && errorMessage && (
            <p
              role="alert"
              className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          <fieldset
            disabled={status === "loading"}
            className="w-full max-w-md border-0 p-0 disabled:opacity-60"
          >
            <RegisterForm onSubmit={handleSubmit} />
          </fieldset>

          {status === "loading" && (
            <p role="status" className="text-sm text-slate-500">
              Creating your account…
            </p>
          )}
        </>
      )}
    </div>
  );
}