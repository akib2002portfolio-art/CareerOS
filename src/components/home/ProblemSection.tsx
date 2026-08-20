import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Scroll progress through a tall pinned section, measured every animation
 * frame from the element's own rect. Read directly instead of via `useScroll`
 * because Lenis' eased scroll position and motion's cached offsets can drift
 * apart, which stalls the choreography mid-way.
 */
function usePinProgress(ref: React.RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const distance = rect.height - window.innerHeight;
        const raw = distance > 0 ? -rect.top / distance : 0;
        progress.set(Math.min(1, Math.max(0, raw)));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ref, progress]);

  return progress;
}

/*
 * Scroll choreography (matches the reference recording):
 *  0.00 - 0.18  scattered artifacts drift freely, headline holds
 *  0.18 - 0.36  headline fades out
 *  0.34 - 0.62  artifacts travel into two clean ordered columns
 *  0.58 - 0.76  the CareerOS hub resolves and spokes draw to every piece
 *  0.78 - 0.95  the whole map dissolves into the closing line
 */
const HEADLINE_FADE_START = 0.16;
const HEADLINE_FADE_END = 0.34;
const CONVERGE_START = 0.34;
const CONVERGE_END = 0.62;
// x settles first so nothing cuts diagonally across the headline column.
const CONVERGE_X_END = CONVERGE_START + (CONVERGE_END - CONVERGE_START) * 0.55;
const CONVERGE_Y_START = CONVERGE_START + (CONVERGE_END - CONVERGE_START) * 0.25;

type Piece = {
  label: string;
  title: string;
  meta: string;
  x: number;
  y: number;
  r: number;
  targetX: number;
  targetY: number;
  delay: number;
  mobile: boolean;
};

const pieces: Piece[] = [
  { label: "Applications", title: "Applications", meta: "31 sent", x: 12, y: 17, r: -5, targetX: 21, targetY: 72, delay: 0.4, mobile: true },
  { label: "Certificates", title: "Certificates", meta: "5 earned", x: 32, y: 10, r: 4, targetX: 23, targetY: 23, delay: 1.6, mobile: false },
  { label: "Courses", title: "Courses", meta: "12 in progress", x: 75, y: 14, r: -3, targetX: 50, targetY: 17, delay: 0.9, mobile: true },
  { label: "Projects", title: "Projects", meta: "7 repos", x: 88, y: 34, r: 5, targetX: 78, targetY: 23, delay: 2.2, mobile: true },
  { label: "GitHub", title: "GitHub", meta: "commits", x: 70, y: 52, r: -4, targetX: 15, targetY: 45, delay: 1.2, mobile: true },
  { label: "Skills", title: "Skills", meta: "24 tracked", x: 86, y: 73, r: 3, targetX: 86, targetY: 45, delay: 0.2, mobile: true },
  { label: "LeetCode", title: "LeetCode", meta: "148 solved", x: 60, y: 86, r: -6, targetX: 63, targetY: 88, delay: 1.9, mobile: false },
  { label: "Resume", title: "Resume", meta: "3 versions", x: 40, y: 94, r: 6, targetX: 80, targetY: 72, delay: 0.7, mobile: true },
  { label: "LinkedIn", title: "LinkedIn", meta: "profile", x: 17, y: 88, r: -4, targetX: 38, targetY: 88, delay: 2.6, mobile: false },
];

function Artifact({
  piece,
  progress,
  reduced,
}: {
  piece: Piece;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const x = useTransform(progress, [CONVERGE_START, CONVERGE_X_END], [piece.x, piece.targetX]);
  const y = useTransform(progress, [CONVERGE_Y_START, CONVERGE_END], [piece.y, piece.targetY]);
  const rotate = useTransform(progress, [CONVERGE_START, CONVERGE_END], [piece.r, 0]);
  const opacity = useTransform(progress, [0, 0.04, 0.76, 0.85], [0, 1, 1, 0]);

  const left = useTransform(x, (v) => `${v}%`);
  const top = useTransform(y, (v) => `${v}%`);

  return (
    <motion.div
      className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 ${piece.mobile ? "" : "hidden sm:block"}`}
      style={{ left, top, opacity }}
    >
      {/* Idle drift — the "loose pieces floating" feel before they lock in. */}
      <motion.div
        animate={reduced ? { y: 0, x: 0 } : { y: [0, -9, 0, 7, 0], x: [0, 6, 0, -5, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: piece.delay }}
      >
        <motion.div
          style={{ rotate }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,.07),rgba(255,255,255,.015))] px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,.5)] backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(86,140,255,.16),transparent_60%)]" />
          <div className="relative flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_12px_rgba(86,140,255,.8)]" />
            <div>
              <p className="whitespace-nowrap font-display text-[1.0625rem] font-medium leading-tight text-foreground">
                {piece.title}
              </p>
              <p className="mt-0.5 whitespace-nowrap text-[0.9375rem] leading-tight text-muted-foreground">
                {piece.meta}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const scrollYProgress = usePinProgress(ref);

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, HEADLINE_FADE_START, HEADLINE_FADE_END],
    [1, 1, 0],
  );
  const headlineY = useTransform(scrollYProgress, [0, HEADLINE_FADE_START], [0, -8]);
  const resolveOpacity = useTransform(scrollYProgress, [0.86, 0.94], [0, 1]);
  const resolveY = useTransform(scrollYProgress, [0.86, 0.97], [28, 0]);
  const coreOpacity = useTransform(scrollYProgress, [0.58, 0.7, 0.78, 0.86], [0, 1, 1, 0]);
  const coreScale = useTransform(scrollYProgress, [0.58, 0.74], [0.88, 1]);
  const coreGlow = useTransform(scrollYProgress, [0.58, 0.78], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.56, 0.72], [0, 1]);
  const linesFadeOut = useTransform(scrollYProgress, [0.76, 0.85], [1, 0]);
  const linesCombined = useTransform([lineOpacity, linesFadeOut], (v) => {
    const values = v as number[];
    return (values[0] ?? 0) * (values[1] ?? 0);
  });
  const mapFade = useTransform(scrollYProgress, [0.76, 0.85], [1, 0]);

  if (reduced) {
    return (
      <section className="section-y mx-auto max-w-[1400px] px-5 sm:px-8" aria-label="The career problem">
        <h2 className="display-lg max-w-[17ch]">You are doing a lot. But are you moving forward?</h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((p) => (
            <div key={p.label} className="surface rounded-2xl p-4">
              <span className="label-mono text-signal">{p.label}</span>
              <p className="mt-2 font-display text-lg">{p.title}</p>
              <p className="mt-1 text-base text-muted-foreground">{p.meta}</p>
            </div>
          ))}
        </div>
        <p className="display-md mt-12 text-signal">CareerOS connects the pieces.</p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[340vh]" aria-label="The career problem">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Spokes drawn live from the hub to each piece's resting spot. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: linesCombined }}
          className="pointer-events-none absolute inset-0"
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            {pieces.map((p) => (
              <line
                key={p.label}
                x1="50"
                y1="50"
                x2={p.targetX}
                y2={p.targetY}
                stroke="var(--signal)"
                strokeOpacity=".3"
                strokeWidth=".1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </motion.div>

        <div className="pointer-events-none absolute inset-0">
          {pieces.map((p) => (
            <Artifact key={p.label} piece={p} progress={scrollYProgress} reduced={reduced} />
          ))}
        </div>

        {/* The system hub resolves once every piece has cleared the headline. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: coreOpacity, scale: coreScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            style={{ opacity: coreGlow }}
            className="absolute -inset-16 rounded-[2rem] bg-signal/[0.09] blur-3xl"
          />
          <div className="relative flex w-72 flex-col items-center justify-center gap-2 rounded-2xl border border-white/12 bg-ink/85 px-8 py-9 text-center shadow-[0_0_90px_rgba(86,140,255,.16)] backdrop-blur-xl sm:w-80">
            <p className="relative font-display text-3xl font-medium sm:text-4xl">
              Career<span className="text-signal">OS</span>
            </p>
            <p className="relative label-mono text-[0.75rem] text-muted-foreground">
              One Career System
            </p>
            <span className="relative mt-2 h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_14px_rgba(86,140,255,.8)]" />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: mapFade }}
          className="pointer-events-none absolute inset-x-0 top-[30%] h-[40%] flex items-center"
        >
          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
            <motion.h2
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="display-lg max-w-[13ch] leading-[.95]"
            >
              <span className="label-mono mb-5 block text-signal">The problem</span>
              You are doing a lot.
              <span className="block text-muted-foreground">But are you moving forward?</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Closing resolve. */}
        <motion.div
          style={{ opacity: resolveOpacity, y: resolveY }}
          className="absolute inset-0 flex items-center justify-center px-5 text-center"
        >
          <div className="max-w-[24ch]">
            <p className="display-lg">
              <span className="text-signal">CareerOS</span> connects the pieces.
            </p>
            <p className="mx-auto mt-5 max-w-[46ch] text-lg text-muted-foreground">
              Your learning, work, skills and professional effort become one visible trajectory.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
