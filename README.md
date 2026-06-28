# MN Property Digital Hub

A vibrant, mobile-first landing page for **MN Property** — a real estate broker in Central Delhi. The site is a **static frontend** (React + TypeScript + Vite + TanStack Start) with **no database**. Property and office photos/videos are loaded from **public Google Drive folders**.

---

## Features

- Property gallery (6 images) + property video from Google Drive
- Office gallery (6 images) + office video from Google Drive
- Tab switcher on homepage (Properties / Office)
- Mobile bottom navigation bar with high-contrast styling
- WhatsApp floating button with pre-filled enquiry message
- Google Maps embed on Contact page
- Hardcoded social links, contact info, and branding
- Fallback placeholder images if Drive is not configured or fetch fails
- Lightbox for full-size image viewing

---

## Tech Stack

| Layer     | Technology                              |
| --------- | --------------------------------------- |
| Framework | React 19 + TypeScript                   |
| Routing   | TanStack Router / TanStack Start        |
| Styling   | Tailwind CSS v4                         |
| Data      | Google Drive API v3 (client-side fetch) |
| Fonts     | Inter + Playfair Display                |

---

## Prerequisites

- **Node.js** 22.12+ recommended (22.11 may work with warnings)
- **npm** (or Bun)
- A **Google Cloud project** with Drive API enabled (for live media)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Install rolldown native binding on Windows if build fails
npm install @rolldown/binding-win32-x64-msvc

# 3. Configure Google Drive — edit src/utils/constants.ts (see below)

# 4. Start development server
npm run dev
```

Open **http://localhost:8080**

### Production build

```bash
npm run build
npm run preview
```

---

## Configuration

All site settings live in **`src/utils/constants.ts`**.

### Google Drive (content source)

Create **two public folders** in Google Drive:

| Folder              | Purpose         | Contents                                      |
| ------------------- | --------------- | --------------------------------------------- |
| **Property folder** | Listing samples | Up to 6 images (jpg/png/webp) + 1 video (mp4) |
| **Office folder**   | Office showcase | Up to 6 images + 1 video                      |

**Steps:**

1. Upload files to each folder
2. Right-click folder → **Share** → **Anyone with the link** → Viewer
3. Copy the folder ID from the URL:
   ```
   https://drive.google.com/drive/folders/FOLDER_ID_HERE
   ```
4. Create a [Google Cloud API key](https://console.cloud.google.com/apis/credentials):
   - Enable **Google Drive API**
   - Restrict the key to your domain in production
5. Set in `src/utils/constants.ts`:

```typescript
export const GOOGLE_DRIVE_PROPERTY_FOLDER_ID = "your-property-folder-id";
export const GOOGLE_DRIVE_OFFICE_FOLDER_ID = "your-office-folder-id";
export const GOOGLE_DRIVE_API_KEY = "your-api-key";
```

**How it works:** On page load, the site calls Drive API v3, fetches the 6 most recent images and the newest video from each folder, and displays them. No backend server required.

**Fallback:** If IDs or API key are empty, or the fetch fails, branded Unsplash placeholder images are shown instead, with a notice to check social media.

### WhatsApp

```typescript
export const WHATSAPP_NUMBER = "+919643852807";
export const WHATSAPP_MESSAGE =
  "Hello, I saw the property samples on your website. Is it still available?";
```

### Social links

```typescript
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/your-handle",
  facebook: "https://facebook.com/your-page",
  telegram: "https://t.me/your-channel",
  youtube: "https://youtube.com/@your-channel",
};
```

### Contact & map

Edit the `SITE` object in the same file for phone, email, address, and Google Maps embed URL.

---

## Updating Photos & Videos (Admin Workflow)

Google Drive acts as your **hidden admin panel**:

1. Open your Property or Office folder in Google Drive
2. Upload new images or replace old ones
3. Upload a new video (most recent video is used automatically)
4. **No code changes or redeploy needed** — visitors get fresh content within ~5 minutes (browser cache)

**Tips:**

- Use descriptive filenames (e.g. `3bhk-karol-bagh-living-room.jpg`)
- Keep images under 2 MB for fast loading
- Videos should be MP4 for best compatibility

---

## Project Structure

```
src/
├── components/site/
│   ├── gallery.tsx          # Responsive image grid + lightbox
│   ├── video-section.tsx    # Video embed player
│   ├── media-tabs.tsx       # Property / Office tab switcher
│   ├── mobile-nav.tsx       # Bottom mobile navigation
│   ├── header.tsx           # Top nav + mobile drawer
│   ├── footer.tsx
│   └── whatsapp-button.tsx  # Floating WhatsApp CTA
├── hooks/
│   └── use-drive-content.ts # Fetches property + office media
├── routes/
│   ├── index.tsx            # Homepage
│   ├── about.tsx
│   ├── contact.tsx
│   └── __root.tsx           # App shell
├── utils/
│   ├── constants.ts         # ⭐ All config lives here
│   └── googleDrive.ts       # Drive API integration
└── styles.css               # Vibrant theme + mobile nav styles
```

---

## Pages

| Route      | Description                                               |
| ---------- | --------------------------------------------------------- |
| `/`        | Hero, property/office gallery & videos, social links, CTA |
| `/about`   | Company story and stats                                   |
| `/contact` | Office details, map, QR code, share buttons               |

---

## Mobile Navigation

On screens **below 768px**:

- **Bottom tab bar** — Home, Properties, Office, About, Contact
- **Hamburger menu** — Dark violet drawer with high-contrast links
- **WhatsApp button** — Positioned above the tab bar (16px from edges)
- **Gallery grid** — 1 column on mobile, 2 on tablet, 3 on desktop

Hash links:

- `/#gallery` → Property tab
- `/#office` → Office tab

---

## Color Theme

The site uses a **dark theme** by default — deep violet surfaces with coral and teal accents. Tokens live in `src/styles.css`:

| Token                     | Usage                            |
| ------------------------- | -------------------------------- |
| `--background` / `--card` | Page and card surfaces           |
| `--foreground`            | Body and heading text            |
| `--coral`                 | Primary accent, CTAs, active nav |
| `--teal`                  | Secondary accent, labels         |
| `--navy-deep` / `--navy`  | Hero overlays, footer, gradients |

To tweak colors, edit the `:root` block in `src/styles.css`.

---

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server (port 8080) |
| `npm run build`   | Production build             |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Run ESLint                   |
| `npm run format`  | Format with Prettier         |

---

## Troubleshooting

### Build fails on Windows (`@rolldown/binding`)

```bash
npm install @rolldown/binding-win32-x64-msvc
```

### Vite config error (`ERR_REQUIRE_ESM`)

The project uses an ESM import in `vite.config.ts`. Do not change it back to the default import path.

### Images not loading from Drive

- Confirm folders are shared as **Anyone with the link can view**
- Verify folder IDs and API key in `constants.ts`
- Check browser console for Drive API errors (403 = API key issue, 404 = wrong folder ID)
- Ensure Drive API is enabled in Google Cloud Console

### Mobile horizontal scroll

The layout uses `overflow-x: hidden` on body and main containers. If scroll persists, check for oversized images or custom CSS.

---

## Deployment

Build the static output:

```bash
npm run build
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

**Important:** Restrict your Google Drive API key to your production domain.

---

## License

Private — MN Property, Central Delhi.
