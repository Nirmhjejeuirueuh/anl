// Migration script to convert media library from separate sections/pastHighlights fields to unified allSections field
// Run this script after updating the schema but before deploying

const fs = require('fs');
const path = require('path');

// This is a manual migration script - you'll need to run it in the Strapi console
// or adapt it to work with your Strapi instance

async function migrateMediaLibrary() {
  try {
    console.log('🚀 Starting media library migration...');

    // This would typically be run inside Strapi context
    // For now, this is a template - you'll need to adapt it

    const strapi = global.strapi; // Assuming this runs in Strapi context

    // Find the media library entry
    const mediaLibrary = await strapi.entityService.findMany('api::media-library.media-library', {
      populate: ['sections', 'pastHighlights']
    });

    if (!mediaLibrary || mediaLibrary.length === 0) {
      console.log('No media library found to migrate');
      return;
    }

    const entry = mediaLibrary[0];
    console.log(`Found media library entry: ${entry.title}`);

    // Combine sections and pastHighlights
    const allSections = [];

    // Add active sections
    if (entry.sections && entry.sections.length > 0) {
      entry.sections.forEach(section => {
        allSections.push({
          ...section,
          status: 'active'
        });
      });
    }

    // Add past highlights
    if (entry.pastHighlights && entry.pastHighlights.length > 0) {
      entry.pastHighlights.forEach(section => {
        allSections.push({
          ...section,
          status: 'past_highlight'
        });
      });
    }

    console.log(`Migrating ${allSections.length} sections total`);

    // Update the entry with new structure
    await strapi.entityService.update('api::media-library.media-library', entry.id, {
      data: {
        allSections: allSections,
        sections: null, // Clear old fields
        pastHighlights: null
      }
    });

    console.log('✅ Migration completed successfully!');
    console.log('You can now drag and drop sections between active and past highlights in Strapi admin.');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Export for use in Strapi
module.exports = migrateMediaLibrary;

// If running directly
if (require.main === module) {
  console.log('This script should be run within your Strapi application context.');
  console.log('Add this to your Strapi bootstrap or run it in the Strapi console.');
}