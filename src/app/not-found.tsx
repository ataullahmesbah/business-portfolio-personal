import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-[#0d0b2e] px-5 text-center text-white">
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden className="drift absolute top-10 left-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-accent opacity-30 blur-[130px]" />
      <div>
        <p className="kicker on-dark justify-center">Error 404</p>
        <h1 className="grad-text mt-4 text-[clamp(5rem,18vw,11rem)] leading-none">404</h1>
        <p className="mt-4 text-xl text-[#c9c7e6]">This page doesn&rsquo;t exist or was moved.</p>
        <Link href="/" className="btn btn-primary mt-10">
          <ArrowLeft size={18} aria-hidden /> Back to home
        </Link>
      </div>
    </main>
  );
}
