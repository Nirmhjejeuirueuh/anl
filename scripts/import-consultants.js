#!/usr/bin/env node

// Script to import consultant data into Strapi CMS
// Usage: node scripts/import-consultants.js

import { consultants } from './populate-consultants.js';

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN; // Set this environment variable

async function importConsultants() {
  console.log('Starting consultant data import...');

  if (!API_TOKEN) {
    console.error('Please set STRAPI_API_TOKEN environment variable');
    console.log('You can get the token from Strapi Admin > Settings > API Tokens');
    process.exit(1);
  }

  for (const consultant of consultants) {
    try {
      console.log(`Importing: ${consultant.title}`);

      const response = await fetch(`${STRAPI_URL}/api/consultants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: consultant })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`Failed to import ${consultant.title}:`, error);
        continue;
      }

      const result = await response.json();
      console.log(`✅ Successfully imported: ${consultant.title} (ID: ${result.data.id})`);

    } catch (error) {
      console.error(`Error importing ${consultant.title}:`, error.message);
    }
  }

  console.log('Consultant import completed!');
}

// Alternative: Manual import instructions
function printManualInstructions() {
  console.log('\n=== MANUAL IMPORT INSTRUCTIONS ===');
  console.log('If the automated import fails, you can manually add consultants in Strapi Admin:');
  console.log('1. Go to Strapi Admin Panel (http://localhost:1337/admin)');
  console.log('2. Navigate to Content Manager > Consultant');
  console.log('3. Click "Create new entry" for each consultant');
  console.log('4. Copy the data from populate-consultants.js');
  console.log('\nConsultants to create:');
  consultants.forEach((c, i) => {
    console.log(`${i + 1}. ${c.title} (slug: ${c.slug})`);
  });
}

// Run the import
importConsultants().catch(error => {
  console.error('Import failed:', error);
  printManualInstructions();
});

export { importConsultants };