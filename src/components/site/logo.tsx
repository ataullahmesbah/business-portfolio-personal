import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** "A.VALE" style wordmark from the website name, or the uploaded logo. */
export function Logo({ name, logo, className }: { name: string; logo?: string | null; className?: string }) {
  if (logo) {
    return (
      <Link href="/" className={cn("relative block h-11 w-40", className)} aria-label={`${name} — home`}>
        <Image src={logo} alt={name} fill sizes="160px" className="object-contain object-left" preload />
      </Link>
    );
  }
  const words = name.trim().split(/\s+/);
  const initial = words[0]?.[0] ?? "";
  const rest = words.length > 1 ? words[words.length - 1] : words[0].slice(1);
  return (
    <Link
      href="/"
      className={cn("font-heading text-[28px] font-extrabold uppercase leading-none tracking-tight sm:text-[32px]", className)}
      aria-label={`${name} — home`}
    >
      <span className="text-accent-2">{initial}</span>
      <span className="text-accent">.</span>
      {rest}
    </Link>
  );
}
