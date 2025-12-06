# Kystleik Website - Next.js Migration

This website has been migrated from Gatsby to Next.js 16 with App Router.

## Tech Stack

- **Framework**: Next.js 16 with App Router (Turbopack)
- **Styling**: CSS Modules + Tailwind CSS
- **CMS**: Sanity.io with GROQ queries
- **Content Rendering**: Portable Text (@portabletext/react)
- **Package Manager**: pnpm (monorepo)
- **Testing**: Playwright for visual regression testing

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm 9+ (install with `npm install -g pnpm`)
- Access to Sanity project (projectId: qc3nk3mq)

### Installation

From the root directory:

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the `web/` directory:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=qc3nk3mq
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_TOKEN=your_sanity_token_here
```

### Development

From the root directory:

```bash
pnpm dev
```

Or from the web directory:

```bash
cd web
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Building

From the root directory:

```bash
pnpm build
```

### Testing

Run Playwright visual tests:

```bash
cd web
pnpm test              # Run all tests
pnpm test:ui           # Run with UI mode
pnpm test:headed       # Run in headed mode
```

Screenshots are saved to `web/tests/screenshots/`.

### Static Export

For static site generation (SSG), uncomment the `output: 'export'` line in `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',  // Uncomment this line
  // ... rest of config
}
```

Then build:

```bash
pnpm build
```

The static files will be in the `out/` directory.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout
│   ├── page.js            # Root redirect to /no/
│   ├── no/                # Norwegian routes
│   │   ├── layout.js      # Norwegian layout with metadata
│   │   ├── [slug]/        # Dynamic Norwegian pages
│   │   └── kurs-og-aktiviteter/  # Tours section
│   └── en/                # English routes
│       ├── layout.js      # English layout with metadata
│       ├── [slug]/        # Dynamic English pages
│       └── courses-and-tours/    # Tours section (English)
├── components/            # React components
│   ├── *.module.css      # CSS Modules for components
│   ├── header-new.js     # Navigation header (client component)
│   ├── layout-new.js     # Main layout wrapper
│   ├── Hero-new.jsx      # Hero image component
│   └── block-content-new/ # Portable Text rendering
├── lib/
│   ├── sanity.js         # Sanity client & data fetching
│   └── helpers.js        # Utility functions
└── styles/
    └── globals.css       # Global styles + Tailwind

```

## Key Changes from Gatsby

### 1. Data Fetching
- **Before**: GraphQL queries with gatsby-source-sanity
- **After**: Direct Sanity client queries with `@sanity/client`

### 2. Routing
- **Before**: File-based pages + gatsby-node.js for dynamic pages
- **After**: Next.js App Router with generateStaticParams()

### 3. Styling
- **Before**: Styled-components + CSS Modules
- **After**: CSS Modules + Tailwind CSS (no styled-components)

### 4. SEO/Metadata
- **Before**: react-helmet
- **After**: Next.js metadata API + Script component

### 5. Content Rendering
- **Before**: @sanity/block-content-to-react
- **After**: @portabletext/react

## Routes

- `/` → Redirects to `/no/`
- `/no/` → Norwegian homepage
- `/no/[slug]/` → Dynamic Norwegian pages
- `/no/kurs-og-aktiviteter/` → Tours list (Norwegian)
- `/no/kurs-og-aktiviteter/[slug]/` → Individual tour pages (Norwegian)
- `/en/` → English homepage
- `/en/[slug]/` → Dynamic English pages
- `/en/courses-and-tours/` → Tours list (English)
- `/en/courses-and-tours/[slug]/` → Individual tour pages (English)

## Deployment

### Netlify/Vercel
1. Connect your repository
2. Set environment variables
3. Build command: `npm run build`
4. Publish directory: `out/` (if using static export) or `.next/` (for SSR)

### Static Hosting
1. Enable `output: 'export'` in `next.config.js`
2. Run `npm run build`
3. Deploy the `out/` directory

## Notes

- All existing CSS modules have been preserved
- Component styling converted from styled-components to CSS modules
- Custom media queries converted to standard CSS
- Client components marked with 'use client' directive
- Sanity data fetching includes fallbacks for offline builds
