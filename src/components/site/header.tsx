"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { ThemeSwitcher, ThemeToggle } from "@/components/ui/theme-toggle";
import { BrandIcon } from "@/components/ui/brand-icon";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/sections";
import type { SocialLink } from "@/types/content";

type Props = {
  name: string;
  logo: string | null;
  hireLabel: string;
  contactHref: string;
  nav: NavItem[];
  socials: SocialLink[];
  email: string;
};

export function Header({ name, logo, hireLabel, contactHref, nav, socials, email }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawer = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll, close on Escape and keep focus inside the menu while it is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = drawer.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key !== "Tab" || !drawer.current) return;
      const items = Array.from(drawer.current.querySelectorAll<HTMLElement>("a, button"));
      const a = items[0];
      const z = items[items.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500",
          scrolled ? "bg-[var(--header-solid)] text-heading shadow-[0_10px_40px_-20px_rgba(17,15,36,0.35)] backdrop-blur-md" : "bg-transparent text-white"
        )}
      >
        <div className={cn("container-x flex items-center justify-between gap-6 transition-[height] duration-500", scrolled ? "h-[78px]" : "h-[96px]")}>
          <Logo name={name} logo={logo} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex rounded-md px-4 py-3 font-heading text-[15px] font-bold uppercase tracking-wide transition-colors",
                        active && !scrolled && "bg-accent-2 text-navy",
                        active && scrolled && "text-accent-ink",
                        !active && (scrolled ? "hover:text-accent-ink" : "hover:text-accent-2")
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle
              className={cn(
                "!border-current/25",
                scrolled ? "text-heading" : "text-white"
              )}
            />
            <Link href={contactHref} className="btn btn-primary hidden !min-h-[48px] !px-6 !text-[15px] sm:inline-flex">
              {hireLabel}
            </Link>
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-current/25 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close menu" tabIndex={-1} className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              ref={drawer}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute top-0 right-0 flex h-full w-[min(88vw,380px)] flex-col overflow-y-auto bg-bg p-7 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Logo name={name} logo={logo} className="text-heading" />
                <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-heading" aria-label="Close menu">
                  <X size={20} aria-hidden />
                </button>
              </div>
              <ul className="mt-10 flex flex-col">
                {nav.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between border-b border-line py-4 font-heading text-lg font-bold",
                        isActive(item.href) ? "text-accent-ink" : "text-heading"
                      )}
                    >
                      {item.label}
                      <ArrowRight size={18} aria-hidden className="opacity-40" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link href={contactHref} onClick={() => setOpen(false)} className="btn btn-primary mt-8 w-full">
                {hireLabel} <ArrowRight size={18} aria-hidden />
              </Link>
              <div className="mt-auto pt-10">
                <p className="text-sm text-muted">Say hello</p>
                <a href={`mailto:${email}`} className="font-heading text-lg font-bold break-all text-heading">
                  {email}
                </a>
                <div className="mt-5 flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.platform + s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="grid h-11 w-11 place-items-center rounded-full bg-surface text-heading transition-colors hover:bg-accent hover:text-on-accent"
                    >
                      <BrandIcon name={s.platform} size={16} />
                    </a>
                  ))}
                </div>
                <ThemeSwitcher className="mt-6" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
