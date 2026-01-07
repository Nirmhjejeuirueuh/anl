#!/usr/bin/env node

// Simple script to manually import consultants via curl commands
// Run: node scripts/manual-consultant-import.js

import { consultants } from './populate-consultants.js';

console.log('=== MANUAL CONSULTANT IMPORT ===\n');
console.log('Since automated import requires API token, use these curl commands:\n');

consultants.forEach((consultant, index) => {
  console.log(`--- Consultant ${index + 1}: ${consultant.title} ---`);
  console.log(`curl -X POST http://localhost:1337/api/consultants \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -d '${JSON.stringify({ data: consultant }, null, 2).replace(/'/g, "'\\''")}'`);
  console.log('');
});

console.log('=== ALTERNATIVE: Strapi Admin Import ===');
console.log('1. Go to http://localhost:1337/admin');
console.log('2. Login to Strapi Admin');
console.log('3. Navigate to Content Manager > Consultant');
console.log('4. Click "Create new entry" for each consultant');
console.log('5. Copy the data from above curl commands or from populate-consultants.js');
console.log('\nConsultants to create:');
consultants.forEach((c, i) => {
  console.log(`${i + 1}. ${c.title} (${c.consultantType})`);
});