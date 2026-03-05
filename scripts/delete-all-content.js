/**
 * delete-all-content.js
 * 
 * Deletes ALL content from the live Strapi instance before a clean transfer.
 * Handles Strapi v5 (uses documentId for deletions, paginated fetches).
 * 
 * Usage:
 *   node scripts/delete-all-content.js
 *   node scripts/delete-all-content.js --dry-run       (preview only, no deletions)
 *   node scripts/delete-all-content.js --skip-media    (skip media/upload files)
 *   node scripts/delete-all-content.js --only=courses  (delete only one type)
 * 
 * Requires: STRAPI_ADMIN_TOKEN env var (or hardcode below)
 */

const STRAPI_URL = 'https://clever-example-420715eeee.strapiapp.com';

// ──────────────────────────────────────────────────────────────────────────────
// Get your API token from:
//   https://clever-example-420715eeee.strapiapp.com/admin
//   → Settings → API Tokens → Create new token (Full Access)
// Then either:
//   set STRAPI_ADMIN_TOKEN=xxxxxxx && node scripts/delete-all-content.js
// Or paste it directly below (DO NOT commit this to git):
// ──────────────────────────────────────────────────────────────────────────────
const API_TOKEN = process.env.STRAPI_ADMIN_TOKEN || '';

// ──────────────────────────────────────────────────────────────────────────────
// All collection types to delete (single types are excluded — they can't be
// individually deleted and will be overwritten on import anyway).
// ──────────────────────────────────────────────────────────────────────────────
const COLLECTION_TYPES = [
  { name: 'blog',             endpoint: '/api/blogs' },
  { name: 'book',             endpoint: '/api/books' },
  { name: 'consultant',       endpoint: '/api/consultants' },
  { name: 'course',           endpoint: '/api/courses' },
  { name: 'news',             endpoint: '/api/news' },
  { name: 'resource-library', endpoint: '/api/resource-libraries' },
  { name: 'spotlight',        endpoint: '/api/spotlights' },
  { name: 'team-member',      endpoint: '/api/team-members' },
  { name: 'training',         endpoint: '/api/trainings' },
];

// Parse CLI flags
const args = process.argv.slice(2);
const DRY_RUN     = args.includes('--dry-run');
const SKIP_MEDIA  = args.includes('--skip-media');
const ONLY_TYPE   = (args.find(a => a.startsWith('--only=')) || '').replace('--only=', '');

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────
const headers = {
  'Content-Type': 'application/json',
  ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
};

async function fetchAllEntries(endpoint) {
  const all = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const url = `${STRAPI_URL}${endpoint}?pagination[page]=${page}&pagination[pageSize]=${pageSize}&fields[0]=id`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      const text = await res.text();
      // 404 means the endpoint likely doesn't exist on this instance
      if (res.status === 404) return null;
      throw new Error(`GET ${endpoint} → ${res.status}: ${text}`);
    }

    const body = await res.json();
    const data = body.data || [];
    all.push(...data);

    const total = body.meta?.pagination?.total ?? data.length;
    if (all.length >= total || data.length === 0) break;
    page++;
  }

  return all;
}

async function deleteEntry(endpoint, item) {
  // Strapi v5 uses documentId; v4 uses numeric id
  const id = item.documentId || item.id;
  const url = `${STRAPI_URL}${endpoint}/${id}`;

  if (DRY_RUN) {
    console.log(`  [dry-run] DELETE ${url}`);
    return true;
  }

  const res = await fetch(url, { method: 'DELETE', headers });

  if (res.status === 200 || res.status === 204) return true;

  const text = await res.text();
  console.error(`  ✗ DELETE ${url} → ${res.status}: ${text}`);
  return false;
}

async function deleteCollectionType({ name, endpoint }) {
  console.log(`\n━━━ ${name} (${endpoint}) ━━━`);

  const entries = await fetchAllEntries(endpoint);

  if (entries === null) {
    console.log(`  ⚠  Endpoint not found (skipping)`);
    return { total: 0, deleted: 0, failed: 0 };
  }

  if (entries.length === 0) {
    console.log(`  ✓ Already empty`);
    return { total: 0, deleted: 0, failed: 0 };
  }

  console.log(`  Found ${entries.length} entries`);

  let deleted = 0;
  let failed  = 0;

  for (const item of entries) {
    const ok = await deleteEntry(endpoint, item);
    if (ok) {
      deleted++;
      process.stdout.write(`  ✓ ${deleted}/${entries.length}\r`);
    } else {
      failed++;
    }
    // Brief delay to be polite to the API
    await new Promise(r => setTimeout(r, 150));
  }

  console.log(`  ${DRY_RUN ? '[dry-run] would delete' : 'Deleted'} ${deleted}/${entries.length}${failed ? ` (${failed} failed)` : ''}`);
  return { total: entries.length, deleted, failed };
}

async function deleteAllMedia() {
  console.log(`\n━━━ media / upload files ━━━`);

  const url = `${STRAPI_URL}/api/upload/files`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    console.log(`  ⚠  Could not fetch media files (${res.status})`);
    return;
  }

  const files = await res.json();

  if (!Array.isArray(files) || files.length === 0) {
    console.log(`  ✓ No media files found`);
    return;
  }

  console.log(`  Found ${files.length} media files`);

  let deleted = 0;
  let failed  = 0;

  for (const file of files) {
    const deleteUrl = `${STRAPI_URL}/api/upload/files/${file.id}`;

    if (DRY_RUN) {
      console.log(`  [dry-run] DELETE ${deleteUrl}`);
      deleted++;
      continue;
    }

    const delRes = await fetch(deleteUrl, { method: 'DELETE', headers });
    if (delRes.status === 200 || delRes.status === 204) {
      deleted++;
      process.stdout.write(`  ✓ ${deleted}/${files.length}\r`);
    } else {
      failed++;
      const text = await delRes.text();
      console.error(`  ✗ ${deleteUrl} → ${delRes.status}: ${text}`);
    }

    await new Promise(r => setTimeout(r, 150));
  }

  console.log(`  ${DRY_RUN ? '[dry-run] would delete' : 'Deleted'} ${deleted}/${files.length}${failed ? ` (${failed} failed)` : ''}`);
}

// ──────────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────────
async function main() {
  if (!API_TOKEN) {
    console.error('\n❌  No API token set.');
    console.error('    Run:  set STRAPI_ADMIN_TOKEN=<your-token> && node scripts/delete-all-content.js');
    console.error('    Or paste your token directly into the API_TOKEN variable in this file.\n');
    process.exit(1);
  }

  console.log('');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║       DELETE ALL CONTENT from live Strapi instance       ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`  Target  : ${STRAPI_URL}`);
  console.log(`  Dry run : ${DRY_RUN ? 'YES (no changes will be made)' : 'NO — changes are PERMANENT'}`);
  console.log(`  Media   : ${SKIP_MEDIA ? 'SKIP' : 'will be deleted too'}`);
  if (ONLY_TYPE) console.log(`  Filter  : only "${ONLY_TYPE}"`);
  console.log('');

  if (!DRY_RUN) {
    // 5-second countdown so you can Ctrl+C in time
    for (let i = 5; i > 0; i--) {
      process.stdout.write(`  Starting in ${i}s ... (Ctrl+C to abort)\r`);
      await new Promise(r => setTimeout(r, 1000));
    }
    console.log('  Starting now...                              ');
  }

  const summary = [];
  const types = ONLY_TYPE
    ? COLLECTION_TYPES.filter(t => t.name === ONLY_TYPE)
    : COLLECTION_TYPES;

  for (const type of types) {
    const result = await deleteCollectionType(type);
    summary.push({ name: type.name, ...result });
  }

  if (!SKIP_MEDIA) {
    await deleteAllMedia();
  }

  // Print summary table
  console.log('\n');
  console.log('┌─────────────────────────┬────────┬─────────┬────────┐');
  console.log('│ Content Type            │  Total │ Deleted │ Failed │');
  console.log('├─────────────────────────┼────────┼─────────┼────────┤');
  for (const { name, total, deleted, failed } of summary) {
    console.log(`│ ${name.padEnd(23)} │ ${String(total).padStart(6)} │ ${String(deleted).padStart(7)} │ ${String(failed).padStart(6)} │`);
  }
  console.log('└─────────────────────────┴────────┴─────────┴────────┘');

  const anyFailed = summary.some(s => s.failed > 0);
  if (anyFailed) {
    console.log('\n⚠  Some deletions failed — check the output above.\n');
  } else {
    console.log(`\n✅  ${DRY_RUN ? 'Dry run complete.' : 'All content deleted successfully!'}\n`);
  }
}

main().catch(err => {
  console.error('\n❌  Fatal error:', err.message);
  process.exit(1);
});
