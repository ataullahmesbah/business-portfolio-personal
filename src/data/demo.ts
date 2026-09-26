/**
 * DEMO CONTENT
 * Used when Supabase is not configured, and mirrored by supabase/seed.sql.
 * Everything here is placeholder content meant to be replaced by the client
 * from the admin dashboard.
 */
import type {
  Award,
  BlogPost,
  Client,
  PricingPlan,
  ProcessStep,
  Profile,
  Project,
  ResumeItem,
  Service,
  SiteSettings,
  Skill,
  Stat,
  Testimonial,
} from "@/types/content";

export const demoSettings: SiteSettings = {
  website_name: "Adrian Vale",
  logo_url: null,
  accent_color: "#4f3cf0",
  accent_color_2: "#14d4f0",
  default_theme: "light",
  contact_email: "hello@adrianvale.demo",
  public_phone: "+44 20 7946 0000",
  seo_title: "Adrian Vale — Web Developer & Business Growth Partner",
  seo_description:
    "Adrian Vale builds fast websites, brands and marketing that help small businesses and startups win more customers online.",
  footer_text: "Web developer and digital strategist helping small businesses grow online since 2018.",
  hire_label: "Let's Talk",
  // Empty = every section visible in the default order (see src/lib/sections.ts).
  sections: [],
};

export const demoProfile: Profile = {
  full_name: "Adrian Vale",
  professional_title: "Business Growth Partner",
  hero_headline: "I Help Businesses",
  typed_roles: ["Grow Online", "Win More Clients", "Rank on Google", "Sell Online"],
  short_intro:
    "Websites, branding and digital marketing for small businesses and startups. One partner from strategy to launch, focused on real results.",
  bio: "I'm Adrian Vale, a web developer and digital strategist. For 8 years I have helped local shops, agencies and startups turn their ideas into websites that bring customers.",
  email: "hello@adrianvale.demo",
  phone: "+44 20 7946 0000",
  location: "London, United Kingdom",
  profile_image_url: "/demo/avatar-owner.svg",
  hero_image_url: "/demo/hero-portrait.svg",
  hero_background_url: null,
  resume_url: null,
  availability_status: "Available for new projects",
  trust_line: "120+ businesses trust my work",
  about_title: "Strategy, Design & Code — All in One Place",
  about_image_url: "/demo/about-portrait.svg",
  about_points: ["Idea Validation", "Business Strategy", "Online Business", "Market Research"],
  experience_years: 8,
  work_photos: ["/demo/work-meeting.svg", "/demo/work-desk.svg", "/demo/work-team.svg"],
  social_links: [
    { platform: "facebook", url: "https://facebook.com/" },
    { platform: "linkedin", url: "https://linkedin.com/" },
    { platform: "instagram", url: "https://instagram.com/" },
    { platform: "x", url: "https://x.com/" },
  ],
  skill_tools: [
    { name: "Next.js", icon: "nextjs" },
    { name: "Figma", icon: "figma" },
    { name: "WordPress", icon: "wordpress" },
  ],
};

export const demoServices: Service[] = [
  { id: "s1", title: "Website Development", short_description: "Fast, SEO-ready business websites you can update yourself from a simple dashboard.", icon_key: "monitor", active: true, sort_order: 1 },
  { id: "s2", title: "SEO & Digital Marketing", short_description: "Get found on Google, run smart ads and turn visitors into paying customers.", icon_key: "chart", active: true, sort_order: 2 },
  { id: "s3", title: "Brand Identity", short_description: "Logo, colours and a brand voice that make your business look professional everywhere.", icon_key: "palette", active: true, sort_order: 3 },
  { id: "s4", title: "E-commerce Store", short_description: "Online shops with secure payments, inventory and order tracking built in.", icon_key: "cart", active: true, sort_order: 4 },
  { id: "s5", title: "UI/UX Design", short_description: "Clear, modern interfaces for web apps and dashboards your users enjoy.", icon_key: "layers", active: true, sort_order: 5 },
  { id: "s6", title: "Care & Maintenance", short_description: "Updates, backups and security monitoring so your website keeps running smoothly.", icon_key: "shield", active: true, sort_order: 6 },
];

const story = {
  challenge:
    "The business was getting traffic but very few enquiries. The old website was slow on mobile, hard to update and did not explain clearly why customers should choose them.",
  solution:
    "We started with a short discovery workshop, rewrote the key messages, and designed a fast, mobile-first website with clear calls to action. A simple dashboard lets the team update content without a developer.",
  result:
    "Page speed improved to 95+, and enquiries more than doubled in the first three months. The team now publishes new offers and articles every week on their own.",
};

export const demoProjects: Project[] = [
  { id: "p1", title: "LearnHub Online Academy", slug: "learnhub-online-academy", category: "Websites", year: 2026, client: "LearnHub", role: "Strategy, Design & Development", intro: "A course website and student portal for an online academy with 5,000+ learners.", ...story, cover_image_url: "/demo/project-learnhub.svg", gallery: ["/demo/project-learnhub.svg", "/demo/project-ledgerly.svg"], live_url: "https://example.com", likes: 320, featured: true, status: "published", sort_order: 1 },
  { id: "p2", title: "Aurora Boutique Store", slug: "aurora-boutique-store", category: "E-commerce", year: 2026, client: "Aurora Boutique", role: "E-commerce Design & Build", intro: "A fashion storefront with quick checkout, wishlists and a monthly lookbook.", ...story, cover_image_url: "/demo/project-aurora.svg", gallery: ["/demo/project-aurora.svg", "/demo/project-brewly.svg"], live_url: "https://example.com", likes: 410, featured: true, status: "published", sort_order: 2 },
  { id: "p3", title: "Ledgerly Finance Dashboard", slug: "ledgerly-finance-dashboard", category: "Web Apps", year: 2025, client: "Ledgerly", role: "UI/UX Design, Front-end", intro: "An invoicing and cash-flow dashboard for freelancers and small teams.", ...story, cover_image_url: "/demo/project-ledgerly.svg", gallery: ["/demo/project-ledgerly.svg", "/demo/project-learnhub.svg"], live_url: null, likes: 280, featured: true, status: "published", sort_order: 3 },
  { id: "p4", title: "Brewly Coffee Rebrand", slug: "brewly-coffee-rebrand", category: "Branding", year: 2025, client: "Brewly", role: "Brand Identity", intro: "A warm, friendly identity and packaging system for a growing chain of coffee shops.", ...story, cover_image_url: "/demo/project-brewly.svg", gallery: ["/demo/project-brewly.svg", "/demo/project-aurora.svg"], live_url: null, likes: 350, featured: true, status: "published", sort_order: 4 },
  { id: "p5", title: "MediCare Clinic Growth", slug: "medicare-clinic-growth", category: "Marketing", year: 2024, client: "MediCare Clinic", role: "SEO & Google Ads", intro: "Local SEO and ad campaigns that filled a dental clinic's calendar within 90 days.", ...story, cover_image_url: "/demo/project-medicare.svg", gallery: ["/demo/project-medicare.svg", "/demo/project-propnest.svg"], live_url: "https://example.com", likes: 190, featured: false, status: "published", sort_order: 5 },
  { id: "p6", title: "PropNest Real Estate", slug: "propnest-real-estate", category: "Websites", year: 2024, client: "PropNest", role: "Design & Development", intro: "A property listing website with smart search filters and lead capture forms.", ...story, cover_image_url: "/demo/project-propnest.svg", gallery: ["/demo/project-propnest.svg", "/demo/project-medicare.svg"], live_url: null, likes: 260, featured: false, status: "published", sort_order: 6 },
];

export const demoResume: ResumeItem[] = [
  { id: "r1", type: "experience", title: "Independent Web Developer & Strategist", subtitle: "Freelance — Worldwide", period: "2021 – Present", badge: "Remote", description: "Helping small businesses and startups plan, build and grow their online presence.", active: true, sort_order: 1 },
  { id: "r2", type: "experience", title: "Senior Front-end Developer", subtitle: "Brightpath Digital, London", period: "2019 – 2021", badge: "Full-time", description: "Built websites and web apps for clients in retail, health and education. Led the agency's performance and SEO work.", active: true, sort_order: 2 },
  { id: "r3", type: "experience", title: "Web Designer", subtitle: "Northwind Agency, London", period: "2018 – 2019", badge: "Full-time", description: "Designed landing pages, email campaigns and brand assets for local businesses.", active: true, sort_order: 3 },
  { id: "r4", type: "education", title: "BSc in Computer Science", subtitle: "University of Greenwich", period: "2014 – 2017", badge: "First Class", description: "Focused on web technologies, databases and human–computer interaction.", active: true, sort_order: 1 },
  { id: "r5", type: "education", title: "Google Digital Marketing Certificate", subtitle: "Google Career Certificates", period: "2020", badge: "Certificate", description: "SEO, search ads, analytics and conversion optimisation.", active: true, sort_order: 2 },
];

export const demoSkills: Skill[] = [
  { id: "k1", name: "Web Development", category: "Core", level: 96, active: true, sort_order: 1 },
  { id: "k2", name: "SEO & Marketing", category: "Core", level: 88, active: true, sort_order: 2 },
  { id: "k3", name: "Brand Strategy", category: "Core", level: 76, active: true, sort_order: 3 },
];

export const demoStats: Stat[] = [
  { id: "st1", value: "95%", label: "Client retention", placement: "about", percent: 95, active: true, sort_order: 1 },
  { id: "st2", value: "3x", label: "Avg. lead growth", placement: "about", percent: 72, active: true, sort_order: 2 },
  { id: "st3", value: "120+", label: "Projects delivered", placement: "band", percent: 0, active: true, sort_order: 3 },
  { id: "st4", value: "85+", label: "Happy clients", placement: "band", percent: 0, active: true, sort_order: 4 },
  { id: "st5", value: "12", label: "Countries served", placement: "band", percent: 0, active: true, sort_order: 5 },
  { id: "st6", value: "4.9", label: "Average rating", placement: "band", percent: 0, active: true, sort_order: 6 },
];

export const demoProcess: ProcessStep[] = [
  { id: "ps1", title: "Discover", description: "A free call to understand your business, customers and goals.", active: true, sort_order: 1 },
  { id: "ps2", title: "Plan", description: "A clear proposal with scope, timeline and a fixed price.", active: true, sort_order: 2 },
  { id: "ps3", title: "Build", description: "Design and development with weekly progress updates.", active: true, sort_order: 3 },
  { id: "ps4", title: "Grow", description: "Launch, then SEO and support to keep results coming.", active: true, sort_order: 4 },
];

export const demoTestimonials: Testimonial[] = [
  { id: "t1", name: "Sarah Mitchell", role: "Owner", company: "Bloom Dental Clinic", project_title: "Website & Local SEO", quote: "Our old website brought zero leads. Adrian rebuilt it in three weeks and now we get new customer calls every single day.", avatar_url: "/demo/avatar-1.svg", rating: 5, active: true, sort_order: 1 },
  { id: "t2", name: "Daniel Kim", role: "Founder", company: "Ledgerly", project_title: "Finance Dashboard", quote: "Clear process, honest advice and a product our users love. Adrian felt like part of our team from day one.", avatar_url: "/demo/avatar-2.svg", rating: 5, active: true, sort_order: 2 },
  { id: "t3", name: "Laura Reyes", role: "Marketing Director", company: "Aurora Boutique", project_title: "E-commerce Store", quote: "Online sales grew 40% in the first quarter after launch. The store is fast, beautiful and so easy for us to manage.", avatar_url: "/demo/avatar-3.svg", rating: 5, active: true, sort_order: 3 },
];

export const demoClients: Client[] = [
  { id: "c1", name: "Northwind", category: "Brand", logo_url: "/demo/logo-northwind.svg", website_url: null, active: true, sort_order: 1 },
  { id: "c2", name: "Lumen", category: "Brand", logo_url: "/demo/logo-lumen.svg", website_url: null, active: true, sort_order: 2 },
  { id: "c3", name: "Arcadia", category: "Brand", logo_url: "/demo/logo-arcadia.svg", website_url: null, active: true, sort_order: 3 },
  { id: "c4", name: "Kinetic", category: "Brand", logo_url: "/demo/logo-kinetic.svg", website_url: null, active: true, sort_order: 4 },
  { id: "c5", name: "Novaco", category: "Brand", logo_url: "/demo/logo-novaco.svg", website_url: null, active: true, sort_order: 5 },
  { id: "c6", name: "Orbit", category: "Brand", logo_url: "/demo/logo-orbit.svg", website_url: null, active: true, sort_order: 6 },
];

export const demoPricing: PricingPlan[] = [
  { id: "pr1", name: "Starter", tagline: "Launch fast", price: "$990", period: "one-time", description: "A professional one-page website to put your business online quickly.", features: ["1 responsive page", "Contact form & WhatsApp button", "Basic SEO setup", "Google Business setup", "7-day delivery"], cta_label: "Get Started", highlighted: false, active: true, sort_order: 1 },
  { id: "pr2", name: "Business", tagline: "Best value", price: "$2,400", period: "one-time", description: "A complete business website with blog, dashboard and on-page SEO.", features: ["Up to 8 pages", "Admin dashboard", "Blog & SEO setup", "Speed optimisation", "Analytics & reports", "30 days free support"], cta_label: "Get Started", highlighted: true, active: true, sort_order: 2 },
  { id: "pr3", name: "Growth", tagline: "Website + marketing", price: "$690", period: "per month", description: "Ongoing SEO, ads and content to keep new customers coming every month.", features: ["Monthly SEO work", "Google & Meta ads", "2 blog posts per month", "Monthly report call", "Priority support"], cta_label: "Get Started", highlighted: false, active: true, sort_order: 3 },
];

export const demoPosts: BlogPost[] = [
  {
    id: "b1",
    title: "7 Simple SEO Fixes Every Small Business Should Do",
    slug: "simple-seo-fixes-small-business",
    excerpt: "You don't need an agency to start ranking. These seven fixes take an afternoon and make a real difference.",
    content:
      "Most small business websites lose customers on Google because of a few simple, fixable problems.\n\n## 1. Claim your Google Business Profile\nIt is free, and it is the first thing people see when they search for a local business.\n\n## 2. One clear page per service\nGoogle ranks pages, not websites. Give every main service its own page with a clear title.\n\n## 3. Make it fast on mobile\nMost visitors use a phone. Compress images and remove heavy plugins.\n\n## 4. Write real titles and descriptions\nEvery page needs a unique title and a short description that makes people want to click.\n\n## 5. Ask for reviews\nReviews build trust and help local rankings. Ask every happy customer.\n\n## 6. Add your address and phone everywhere\nKeep your name, address and phone number the same on every website.\n\n## 7. Publish helpful articles\nAnswer the questions customers ask you every week. Each answer is a new way to be found.",
    cover_image_url: "/demo/blog-seo.svg",
    category: "SEO",
    read_time: "5 min read",
    published_at: "2026-09-12",
    status: "published",
  },
  {
    id: "b2",
    title: "Why Your Website Loses Customers in 3 Seconds",
    slug: "why-website-loses-customers",
    excerpt: "Speed, clarity and trust decide whether a visitor stays or leaves. Here is how to fix all three.",
    content:
      "Visitors decide in a few seconds whether your website is worth their time.\n\n## Speed\nIf a page takes more than three seconds to load, many people simply leave. Optimise images and use modern hosting.\n\n## Clarity\nYour headline should say exactly what you do and who it is for. Clever slogans confuse people.\n\n## Trust\nShow real photos, reviews, client logos and clear contact details. People buy from businesses they trust.\n\n- Test your site on a phone\n- Read your headline out loud\n- Ask a friend what you sell after five seconds",
    cover_image_url: "/demo/blog-speed.svg",
    category: "Web Design",
    read_time: "4 min read",
    published_at: "2026-08-28",
    status: "published",
  },
  {
    id: "b3",
    title: "Social Media vs Website: Where Should You Invest?",
    slug: "social-media-vs-website",
    excerpt: "Social media brings attention, your website brings sales. How to make both work together.",
    content:
      "Many businesses start on social media — and that is fine. But you do not own your followers.\n\n## Social media is rented land\nAlgorithms change and reach drops. A post that reached thousands last year may reach a few hundred today.\n\n## Your website is your shop\nIt works 24/7, shows up on Google and turns visitors into enquiries and sales.\n\n## Use both together\nShare useful content on social media and always point people back to your website to book, buy or contact you.",
    cover_image_url: "/demo/blog-social.svg",
    category: "Marketing",
    read_time: "3 min read",
    published_at: "2026-08-02",
    status: "published",
  },
];

export const demoAwards: Award[] = [
  { id: "a1", title: "Top Rated Plus Freelancer", organization: "Upwork", year: "2026", short_description: "Awarded to the top 3% of freelancers for consistent five-star client feedback and on-time delivery.", image_url: "/demo/award-1.svg", link_url: null, active: true, sort_order: 1 },
  { id: "a2", title: "Best Small Business Website", organization: "UK Web Awards", year: "2025", short_description: "Winner for the Bloom Dental Clinic website, recognised for clarity, speed and local SEO results.", image_url: "/demo/award-2.svg", link_url: null, active: true, sort_order: 2 },
  { id: "a3", title: "Google Partner Certification", organization: "Google", year: "2025", short_description: "Certified in search advertising and measurement for running effective campaigns for clients.", image_url: "/demo/award-3.svg", link_url: null, active: true, sort_order: 3 },
];
