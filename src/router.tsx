import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Scroll reset on navigation is handled by RouteTransition in
    // coordination with Lenis (stop → snap to top → resume) — leaving this
    // on would race that logic and cause the exact stutter it exists to
    // prevent. Trade-off: back/forward no longer restores prior scroll
    // position, only resets to top like a normal push navigation.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
