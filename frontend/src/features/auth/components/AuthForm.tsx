export interface AuthFormProps {
  title?: string;
  children?: React.ReactNode;
}

export function AuthForm({ title, children }: AuthFormProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      {title ? <h2 className="text-lg font-semibold text-zinc-900">{title}</h2> : null}
      {children}
    </div>
  );
}
