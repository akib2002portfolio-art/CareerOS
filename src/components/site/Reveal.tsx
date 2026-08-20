import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { EASE_GLIDE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
  /**
   * Deep-focus mode: instead of a one-time reveal-on-enter, the element
   * stays continuously linked to scroll position and softly defocuses
   * (blur + dim) as it drifts away from the center of the viewport, then
   * sharpens back into focus as it returns — the "camera racking focus"
   * feel used throughout lusion.co. Off by default so short/inline
   * elements (badges, nav bits) keep the simpler one-shot reveal.
   */
  focus?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 28, focus = false }: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const focusBlur = useTransform(scrollYProgress, [0, 0.32, 0.5, 0.68, 1], [7, 0, 0, 0, 7]);
  const focusOpacity = useTransform(scrollYProgress, [0, 0.26, 0.5, 0.74, 1], [0.45, 1, 1, 1, 0.45]);
  const blurFilter = useTransform(focusBlur, (v) => `blur(${v.toFixed(2)}px)`);

  if (focus && !reduced) {
    return (
      <motion.div ref={ref} className={className} style={{ filter: blurFilter, opacity: focusOpacity }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE_GLIDE }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: i * 0.045, ease: EASE_GLIDE },
  }),
};

export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            custom={i + delay * 20}
            variants={wordVariants}
            style={{ willChange: "transform, opacity, filter" }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-signal" aria-hidden="true" />
      <span className="label-mono">{children}</span>
    </div>
  );
}
