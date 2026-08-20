import { motion, useReducedMotion } from "motion/react";
import { ActionLink } from "../site/ActionButton";
import { Reveal, RevealWords, SectionLabel } from "../site/Reveal";
import { EASE_SMOOTH } from "@/lib/motion";

export function FinalCta() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border section-y" aria-label="Start CareerOS">
      <div aria-hidden="true" className="grid-guides pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(86,140,255,.10),transparent_30%),linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.008))] shadow-[0_30px_120px_rgba(0,0,0,.45)]">
          <motion.div
            aria-hidden="true"
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] border-dashed"
          />
          <motion.div
            aria-hidden="true"
            animate={reduced ? {} : { rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/20"
          />

          <svg
            aria-hidden="true"
            viewBox="0 0 900 600"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
          >
            <motion.path
              d="M40 510 C 180 420, 220 500, 330 350 S 510 210, 610 300 S 720 360, 860 90"
              fill="none"
              stroke="var(--signal)"
              strokeOpacity=".5"
              strokeWidth="1.4"
              initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.4, ease: EASE_SMOOTH }}
            />
            {[{x:40,y:510},{x:330,y:350},{x:610,y:300},{x:860,y:90}].map((n,i)=>(
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={i === 3 ? 8 : 5}
                fill={i === 3 ? "var(--signal)" : "var(--ink)"}
                stroke="var(--signal)"
                strokeWidth="1.2"
                initial={{ opacity: 0, scale: .5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: .35 + i * .25, duration: .5 }}
              />
            ))}
          </svg>

          <div className="relative z-10 flex min-h-[620px] flex-col items-center justify-center px-6 py-20 text-center">
            <Reveal>
              <SectionLabel>Early access</SectionLabel>
            </Reveal>

            <h2 className="display-xl mx-auto mt-8 max-w-[13ch]">
              <RevealWords text="Start proving what you can do." />
            </h2>

            <Reveal delay={0.15}>
              <p className="mx-auto mt-8 max-w-[48ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                CareerOS is in student beta. Set your direction, run your first mission, and leave
                with evidence instead of intentions.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-12">
                <ActionLink to="/signup" size="lg" className="min-w-56">
                  Create your career file
                </ActionLink>
              </div>
            </Reveal>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: .7 }}
              className="mt-8 text-sm uppercase tracking-[0.22em] text-white/30"
            >
              Direction → action → evidence → progress
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
