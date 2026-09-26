"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/** Gradient banner that overlaps the top of the footer (rendered above the footer on every page). */
export function FinalCta({ contactHref }: { contactHref: string }) {
  return (
    <div className="relative z-10 -mb-[110px] px-5 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="grad-bg relative mx-auto flex max-w-[1196px] flex-col items-start gap-7 overflow-hidden rounded-3xl px-8 py-12 sm:px-14 md:flex-row md:items-center md:justify-between md:py-14"
      >
        <span aria-hidden className="spin-slower absolute -right-20 -bottom-24 h-72 w-72 rounded-full border-[40px] border-white/15" />
        <span aria-hidden className="absolute top-6 left-[45%] h-4 w-4 rounded-full bg-white/40" />
        <h2 className="relative max-w-[560px] text-[clamp(1.9rem,3.6vw,2.75rem)] leading-tight text-white">Ready to Grow Your Business?</h2>
        <Link href={contactHref} className="btn relative !min-h-[62px] shrink-0 bg-white !px-9 !text-[17px] text-[#0d0b2e] shadow-xl hover:shadow-2xl">
          Book a Free Call <ArrowRight size={19} aria-hidden />
        </Link>
      </motion.div>
    </div>
  );
}
