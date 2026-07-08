export interface LogoutButtonProps {
  label?: string;
}

export function LogoutButton({ label = "Log out" }: LogoutButtonProps) {
  return (
    <button
      type="button"
      className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
    >
      {label}
    </button>
  );
}
