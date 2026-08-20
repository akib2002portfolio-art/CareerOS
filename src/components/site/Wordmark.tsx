import { Link } from "@tanstack/react-router";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label="CareerOS home"
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="overflow-visible"
      >
        <circle cx="4" cy="16" r="2.6" fill="var(--signal)" />
        <circle
          cx="16"
          cy="4"
          r="2.6"
          className="fill-none stroke-paper transition-all duration-500 group-hover:fill-[var(--signal)]"
          strokeWidth="1.5"
        />
        <path
          d="M4.4 15.6 C 8 12, 8 8, 15.6 4.4"
          stroke="var(--paper)"
          strokeWidth="1.3"
          strokeOpacity="0.55"
          fill="none"
          strokeDasharray="2 2.5"
        />
      </svg>
      <span className="font-display text-[1.85rem] font-semibold tracking-tight">
        Career<span className="text-signal">OS</span>
      </span>
    </Link>
  );
}
