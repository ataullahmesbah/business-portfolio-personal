import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { BrandIcon } from "@/components/ui/brand-icon";
import { ThemeSwitcher } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/config/site";
import type { Profile, Service, SiteSettings } from "@/types/content";
import type { NavItem } from "@/lib/sections";

type Props = {
  profile: Profile;
  settings: SiteSettings;
  nav: NavItem[];
  services: Service[];
  servicesHref: string | null;
  /** Extra top space when the CTA banner overlaps the footer */
  withCta: boolean;
};

export function Footer({ profile, settings, nav, services, servicesHref, withCta }: Props) {
  const year = new Date().getFullYear();
  const phone = settings.public_phone ?? profile.phone;
  return (
    <footer className={`relative overflow-hidden bg-[#0d0b2e] text-[#b9b7d6] dark:bg-[#07061a] ${withCta ? "pt-[190px]" : "pt-20"}`}>
      <div aria-hidden className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-accent opacity-15 blur-[140px]" />
      <div className="container-x relative grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="flex flex-col gap-5">
          <Logo name={settings.website_name} logo={settings.logo_url} className="text-white" />
          <p className="max-w-[320px] leading-relaxed">{settings.footer_text || profile.short_intro}</p>
          {profile.social_links.length > 0 && (
            <ul className="flex flex-wrap gap-2.5">
              {profile.social_links.map((s) => (
                <li key={s.platform + s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.07] text-white transition-all hover:-translate-y-1 hover:bg-accent hover:text-on-accent"
                  >
                    <BrandIcon name={s.platform} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-5 text-xl text-white">Quick Links</h2>
          <ul className="flex flex-col gap-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-accent-2">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {services.length > 0 && (
          <div>
            <h2 className="mb-5 text-xl text-white">Services</h2>
            <ul className="flex flex-col gap-3">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  {servicesHref ? (
                    <Link href={servicesHref} className="transition-colors hover:text-accent-2">
                      {s.title}
                    </Link>
                  ) : (
                    s.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h2 className="mb-5 text-xl text-white">Contact</h2>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-1 shrink-0 text-accent-2" aria-hidden />
              <a href={`mailto:${settings.contact_email}`} className="break-all transition-colors hover:text-accent-2">
                {settings.contact_email}
              </a>
            </li>
            {phone && (
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-accent-2" aria-hidden />
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent-2">
                  {phone}
                </a>
              </li>
            )}
            {profile.location && (
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-accent-2" aria-hidden />
                {profile.location}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container-x relative">
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 py-7 text-[15px] md:flex-row">
          <p>
            © {year} {settings.website_name}. All rights reserved.
          </p>
          <ThemeSwitcher className="!border-white/10 !bg-white/5 [&_button]:text-[#b9b7d6]" />
          <p>
            Developed by{" "}
            <a href={siteConfig.developer.url} target="_blank" rel="noopener" className="font-bold text-white transition-colors hover:text-accent-2">
              {siteConfig.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
