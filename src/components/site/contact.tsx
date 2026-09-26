import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./contact-form";
import { SectionHeading } from "./section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { BrandIcon } from "@/components/ui/brand-icon";
import type { Profile, Service } from "@/types/content";

type Props = {
  profile: Profile;
  services: Service[];
  email: string;
  phone: string | null;
  defaultService?: string;
  defaultMessage?: string;
  showHeading?: boolean;
};

export function Contact({ profile, services, email, phone, defaultService, defaultMessage, showHeading = true }: Props) {
  const items = [
    { Icon: Mail, label: "Email me", value: email, href: `mailto:${email}` },
    phone ? { Icon: Phone, label: "Call me", value: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}` } : null,
    profile.location ? { Icon: MapPin, label: "Location", value: profile.location, href: null } : null,
    profile.availability_status ? { Icon: Clock, label: "Availability", value: profile.availability_status, href: null } : null,
  ].filter(Boolean) as { Icon: typeof Mail; label: string; value: string; href: string | null }[];

  return (
    <section id="contact" className="section bg-surface">
      <div className="container-x">
        {showHeading && <SectionHeading label="Get In Touch" title="Let's Talk About Your Project" center />}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-14">
          <div className="flex flex-col gap-5">
            <Stagger className="flex flex-col gap-5">
              {items.map(({ Icon, label, value, href }) => (
                <StaggerItem key={label}>
                  <div className="card group flex items-center gap-5 !rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1">
                    <span className="grad-bg grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-6">
                      <Icon size={24} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-muted">{label}</p>
                      {href ? (
                        <a href={href} className="font-heading text-lg font-bold break-words text-heading hover:text-accent-ink">
                          {value}
                        </a>
                      ) : (
                        <p className="font-heading text-lg font-bold text-heading">{value}</p>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            {profile.social_links.length > 0 && (
              <Reveal className="mt-3">
                <p className="font-heading font-bold text-heading">Follow me</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {profile.social_links.map((s) => (
                    <a
                      key={s.platform + s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="grid h-12 w-12 place-items-center rounded-full bg-card text-heading shadow-[var(--shadow)] ring-1 ring-line transition-all hover:-translate-y-1 hover:bg-accent hover:text-on-accent"
                    >
                      <BrandIcon name={s.platform} size={18} />
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
          <Reveal delay={0.15}>
            <ContactForm services={services.map((s) => s.title)} defaultService={defaultService} defaultMessage={defaultMessage} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
