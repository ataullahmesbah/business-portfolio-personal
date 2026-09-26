"use client";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/content";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce || items.length < 2) return;
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % items.length);
    }, 7000);
    return () => clearInterval(t);
  }, [paused, reduce, items.length]);

  if (!items.length) return null;
  const t = items[index];
  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + items.length) % items.length);
  };

  return (
    <section id="testimonials" className="section overflow-x-clip" aria-roledescription="carousel" aria-label="Testimonials">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <p className="kicker">Testimonials</p>
          <h2 className="h-section">What My Clients Say</h2>
          <p className="text-lg">Real words from business owners I have worked with.</p>
          {items.length > 1 && (
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => go(-1)} className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-line text-heading transition-colors hover:border-accent hover:text-accent-ink" aria-label="Previous testimonial">
                <ArrowLeft size={22} />
              </button>
              <button type="button" onClick={() => go(1)} className="grid h-14 w-14 place-items-center rounded-full bg-accent text-on-accent transition-transform hover:translate-x-1" aria-label="Next testimonial">
                <ArrowRight size={22} />
              </button>
              <span className="ml-2 font-heading font-bold text-muted" aria-live="polite">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.15}>
          <figure
            className="relative overflow-hidden rounded-3xl bg-[#0d0b2e] p-8 text-white sm:p-14 dark:bg-navy dark:ring-1 dark:ring-white/10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span aria-hidden className="spin-slower absolute -top-16 -right-16 h-60 w-60 rounded-full border-[36px] border-accent/50 border-r-accent-2/60" />
            <Quote aria-hidden className="relative h-12 w-12 fill-accent-2 text-accent-2" />
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={t.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -50 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${items.length}`}
              >
                <div className="mt-6 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={20} className={i < t.rating ? "fill-[#f5b400] text-[#f5b400]" : "text-white/25"} aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-6 font-heading text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.45] font-semibold">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-9 flex items-center gap-4">
                  {t.avatar_url ? (
                    <span className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-white/10">
                      <Image src={t.avatar_url} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                  ) : (
                    <span className="grad-bg grid h-16 w-16 place-items-center rounded-full font-heading text-xl font-bold">{t.name[0]}</span>
                  )}
                  <span>
                    <strong className="block font-heading text-xl">{t.name}</strong>
                    <span className="text-[#b9b7d6]">{[t.role, t.company].filter(Boolean).join(", ")}</span>
                  </span>
                </figcaption>
              </motion.div>
            </AnimatePresence>
            {items.length > 1 && (
              <div className="relative mt-9 flex gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    className="grid h-6 place-items-center"
                  >
                    <span className={cn("block h-2 rounded-full transition-all duration-500", i === index ? "w-9 bg-accent-2" : "w-2 bg-white/30")} />
                  </button>
                ))}
              </div>
            )}
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
