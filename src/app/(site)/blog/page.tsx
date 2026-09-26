import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { BlogCard } from "@/components/site/blog-card";
import { Reveal } from "@/components/motion/reveal";
import { notFound } from "next/navigation";
import { getPosts, getProfile, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical tips on websites, SEO and marketing to help small businesses grow online.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const [settings, profile, posts] = await Promise.all([getSettings(), getProfile(), getPosts()]);
  if (!isSectionVisible(settings.sections, "blog")) notFound();
  return (
    <>
      <PageHero title="Blog" image={profile.hero_background_url} crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <section className="section">
        <div className="container-x">
          {posts.length ? (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {posts.map((p, i) => (
                <Reveal as="li" key={p.id} delay={(i % 3) * 0.1} className="h-full">
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="py-20 text-center text-muted">No articles yet — check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
