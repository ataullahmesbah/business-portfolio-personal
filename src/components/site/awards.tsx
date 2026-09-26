"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { SectionHeading } from "./section-heading";
import type { Award } from "@/types/content";

/** Optional awards slider (scroll-snap). Hidden automatically when there are no awards. */
export function Awards({ awards }: { awards: Award[] }) {
  const track = useRef<HTMLUListElement>(null);
  if (!awards.length) return null;
  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 360) + 28), behavior: "smooth" });
  };
  const many = awards.length > 3;

  return (
    <section id="awards" className="section bg-surface">
      <div className="container-x">
        <SectionHeading label="Recognition" title="Awards & Certifications">
          {many && (
            <div className="flex gap-3">
              <button type="button" onClick={() => scroll(-1)} className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-line text-heading hover:border-accent hover:text-accent-ink" aria-label="Previous awards">
                <ArrowLeft size={22} />
              </button>
              <button type="button" onClick={() => scroll(1)} className="grid h-14 w-14 place-items-center rounded-full bg-accent text-on-accent" aria-label="Next awards">
                <ArrowRight size={22} />
              </button>
            </div>
          )}
        </SectionHeading>
        <ul
          ref={track}
          className={
            many
              ? "-mx-5 flex snap-x snap-mandatory gap-7 overflow-x-auto px-5 pt-2 pb-10 [scrollbar-width:none] md:-mx-4 md:px-4 [&::-webkit-scrollbar]:hidden"
              : "grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
          }
          aria-label="Awards"
        >
          {awards.map((a, i) => (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.12 }}
              className={many ? "w-[85%] shrink-0 snap-start sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)]" : undefined}
            >
              <article className="card group flex h-full flex-col overflow-hidden !rounded-3xl transition-transform duration-500 hover:-translate-y-2">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={a.image_url} alt="" fill sizes="(min-width: 1024px) 400px, 85vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  {a.year && <span className="absolute top-4 left-4 rounded-full bg-white px-4 py-1.5 font-heading text-sm font-bold text-[#0d0b2e]">{a.year}</span>}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  {a.organization && <p className="text-sm font-semibold tracking-wide text-accent-ink uppercase">{a.organization}</p>}
                  <h3 className="text-[22px]">{a.title}</h3>
                  <p className="text-[15px] leading-relaxed">{a.short_description}</p>
                  {a.link_url && (
                    <a href={a.link_url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-2 font-heading font-bold text-heading hover:text-accent-ink">
                      View award <ArrowUpRight size={16} aria-hidden />
                    </a>
                  )}
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
