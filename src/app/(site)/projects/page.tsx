import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { Portfolio } from "@/components/site/portfolio";
import { getProfile, getProjects, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Projects",
  description: "Recent business websites, online stores, web apps and brand projects — with the challenge, approach and results.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [settings, profile, projects] = await Promise.all([getSettings(), getProfile(), getProjects()]);
  if (!isSectionVisible(settings.sections, "portfolio")) notFound();
  return (
    <>
      <PageHero title="Projects" image={profile.hero_background_url} crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
      {projects.length ? (
        <Portfolio projects={projects} />
      ) : (
        <p className="section text-center text-muted">No projects yet — check back soon.</p>
      )}
    </>
  );
}
