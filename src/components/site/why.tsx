"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import type { Skill } from "@/types/content";

const ease = [0.22, 1, 0.36, 1] as const;
const fills = ["bg-accent-2 text-[#0d0b2e]", "bg-accent text-on-accent", "grad-bg text-white", "bg-accent text-on-accent"];

type Props = {
  skills: Skill[];
  years: number;
  photos: string[];
  contactHref: string;
};

export function Why({ skills, years, photos, contactHref }: Props) {
  const [p1, p2, p3] = photos;
  return (
    <section id="why" className="section overflow-x-clip">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="kicker">Why Work With Me</p>
            <h2 className="h-section mt-5">What Can I Do for Your Business?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed">
              You get one partner who understands business goals and can also design and build. No hand-offs, no confusion — just clear
              communication and results you can measure.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex gap-4">
            <span className="mt-2 h-3.5 w-3.5 shrink-0 rounded-full bg-accent" />
            <div>
              <h3 className="text-xl">Best Performance</h3>
              <p className="mt-2">Fast, secure and SEO-ready work built to rank on Google and turn visitors into customers.</p>
            </div>
          </Reveal>

          {skills.length > 0 && (
            <ul className="mt-2 flex flex-col gap-5">
              {skills.slice(0, 4).map((s, i) => (
                <li key={s.id} className="grid items-center gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-5">
                  <span className="font-heading text-[15px] font-extrabold tracking-wide text-heading uppercase">{s.name}</span>
                  <div className="h-10 overflow-hidden rounded-full bg-track" role="progressbar" aria-label={s.name} aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100}>
                    <motion.div
                      className={`flex h-full items-center justify-end rounded-full pr-4 text-[15px] font-bold ${fills[i % fills.length]}`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${Math.max(12, s.level)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease, delay: 0.2 + i * 0.15 }}
                    >
                      <CountUp value={`${s.level}%`} />
                    </motion.div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <Reveal delay={0.2}>
            <Link href={contactHref} className="btn btn-primary mt-3 !min-h-[58px] !px-8">
              Start Project <ArrowRight size={18} aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 items-start gap-5 sm:gap-7">
          <div className="flex flex-col gap-5 pt-16 sm:gap-7 sm:pt-28">
            {years > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="flex aspect-[4/3] flex-col justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 p-6 text-white shadow-[0_20px_40px_-12px_color-mix(in_srgb,var(--accent)_55%,transparent)] sm:p-8"
              >
                <p className="font-heading text-5xl leading-none font-extrabold sm:text-6xl">
                  <CountUp value={String(years)} />
                  <sup className="text-2xl">+</sup>
                </p>
                <p className="mt-2 font-heading text-lg leading-tight font-bold">
                  Years
                  <br />
                  Experience
                </p>
              </motion.div>
            )}
            {p2 && <Photo src={p2} delay={0.2} className="aspect-[4/5]" />}
          </div>
          <div className="flex flex-col gap-5 sm:gap-7">
            {p1 && <Photo src={p1} delay={0.1} className="aspect-[4/5]" />}
            {p3 && <Photo src={p3} delay={0.3} className="aspect-[4/5]" />}
          </div>
        </div>
      </div>
    </section>
  );
}

function Photo({ src, delay, className }: { src: string; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease, delay }}
      className={`group relative overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow)] ${className ?? ""}`}
    >
      <Image src={src} alt="" fill sizes="(min-width: 1024px) 270px, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
    </motion.div>
  );
}
