/**
 * Shared easing curves for a consistent, cinematic feel across the site.
 * Modeled on the long, decelerating "glide" curves used by premium
 * WebGL/motion studios (Lusion, Active Theory, etc.) rather than the
 * shorter default eases — everything should settle, never snap.
 */

/** Long, buttery deceleration. The default for reveals, panels, cards. */
export const EASE_GLIDE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Slightly snappier deceleration, for smaller/quicker UI moments. */
export const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Gentle ease-in-out for looping/ambient motion (marquees, orbits). */
export const EASE_AMBIENT: [number, number, number, number] = [0.45, 0, 0.55, 1];

/** Standard spring tuned for a heavy, premium (not twitchy) response. */
export const SPRING_SOFT = { type: "spring", stiffness: 120, damping: 20, mass: 0.6 } as const;

/** Slower spring for large-scale cursor-follow / parallax elements. */
export const SPRING_HEAVY = { type: "spring", stiffness: 40, damping: 20, mass: 1.2 } as const;
