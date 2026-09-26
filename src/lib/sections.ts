/**
 * Home page sections: which ones are shown and in what order.
 * Stored in site_settings.sections and edited in Admin → Settings.
 * The hero is always first and cannot be hidden.
 */
export type SectionKey =
  | "clients"
  | "about"
  | "services"
  | "why"
  | "stats"
  | "portfolio"
  | "process"
  | "testimonials"
  | "awards"
  | "pricing"
  | "blog"
  | "contact"
  | "cta";

export type SectionSetting = { key: SectionKey; visible: boolean };

type SectionDef = {
  key: SectionKey;
  label: string;
  description: string;
  /** Navbar link to a full page (the page is hidden too when the section is turned off). */
  page?: { label: string; href: string };
};

export const SECTION_DEFS: SectionDef[] = [
  { key: "clients", label: "Trusted by (client logos)", description: "Logo strip under the hero" },
  { key: "about", label: "About me", description: "Photo, bio, highlight bars and checklist", page: { label: "About", href: "/about" } },
  { key: "services", label: "Services", description: "Service cards, /services page", page: { label: "Services", href: "/services" } },
  { key: "why", label: "Why work with me", description: "Skill bars, experience card and photos" },
  { key: "stats", label: "Counters", description: "Animated numbers strip" },
  { key: "portfolio", label: "Projects", description: "Filterable projects, /projects pages", page: { label: "Projects", href: "/projects" } },
  { key: "process", label: "Work process", description: "Step-by-step process" },
  { key: "testimonials", label: "Testimonials", description: "Client quotes slider" },
  { key: "awards", label: "Awards", description: "Award slider (hidden when empty)" },
  { key: "pricing", label: "Pricing", description: "Pricing plans" },
  { key: "blog", label: "Blog", description: "Latest posts, /blog pages", page: { label: "Blog", href: "/blog" } },
  { key: "contact", label: "Contact", description: "Contact details and form, /contact page", page: { label: "Contact", href: "/contact" } },
  { key: "cta", label: "Call to action", description: "Gradient banner above the footer (every page)" },
];

export const SECTION_KEYS = SECTION_DEFS.map((d) => d.key);

export const defaultSections: SectionSetting[] = SECTION_DEFS.map((d) => ({ key: d.key, visible: true }));

/** Merges saved settings with the known sections: keeps saved order, drops unknown keys, appends new ones. */
export function normalizeSections(saved: unknown): SectionSetting[] {
  // Older saves may have stored the list as a JSON string — accept both.
  if (typeof saved === "string") {
    try {
      saved = JSON.parse(saved);
    } catch {
      saved = [];
    }
  }
  const list = Array.isArray(saved) ? saved : [];
  const seen = new Set<string>();
  const result: SectionSetting[] = [];
  for (const item of list) {
    const key = (item as SectionSetting)?.key;
    if (!SECTION_KEYS.includes(key) || seen.has(key)) continue;
    seen.add(key);
    result.push({ key, visible: (item as SectionSetting).visible !== false });
  }
  for (const d of SECTION_DEFS) if (!seen.has(d.key)) result.push({ key: d.key, visible: true });
  return result;
}

export function isSectionVisible(saved: unknown, key: SectionKey) {
  return normalizeSections(saved).find((s) => s.key === key)?.visible ?? true;
}

export type NavItem = { label: string; href: string };

/** Navbar / footer links to the inner pages, following the saved order and visibility. */
export function navItems(saved: unknown): NavItem[] {
  const items: NavItem[] = [{ label: "Home", href: "/" }];
  const visible = new Set(normalizeSections(saved).filter((s) => s.visible).map((s) => s.key));
  // Pages keep a fixed, familiar order in the menu (Home, About, Services, Projects, Blog, Contact).
  for (const d of SECTION_DEFS) if (d.page && visible.has(d.key)) items.push(d.page);
  return items;
}

export function sectionLabel(key: SectionKey) {
  return SECTION_DEFS.find((d) => d.key === key)?.label ?? key;
}

export function sectionDescription(key: SectionKey) {
  return SECTION_DEFS.find((d) => d.key === key)?.description ?? "";
}

/** Where "Start a project" style buttons go: the contact page, or email when Contact is turned off. */
export function contactLink(saved: unknown, email: string) {
  return isSectionVisible(saved, "contact") ? "/contact" : `mailto:${email}`;
}
