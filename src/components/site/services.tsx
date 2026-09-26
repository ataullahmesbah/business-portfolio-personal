"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { ServiceIcon } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/content";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  services: Service[];
  limit?: number;
  /** "See all services" button (home page) */
  allHref?: string | null;
  contactHref: string;
  title?: string;
};

export function Services({ services, limit, allHref, contactHref, title = "Services That Move Your Business Forward" }: Props) {
  if (!services.length) return null;
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section id="services" className="section bg-surface">
      <div className="container-x">
        <SectionHeading label="What I Do" title={title}>
          {allHref && (
            <Link href={allHref} className="btn-grad">
              See All Services
            </Link>
          )}
        </SectionHeading>

        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: (i % 3) * 0.12 }}
            >
              <article
                className={cn(
                  "group relative flex h-full flex-col gap-5 overflow-hidden bg-[#0d0b2e] px-9 py-11 text-white transition-transform duration-500 hover:-translate-y-2 dark:bg-navy dark:ring-1 dark:ring-white/10",
                )}
              >
                {/* Gradient fill slides up on hover (the second card stays filled as a highlight) */}
                <span
                  aria-hidden
                  className={cn(
                    "grad-bg absolute inset-0 -z-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
                    i === 1 ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
                  )}
                />
                <span aria-hidden className="outline-num absolute top-4 right-7 text-[88px] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">
                  <ServiceIcon
                    name={s.icon_key}
                    className={cn(
                      "h-16 w-16 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
                      i === 1 ? "text-white" : "text-accent-2 group-hover:text-white"
                    )}
                  />
                </span>
                <h3 className="relative text-[26px] leading-tight text-white">{s.title}</h3>
                <p className={cn("relative text-[17px] leading-relaxed", i === 1 ? "text-white" : "text-[#b9b7d6] group-hover:text-white")}>
                  {s.short_description}
                </p>
                <Link
                  prefetch={false}
                  href={`${contactHref}${contactHref.includes("?") || contactHref.startsWith("mailto") ? "" : `?service=${encodeURIComponent(s.title)}`}`}
                  className={cn(
                    "relative mt-auto inline-flex items-center gap-2 font-heading font-bold transition-[gap] hover:gap-3",
                    i === 1 ? "text-white" : "text-accent-2 group-hover:text-white"
                  )}
                  aria-label={`Get a quote for ${s.title}`}
                >
                  Get a Quote <ArrowRight size={17} aria-hidden />
                </Link>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
