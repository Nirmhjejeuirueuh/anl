# AgileN Lite Website

Astro frontend + Strapi CMS.

## Setup

### 1. Strapi CMS

```bash
cd anl-cms
npm install
npm run develop
# Runs on http://localhost:1337
```

### 2. Astro Frontend

```bash
cd astro
cp .env.example .env   # ensure STRAPI_URL=http://localhost:1337
pnpm install
pnpm dev
# Runs on http://localhost:4321
```

## Build

```bash
cd astro
pnpm build
```

## Deploy

Auto-deployed to Vercel on pushes to main.
