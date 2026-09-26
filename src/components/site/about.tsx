"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { Profile, Stat } from "@/types/content";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  profile: Profile;
  bars: Stat[];
  serviceTitles: string[];
  badge?: string | null;
  moreHref?: string | null;
};

export function About({ profile, bars, serviceTitles, badge, moreHref }: Props) {
  const photo = profile.about_image_url || profile.hero_image_url || profile.profile_image_url;
  return (
    <section id="about" className="section overflow-x-clip">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Photo composition */}
        <motion.div
          className="relative mx-auto h-[480px] w-full max-w-[560px] sm:h-[640px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* The observer sits on the (unclipped) wrapper: a fully clipped element never reports as visible. */}
          <motion.div
            variants={{
              hidden: { clipPath: "inset(100% 0% 0% 0% round 240px 240px 40px 240px)" },
              show: { clipPath: "inset(0% 0% 0% 0% round 240px 240px 40px 240px)", transition: { duration: 1.2, ease } },
            }}
            className="absolute top-0 right-0 h-[94%] w-[88%] overflow-hidden rounded-[240px_240px_40px_240px] bg-surface"
          >
            <Image src={photo} alt={`${profile.full_name} at work`} fill sizes="(min-width: 1024px) 500px, 90vw" className="object-cover object-top" />
          </motion.div>

          {badge && (
            <Reveal delay={0.5} className="float-y absolute top-[5%] -right-2 z-10 sm:-right-6">
              <p className="flex items-center gap-2.5 rounded-xl bg-white px-5 py-3.5 font-heading text-[15px] font-bold text-[#110f24] shadow-[0_16px_40px_rgba(17,15,36,0.18)]">
                <Star size={18} className="fill-[#f5b400] text-[#f5b400]" aria-hidden />
                {badge}
              </p>
            </Reveal>
          )}

          {serviceTitles.length > 0 && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.35 }}
              className="absolute bottom-0 left-0 z-10 grid aspect-square w-[52%] max-w-[270px] place-items-center rounded-full bg-[#0d0b2e] text-white shadow-2xl ring-1 ring-white/10"
            >
              <ul className="flex flex-col gap-2.5 font-heading text-[13px] font-bold sm:text-[15px]">
                {serviceTitles.slice(0, 4).map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <ArrowRight size={15} className="shrink-0 text-accent-2" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>

        {/* Text */}
        <div className="flex flex-col gap-7">
          <Reveal>
            <p className="kicker">About Me</p>
            <h2 className="h-section mt-5">{profile.about_title || profile.professional_title}</h2>
          </Reveal>
          {profile.bio && (
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed">{profile.bio}</p>
            </Reveal>
          )}

          <Reveal delay={0.2} className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end">
            {bars.length > 0 && (
              <div className="flex gap-7">
                {bars.slice(0, 2).map((b, i) => (
                  <div key={b.id} className="flex items-end gap-3.5">
                    <div className="relative h-40 w-10 overflow-hidden rounded-full bg-track">
                      <motion.div
                        className={`absolute inset-x-0 bottom-0 rounded-full ${i ? "bg-accent-2" : "bg-accent"}`}
                        initial={{ height: "0%" }}
                        whileInView={{ height: `${Math.min(100, Math.max(8, b.percent))}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease, delay: 0.3 + i * 0.2 }}
                      />
                    </div>
                    <div>
                      <p className={`font-heading text-[28px] font-extrabold ${i ? "text-heading" : "text-accent-ink"}`}>{b.value}</p>
                      <p className="max-w-[90px] text-sm leading-snug text-muted">{b.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {profile.about_points.length > 0 && (
              <ul className="flex flex-col gap-3.5">
                {profile.about_points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-heading font-bold text-heading">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                      <Check size={14} strokeWidth={3} aria-hidden />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={0.3} className="mt-2 flex flex-wrap items-center gap-6">
            {moreHref && (
              <Link href={moreHref} className="btn btn-primary !min-h-[58px] !px-8">
                More About Me <ArrowRight size={18} aria-hidden />
              </Link>
            )}
            <span className="font-heading text-xl font-semibold text-muted italic">— {profile.full_name}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
