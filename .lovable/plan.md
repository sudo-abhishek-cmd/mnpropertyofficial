# MN Property — Smart Digital Storefront

A premium navy + gold real-estate site for MN Property (Central Delhi) with a public storefront, password-protected admin dashboard, and lead-generation hooks (WhatsApp +91 93153 52850, Instagram, YouTube, etc.).

## Tech

- TanStack Start (already scaffolded) + Tailwind v4 + shadcn
- Lovable Cloud (Supabase under the hood) for database, auth, image storage
- Navy `#1A365D` + Gold `#D69E2E` design tokens, premium typography (Playfair Display + Inter)

## Public site (routes)

- `/` — Hero (full-bleed image, headline "Your Trusted Real Estate Partner in Central Delhi"), search bar, social-proof ribbon (500+ families, 10+ years), featured properties, video reel, testimonials, social hub, embedded Google Map, footer
- `/properties` — Tabs: For Sale / For Rent / Featured. Filter + property cards with "Enquire on WhatsApp" + "Share" buttons. Modal detail view.
- `/videos` — Grid of YouTube/Instagram Reel embeds
- `/testimonials` — Reviews + "leave a review" form (goes to admin moderation queue)
- `/about` — Story, team, trust signals
- `/contact` — Map, address, WhatsApp CTA, "Share office location" button, QR code of site URL
- Floating WhatsApp button on every page

## Admin dashboard (`/admin`)

Email/password login (Lovable Cloud auth, admin-only via `user_roles` table + `has_role` RPC).

- **Dashboard** — counts (properties, videos, pending reviews, page views)
- **Properties** — CRUD (title, price, type Sale/Rent/Featured, BHK, area, location, description, images upload, visible toggle)
- **Videos** — add YouTube/Instagram URL + title (auto-embed)
- **Testimonials** — approve/edit/delete reviews
- **Site Settings** — hero image, headline, subheadline, social links, WhatsApp number, map embed URL
- Confirmation modals on delete

## Database (Lovable Cloud)

```text
profiles(id, email)
user_roles(user_id, role enum: admin|user)  + has_role() RPC
properties(id, title, price, type, bhk, area_sqft, location, description, images[], visible, featured, created_at)
videos(id, title, url, platform, created_at)
testimonials(id, name, rating, text, photo_url, approved, created_at)
site_settings(id, key, value jsonb)  -- single row of config
page_views(id, path, created_at)     -- simple counter
```

RLS: public SELECT on visible properties / approved testimonials / videos / settings. Writes restricted to admins via `has_role`. Storage bucket `property-images` (public).

## Lead-gen / engagement

- Floating WhatsApp button → prefilled message
- Per-property "Enquire" → WhatsApp with property title prefilled
- "Share this site" / "Share property" / "Share office location" → copy + WhatsApp deep link
- QR code generator (qrcode lib) for site URL on contact page
- Public view counter increment on home page load

## Build order

1. Enable Lovable Cloud + create schema + storage bucket + seed data (3 sample properties, 2 videos, 3 testimonials, settings row)
2. Design system in `src/styles.css` (navy/gold tokens, fonts, shadows, gradients) + shared layout (header, footer, floating WhatsApp)
3. Public routes with seed data wired up
4. Admin auth gate (`_authenticated/admin/*`) + role check + admin pages
5. Polish: QR code, share buttons, view counter, skeleton loaders

## Seed contact info

WhatsApp: +91 93153 52850. Other social links use placeholders the admin can edit in Site Settings.

After approval I'll enable Lovable Cloud and start building.
