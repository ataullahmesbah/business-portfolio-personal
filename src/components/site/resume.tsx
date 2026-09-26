import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { BrandIcon } from "@/components/ui/brand-icon";
import type { ResumeItem, SkillTool } from "@/types/content";

/** Experience + education timeline (About page). */
export function Resume({ items, tools }: { items: ResumeItem[]; tools: SkillTool[] }) {
  const groups = [
    { key: "experience", title: "Experience", Icon: Briefcase, list: items.filter((i) => i.type === "experience") },
    { key: "education", title: "Education", Icon: GraduationCap, list: items.filter((i) => i.type === "education") },
  ].filter((g) => g.list.length);
  if (!groups.length) return null;

  return (
    <section id="resume" className="section bg-surface">
      <div className="container-x">
        <SectionHeading label="My Journey" title="Experience & Education" center />
        <div className="grid gap-12 lg:grid-cols-2">
          {groups.map(({ key, title, Icon, list }) => (
            <div key={key}>
              <h3 className="mb-8 flex items-center gap-3 text-2xl">
                <span className="grad-bg grid h-12 w-12 place-items-center rounded-xl text-white">
                  <Icon size={22} aria-hidden />
                </span>
                {title}
              </h3>
              <Stagger className="relative flex flex-col gap-6 border-l-2 border-dashed border-accent/30 pl-8">
                {list.map((item) => (
                  <StaggerItem key={item.id} className="relative">
                    <span aria-hidden className="absolute top-8 -left-[41px] h-4 w-4 rounded-full border-4 border-bg bg-accent ring-2 ring-accent/30" />
                    <article className="card !rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h4 className="text-xl">{item.title}</h4>
                          <p className="mt-1 text-muted">{item.subtitle}</p>
                        </div>
                        <span className="rounded-full bg-accent/10 px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap text-accent-ink">{item.period}</span>
                      </div>
                      {item.description && <p className="mt-4 text-[15px] leading-relaxed">{item.description}</p>}
                      {item.badge && <p className="mt-4 text-sm font-semibold text-heading">{item.badge}</p>}
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
        {tools.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-5">
            <p className="font-heading font-bold text-heading">Tools I work with</p>
            <ul className="flex flex-wrap justify-center gap-3">
              {tools.map((t) => (
                <li key={t.name} className="card flex items-center gap-2.5 !rounded-full px-5 py-3 font-semibold text-heading">
                  <BrandIcon name={t.icon} size={18} />
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
