import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { About } from "@/components/site/about";
import { Why } from "@/components/site/why";
import { StatsBand } from "@/components/site/stats-band";
import { Resume } from "@/components/site/resume";
import { Testimonials } from "@/components/site/testimonials";
import { ClientsStrip } from "@/components/site/clients-strip";
import { getAwards, getClients, getProfile, getResume, getServices, getSettings, getSkills, getStats, getTestimonials } from "@/lib/data";
import { contactLink, isSectionVisible } from "@/lib/sections";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: "About",
    description: profile.bio || profile.short_intro,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const [settings, profile, services, skills, stats, resume, testimonials, clients, awards] = await Promise.all([
    getSettings(),
    getProfile(),
    getServices(),
    getSkills(),
    getStats(),
    getResume(),
    getTestimonials(),
    getClients(),
    getAwards(),
  ]);
  if (!isSectionVisible(settings.sections, "about")) notFound();
  const visible = (k: Parameters<typeof isSectionVisible>[1]) => isSectionVisible(settings.sections, k);
  const contactHref = contactLink(settings.sections, settings.contact_email);

  return (
    <>
      <PageHero title="About Me" image={profile.hero_background_url} crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <About
        profile={profile}
        bars={stats.filter((s) => s.placement === "about")}
        serviceTitles={services.map((s) => s.title)}
        badge={awards[0]?.title}
      />
      {visible("stats") && <StatsBand stats={stats.filter((s) => s.placement === "band")} />}
      {visible("why") && <Why skills={skills} years={profile.experience_years} photos={profile.work_photos} contactHref={contactHref} />}
      <Resume items={resume} tools={profile.skill_tools} />
      {visible("testimonials") && <Testimonials items={testimonials} />}
      {visible("clients") && <ClientsStrip clients={clients} />}
    </>
  );
}
