import { Fragment } from "react";
import { Hero } from "@/components/site/hero";
import { ClientsStrip } from "@/components/site/clients-strip";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Why } from "@/components/site/why";
import { StatsBand } from "@/components/site/stats-band";
import { Portfolio } from "@/components/site/portfolio";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { Awards } from "@/components/site/awards";
import { Pricing } from "@/components/site/pricing";
import { Blog } from "@/components/site/blog";
import { Contact } from "@/components/site/contact";
import { JsonLd } from "@/components/site/json-ld";
import { siteConfig } from "@/config/site";
import { contactLink, isSectionVisible, normalizeSections, type SectionKey } from "@/lib/sections";
import {
  getAwards,
  getClients,
  getPosts,
  getPricing,
  getProcess,
  getProfile,
  getProjects,
  getServices,
  getSettings,
  getSkills,
  getStats,
  getTestimonials,
} from "@/lib/data";

export default async function HomePage() {
  const [settings, profile, services, projects, skills, testimonials, clients, pricing, posts, awards, stats, process] = await Promise.all([
    getSettings(),
    getProfile(),
    getServices(),
    getProjects(),
    getSkills(),
    getTestimonials(),
    getClients(),
    getPricing(),
    getPosts(),
    getAwards(),
    getStats(),
    getProcess(),
  ]);

  const visible = (key: SectionKey) => isSectionVisible(settings.sections, key);
  const contactHref = contactLink(settings.sections, settings.contact_email);

  const sectionMap: Record<SectionKey, React.ReactNode> = {
    clients: <ClientsStrip clients={clients} />,
    about: (
      <About
        profile={profile}
        bars={stats.filter((s) => s.placement === "about")}
        serviceTitles={services.map((s) => s.title)}
        badge={awards[0]?.title}
        moreHref="/about"
      />
    ),
    services: <Services services={services} limit={3} allHref={services.length > 3 ? "/services" : null} contactHref={contactHref} />,
    why: <Why skills={skills} years={profile.experience_years} photos={profile.work_photos} contactHref={contactHref} />,
    stats: <StatsBand stats={stats.filter((s) => s.placement === "band")} />,
    portfolio: <Portfolio projects={projects} limit={4} />,
    process: <Process steps={process} />,
    testimonials: <Testimonials items={testimonials} />,
    awards: <Awards awards={awards} />,
    pricing: <Pricing plans={pricing} contactHref={contactHref} />,
    blog: <Blog posts={posts} />,
    contact: <Contact profile={profile} services={services} email={settings.contact_email} phone={settings.public_phone ?? profile.phone} />,
    // Rendered above the footer by the site layout
    cta: null,
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${siteConfig.url}/#person`,
              name: profile.full_name,
              jobTitle: profile.professional_title,
              description: profile.short_intro,
              email: `mailto:${settings.contact_email}`,
              image: new URL(profile.profile_image_url, siteConfig.url).toString(),
              url: siteConfig.url,
              address: { "@type": "PostalAddress", addressLocality: profile.location },
              sameAs: profile.social_links.map((s) => s.url),
            },
            {
              "@type": "ProfessionalService",
              "@id": `${siteConfig.url}/#business`,
              name: settings.website_name,
              description: settings.seo_description,
              url: siteConfig.url,
              email: settings.contact_email,
              ...(settings.public_phone ? { telephone: settings.public_phone } : {}),
              founder: { "@id": `${siteConfig.url}/#person` },
              ...(services.length ? { makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })) } : {}),
            },
            {
              "@type": "WebSite",
              "@id": `${siteConfig.url}/#website`,
              url: siteConfig.url,
              name: settings.website_name,
              description: settings.seo_description,
              publisher: { "@id": `${siteConfig.url}/#person` },
            },
          ],
        }}
      />
      <Hero profile={profile} testimonials={testimonials} contactHref={contactHref} workHref={visible("portfolio") ? "/projects" : null} />
      {normalizeSections(settings.sections)
        .filter((s) => s.visible)
        .map((s) => (
          <Fragment key={s.key}>{sectionMap[s.key]}</Fragment>
        ))}
    </>
  );
}
