import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/content";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden !rounded-3xl transition-transform duration-500 hover:-translate-y-2">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[3/2] overflow-hidden" tabIndex={-1} aria-hidden>
        <Image src={post.cover_image_url} alt="" fill sizes="(min-width: 1024px) 400px, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute top-4 left-4 rounded-full bg-white px-4 py-1.5 font-heading text-xs font-bold tracking-wide text-[#0d0b2e] uppercase">{post.category}</span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-7">
        <p className="text-sm font-semibold text-accent-ink">
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          {post.read_time && ` · ${post.read_time}`}
        </p>
        <h3 className="text-[22px] leading-snug">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent-ink">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[15px]">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-2 pt-2 font-heading font-bold text-heading transition-[gap] hover:gap-3 hover:text-accent-ink" aria-label={`Read more: ${post.title}`}>
          Read More <ArrowRight size={17} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
