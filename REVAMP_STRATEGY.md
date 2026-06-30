# Margaux Prototype — 21st.dev Revamp Strategy

**Project:** `v0-margaux-dog-trainer-prototype`  
**Purpose:** Step-by-step playbook to revamp the site using 21st.dev MCP components while keeping Margaux’s warm, colorful, dog-trainer brand and **information-first** UX.  
**Usage:** Run one step per chat session. Paste the **Prompt** block verbatim. Do not skip Step 0.

---

## Table of contents

1. [Design north star](#design-north-star)
2. [How to use this document](#how-to-use-this-document)
3. [21st.dev MCP tools](#21stdev-mcp-tools)
4. [Global guardrails](#global-guardrails)
5. [Step 0 — Prerequisites (technical + layering)](#step-0--prerequisites-technical--layering)
6. [Step 1 — Shared UI primitives](#step-1--shared-ui-primitives)
7. [Step 2 — Hero (split + contact footer)](#step-2--hero-split--contact-footer)
8. [Step 3 — Brand ribbon + stats marquee](#step-3--brand-ribbon--stats-marquee)
9. [Step 4 — Problem section (bento grid)](#step-4--problem-section-bento-grid)
10. [Step 5 — Solution section (refined split)](#step-5--solution-section-refined-split)
11. [Step 6 — Process section (readable timeline)](#step-6--process-section-readable-timeline)
12. [Step 7 — Trust section (core value stats)](#step-7--trust-section-core-value-stats)
13. [Step 8 — Services preview (bento + prices)](#step-8--services-preview-bento--prices)
14. [Step 9 — Testimonials (bento grid)](#step-9--testimonials-bento-grid)
15. [Step 10 — FAQ (connected accordion)](#step-10--faq-connected-accordion)
16. [Step 11 — Final CTA + lead magnet polish](#step-11--final-cta--lead-magnet-polish)
17. [Step 12 — Navbar + footer branding](#step-12--navbar--footer-branding)
18. [Step 13 — Services listing page](#step-13--services-listing-page)
19. [Step 14 — Service detail template](#step-14--service-detail-template)
20. [Step 15 — Contact page](#step-15--contact-page)
21. [Step 16 — Events page](#step-16--events-page)
22. [Step 17 — Blog pages](#step-17--blog-pages)
23. [Step 18 — Final QA pass](#step-18--final-qa-pass)

---

## Design north star

### Why the current site feels “AI-generated”

| Current pattern | Why it feels generic | Target feel |
|---|---|---|
| Identical `SectionWrapper` + centered header + grid on every block | Repetitive SaaS template | Varied layouts: split hero, bento, ribbon, connected accordion |
| Same `useFadeUpReveal` / fade-up on every section | Predictable motion | **One** hero moment; rest static or hover-only |
| Badge + h1 + CTA + 3-stat row hero | Default v0 output | Editorial split hero with **contact info visible immediately** |
| Equal 3- or 4-column cards everywhere | No visual hierarchy | Bento / featured + secondary cell sizing |
| Sage/terracotta only on buttons | Lightly branded | Brand color on surfaces, borders, ribbons, badges, dividers |

### North star (non-negotiable)

- **Wow through layout craft + brand density**, not animation overload.
- **Cute, colorful, heavily branded** — sage green, terracotta, warm cream (see `app/globals.css` CSS variables).
- **Information first:** pricing, location (Lyon), contact email, services scannable in under 10 seconds.
- Still a **demo prototype**: keep fictitious content labels, cookie banner, non-functional chat widget badge.

### Brand tokens (do not replace)

From `app/globals.css`:

- Background: warm off-white `#FDF8F3`
- Primary: sage `#A8B5A2`
- Accent: terracotta `#C38E70`
- Fonts: Nunito (headings), DM Sans (body)

### Reference implementations in this monorepo

- `harmonichat/components/home/hero-section.tsx` — full-bleed hero + stats marquee
- `harmonichat/components/home/brand-ribbon.tsx` — branded scrolling ribbon
- `harmonichat/app/globals.css` — `animate-marquee`, `brand-surface` utilities
- `au-royaume-petits-vikings/components/booking/open-booking-link.tsx` — correct booking CTA pattern
- `prototype_refinement_prompt.md` — Pass 2 regression QA + design wow (parent repo; Step 1–2 for copy setup and verify-first bug checks)

---

## How to use this document

1. **Always work inside** `v0-margaux-dog-trainer-prototype/` (treat it as project root).
2. Run steps **in order** — later steps depend on primitives from Step 1.
3. For each step:
   - Call the indicated **21st.dev MCP tool** with the **search query** (if applicable).
   - Paste the **Prompt** into a new agent chat with `@v0-margaux-dog-trainer-prototype` attached.
   - Verify with `npm run lint && npm run build` before moving on.
4. Add new copy to **both** `messages/fr.ts` and `messages/en.ts`.
5. Use `@/lib/navigation` for links (not `next/link` directly).
6. Use `next-intl` (`useTranslations`, `getTranslations`) — never hardcode French/English in components.

---

## 21st.dev MCP tools

| Tool | When to use |
|---|---|
| `21st_magic_component_inspiration` | Browse 21st.dev; returns JSON snippets. Use to pick a layout before building. |
| `21st_magic_component_builder` | Generate a new UI component snippet for a specific file. |
| `21st_magic_component_refiner` | Redesign an **existing** component file (not full pages). |

**After any MCP call:** adapt snippets to Margaux tokens, i18n, and existing shadcn components. Never paste demo text (“Efferd”, “Tailus”, etc.).

---

## Global guardrails

Every step inherits these rules:

### Motion

- Respect `prefers-reduced-motion`: wrap infinite animations in `motion-reduce:animate-none`.
- **Max one** dramatic entrance animation on the homepage (hero clip-path or similar).
- No autoplay video heroes.
- No sticky scroll-stack testimonials, parallax backgrounds, or cursor-follow effects.
- Marquees: `pauseOnHover` + slow duration (28–40s).

### Accessibility & readability

- Terracotta CTAs on cream must meet WCAG AA contrast.
- FAQ accordion: one item open at a time; questions scannable without opening.
- Mobile: no accidental horizontal page scroll (except intentional stat row scroll).
- All images: meaningful `alt` from i18n.

### Dependencies

- **Do not add** `@ark-ui/react`, `react-icons`, or other new deps unless strictly required.
- Reuse existing: `framer-motion`, `lucide-react`, shadcn/ui, Radix.

### Code conventions

- `'use client'` only where needed.
- Keep `SectionWrapper` where it still makes sense, but vary inner layouts.
- Booking CTAs: always `OpenBookingLink` (created in Step 0), never `pathname: '/'`.

---

## Step 0 — Prerequisites (technical + layering)

**Goal:** Stable dev environment and correct booking/layering before any design work.

**21st search query:** *(none — no UI)*  
**MCP tool:** *(none)*  

**Files:**

- `next.config.mjs`
- `package-lock.json` / remove `pnpm-lock.yaml` if present
- `components/booking/open-booking-link.tsx` *(create)*
- `components/booking/index.ts`
- `components/layout/cookie-consent-banner.tsx`
- `components/layout/floating-cta.tsx`
- `components/layout/demo-chat-widget.tsx`
- `components/layout/navbar.tsx`
- `components/layout/footer.tsx`
- `components/home/services-preview.tsx`
- `components/home/final-cta-section.tsx`
- `components/services/service-page-template.tsx`
- `app/[locale]/contact/page.tsx`
- `app/[locale]/evenements/page.tsx`

**Success criteria:**

- `npm run dev` runs without workspace-root / multiple-lockfile warnings
- `npm run build` succeeds
- Booking modal opens on **current page** from every CTA
- Cookie banner stays **under** booking modal on mobile (`z-30` or lower on banner; modal `z-50`)
- Floating CTA and chat bubble do not overlap on 320–390px viewports

### Prompt

```
@v0-margaux-dog-trainer-prototype

Apply the standard prototype prerequisites from prototype_refinement_prompt.md (Step 1 Copy setup + Step 2 Regression check only — no design wow pass yet).

1. TURBOPACK ROOT — Update next.config.mjs:
   - Pin turbopack.root to __dirname (see prototype_refinement_prompt.md Step 1 for exact snippet)
   - Add a one-line comment explaining why

2. CLEAN INSTALL — Inside v0-margaux-dog-trainer-prototype:
   - Delete pnpm-lock.yaml, .next/, node_modules/ if present
   - Run npm install
   - Verify node_modules/tailwindcss exists and node_modules/.pnpm does NOT

3. OPEN BOOKING LINK — Create components/booking/open-booking-link.tsx modeled on au-royaume-petits-vikings/components/booking/open-booking-link.tsx:
   - Uses usePathname() from @/lib/navigation
   - href={{ pathname, query: { booking: 'true', ...(service ? { service } : {}) } }}
   - scroll={false}
   - Export from components/booking/index.ts

4. REPLACE ALL BOOKING CTAs — Find every Link with pathname: '/' and query booking: 'true'. Replace with OpenBookingLink (pass service slug on service pages). Files include:
   - components/layout/navbar.tsx
   - components/layout/footer.tsx
   - components/layout/floating-cta.tsx
   - components/home/services-preview.tsx
   - components/home/final-cta-section.tsx
   - components/services/service-page-template.tsx
   - app/[locale]/contact/page.tsx
   - app/[locale]/evenements/page.tsx

5. COOKIE BANNER Z-INDEX — Lower cookie-consent-banner to z-30 (not z-[100]). Simplify any clearSpaceForCookieBanner hack in booking-modal if present.

6. MOBILE OVERLAP — Fix floating-cta vs demo-chat-widget overlap on mobile (hide CTA when chat open, move CTA left, or reduce bottom offsets — pick the cleanest approach).

Verify: npm run lint && npm run build. Test booking from /services and /contact — page must NOT redirect to homepage.
```

---

## Step 1 — Shared UI primitives

**Goal:** Install reusable building blocks used by Steps 2–10.

**21st search query:** `marquee stats`  
**MCP tool:** `21st_magic_component_inspiration` (Marquee) + `21st_magic_component_inspiration` (Bento Grid)

**Files:**

- `components/ui/marquee.tsx` *(create)*
- `components/ui/bento-grid.tsx` *(create)*
- `app/globals.css`

**Keep:** Existing shadcn `Button`, `Card`, etc. — do not overwrite.

**Avoid:** Framer-motion marquees that depend on `next-themes` if not already used; prefer CSS `@keyframes` like harmonichat.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 1 of REVAMP_STRATEGY.md — shared UI primitives.

Use 21st.dev MCP (21st_magic_component_inspiration):
- searchQuery: "marquee stats" → adapt the magic-ui Marquee (items/children variant, NOT the giant stroked text variant)
- searchQuery: "bento grid features" → adapt BentoGridWithFeatures shell only

Create:

1. components/ui/marquee.tsx
   - Props: pauseOnHover, reverse, repeat, className, children
   - CSS-driven animation (see harmonichat/components/ui/marquee.tsx for reference)
   - motion-reduce:animate-none on animated elements

2. components/ui/bento-grid.tsx
   - Export: BentoGrid, BentoCard, BentoTitle, BentoDescription, BentoContent, BentoGridWithFeatures, type BentoFeature
   - Strip all demo content; use cn() from @/lib/utils
   - rounded-2xl/3xl borders using border-border and bg-card tokens

3. app/globals.css — add utilities:
   - @keyframes marquee + .animate-marquee (copy pattern from harmonichat/app/globals.css)
   - @keyframes scroll-ribbon for brand ribbon (Step 3)
   - .surface-cream, .surface-sage, .surface-terracotta (subtle tinted section backgrounds using primary/accent at 5–10% opacity)
   - .brand-surface, .brand-highlight, .brand-section-gradient (optional, match harmonichat naming)

Do NOT add new npm dependencies.
Run npm run lint && npm run build.
```

---

## Step 2 — Hero (split + contact footer)

**Goal:** Replace generic two-column hero with an editorial split layout; contact info visible without scrolling.

**21st search query:** `hero section warm`  
**MCP tool:** `21st_magic_component_builder`  
**Target file:** `components/home/hero-section.tsx`

**21st reference:** **Hero Section 2** — split layout, left content + right image with clip-path reveal, contact footer row (website / phone / address icons).

**Keep:** i18n namespace `hero` in messages/fr.ts + en.ts; image `/images/hero-margaux.jpg`; existing stats (200+ dogs, 5 years, 4.9/5).

**Avoid:** Full-screen video hero; mountain/adventure copy; more than one entrance animation.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 2 of REVAMP_STRATEGY.md — Hero section revamp.

Use 21st.dev MCP:
- Tool: 21st_magic_component_builder
- searchQuery: "hero section warm"
- absolutePathToCurrentFile: .../v0-margaux-dog-trainer-prototype/components/home/hero-section.tsx
- absolutePathToProjectDirectory: .../v0-margaux-dog-trainer-prototype
- standaloneRequestQuery: Adapt Hero Section 2 (split layout with contact footer) for Margaux dog trainer. Left: badge, h1 with titleBefore/titleHighlight/titleAfter, intro, primary CTA to /services, stats row. Right: hero-margaux.jpg with subtle clip-path reveal on load only (respect prefers-reduced-motion). Footer row: email contact@margaux-educatrice.fr, phone placeholder, Lyon 7e location — use lucide icons, not inline SVGs from demo.

Requirements:
- useTranslations('hero') for all visible text
- Link from @/lib/navigation
- Brand colors: sage primary, terracotta accent CTA
- Add secondary CTA: OpenBookingLink with cursor-booking-hover class
- Add new i18n keys if needed: contactEmail, contactPhone, contactLocation, ctaSecondary (both fr.ts and en.ts)
- Mobile: stack image below text; contact footer wraps cleanly
- Remove generic shadow-offset decorative box if it feels template-y; use brand-tinted border or surface-sage instead

Do not use next/link. Do not import external demo images.
Run npm run lint && npm run build. Visually check hero at 375px and 1280px.
```

---

## Step 3 — Brand ribbon + stats marquee

**Goal:** Strong brand pulse immediately below hero; reinforces values without hiding content.

**21st search query:** `marquee stats`  
**MCP tool:** `21st_magic_component_builder` (optional) or hand-build from harmonichat reference

**Files:**

- `components/home/brand-ribbon.tsx` *(create)*
- `components/home/hero-section.tsx` *(integrate marquee strip)*
- `app/[locale]/page.tsx` *(import BrandRibbon after HeroSection)*
- `messages/fr.ts`, `messages/en.ts` — new namespace `brandRibbon`

**Reference:** `harmonichat/components/home/brand-ribbon.tsx` + stats marquee inside hero.

**Avoid:** Fast, distracting marquee; blocking sticky ribbon.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 3 of REVAMP_STRATEGY.md — Brand ribbon + stats marquee.

1. Create components/home/brand-ribbon.tsx:
   - Scrolling ribbon: "Éducation positive · Confiance · Bienveillance · Lyon & alentours" (i18n: brandRibbon.i1–i4)
   - bg-primary text-primary-foreground, terracotta dot separators
   - animate-[scroll-ribbon_28s_linear_infinite] motion-reduce:animate-none
   - Export from components/home/index.ts

2. Optional stats marquee INSIDE hero (bottom of hero section):
   - Use components/ui/marquee.tsx
   - Items: "200+ chiens · 5 ans · 4,9/5 · Lyon 7e" (i18n: hero.marqueeStats array)
   - pauseOnHover, subtle border-y border-primary/15

3. Update app/[locale]/page.tsx: <HeroSection /> then <BrandRibbon />

Add keys to messages/fr.ts and messages/en.ts.
Run npm run lint && npm run build.
```

---

## Step 4 — Problem section (bento grid)

**Goal:** Break the equal 4-card grid; asymmetric bento makes pain points memorable but scannable.

**21st search query:** `bento grid features`  
**MCP tool:** `21st_magic_component_refiner` or `builder`  
**Target file:** `components/home/problem-section.tsx`

**Keep:** i18n namespace `problem` (p1Title–p4Title, p1Desc–p4Desc).

**Avoid:** Monochrome bento (Bento Monochrome); floating icon animations per cell.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 4 of REVAMP_STRATEGY.md — Problem section as colorful bento grid.

Use 21st.dev MCP inspiration: searchQuery "bento grid features"

Rewrite components/home/problem-section.tsx:
- Use BentoGridWithFeatures from @/components/ui/bento-grid
- 4 cells from problem translations; asymmetric spans:
  - Cell 1 (large): p1 — icon XCircle, surface-terracotta tint
  - Cell 2: p2 — Frown
  - Cell 3: p3 — AlertCircle
  - Cell 4 (wide): p4 — HelpCircle
- Each cell: title + description, lucide icon in rounded brand icon holder
- SectionWrapper background="alt" + SectionHeader with problem.title/subtitle
- NO framer-motion stagger on every card — static layout, hover: shadow-md only
- motion-reduce: no hover translate

Add id="problemes" on section for anchor links if useful.
Run npm run lint && npm run build.
```

---

## Step 5 — Solution section (refined split)

**Goal:** Keep strong info architecture (image + benefit list); upgrade typography and brand surfaces.

**21st search query:** *(none)*  
**MCP tool:** `21st_magic_component_refiner`  
**Target file:** `components/home/solution-section.tsx`

**Avoid:** Replacing checklist with vague marketing copy; removing the 98% badge.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 5 of REVAMP_STRATEGY.md — Refine solution section.

Use 21st.dev MCP:
- Tool: 21st_magic_component_refiner
- absolutePathToRefiningFile: .../components/home/solution-section.tsx
- context: Upgrade split layout — left image trainer-action.jpg with brand frame (border-primary/20, rounded-2xl), floating badge 98% stat with accent background. Right: stronger heading hierarchy, brand-highlight on h2highlight, checklist with primary check circles. Use surface-cream on text column. Remove useSlideInX motion — single fade or static. Keep all solution.* i18n keys.

Run npm run lint && npm run build.
```

---

## Step 6 — Process section (readable timeline)

**Goal:** Three steps obvious on mobile; no connector line bugs on small screens.

**21st search query:** `process steps timeline`  
**MCP tool:** `21st_magic_component_refiner`  
**Target file:** `components/home/process-section.tsx`

**Avoid:** Horizontal scroll timeline; animated progress bars.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 6 of REVAMP_STRATEGY.md — Process section.

Use 21st.dev MCP inspiration: searchQuery "process steps timeline" (take layout ideas only)

Refine components/home/process-section.tsx:
- 3 steps from process.* i18n
- Desktop: horizontal with subtle connector; Mobile: vertical stack with left border-l-4 border-primary timeline
- Number badges on primary circles (keep step numbers 1–3)
- brand-section-gradient background on SectionWrapper
- Static render — remove per-step whileInView delays
- Each step: icon, title, description — min 16px body text on mobile

Run npm run lint && npm run build. Test at 320px width.
```

---

## Step 7 — Trust section (core value stats)

**Goal:** Dense trust info — certifications, experience, insurance — in scannable stat cards.

**21st search query:** `core value stats`  
**MCP tool:** `21st_magic_component_builder`  
**Target file:** `components/home/trust-section.tsx`

**21st reference:** **Core Value Stats** — horizontal scroll on mobile, one card can have photo overlay.

**Keep:** All 6 trust points from trust.t1Title–t6Title.

**Avoid:** 3D tilt hover on every card; "Learn more →" links going nowhere.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 7 of REVAMP_STRATEGY.md — Trust section with Core Value Stats pattern.

Use 21st.dev MCP:
- Tool: 21st_magic_component_builder
- searchQuery: "core value stats"
- Target: components/home/trust-section.tsx

Adapt Core Value Stats:
- Map 6 trust points to stat cards: value = short label (e.g. "ACACED", "+200", "5 ans"), label = title, description = t1Desc–t6Desc
- One card (e.g. "+200 binômes") includes /images/happy-dog-1.jpg overlay with dark scrim
- Horizontal scroll on mobile (flex-nowrap overflow-x-auto), grid/wrap on lg
- Section header: trust.title/subtitle
- Remove fake "Learn more" buttons OR link to /contact
- Subtle hover shadow only — no 3D perspective transforms
- Use trust.* i18n; icons from lucide (Award, Heart, Users, Clock, Shield, Zap) as small badges on cards

Run npm run lint && npm run build.
```

---

## Step 8 — Services preview (bento + prices)

**Goal:** Services + prices visible at a glance; flagship service gets largest cell.

**21st search query:** `bento grid features`  
**MCP tool:** `21st_magic_component_builder`  
**Target file:** `components/home/services-preview.tsx`

**Keep:** `getServices(locale)` from lib/data/services; OpenBookingLink for bookDemo CTA.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 8 of REVAMP_STRATEGY.md — Services preview bento grid.

Use 21st.dev MCP inspiration: searchQuery "bento grid features"

Rewrite components/home/services-preview.tsx:
- BentoGridWithFeatures with 6 services from getServices(locale)
- Largest cell (2x2 span): first service or "education-chiot" slug — show image, shortTitle, tagline, "dès XX €" pricing
- Smaller cells: remaining services with icon, title, from-price, link to /services/[slug]
- Top rating strip: stars + servicesPreview.ratingLine + OpenBookingLink for bookDemo
- Bottom: Link to /services (allServices)
- Brand borders: hover:border-primary/30, surface-cream cells
- Replace any remaining pathname:'/' booking links with OpenBookingLink

Run npm run lint && npm run build.
```

---

## Step 9 — Testimonials (bento grid)

**Goal:** Social proof with visual hierarchy; **not** sticky scroll-stack.

**21st search query:** `testimonials cards`  
**MCP tool:** `21st_magic_component_builder`  
**Target file:** `components/home/testimonials-section.tsx`

**21st reference:** **Testimonials** (Tailus bento grid — 1 large + 3 smaller cards).

**Keep:** `getFeaturedTestimonials(3, locale)` from lib/data/testimonials.

**Avoid:** StickyTestimonialCard scroll stack; Trustpilot green stars; external avatar URLs.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 9 of REVAMP_STRATEGY.md — Testimonials bento grid.

Use 21st.dev MCP:
- Tool: 21st_magic_component_builder
- searchQuery: "testimonials cards"
- Target: components/home/testimonials-section.tsx

Adapt Tailus-style testimonials bento (NOT sticky scroll stack):
- 1 featured large card (first testimonial): full quote, stars in accent color, author + dog name/breed, /images/happy-dog-1.jpg
- 2–3 smaller cards in asymmetric grid
- Data from getFeaturedTestimonials(3, locale)
- Quote icon watermark in primary/10
- testimonials.title/subtitle via SectionHeader
- Static layout, no carousel unless user prefers — default: all visible on desktop, stack on mobile

Run npm run lint && npm run build.
```

---

## Step 10 — FAQ (connected accordion)

**Goal:** Faster scanning — single connected accordion block instead of spaced rounded cards.

**21st search query:** `faq accordion`  
**MCP tool:** `21st_magic_component_refiner`  
**Target file:** `components/home/faq-section.tsx`

**21st reference:** **Faqs-1** — `-space-y-px`, shared border, first/last rounded corners.

**Keep:** `getFeaturedFAQ(6, locale)` from lib/data/faq.

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 10 of REVAMP_STRATEGY.md — FAQ connected accordion.

Use 21st.dev MCP inspiration: searchQuery "faq accordion" (Faqs-1 pattern)

Update components/home/faq-section.tsx:
- Single Accordion type="single" collapsible
- AccordionItems share borders (-space-y-px), first:rounded-t-lg last:rounded-b-lg
- bg-card, faq.title/subtitle header
- Items from getFeaturedFAQ(6, locale)
- Footer line: link to /contact for more questions (i18n faq.contactLink if needed)
- Remove motion wrapper fade — keep accordion accessible

Add faq.contactPrompt + faq.contactLink to fr.ts and en.ts if missing.
Run npm run lint && npm run build.
```

---

## Step 11 — Final CTA + lead magnet polish

**Goal:** Strong branded closing block; lead magnet feels integrated, not bolted on.

**21st search query:** `cta section`  
**MCP tool:** `21st_magic_component_refiner`  
**Files:**

- `components/home/final-cta-section.tsx`
- `components/home/lead-magnet-section.tsx`

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 11 of REVAMP_STRATEGY.md — Final CTA + lead magnet.

Use 21st.dev MCP refiner on final-cta-section.tsx (searchQuery "cta section" for inspiration)

final-cta-section.tsx:
- Full-width brand block: surface-terracotta or gradient brand-section-gradient
- Large heading, sub, OpenBookingLink primary CTA (cursor-booking-hover), finalCta.note visible
- Optional secondary link to /contact
- Remove whileInView motion or keep minimal

lead-magnet-section.tsx:
- Compact card with border-primary/20, icon, heading/sub from leadMagnet.*
- Form stays demo (no real submit) — keep success state messaging
- Visually distinct from final CTA (cream card vs bold CTA band)

Run npm run lint && npm run build.
```

---

## Step 12 — Navbar + footer branding

**Goal:** Navigation and footer feel ownable — brand color active states, richer footer.

**21st search query:** `navbar footer`  
**MCP tool:** `21st_magic_component_refiner`  
**Files:**

- `components/layout/navbar.tsx`
- `components/layout/footer.tsx`

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 12 of REVAMP_STRATEGY.md — Navbar + footer branding pass.

Use 21st.dev MCP refiner on navbar.tsx and footer.tsx.

Navbar:
- Active link: text-primary + subtle bottom border or bg-primary/10 rounded-md px-2
- OpenBookingLink for book/bookSession (already from Step 0)
- Sticky header: stronger shadow when elevated, border-primary/10
- Keep demo strip above nav (designcanin.com credit)

Footer:
- 4-column layout on lg: brand+tagline | services links | useful links | contact/email
- Social icons with hover:text-primary
- OpenBookingLink in footer
- bg-card or surface-sage tint, border-t border-primary/15
- Preserve footer.* i18n keys

Run npm run lint && npm run build.
```

---

## Step 13 — Services listing page

**Goal:** Apply service card styling from Step 8 across full listing.

**MCP tool:** `21st_magic_component_refiner`  
**Files:**

- `app/[locale]/services/page.tsx`
- `components/services/service-card.tsx`

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 13 of REVAMP_STRATEGY.md — Services listing page.

Align with homepage services bento styling:
- service-card.tsx: brand border, price pill on image, primary/10 icon area, hover:border-primary/30
- services/page.tsx: branded page header (servicesPage.* i18n), optional surface-cream intro strip with rating + OpenBookingLink
- Grid: sm:2 lg:3, consistent image aspect ratio
- Remove excessive motion delays on cards

Run npm run lint && npm run build. Test /fr/services and /en/services.
```

---

## Step 14 — Service detail template

**Goal:** Pricing and “what’s included” scannable; booking CTA sticky on mobile optional.

**MCP tool:** `21st_magic_component_refiner`  
**File:** `components/services/service-page-template.tsx`

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 14 of REVAMP_STRATEGY.md — Service detail template.

Refine components/services/service-page-template.tsx:
- Hero: service image + title + tagline + price from service data
- Two-column layout: main content (description, includes, FAQ) | sidebar (pricing table, duration, location, OpenBookingLink with service={slug})
- brand-highlight on key benefits
- Testimonial quote block if service has quote in data
- All booking CTAs use OpenBookingLink with service slug
- Mobile: sidebar stacks below hero; CTA full-width

Run npm run lint && npm run build. Test at least 2 service slugs in FR and EN.
```

---

## Step 15 — Contact page

**Goal:** Contact info immediately visible — reuse hero contact pattern.

**MCP tool:** `21st_magic_component_builder` or refiner  
**File:** `app/[locale]/contact/page.tsx`

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 15 of REVAMP_STRATEGY.md — Contact page.

Update app/[locale]/contact/page.tsx:
- Top: compact hero band with contact.title/subtitle, email mailto:contact@margaux-educatrice.fr prominent
- Split: contact form (demo) | info cards (hours, zone Lyon, OpenBookingLink)
- Reuse surface-sage / brand-surface card styling from homepage
- contact.* i18n keys only

Run npm run lint && npm run build.
```

---

## Step 16 — Events page

**Goal:** Events scannable with date/location badges.

**MCP tool:** refiner  
**File:** `app/[locale]/evenements/page.tsx`

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 16 of REVAMP_STRATEGY.md — Events page.

Update app/[locale]/evenements/page.tsx:
- Branded header from eventsPage.* i18n
- Event cards: date badge (accent), title, location, short description from lib/data/events.ts
- OpenBookingLink or link to contact where appropriate
- Card grid consistent with service cards (border, hover shadow)

Run npm run lint && npm run build.
```

---

## Step 17 — Blog pages

**Goal:** Minimal pass — readable prose, branded header.

**Files:**

- `app/[locale]/blog/page.tsx`
- `app/[locale]/blog/[slug]/page.tsx`
- `components/blog/blog-post-body.tsx`

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 17 of REVAMP_STRATEGY.md — Blog pages (light touch).

- blog/page.tsx: branded list header, post cards with date + excerpt, surface-cream cards
- blog/[slug]/page.tsx: readable max-w-3xl prose, brand-colored links
- blog-post-body.tsx: adequate heading hierarchy, no layout overhaul

Do not rewrite blog content data. Run npm run lint && npm run build.
```

---

## Step 18 — Final QA pass

**Goal:** Ship-ready prototype verification.

**MCP tool:** *(none)*

### Prompt

```
@v0-margaux-dog-trainer-prototype

Step 18 of REVAMP_STRATEGY.md — Final QA pass.

Run full checklist:

TECHNICAL
- [ ] npm run lint — clean
- [ ] npm run build — succeeds
- [ ] npm run dev — no Turbopack workspace-root warning

BOOKING & LAYERING
- [ ] Open booking from navbar, footer, floating CTA, services preview, final CTA, service page, contact, events — stays on current page
- [ ] Cookie banner below booking modal on mobile (scroll all wizard steps)
- [ ] Chat widget vs floating CTA — no overlap 320–390px

CONTENT & i18n
- [ ] All new strings exist in messages/fr.ts AND messages/en.ts
- [ ] Switch locale on homepage, services, contact — no missing keys

DESIGN
- [ ] Homepage sections use varied layouts (not identical grids)
- [ ] Brand colors pervasive: ribbons, surfaces, borders, icons — not just buttons
- [ ] Dark mode: surfaces and contrast intentional
- [ ] prefers-reduced-motion: marquees/ribbons static

INFORMATION FIRST
- [ ] Hero shows contact/location without scrolling on desktop
- [ ] Service prices visible on homepage services section
- [ ] FAQ answers accessible in connected accordion

8-SECOND TEST
- [ ] Visitor can say: "This is Margaux's dog training site" and find how to book + contact quickly

Fix any failures. Summarize remaining manual improvements (e.g. swap hero photo) for the human.
```

---

## Appendix A — Homepage section order

Current `app/[locale]/page.tsx` order (preserve conversion flow):

1. HeroSection  
2. BrandRibbon *(after Step 3)*  
3. ProblemSection  
4. SolutionSection  
5. ProcessSection  
6. TrustSection  
7. ServicesPreview  
8. TestimonialsSection  
9. LeadMagnetSection  
10. FAQSection  
11. FinalCTASection  

Plus global: Navbar, Footer, FloatingCTA, BookingModal, cookie banner, email popup, demo chat.

---

## Appendix B — i18n namespaces cheat sheet

| Namespace | Used in |
|---|---|
| `hero` | Hero |
| `brandRibbon` | Brand ribbon *(new Step 3)* |
| `problem` | Problem bento |
| `solution` | Solution |
| `process` | Process |
| `trust` | Trust stats |
| `servicesPreview` | Services preview |
| `testimonials` | Testimonials |
| `leadMagnet` | Lead magnet |
| `faq` | FAQ |
| `finalCta` | Final CTA |
| `nav`, `footer`, `floatingCta` | Layout |

---

## Appendix C — 21st.dev components explicitly rejected

| Component | Reason |
|---|---|
| Sticky testimonial scroll stack | Gimmicky; hurts info scanning |
| Hero with autoplay VideoPlayer | Heavy; conflicts with info-first |
| Bento Monochrome | Wrong vibe for cute/colorful brand |
| Faq with @ark-ui Collapsible | Extra dependency |
| Stroked giant text Marquee | Illegible for service info |

---

## Appendix D — Suggested session workflow

1. Open new Cursor chat with `@v0-margaux-dog-trainer-prototype`
2. Paste one step prompt from this file
3. Review diff — reject new dependencies and demo placeholder text
4. Run `npm run dev` and spot-check the changed section at mobile + desktop
5. Mark step done; proceed to next step

**Estimated effort:** Steps 0–1 (~1 session), Steps 2–12 (~1 session each or batch 2–3 related steps), Steps 13–17 (~1 session total), Step 18 (~1 session).

---

*This playbook turns “make it less AI-generated” into concrete, repeatable prompts. Wow comes from layout variety, brand density, and instant access to information — not from animation noise.*
