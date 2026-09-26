import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FinalCta } from "@/components/site/cta";
import { BackToTop } from "@/components/site/back-to-top";
import { getProfile, getServices, getSettings } from "@/lib/data";
import { contactLink, isSectionVisible, navItems } from "@/lib/sections";

export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [profile, settings, services] = await Promise.all([getProfile(), getSettings(), getServices()]);
  const nav = navItems(settings.sections);
  const contactHref = contactLink(settings.sections, settings.contact_email);
  const showCta = isSectionVisible(settings.sections, "cta");
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <Header
        name={settings.website_name || profile.full_name}
        logo={settings.logo_url}
        hireLabel={settings.hire_label}
        contactHref={contactHref}
        nav={nav}
        socials={profile.social_links}
        email={settings.contact_email}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
        <div className={showCta ? "pt-8 sm:pt-12" : ""} />
      </main>
      {showCta && <FinalCta contactHref={contactHref} />}
      <Footer
        profile={profile}
        settings={settings}
        nav={nav}
        services={services}
        servicesHref={isSectionVisible(settings.sections, "services") ? "/services" : null}
        withCta={showCta}
      />
      <BackToTop />
    </>
  );
}
