"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import type { ProcessStep } from "@/types/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Process({ steps }: { steps: ProcessStep[] }) {
  if (!steps.length) return null;
  const cols = Math.min(steps.length, 4);
  return (
    <section id="process" className="section bg-surface">
      <div className="container-x">
        <SectionHeading label="How I Work" title={`A Simple ${steps.length}-Step Process`} center />
        <ol className={`relative grid gap-12 sm:grid-cols-2 ${cols >= 3 ? "lg:grid-cols-3" : ""} ${cols === 4 ? "xl:grid-cols-4" : ""}`}>
          {/* Dashed connector drawn across on wide screens */}
          <motion.span
            aria-hidden
            className="absolute top-[50px] right-[12%] left-[12%] hidden border-t-2 border-dashed border-accent/30 xl:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            style={{ transformOrigin: "left" }}
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.id}
              className="group relative flex flex-col items-center gap-4 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.18 }}
            >
              <span className="relative grid h-[100px] w-[100px] place-items-center rounded-full border-2 border-accent bg-bg font-heading text-3xl font-extrabold text-accent-ink transition-all duration-500 group-hover:scale-110 group-hover:border-transparent group-hover:text-white">
                <span aria-hidden className="grad-bg absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3 className="text-[22px]">{s.title}</h3>
              <p className="max-w-[260px] text-base leading-relaxed">{s.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
