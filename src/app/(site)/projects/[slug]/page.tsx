import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Folder, User, Wrench } from "lucide-react";
import { ClipReveal, Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/site/page-hero";
import { JsonLd } from "@/components/site/json-ld";
import { getProfile, getProjectBySlug, getProjects, getSettings } from "@/lib/data";
import { contactLink, isSectionVisible } from "@/lib/sections";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  const isRaster = !project.cover_image_url.endsWith(".svg");
  return {
    title: project.title,
    description: project.intro,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.intro,
      url: `/projects/${project.slug}`,
      images: [{ url: isRaster ? project.cover_image_url : "/opengraph-image" }],
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.intro },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, projects, profile, settings] = await Promise.all([getProjectBySlug(slug), getProjects(), getProfile(), getSettings()]);
  if (!project || !isSectionVisible(settings.sections, "portfolio")) notFound();

  const i = projects.findIndex((p) => p.id === project.id);
  const prev = projects.length > 1 ? projects[(i - 1 + projects.length) % projects.length] : null;
  const next = projects.length > 1 ? projects[(i + 1) % projects.length] : null;
  const contactHref = contactLink(settings.sections, settings.contact_email);
  const facts = [
    { Icon: User, label: "Client", value: project.client },
    { Icon: Folder, label: "Category", value: project.category },
    { Icon: Calendar, label: "Year", value: String(project.year) },
    { Icon: Wrench, label: "My role", value: project.role },
  ].filter((f) => f.value);
  const story = [
    { title: "The Challenge", text: project.challenge },
    { title: "The Approach", text: project.solution },
    { title: "The Result", text: project.result },
  ].filter((s) => s.text);
  const gallery = project.gallery.filter((g) => g !== project.cover_image_url);

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.intro,
          dateCreated: String(project.year),
          image: new URL(project.cover_image_url, siteConfig.url).toString(),
          url: `${siteConfig.url}/projects/${project.slug}`,
          creator: { "@type": "Person", name: profile.full_name, url: siteConfig.url },
        }}
      />
      <PageHero
        title={project.title}
        intro={project.intro}
        image={profile.hero_background_url}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.title }]}
      />

      <section className="section">
        <div className="container-x">
          <ClipReveal className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-surface sm:aspect-[16/9]">
            <Image src={project.cover_image_url} alt={project.title} fill preload sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          </ClipReveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
            <div className="flex flex-col gap-12">
              {story.map((s, idx) => (
                <Reveal key={s.title}>
                  <p className="kicker">Step {String(idx + 1).padStart(2, "0")}</p>
                  <h2 className="mt-4 text-3xl sm:text-4xl">{s.title}</h2>
                  <p className="mt-5 text-lg leading-relaxed whitespace-pre-line">{s.text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <aside className="card sticky top-28 flex flex-col gap-6 !rounded-3xl p-8">
                <h2 className="text-2xl">Project Info</h2>
                <dl className="flex flex-col gap-5">
                  {facts.map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-ink">
                        <Icon size={20} aria-hidden />
                      </span>
                      <div>
                        <dt className="text-sm text-muted">{label}</dt>
                        <dd className="font-heading font-bold text-heading">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                    Visit Live Site <ArrowUpRight size={18} aria-hidden />
                  </a>
                )}
                <Link href={contactHref} className="btn btn-outline w-full">
                  Start a Similar Project
                </Link>
              </aside>
            </Reveal>
          </div>

          {gallery.length > 0 && (
            <div className="mt-20 grid gap-7 md:grid-cols-2">
              {gallery.map((src, idx) => (
                <ClipReveal key={src + idx} className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
                  <Image src={src} alt={`${project.title} — image ${idx + 1}`} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
                </ClipReveal>
              ))}
            </div>
          )}

          {prev && next && (
            <nav aria-label="More projects" className="mt-20 grid gap-5 border-t border-line pt-10 sm:grid-cols-2">
              <Link href={`/projects/${prev.slug}`} className="card group flex items-center gap-4 !rounded-2xl p-6 transition-transform hover:-translate-y-1">
                <ArrowLeft className="shrink-0 text-accent-ink transition-transform group-hover:-translate-x-1" aria-hidden />
                <span className="min-w-0">
                  <span className="block text-sm text-muted">Previous project</span>
                  <span className="block truncate font-heading text-lg font-bold text-heading">{prev.title}</span>
                </span>
              </Link>
              <Link href={`/projects/${next.slug}`} className="card group flex items-center justify-end gap-4 !rounded-2xl p-6 text-right transition-transform hover:-translate-y-1">
                <span className="min-w-0">
                  <span className="block text-sm text-muted">Next project</span>
                  <span className="block truncate font-heading text-lg font-bold text-heading">{next.title}</span>
                </span>
                <ArrowRight className="shrink-0 text-accent-ink transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </nav>
          )}
        </div>
      </section>
    </article>
  );
}
