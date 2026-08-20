import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";

import { getLenis } from "./SmoothScroll";
import { EASE_GLIDE } from "@/lib/motion";

/**
 * Fade+scale transition between routes, coordinated with Lenis so rapid
 * navigation (clicking several nav links in quick succession) can't leave
 * residual inertia scrolling under the outgoing page or flash the incoming
 * page at the previous scroll offset.
 *
 * Two independent effects, not one gated behind the other:
 *  - The "pending" effect is best-effort. TanStack Router can resolve a
 *    navigation synchronously for routes with no async loader, in which
 *    case status never observably passes through "pending" and this
 *    effect simply never fires — that's fine, it's just an early-as-
 *    possible freeze for the routes that do have a pending phase.
 *  - The pathname effect is what actually guarantees correctness: it
 *    runs on every completed navigation regardless of whether the route
 *    had a pending phase, so Lenis is never left stopped.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const status = useRouterState({ select: (s) => s.status });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduced = useReducedMotion();

  // Best-effort: stop Lenis the instant navigation is requested.
  // Safe to no-op if this route resolves too fast to observe "pending".
  useEffect(() => {
    if (status === "pending") getLenis()?.stop();
  }, [status]);

  // GUARANTEED on every completed navigation, unconditionally — this is
  // what prevents Lenis from ever being left stopped after a route change,
  // even when the route above never passed through "pending" (synchronous
  // navigation) or when the same link is clicked twice in a row.
  useEffect(() => {
    const lenis = getLenis();
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
    lenis?.start();
  }, [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.99, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.99, filter: "blur(6px)" }}
        transition={{ duration: 0.55, ease: EASE_GLIDE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
