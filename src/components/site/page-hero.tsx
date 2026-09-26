import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal, SplitWords } from "@/components/motion/reveal";

/** Dark banner at the top of every inner page, with a breadcrumb. */
export function PageHero({
  title,
  intro,
  crumbs,
  image,
}: {
  title: string;
  intro?: string;
  crumbs: { label: string; href?: string }[];
  /** Optional background photo (a dark overlay is added) */
  image?: string | null;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0d0b2e] pt-[170px] pb-20 text-white sm:pt-[200px] sm:pb-28">
      {image && <Image src={image} alt="" fill preload sizes="100vw" className="-z-10 object-cover opacity-25 grayscale" />}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1c1a4d]/90 via-[#0d0b2e]/90 to-[#0d0b2e]" />
      <div aria-hidden className="drift absolute top-10 right-[8%] -z-10 h-[420px] w-[420px] rounded-full bg-accent opacity-25 blur-[130px]" />
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div className="container-x">
        <h1 className="max-w-4xl text-[clamp(2.6rem,7vw,5rem)] leading-[1.05] tracking-[-0.03em] text-white">
          <SplitWords text={title} />
        </h1>
        {intro && (
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-[680px] text-lg leading-relaxed text-[#c9c7e6]">{intro}</p>
          </Reveal>
        )}
        <Reveal delay={0.3}>
          <nav aria-label="Breadcrumb" className="mt-6">
            <ol className="flex flex-wrap items-center gap-2 font-heading text-[15px] font-semibold tracking-wider uppercase sm:text-[17px]">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-accent-2">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="line-clamp-1 max-w-[60vw]">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight size={18} className="text-accent-2" aria-hidden />}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
