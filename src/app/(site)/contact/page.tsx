import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { Contact } from "@/components/site/contact";
import { getProfile, getServices, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me about your business and project. I usually reply within one working day.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ service?: string | string[]; plan?: string | string[] }> };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.slice(0, 80) ?? "";

export default async function ContactPage({ searchParams }: Props) {
  const [settings, profile, services, query] = await Promise.all([getSettings(), getProfile(), getServices(), searchParams]);
  if (!isSectionVisible(settings.sections, "contact")) notFound();
  const plan = one(query.plan);
  return (
    <>
      <PageHero title="Contact Me" image={profile.hero_background_url} crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <Contact
        profile={profile}
        services={services}
        email={settings.contact_email}
        phone={settings.public_phone ?? profile.phone}
        defaultService={one(query.service)}
        defaultMessage={plan ? `Hi! I'm interested in the ${plan} plan.` : ""}
        showHeading
      />
    </>
  );
}
