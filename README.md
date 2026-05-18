# D'BAY-Exquisite Landing Page

Marketing landing page for [D'BAY-Exquisite](https://x.com/dbayexquisite), US shopping and shipping to Nigeria.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- [Motion](https://motion.dev/) for animations

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Deploy (no environment variables required for v1).

## Project structure

- `app/`: routes (`/`, `/track`)
- `components/sections/`: landing page sections
- `components/ui/`: shared UI (route visual, motion links)
- `lib/constants.ts`: copy, links, FAQ
- `lib/motion.ts`: animation variants

## Phase 2

- `/track`: order lookup with status stepper
- Optional quote form
- Custom domain + `metadataBase` in `app/layout.tsx`

## Content updates

Edit `lib/constants.ts` for links, steps, FAQ, and testimonials.
