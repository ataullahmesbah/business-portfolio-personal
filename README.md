# Business Portfolio (Website 03)

A modern, animated **business-style personal portfolio** for freelancers and consultants who sell services to businesses.
It has a secure admin dashboard, dark and light themes, is responsive from 320px up, and is SEO-ready.
Each installation is standalone: one codebase, one Supabase project, and one Vercel deployment per client.

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) + React 19 + TypeScript |
| **Styling** | Tailwind CSS v4 + design tokens (two brand colours, gradient system) |
| **Motion** | Framer Motion + CSS keyframes (respects `prefers-reduced-motion`) |
| **Data / Auth / Media** | Supabase Postgres + Auth + Storage, protected by Row Level Security |
| **Hosting** | Vercel |
| **Validation** | Zod, on both client and server |

---

## 1. Features

### Public website (multi-page)
- **Home** — dark hero with a diagonal edge, rotating headline words with ← → slider buttons, portrait framed by spinning gradient rings, floating availability and experience badges, and a trust row (client photos + average rating from testimonials).
  Then, in the order you choose: Trusted-by logo marquee, About (photo reveal, animated bars, checklist), Services (dark cards with a gradient hover fill and outlined numbers), Why work with me (animated skill bars, experience card, photo grid), animated Counters strip, Projects (filter tabs with animated layout), Work process, Testimonials slider, Awards, Pricing, Blog and Contact.
- **Inner pages** with a dark banner and breadcrumb: `/about` (about, counters, skills, experience & education timeline, tools, testimonials, logos), `/services` (all services, process, pricing, testimonials), `/projects` and `/projects/[slug]` (case study with challenge, approach, result, project info card and gallery), `/blog` and `/blog/[slug]`, `/contact` (contact cards + form; `?service=` and `?plan=` pre-fill the form).
- **Call to action banner** overlapping the footer on every page, and a footer with quick links, services and contact details.
- **Page sections**: in Admin → Settings every section can be turned on/off and reordered. Turning off About, Services, Projects, Blog or Contact also hides that page, its menu link and its sitemap entry.
- **Themes**: dark, light, and system, with no flash of the wrong theme.
- **Brand colours**: two colours (main + gradient) from the dashboard, with presets or any hex. Text on the main colour switches between black and white automatically for contrast.
- **SEO**: Metadata API, canonical URLs, Open Graph/Twitter cards, generated OG image, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, JSON-LD (Person, ProfessionalService, WebSite, CreativeWork, BlogPosting).
- **Accessibility**: skip link, landmarks, keyboard-accessible mobile menu with focus trap, labelled carousels and filters, visible focus, form labels and errors, reduced-motion support.
- **Contact form**: server-side validation, honeypot, minimum fill time, IP rate limiting and database-level spam caps. Messages land in the dashboard inbox.

### Admin dashboard (`/admin`)
- Email/password login, forgot password, and reset via an email link.
- **Overview**: counts, recently edited projects, quick actions, website status.
- **Profile**: name, hero headline + rotating words, intro, trust line, hero portrait, optional hero background photo, About headline/text/photo/checklist, years of experience, “Why work with me” photos, contact details, CV, social links and tools.
- **Projects, Services, Resume, Skills, Counters, Process, Testimonials, Clients, Awards, Pricing, Blog**: create, edit, delete (with confirmation), reorder, and show/hide toggles. Projects can be duplicated.
- **Messages**: inbox with read/unread, reply by email, delete.
- **Settings**: website name, logo, two brand colours, default theme, contact details, footer text, page sections (on/off + order), SEO defaults.
- **My account** and a protected **Support** page (see §7).
- Image uploads go to Supabase Storage with type/size checks and random file names; replaced or orphaned files are cleaned up.

> **Demo mode:** if the Supabase environment variables are empty, the public site runs on the built-in demo content in `src/data/demo.ts`, so it never looks empty. The dashboard then shows setup instructions instead.

---

## 2. Local development

Requirements: Node.js 20.9+ (22 recommended).

```bash
npm install
cp .env.example .env.local      # fill in values (or leave Supabase empty for demo mode)
npm run dev                     # http://localhost:3000
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript check |
| `npm run seed:generate` | Regenerate `supabase/seed.sql` from `src/data/demo.ts` |
| `npm run schema:sql -- site01` | Build one SQL file that installs this website into its own schema (multi-website setup) |
| `npm run assets:generate` | Regenerate the demo SVG visuals in `public/demo` |

---

## 3. Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Production URL, e.g. `https://adrianvale.com`. Used for canonical URLs, the sitemap and Open Graph. |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ (for the dashboard) | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ (for the dashboard) | The **anon / publishable** key. It is safe in the browser because RLS protects all data. |
| `NEXT_PUBLIC_SUPABASE_SCHEMA` | optional | Only for the multi-website demo setup (see “One Supabase project, many websites”). Leave empty for client installs. |
| `SUPPORT_*` | optional | Overrides for the protected support page (see §7) |

**Never** add the Supabase `service_role` key to this project. It is not needed, and it must never reach the browser.

---

## 4. Supabase setup

1. Create a new project at [supabase.com](https://supabase.com), one per client.
2. **SQL Editor** → run `supabase/migrations/0001_init.sql`.
   This creates all tables, the RLS policies, the `portfolio-media` storage bucket (5 MB limit; JPG/PNG/WebP/AVIF/PDF only) and its storage policies.
3. **SQL Editor** → run `supabase/migrations/0002_hardening.sql`.
   This adds database-level contact-form anti-spam, stops public listing of storage files, and locks the admin columns users may edit.
4. **SQL Editor** → run `supabase/migrations/0003_awards_sections.sql`.
   This adds the Awards table and the page-section settings.
5. **SQL Editor** → run `supabase/migrations/0004_business.sql`.
   This adds the second brand colour, the new hero/about profile fields, and the Counters and Process tables.
6. **SQL Editor** → run `supabase/seed.sql` to load the demo content. It is safe to re-run; it replaces content but keeps messages and admins.
7. **Authentication → Users → Add user**: create the owner (email + password, auto-confirm).
8. Make that user the dashboard owner:

   ```sql
   insert into public.admins (user_id, display_name)
   select id, 'Owner Name' from auth.users where email = 'owner@example.com'
   on conflict (user_id) do update set active = true;
   ```

9. **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up". Only users you create can log in, and only users listed in `admins` can reach the dashboard.
10. **Authentication → URL Configuration**:
   - Site URL: your production URL
   - Redirect URLs: add `https://YOUR-DOMAIN/admin/auth/callback` (plus `http://localhost:3000/admin/auth/callback` for local work). The password-reset email uses this route.

With the Supabase CLI, you can instead run `supabase db push` and then execute `seed.sql`.

Recommended extra settings (Authentication → Policies / Passwords): set a minimum password length of 10+ and turn on **leaked password protection**.

---

## One Supabase project, many websites (demo / event setup)

Supabase's free plan allows only 2 active projects. For demos and events you can run **many websites from ONE free project**.
Each website gets its own Postgres *schema* (`site01`, `site02`, …) with its own data, admins and storage bucket.
Normal client installs don't need this: leave `NEXT_PUBLIC_SUPABASE_SCHEMA` empty and follow §4.

1. Pick a unique name for this website, for example `site01`.
2. Generate the ready-made SQL file:
   ```bash
   npm run schema:sql -- site01
   ```
   This creates `supabase/schemas/site01.sql` (all migrations + demo content, installed into schema `site01`, with bucket `site01-media`).
3. Supabase → **SQL Editor** → paste the whole file → **Run**. It is safe to run again later; it resets the demo content.
4. Supabase → **Project Settings → Data API → Exposed schemas** → add `site01` → **Save**. Without this step the website cannot read its data.
5. Make your user the owner of this website (create the user once in Authentication → Users; one user can own several websites):
   ```sql
   insert into site01.admins (user_id, display_name)
   select id, 'Owner Name' from auth.users where email = 'owner@example.com'
   on conflict (user_id) do update set active = true;
   ```
6. Website env (`.env.local` and Vercel): the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for every website, plus
   `NEXT_PUBLIC_SUPABASE_SCHEMA=site01`.
7. Supabase → **Authentication → URL Configuration → Redirect URLs**: add `https://THIS-WEBSITE/admin/auth/callback` for every website.

Repeat with `site02`, `site03`, … for the other websites (Website 01 and Website 03 can live in the same project).
Notes: all websites share the project's free limits (500 MB database, 1 GB storage), and a free project pauses after 7 days without activity — open the dashboard before an event to make sure it is **Active**.

---

## 5. Deployment (Vercel)

1. Push this repository to GitHub and import it in Vercel. The framework is detected automatically.
2. Add the environment variables from §3 for Production (and Preview).
3. Deploy, then add the custom domain. Vercel provisions HTTPS automatically.
4. Update `NEXT_PUBLIC_SITE_URL` and the Supabase redirect URLs to the final domain, then redeploy.

Uploaded media lives in Supabase Storage, not on Vercel, so it survives every redeploy.
Content edits appear on the public site immediately, because the dashboard revalidates the cached pages when you save.

---

## 6. Admin login & roles

- Dashboard: `https://YOUR-DOMAIN/admin` (it is excluded from search engines and `robots.txt`).
- This build uses a **single Owner role**. Every user in the `admins` table with `active = true` has full content access.
  - To add a second person, create them in Supabase Auth and insert them into `admins`.
  - To remove access, set `active = false` or delete the row. A deactivated user is rejected by the server on their next request.
- Security is enforced in three layers:
  1. `src/proxy.ts` redirects signed-out visitors away from `/admin`.
  2. Every page and server action verifies the session and the admin row on the server (`requireAdmin` / `assertAdmin`).
  3. Postgres **RLS** allows writes only when `public.is_admin()` is true. Hiding a button is never the protection.

---

## 7. Protected support page

`/admin/support` shows your company's contact details: WhatsApp, Messenger, phone, email, and website.
The client **cannot edit or delete** it. There is no table, form, or server action for it.

Set the values before handover, either:
- in `src/config/support.ts`, or
- through the `SUPPORT_COMPANY_NAME`, `SUPPORT_PHONE`, `SUPPORT_WHATSAPP_URL`, `SUPPORT_MESSENGER_URL`, `SUPPORT_EMAIL`, and `SUPPORT_WEBSITE_URL` environment variables in Vercel.

---

## 8. Media handling

- Uploads go from the dashboard straight to the Supabase Storage bucket `portfolio-media`, into folders such as `projects/`, `profile/` and `blog/`.
- Allowed files: JPG, PNG, WebP, and AVIF images, plus PDF for the CV. The limit is 5 MB, enforced both in the browser and by the bucket itself.
- File names are random UUIDs; the original filename is never used.
- The server only accepts media URLs that point to this project's bucket or to local `/demo/` assets.
- `next/image` serves optimised AVIF/WebP at responsive sizes. The Supabase hostname is whitelisted in `next.config.ts` from `NEXT_PUBLIC_SUPABASE_URL`.

Demo visuals in `public/demo` are purpose-made SVG illustrations (people, UI mockups, logos). Replace them from the dashboard with real work before launch.

---

## 9. Project structure

```
src/
  app/
    (site)/            public pages: home, about, services, projects, projects/[slug], blog, blog/[slug], contact
    admin/
      (auth)/          login, forgot-password
      (dashboard)/     overview, profile, settings, account, messages, support, [resource], [resource]/[id]
      auth/callback/   password-reset link handler
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg
  actions/             server actions (contact form, admin CRUD, auth)
  components/
    site/              public UI sections
    admin/             dashboard UI (shell, generic form/table, field inputs)
    motion/            reveal, stagger, split words, clip reveal, count-up
    ui/                shared bits (icons, theme toggle)
  config/              site.ts (developer credit, colour presets), support.ts (protected)
  data/demo.ts         demo content (source of seed.sql)
  lib/                 supabase clients, auth guards, data layer, admin schema, utils
  proxy.ts             admin route protection (Next 16 "proxy", formerly middleware)
supabase/
  migrations/0001_init.sql … 0004_business.sql
  seed.sql
```

To add a new editable content type, add a table in a new migration and an entry in `src/lib/admin/resources.ts`.
The list page, form, validation, and actions are generated from that config.

---

## 10. Security checklist

- [x] RLS enabled on every table. Anonymous users can read published content and insert contact messages only.
- [x] The service-role key is never used.
- [x] Server-side role check on every mutation, plus Zod validation.
- [x] Login, password reset, and contact form are rate limited. Login errors are generic and never reveal whether an account exists.
- [x] No `dangerouslySetInnerHTML` with user content. Blog content is rendered as plain React text; JSON-LD is escaped.
- [x] Security headers: `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, HSTS.
- [x] Contact form spam is also capped inside the database (30 messages per 10 minutes overall, 3 per email per hour), so calling the API directly cannot flood the inbox.
- [x] Storage files can be viewed by URL but not listed publicly. Only safe image types and PDF are accepted (no SVG/HTML uploads).
- [x] Deactivated admins are signed out of the dashboard on their next request.
- [x] Uploaded images are deleted only when no other record still uses them.
- [x] The admin area sends `noindex` and `no-store`.

---

## 11. Handover checklist

- [ ] Replace the demo content and images with the client's own (Profile, Projects, and so on).
- [ ] Set the support details (§7).
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain.
- [ ] Create the owner account (§4, steps 7–8) and send the client the login URL.
- [ ] Turn off public sign-ups in Supabase.
- [ ] Confirm all migrations (`0001` → `0004`) ran, in order.
- [ ] Replace the illustrated demo images (portraits, work photos, project covers) with real photos.
- [ ] Test the contact form, an image upload, and a password reset on production.
# business-portfolio-personal
