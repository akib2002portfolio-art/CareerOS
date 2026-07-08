import type { ReactNode } from "react";

export interface RegisterFormProps {
  title?: string;
  children?: ReactNode;
}

export function RegisterForm({ title = "Create account", children }: RegisterFormProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
      {children}
    </div>
  );
}
