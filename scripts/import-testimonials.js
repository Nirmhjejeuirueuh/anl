/*
 * import-testimonials.js
 *
 * Read each subfolder under `s3 structure/testimonials` and use the
 * contents of `testimonial.txt` and `desc.txt` to build a list of
 * testimonial items, then PUT them into the single-type Strapi entry
 * for `testimonials`.
 *
 * Usage:
 *   STRAPI_URL=http://localhost:1337 \
 *   STRAPI_ADMIN_TOKEN=<token> \
 *   node scripts/import-testimonials.js
 *
 * The script assumes:
 *  - A `testimonial` single-type exists in Strapi using the schema in
 *    `anl-cms/src/api/testimonial` (sections component as defined).
 *  - Folders may be named like "2017-SMU"; anything after the first
 *    hyphen is used as the `companyName`.
 *  - `testimonial.txt` provides the short quote (required) and
 *    `desc.txt` provides the full story (optional).
 *
 * If the Strapi instance already has an entry, it will be overwritten.
 *
 * NOTE: this is a helper script for one‑off migration; adjust or run
 * multiple times as needed.
 */

const fs = require('fs').promises;
const path = require('path');
// Node 18+ has a global fetch implementation; for older Node versions we fall back
// to the node-fetch package if it's installed. This keeps the script portable.
let fetchFn;
if (typeof globalThis.fetch === 'function') {
  fetchFn = globalThis.fetch;
} else {
  try {
    fetchFn = require('node-fetch');
  } catch (err) {
    console.error('fetch API is not available; please install node-fetch or use Node 18+.');
    process.exit(1);
  }
}

// alias to keep rest of the code simpler
const fetch = fetchFn;

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_ADMIN_TOKEN || '';

async function tryRead(file) {
  try {
    return (await fs.readFile(file, 'utf8')).trim();
  } catch (err) {
    return '';
  }
}

async function main() {
  const baseDir = path.resolve(__dirname, '..', 's3 structure', 'testimonials');
  let entries;
  try {
    entries = await fs.readdir(baseDir);
  } catch (err) {
    console.error('Could not read testimonials directory:', err.message);
    process.exit(1);
  }

  const sections = [];

  for (const name of entries) {
    const dir = path.join(baseDir, name);
    const stat = await fs.stat(dir);
    if (!stat.isDirectory()) continue;

    const testimonialText = await tryRead(path.join(dir, 'testimonial.txt'));
    const descText = await tryRead(path.join(dir, 'desc.txt'));

    if (!testimonialText) {
      console.warn(`Skipping ${name} (no testimonial.txt)`);
      continue;
    }

    let shortTestimonial = '';
    let fullStory = '';
    let personName = '';
    let personRole = '';
    let companyName = '';

    // Step 1: Parse desc.txt for metadata
    // Format:
    // [0] Short Testimonial Header
    // [1] <br>
    // [2] Name -
    // [3] <br>
    // [4] Role
    // [5] <br>
    // [6] Company
    if (descText) {
      const descLines = descText.split('\n').map(l => l.replace(/<br>/gi, '').trim()).filter(l => l);
      if (descLines.length >= 1) shortTestimonial = descLines[0];
      if (descLines.length >= 2) {
        personName = descLines[1].replace(/-$/, '').trim();
      }
      if (descLines.length >= 3) personRole = descLines[2];
      if (descLines.length >= 4) companyName = descLines[3];
    }

    // Step 2: Parse testimonial.txt for the main story
    // Usually:
    // [0] Role/Course Title (sometimes)
    // [1] "The actual quote or story"
    const testLines = testimonialText.split('\n').filter(l => l.trim());
    if (testLines.length > 1 && !testLines[0].includes('"')) {
      // If first line isn't the quote and we don't have a role yet, use it
      if (!personRole) personRole = testLines[0].trim();
      fullStory = testLines.slice(1).join('\n').trim();
    } else {
      fullStory = testimonialText.trim();
    }

    // Fallbacks from folder name if desc.txt was missing or incomplete
    if (!companyName || !personName) {
      const parts = name.split('-');
      if (parts.length >= 3) {
        if (!personName) personName = parts[parts.length - 1];
        if (!companyName) {
          companyName = parts.slice(1, parts.length - 1).join(' ').replace(/_/g, ' ');
          // Clean up course/company names if they look like course titles
          if (companyName.includes('AMLEcosystem')) companyName = 'AML Ecosystem';
          if (companyName.includes('Cloud_in_Finance')) companyName = 'Cloud in Finance';
          if (companyName.includes('TakingCloudSec')) companyName = 'Cloud Security';
          if (companyName.includes('ManageExCyberRisks')) companyName = 'Cyber Risks';
          if (companyName.includes('AgileforSuccessful')) companyName = 'Agile Project Implementation';
          if (companyName.includes('InsiderThreat')) companyName = 'Insider Threat Management';
        }
      } else if (parts.length === 2 && !companyName) {
        companyName = parts[1];
      }
    }

    sections.push({
      shortTestimonial,
      fullStory,
      personName,
      personRole,
      companyName,
      companyLogo: null,
      role: 'client',
    });
  }

  console.log(`Found ${sections.length} testimonial items`);

  const url = `${STRAPI_URL}/api/testimonial`;
  const body = { data: { title: 'Testimonials', sections } };

  const headers = {
    'Content-Type': 'application/json',
  };

  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  const result = await res.json();
  if (!res.ok) {
    console.error('Strapi responded with an error:', result);
    process.exit(1);
  }

  console.log('Import completed successfully.');
  console.log(JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
