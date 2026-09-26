import { Star } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Stat } from "@/types/content";

export function StatsBand({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;
  return (
    <section id="stats" aria-label="Numbers" className="relative overflow-hidden bg-[#0d0b2e] py-16 text-white sm:py-20 dark:bg-navy">
      <div className="hero-grid absolute inset-0 opacity-60" aria-hidden />
      <Stagger className="container-x relative grid grid-cols-2 gap-y-12 gap-x-6 text-center lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.id}>
            <p className="flex items-center justify-center gap-1 font-heading text-[clamp(2.4rem,5vw,3.75rem)] leading-none font-extrabold">
              <CountUp value={s.value} className="grad-text" />
              {/rating/i.test(s.label) && <Star className="h-8 w-8 fill-accent-2 text-accent-2 sm:h-10 sm:w-10" aria-hidden />}
            </p>
            <p className="mt-3 text-[17px] text-[#b9b7d6]">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
