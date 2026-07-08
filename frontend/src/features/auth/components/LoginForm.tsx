import type { ReactNode } from "react";

export interface LoginFormProps {
  title?: string;
  children?: ReactNode;
}

export function LoginForm({ title = "Log in", children }: LoginFormProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
      {children}
    </div>
  );
}
