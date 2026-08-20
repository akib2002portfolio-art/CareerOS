import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, GitBranch, Globe, MonitorPlay, RotateCcw } from "lucide-react";

import { SectionLabel } from "../site/Reveal";
import { cn } from "@/lib/utils";
import { EASE_SMOOTH } from "@/lib/motion";

const states = ["Not started", "In progress", "Completed"] as const;

const deliverables = [
  { label: "Working application", icon: MonitorPlay },
  { label: "GitHub repository", icon: GitBranch },
  { label: "Live deployment", icon: Globe },
];

export function MissionSection() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !played.current) {
          played.current = true;
          setRunning(true);
        }
      },
      { threshold: 0, rootMargin: "-20% 0px -20% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    if (reduced) {
      setStep(2);
      setRunning(false);
      return;
    }
    if (step >= 2) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1000 : 1750);
    return () => clearTimeout(t);
  }, [running, step, reduced]);

  const replay = () => {
    setStep(0);
    setRunning(true);
  };

  const orbit = step === 2 ? 1 : step === 1 ? 0.55 : 0.18;

  return (
    <section className="border-t border-border" aria-label="Missions">
      <div className="section-y mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-24">
          <div>
            <SectionLabel>Missions</SectionLabel>
            <h2 className="display-lg mt-6">
              Don't just learn.
              <br />
              <span className="text-signal">Do.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              A gap is only useful once it becomes an action. CareerOS turns each missing piece
              of your career into a mission with a defined outcome — something you finish, ship and
              can point at afterwards.
            </p>
            <button
              type="button"
              onClick={replay}
              className="mt-8 inline-flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-signal"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Replay the mission
            </button>
          </div>

          <div ref={ref} className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(86,140,255,.11),transparent_35%),linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.012))] p-5 shadow-[0_30px_100px_rgba(0,0,0,.45)] sm:p-8">
            <div className="absolute inset-0 grid-guides opacity-30" />
            <motion.div
              aria-hidden="true"
              animate={{ scale: 1 + orbit * 0.22, opacity: 0.22 + orbit * 0.25 }}
              transition={{ duration: 1.2, ease: EASE_SMOOTH }}
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/30 shadow-[0_0_100px_rgba(86,140,255,.1)]"
            />
            <motion.div
              aria-hidden="true"
              animate={{ rotate: reduced ? 0 : 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] border-dashed"
            />

            <div className="relative z-10 flex h-full min-h-[510px] flex-col">
              <div className="flex items-center justify-between">
                <span className="label-mono">Mission 01</span>
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-sm transition-colors duration-500",
                    step === 2
                      ? "border-signal text-signal"
                      : step === 1
                        ? "border-border text-foreground"
                        : "border-border text-muted-foreground",
                  )}
                  aria-live="polite"
                >
                  {states[step]}
                </span>
              </div>

              <div className="my-auto">
                <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-signal/35 bg-ink/80 text-center shadow-[0_0_80px_rgba(86,140,255,.12)] backdrop-blur-xl">
                  <div>
                    <span className="label-mono text-signal">Action</span>
                    <p className="mt-2 max-w-[10ch] font-display text-xl leading-tight">
                      Ship a React project.
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {deliverables.map((d, i) => {
                    const done = step === 2 || (step === 1 && i === 0);
                    return (
                      <motion.div
                        key={d.label}
                        animate={{
                          y: done ? -3 : 0,
                          borderColor: done ? "rgba(86,140,255,.45)" : "rgba(255,255,255,.08)",
                        }}
                        transition={{ duration: 0.5, delay: done ? i * 0.12 : 0 }}
                        className="rounded-xl border bg-black/10 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className={cn("flex h-7 w-7 items-center justify-center rounded-full border", done ? "border-signal/50 bg-signal text-primary-foreground" : "border-white/10")}>
                            {done ? <Check className="h-3.5 w-3.5" /> : <d.icon className="h-3.5 w-3.5 text-white/45" />}
                          </span>
                          <span className={cn("text-sm", done ? "text-white" : "text-white/45")}>{d.label}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 18, scale: .98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: .65, delay: .35 }}
                      className="mt-5 rounded-xl border border-signal/30 bg-signal/[0.07] p-4"
                    >
                      <span className="label-mono text-signal">Evidence created</span>
                      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-base text-white/75">
                        <span>Repository attached</span>
                        <span>Live deployment attached</span>
                        <span>Next mission unlocked</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-sm text-white/35">Career value</p>
                  <p className="mt-1 font-display text-base">Skill + Evidence + Progress</p>
                </div>
                <ArrowRight className="h-5 w-5 text-signal" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
