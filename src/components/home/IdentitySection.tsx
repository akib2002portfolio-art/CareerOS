import { useRef, type PointerEvent as ReactPointerEvent } from "react";

import { Reveal, SectionLabel } from "../site/Reveal";

const facets = [
  {
    label: "Who you are",
    title: "Professional identity",
    body: "Your strengths, interests and working style — written down instead of guessed at every time someone asks what you do.",
  },
  {
    label: "What you can do",
    title: "Capability map",
    body: "Skills tracked at the level you actually hold them, from first exposure through to consistently applied in real work.",
  },
  {
    label: "What you've proven",
    title: "Evidence record",
    body: "Projects, contributions and outcomes attached to the skills they demonstrate, ready to hand to anyone who asks.",
  },
  {
    label: "Where you're going",
    title: "Direction",
    body: "A named target role with the gap between here and there made explicit, so effort has somewhere to land.",
  },
];

/**
 * Cursor-tracked radial spotlight inside each card, on top of a border-glow
 * on hover. Position is written straight to a CSS custom property via the
 * ref on pointermove (no React state / re-render per mouse move) and read
 * back by the radial-gradient in the overlay's inline style; the overlay
 * itself only becomes visible via the group-hover opacity transition, so
 * there's no listener cost or paint on cards the pointer never enters.
 */
function FacetCard({ facet, delay }: { facet: (typeof facets)[number]; delay: number }) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <Reveal delay={delay}>
      <article
        ref={ref}
        onPointerMove={onPointerMove}
        className="group relative h-full overflow-hidden bg-background p-8 transition-colors duration-500 hover:bg-card sm:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--signal-soft), transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 ring-1 ring-inset ring-signal/40 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="label-mono relative">{facet.label}</span>
        <h3 className="display-md relative mt-5">{facet.title}</h3>
        <p className="relative mt-4 max-w-[38ch] text-base leading-relaxed text-muted-foreground">
          {facet.body}
        </p>
      </article>
    </Reveal>
  );
}

export function IdentitySection() {
  return (
    <section className="relative border-t border-border section-y">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Professional identity</SectionLabel>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal focus>
            <h2 className="display-lg max-w-[18ch]">
              A CV is a summary. Your identity is the system underneath it.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pt-4">
            <p className="max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Most students describe themselves in whatever words the last application form
              demanded. CareerOS keeps one structured picture of you that grows as you do — and
              every part of it points at something you can show.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {facets.map((f, i) => (
            <FacetCard key={f.title} facet={f} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
