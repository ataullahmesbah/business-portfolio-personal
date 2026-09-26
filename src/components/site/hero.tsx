"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Profile, Testimonial } from "@/types/content";

const ease = [0.22, 1, 0.36, 1] as const;
const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const child: Variants = { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

type Props = {
  profile: Profile;
  testimonials: Testimonial[];
  contactHref: string;
  workHref: string | null;
};

export function Hero({ profile, testimonials, contactHref, workHref }: Props) {
  const words = profile.typed_roles.length ? profile.typed_roles : [""];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((step: number) => setIndex((i) => (i + step + words.length) % words.length), [words.length]);

  useEffect(() => {
    if (paused || reduce || words.length < 2) return;
    const t = setInterval(() => go(1), 3800);
    return () => clearInterval(t);
  }, [paused, reduce, go, words.length]);

  const avatars = testimonials.filter((t) => t.avatar_url).slice(0, 3);
  const rating = testimonials.length ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length : 0;
  const portrait = profile.hero_image_url || profile.profile_image_url;

  return (
    <section id="home" className="relative isolate overflow-x-clip" aria-label="Introduction">
      {/* Dark backdrop with a diagonal bottom edge */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0d0b2e] [clip-path:polygon(0_0,100%_0,100%_90%,0_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_84%,0_100%)]">
        {profile.hero_background_url && (
          <Image src={profile.hero_background_url} alt="" fill preload sizes="100vw" className="object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b2e] via-[#0d0b2e]/85 to-[#0d0b2e]/50" />
        <div className="drift absolute top-24 -left-32 h-[560px] w-[560px] rounded-full bg-accent opacity-30 blur-[140px]" />
        <div className="drift-late absolute -top-20 right-10 h-[480px] w-[480px] rounded-full bg-accent-2 opacity-20 blur-[150px]" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <div className="container-x grid items-center gap-14 pt-[140px] pb-24 lg:min-h-[920px] lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-10 lg:pt-[120px] lg:pb-40">
        <motion.div variants={parent} initial="hidden" animate="show" className="flex flex-col items-start gap-7">
          <motion.p variants={child} className="kicker on-dark">
            {profile.professional_title}
          </motion.p>

          <motion.h1 variants={child} className="text-[clamp(2.6rem,6.2vw,4.9rem)] leading-[1.06] tracking-[-0.03em] text-white">
            <span className="block">{profile.hero_headline || profile.full_name}</span>
            <span className="sr-only"> {words.join(", ")}</span>
            <span className="relative block min-h-[1.15em] overflow-hidden" aria-hidden>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={index}
                  className="grad-text inline-block pb-1"
                  initial={{ y: "80%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-80%", opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease }}
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p variants={child} className="max-w-[580px] text-lg leading-relaxed text-[#c9c7e6] sm:text-xl">
            {profile.short_intro}
          </motion.p>

          <motion.div variants={child} className="flex flex-wrap items-center gap-4">
            <Link href={contactHref} className="btn btn-primary !min-h-[60px] !px-9 !text-[17px]">
              Start a Project <ArrowRight size={19} aria-hidden />
            </Link>
            {workHref && (
              <Link href={workHref} className="btn btn-ghost-light !min-h-[60px] !px-8 !text-[17px]">
                View My Work
              </Link>
            )}
          </motion.div>

          {(profile.trust_line || avatars.length > 0) && (
            <motion.div variants={child} className="mt-2 flex items-center gap-4">
              {avatars.length > 0 && (
                <div className="flex">
                  {avatars.map((t, i) => (
                    <span key={t.id} className={`relative h-12 w-12 overflow-hidden rounded-full border-[3px] border-[#0d0b2e] ${i ? "-ml-3" : ""}`}>
                      <Image src={t.avatar_url!} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                  ))}
                  <span className="-ml-3 grid h-12 w-12 place-items-center rounded-full border-[3px] border-[#0d0b2e] bg-white font-heading text-sm font-extrabold text-[#0d0b2e]">
                    +
                  </span>
                </div>
              )}
              <div className="leading-snug">
                {profile.trust_line && <p className="font-heading text-lg font-bold text-white">{profile.trust_line}</p>}
                {rating > 0 && (
                  <p className="flex items-center gap-1.5 text-sm text-[#c9c7e6]">
                    <Star size={14} className="fill-[#f5b400] text-[#f5b400]" aria-hidden />
                    {rating.toFixed(1)} average client rating
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Portrait with rotating gradient rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          className="relative mx-auto aspect-[46/60] w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="spin-slow absolute -top-[6%] -right-[16%] aspect-square w-[108%] rounded-full [background:conic-gradient(from_300deg,var(--accent),var(--accent-2)_40%,transparent_56%)] [mask:radial-gradient(farthest-side,transparent_calc(100%-34px),#000_calc(100%-33px))]" />
          <div className="spin-slower absolute top-[34%] -left-[18%] aspect-square w-[66%] rounded-full [background:conic-gradient(from_160deg,var(--accent),transparent_50%)] [mask:radial-gradient(farthest-side,transparent_calc(100%-28px),#000_calc(100%-27px))]" />

          <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[46%] border-[8px] border-white bg-[#ece8ff] shadow-[0_30px_60px_rgba(13,11,46,0.35)]">
            <Image src={portrait} alt={`${profile.full_name}, ${profile.professional_title}`} fill preload sizes="(min-width: 1024px) 460px, 80vw" className="object-cover object-top" />
          </div>

          {profile.availability_status && (
            <div className="float-y absolute top-[12%] -left-4 flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 font-heading text-sm font-bold text-[#0d0b2e] shadow-xl sm:-left-10">
              <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-emerald-500" />
              {profile.availability_status}
            </div>
          )}
          {profile.experience_years > 0 && (
            <div className="float-y-late absolute top-[46%] -right-3 rounded-2xl bg-white px-4 py-3 text-center shadow-xl sm:-right-8">
              <p className="grad-text font-heading text-3xl leading-none font-extrabold">{profile.experience_years}+</p>
              <p className="mt-1 text-xs font-semibold text-[#45435c]">Years exp.</p>
            </div>
          )}

          {words.length > 1 && (
            <div className="absolute bottom-[7%] left-1/2 flex -translate-x-1/2 gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#0d0b2e] shadow-xl transition-transform hover:-translate-x-1"
                aria-label="Previous headline"
              >
                <ArrowLeft size={24} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#0d0b2e] shadow-xl transition-transform hover:translate-x-1"
                aria-label="Next headline"
              >
                <ArrowRight size={24} strokeWidth={1.8} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
