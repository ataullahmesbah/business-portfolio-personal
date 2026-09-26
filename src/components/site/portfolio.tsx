"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type Props = {
  projects: Project[];
  /** Home page: show a limited set plus a "View all" button */
  limit?: number;
  showHeading?: boolean;
};

export function Portfolio({ projects, limit, showHeading = true }: Props) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [active, setActive] = useState("All");
  if (!projects.length) return null;

  // Featured projects first on the home page
  const ordered = limit ? [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)) : projects;
  const filtered = ordered.filter((p) => active === "All" || p.category === active);
  const list = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="portfolio" className="section">
      <div className="container-x">
        {showHeading && <SectionHeading label="Latest Work" title="Recent Business Projects" center />}

        {categories.length > 2 && (
          <div role="group" aria-label="Filter projects" className="-mt-2 mb-12 flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={cn(
                  "relative min-h-11 rounded-full px-6 font-heading text-[15px] font-extrabold tracking-wider uppercase transition-colors",
                  active === c ? "text-on-accent" : "text-heading hover:text-accent-ink"
                )}
              >
                {active === c && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        )}

        <motion.ul layout className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.1 }}
              >
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {limit && projects.length > limit && (
          <div className="mt-14 text-center">
            <Link href="/projects" className="btn btn-primary !min-h-[58px] !px-9">
              View All Projects <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="group">
      <Link href={`/projects/${p.slug}`} className="block overflow-hidden rounded-3xl" aria-label={`View project: ${p.title}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
          <Image
            src={p.cover_image_url}
            alt=""
            fill
            sizes="(min-width: 768px) 600px, 92vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0d0b2e]/80 via-[#0d0b2e]/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="inline-flex translate-y-4 items-center gap-2 rounded-full bg-white px-5 py-3 font-heading text-sm font-bold text-[#0d0b2e] transition-transform duration-500 group-hover:translate-y-0">
              View Case Study <ArrowUpRight size={16} aria-hidden />
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-accent-ink">
            {p.category} · {p.year}
          </p>
          <h3 className="mt-1.5 text-2xl sm:text-[28px]">
            <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-accent-ink">
              {p.title}
            </Link>
          </h3>
        </div>
        <Link
          href={`/projects/${p.slug}`}
          tabIndex={-1}
          aria-hidden
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-surface text-heading transition-all duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-on-accent"
        >
          <ArrowUpRight size={22} />
        </Link>
      </div>
    </article>
  );
}
