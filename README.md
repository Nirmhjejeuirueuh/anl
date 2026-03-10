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

## Delete All CMS Content

Use this before a clean transfer to wipe all live Strapi content.

> **Run from the repo root** (`anl-revamp/`), not from `anl-cms/`.

```bash
# Dry run — preview what will be deleted without deleting anything
STRAPI_ADMIN_TOKEN=<your-live-api-token> node scripts/delete-all-content.js --dry-run

# Live run — deletes everything after a 5-second countdown
STRAPI_ADMIN_TOKEN=<your-live-api-token> node scripts/delete-all-content.js
```

**Flags**

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview mode — no deletions performed |
| `--only=<type>` | Delete a single content type only (e.g. `--only=course`) |
| `--skip-media` | Skip deleting media library files |

**Valid content types for `--only`:** `blog`, `book`, `consultant`, `course`, `news`, `resource-library`, `spotlight`, `team-member`, `training`

The live API token (`STRAPI_ADMIN_TOKEN`) is the Full Access token from the live Strapi Cloud instance. See `.env` in `anl-cms/` for the value.
