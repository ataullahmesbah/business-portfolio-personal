import Link from "next/link";
import { Check } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types/content";

export function Pricing({ plans, contactHref }: { plans: PricingPlan[]; contactHref: string }) {
  if (!plans.length) return null;
  const withPlan = (name: string) =>
    contactHref.startsWith("mailto") ? contactHref : `${contactHref}?plan=${encodeURIComponent(name)}`;
  return (
    <section id="pricing" className="section">
      <div className="container-x">
        <SectionHeading label="Pricing Plans" title="Simple, Transparent Pricing" center />
        <Stagger className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-3xl p-9 transition-transform duration-500 hover:-translate-y-2",
                  p.highlighted
                    ? "bg-[#0d0b2e] text-white shadow-[0_30px_60px_-20px_rgba(13,11,46,0.5)] ring-2 ring-accent dark:bg-navy lg:-my-4 lg:py-13"
                    : "card"
                )}
              >
                {p.highlighted && (
                  <span className="grad-bg absolute -top-4 left-9 rounded-full px-4 py-1.5 font-heading text-xs font-extrabold tracking-wider text-white uppercase">
                    Most popular
                  </span>
                )}
                <p className={cn("text-sm font-semibold tracking-wide uppercase", p.highlighted ? "text-accent-2" : "text-accent-ink")}>{p.tagline}</p>
                <h3 className={cn("mt-2 text-[28px]", p.highlighted && "text-white")}>{p.name}</h3>
                <p className="mt-6 flex items-end gap-2">
                  <span className={cn("font-heading text-5xl font-extrabold tracking-tight", p.highlighted ? "grad-text" : "text-heading")}>{p.price}</span>
                  <span className={cn("pb-1.5", p.highlighted ? "text-[#b9b7d6]" : "text-muted")}>{p.period}</span>
                </p>
                <p className={cn("mt-4 leading-relaxed", p.highlighted && "text-[#c9c7e6]")}>{p.description}</p>
                <ul className="mt-7 mb-9 flex flex-col gap-3.5 border-t border-current/10 pt-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", p.highlighted ? "bg-accent-2 text-[#0d0b2e]" : "bg-accent/12 text-accent-ink")}>
                        <Check size={13} strokeWidth={3} aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link prefetch={false} href={withPlan(p.name)} className={cn("btn mt-auto w-full", p.highlighted ? "btn-primary" : "btn-outline")}>
                  {p.cta_label}
                </Link>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
