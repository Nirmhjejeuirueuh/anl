# AgileN Lite Website

This is the Astro-based website for AgileN Lite, featuring Strapi CMS integration for dynamic content.

## Tech Stack

- **Framework**: Astro
- **CMS**: Strapi
- **Deployment**: Vercel
- **Package Manager**: pnpm

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your Strapi URL
   ```

3. Run development server:
   ```bash
   pnpm dev
   ```

## Build

```bash
pnpm build
```

## Deploy

Automatically deployed to Vercel on pushes to the main branch.

## Project Structure

- `astro/`: Main Astro application
- `old-anl-source-code/`: Legacy Next.js source code
- `s3 structure/`: Static content structure

## Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Push and create PR 
