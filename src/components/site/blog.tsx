import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "./blog-card";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { BlogPost } from "@/types/content";

export function Blog({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <section id="blog" className="section">
      <div className="container-x">
        <SectionHeading label="From the Blog" title="Tips to Grow Your Business">
          <Link href="/blog" className="inline-flex items-center gap-2 font-heading text-[17px] font-bold text-accent-ink transition-[gap] hover:gap-3">
            View All Posts <ArrowRight size={18} aria-hidden />
          </Link>
        </SectionHeading>
        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <BlogCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
