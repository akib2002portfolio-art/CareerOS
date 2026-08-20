import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Wordmark } from "./Wordmark";

/**
 * Mouse-tracked spotlight over the big outlined footer wordmark: a solid-fill
 * twin of the text is masked to a soft circle centred on the cursor (via
 * --spot-x/--spot-y custom properties, updated directly through the ref to
 * avoid a re-render per pointermove), so the letterforms brighten under and
 * near the pointer. Disabled on coarse/touch pointers — same detection
 * pattern as Cursor.tsx — where there's no persistent cursor position to
 * track, leaving just the higher-contrast static outline.
 */
function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      node.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    };
    const onLeave = () => {
      node.style.setProperty("--spot-x", "-1000px");
      node.style.setProperty("--spot-y", "-1000px");
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="relative" aria-hidden="true">
      <p className="wordmark-outline select-none">CareerOS</p>
      <p className="wordmark-outline-fill absolute inset-0 select-none">CareerOS</p>
    </div>
  );
}

const columns = [
  {
    title: "Product",
    links: [
      { label: "Home", to: "/" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", to: "/signin" },
      { label: "Get Started", to: "/signup" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Closing visual moment: oversized outlined wordmark as a full stop. */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-5 pb-4 pt-16 sm:px-8 sm:pt-24">
          <FooterWordmark />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 border-t border-border px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            A career progression system for students and fresh graduates entering technology.
            Understand where you are, decide where you're going, and turn effort into evidence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="label-mono">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="link-underline text-base text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 border-t border-border px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} CareerOS. Building in the open.</p>
        <p className="label-mono">Early access · Student beta</p>
      </div>
    </footer>
  );
}
