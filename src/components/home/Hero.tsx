import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

import { ActionLink } from "../site/ActionButton";
import { CareerMap } from "./CareerMap";
import { EASE_GLIDE, EASE_SMOOTH } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 26, damping: 22, mass: 1.1 });
  const sy = useSpring(py, { stiffness: 26, damping: 22, mass: 1.1 });

  const mapX = useTransform(sx, [-1, 1], [38, -38]);
  const mapY = useTransform(sy, [-1, 1], [28, -28]);
  const gridX = useTransform(sx, [-1, 1], [-8, 8]);
  const haloX = useTransform(sx, [-1, 1], [-14, 14]);
  const haloY = useTransform(sy, [-1, 1], [-10, 10]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduced]);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-32 sm:pb-20">
      <span aria-hidden="true" className="grain z-[1]" />

      <motion.div
        aria-hidden="true"
        style={{ x: gridX }}
        className="grid-guides pointer-events-none absolute inset-y-0 left-0 right-0 opacity-60"
      />

      {/* Cinematic ambient field */}
      <motion.div
        aria-hidden="true"
        style={{ x: haloX, y: haloY }}
        className="pointer-events-none absolute right-[-16%] top-[-8%] h-[720px] w-[720px] rounded-full border border-signal/10 sm:right-[-8%] lg:right-[4%] lg:top-[2%]"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: haloX, y: haloY }}
        className="pointer-events-none absolute right-[4%] top-[7%] h-[500px] w-[500px] rounded-full border border-white/[0.06] [box-shadow:0_0_120px_rgba(86,140,255,0.08)_inset]"
      />

      <motion.div
        aria-hidden="true"
        style={{ x: mapX, y: mapY }}
        className="pointer-events-none absolute right-[-18%] top-[4%] w-[118%] max-w-[920px] opacity-70 sm:right-[-8%] sm:w-[72%] lg:right-[1%] lg:top-[6%] lg:w-[49%] lg:opacity-100"
      >
        <CareerMap />
      </motion.div>

      {/* A quiet product-language marker: current state -> goal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.8 }}
        className="pointer-events-none absolute right-[8%] top-[19%] hidden w-44 border-l border-signal/40 pl-4 lg:block"
      >
        <p className="label-mono text-signal">Direction</p>
        <p className="mt-2 font-display text-base text-white/70">From where you are to what you can become.</p>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="label-mono mb-8"
        >
          Career progression system — v0.1
        </motion.p>

        <h1 className="display-xl max-w-[16ch]">
          {["Build the career", "you're becoming."].map((line, li) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? { opacity: 0 } : { y: "110%", filter: "blur(14px)" }}
                animate={reduced ? { opacity: 1 } : { y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.25,
                  delay: 0.15 + li * 0.12,
                  ease: EASE_GLIDE,
                }}
                style={{ willChange: "transform, filter" }}
              >
                {li === 1 ? (
                  <>
                    you're <span className="text-signal">becoming.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: EASE_SMOOTH }}
          className="mt-10 flex flex-col gap-8 border-t border-border pt-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            CareerOS turns your goals, skills and experience into a clear path of meaningful action.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionLink to="/signup" size="lg" variant="signal">
              Start Building Your Career
            </ActionLink>
            <ActionLink to="/how-it-works" size="lg" variant="outline">
              See how it works
            </ActionLink>
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative z-10 mx-auto mt-12 flex w-full max-w-[1400px] items-center gap-3 px-5 sm:px-8"
      >
        <span className="label-mono">Scroll</span>
        <span className="relative h-px flex-1 overflow-hidden bg-border">
          <motion.span
            className="absolute inset-y-0 left-0 w-24 bg-signal"
            animate={reduced ? {} : { x: ["-100%", "600%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
