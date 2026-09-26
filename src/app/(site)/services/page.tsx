import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { Pricing } from "@/components/site/pricing";
import { Testimonials } from "@/components/site/testimonials";
import { getPricing, getProcess, getProfile, getServices, getSettings, getTestimonials } from "@/lib/data";
import { contactLink, isSectionVisible } from "@/lib/sections";

export async function generateMetadata(): Promise<Metadata> {
  const services = await getServices();
  return {
    title: "Services",
    description: `Services: ${services.map((s) => s.title).join(", ")}.`.slice(0, 160),
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const [settings, profile, services, process, pricing, testimonials] = await Promise.all([
    getSettings(),
    getProfile(),
    getServices(),
    getProcess(),
    getPricing(),
    getTestimonials(),
  ]);
  if (!isSectionVisible(settings.sections, "services")) notFound();
  const visible = (k: Parameters<typeof isSectionVisible>[1]) => isSectionVisible(settings.sections, k);
  const contactHref = contactLink(settings.sections, settings.contact_email);

  return (
    <>
      <PageHero title="Services" image={profile.hero_background_url} crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <Services services={services} contactHref={contactHref} title="Services I Can Do to Help Your Business" />
      {visible("process") && <Process steps={process} />}
      {visible("pricing") && <Pricing plans={pricing} contactHref={contactHref} />}
      {visible("testimonials") && <Testimonials items={testimonials} />}
    </>
  );
}
