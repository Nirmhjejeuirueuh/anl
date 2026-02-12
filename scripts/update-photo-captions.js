#!/usr/bin/env node

/**
 * Script to update Strapi media library photos with captions from text files
 * Specifically for the Corporate Programs folder
 */

// Check for dry-run flag
const DRY_RUN = process.argv.includes('--dry-run') || process.argv.includes('-d');

const fs = require('fs');
const path = require('path');
const { default: fetch } = require('node-fetch');

// Strapi API configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Folders containing the text files
const TEXT_FILES_FOLDERS = [
  path.join(__dirname, '..', 's3 structure', 'media-gallery', 'Corporate Programs'),
  path.join(__dirname, '..', 's3 structure', 'media-gallery', 'CPA & SMU'),
  path.join(__dirname, '..', 's3 structure', 'media-gallery', 'Special Events'),
  path.join(__dirname, '..', 's3 structure', 'media-gallery', 'TFIP - Past Trainings')
];

/**
 * Extract base pattern from text filename
 * Removes suffixes like "_Feedback", "-Key Training Takeaways", etc.
 */
function extractBasePattern(filename) {
  // Remove .txt extension
  let base = filename.replace(/\.txt$/, '');

  // Remove common suffixes
  const suffixes = [
    '_Feedback',
    '-Key Training Takeaways',
    '-What Participants Liked Best',
    '_Key Training Takeaways'
  ];

  for (const suffix of suffixes) {
    if (base.endsWith(suffix)) {
      base = base.slice(0, -suffix.length);
      break;
    }
  }

  return base;
}

/**
 * Read caption from text file
 */
function readCaptionFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8').trim();

    // Split content into lines and clean them
    const lines = content.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);

    // Ensure we have at least a title line
    if (lines.length === 0) {
      return "Participants' Feedback";
    }

    // If the first line doesn't contain "Participants' Feedback", add it as a second line
    const title = lines[0];
    if (lines.length === 1) {
      return title + " Participants' Feedback";
    } else {
      // If there are multiple lines, ensure the second line is "Participants' Feedback"
      return title + " Participants' Feedback";
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}
async function fetchMatchingPhotos(basePattern) {
  if (DRY_RUN) {
    // In dry-run mode, return mock photos that would match
    console.log(`  🔍 DRY RUN: Would search for photos containing "${basePattern}"`);
    return [
      { id: 'mock-1', name: `${basePattern}_photo1.jpg` },
      { id: 'mock-2', name: `${basePattern}_photo2.jpg` }
    ];
  }

  try {
    const headers = {
      'Content-Type': 'application/json'
    };

    // Add authorization header only if token is provided
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    // Try different endpoints for fetching files
    const endpoints = [
      `${STRAPI_URL}/api/upload/files`,
      `${STRAPI_URL}/api/files`,
      `${STRAPI_URL}/api/upload`
    ];

    let lastError = null;
    for (const endpoint of endpoints) {
      try {
        console.log(`  🔍 Trying to fetch files from: ${endpoint}`);
        const response = await fetch(endpoint, {
          headers
        });

        if (response.ok) {
          const files = await response.json();
          console.log(`  ✅ Success with endpoint: ${endpoint} (${Array.isArray(files) ? files.length : 'unknown'} files)`);

          // Filter photos that contain the base pattern in their filename
          const matchingPhotos = files.filter(file => {
            if (!file.name) return false;
            return file.name.toLowerCase().includes(basePattern.toLowerCase());
          });

          return matchingPhotos;
        } else {
          const errorText = await response.text();
          console.log(`  ❌ ${endpoint}: HTTP ${response.status} - ${errorText}`);
          lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.log(`  ❌ ${endpoint}: ${error.message}`);
        lastError = error;
      }
    }

    throw lastError || new Error('All endpoints failed');
  } catch (error) {
    console.error(`Error fetching photos for pattern "${basePattern}":`, error.message);
    return [];
  }
}

/**
 * Update photo with caption in Strapi
 */
async function updatePhotoCaption(photoId, caption) {
  if (DRY_RUN) {
    console.log(`  🔍 DRY RUN: Would update photo ${photoId} with caption: "${caption.substring(0, 50)}${caption.length > 50 ? '...' : ''}"`);
    return { id: photoId, caption }; // Mock response
  }

  try {
    // According to Strapi docs, use POST /api/upload?id=<id> with FormData
    const formData = new FormData();
    const fileInfo = {
      caption: caption
    };
    formData.append('fileInfo', JSON.stringify(fileInfo));

    const headers = {};

    // Add authorization header only if token is provided
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const url = `${STRAPI_URL}/api/upload?id=${photoId}`;
    console.log(`  🔄 Updating photo ${photoId} with POST ${url}`);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`  ✅ Successfully updated photo ${photoId}`);
      return result;
    } else {
      let errorText = '';
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = 'Could not read error response';
      }
      console.log(`  ❌ POST ${url}: HTTP ${response.status} - ${errorText.substring(0, 200)}`);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error updating photo ${photoId}:`, error.message);
    return null;
  }
}

async function main() {
  console.log(`🚀 Starting photo caption update script for all media gallery folders`);
  console.log(`${DRY_RUN ? '🔍 DRY RUN MODE - No actual changes will be made' : '⚠️  LIVE MODE - Changes will be applied to Strapi'}`);

  // Check environment variables (token is optional for public APIs)
  if (!DRY_RUN && !STRAPI_API_TOKEN) {
    console.log('⚠️  No STRAPI_API_TOKEN provided - assuming public API access');
    console.log('💡 Use --dry-run flag to test without making changes');
  }

  let totalFoldersProcessed = 0;
  let totalFilesProcessed = 0;
  let totalPhotosUpdated = 0;

  for (const folderPath of TEXT_FILES_FOLDERS) {
    const folderName = path.basename(folderPath);
    console.log(`\n📁 Processing folder: ${folderName}`);
    console.log(`📂 Path: ${folderPath}`);

    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
      console.error(`❌ Folder not found: ${folderPath}`);
      continue;
    }

    // Read all .txt files from the folder (excluding order.txt and files without expected patterns)
    const textFiles = fs.readdirSync(folderPath)
      .filter(file => {
        if (!file.endsWith('.txt')) return false;
        if (file === 'order.txt') return false; // Skip order file
        return true;
      })
      .map(file => ({
        filename: file,
        filepath: path.join(folderPath, file)
      }));

    console.log(`📄 Found ${textFiles.length} text files to process in ${folderName}`);

    let folderFilesProcessed = 0;
    let folderPhotosUpdated = 0;

    for (const { filename, filepath } of textFiles) {
      console.log(`\n📝 Processing: ${filename}`);

      // Extract base pattern
      const basePattern = extractBasePattern(filename);
      console.log(`🔍 Base pattern: "${basePattern}"`);

      // Read caption
      const caption = readCaptionFromFile(filepath);
      if (!caption) {
        console.log(`⚠️  Skipping ${filename} - could not read caption`);
        continue;
      }

      console.log(`📖 Caption: "${caption.substring(0, 50)}${caption.length > 50 ? '...' : ''}"`);

      // Find matching photos
      const matchingPhotos = await fetchMatchingPhotos(basePattern);
      console.log(`🖼️  Found ${matchingPhotos.length} matching photos`);

      if (matchingPhotos.length === 0) {
        console.log(`⚠️  No matching photos found for pattern "${basePattern}"`);
        continue;
      }

      // Update each matching photo
      for (const photo of matchingPhotos) {
        console.log(`  📸 Updating photo: ${photo.name} (ID: ${photo.id})`);
        const result = await updatePhotoCaption(photo.id, caption);

        if (result) {
          console.log(`  ✅ Updated successfully`);
          folderPhotosUpdated++;
        } else {
          console.log(`  ❌ Failed to update`);
        }
      }

      folderFilesProcessed++;
    }

    console.log(`📊 Folder ${folderName} summary: ${folderFilesProcessed} files processed, ${folderPhotosUpdated} photos updated`);

    totalFoldersProcessed++;
    totalFilesProcessed += folderFilesProcessed;
    totalPhotosUpdated += folderPhotosUpdated;
  }

  console.log(`\n🎉 Script completed!`);
  console.log(`📊 Overall summary:`);
  console.log(`   - Folders processed: ${totalFoldersProcessed}`);
  console.log(`   - Text files processed: ${totalFilesProcessed}`);
  console.log(`   - Photos updated: ${totalPhotosUpdated}`);
}

// Run the script
main().catch(error => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});