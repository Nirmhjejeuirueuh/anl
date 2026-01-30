const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch').default;

const strapiUrl = 'http://localhost:1337/api/testimonials';

const testimonialsDir = path.join(__dirname, 's3 structure', 'testimonials');

// Read order and featured info
const orderFile = path.join(testimonialsDir, 'order-and-featured.txt');
const orderContent = fs.readFileSync(orderFile, 'utf8');

const lines = orderContent.split('\n').filter(line => line.trim());
const testimonialOrder = [];
let isFeaturedSection = false;

for (const line of lines) {
  if (line.includes('<testimonials>')) continue;
  if (line.includes('featured-')) {
    isFeaturedSection = true;
    continue;
  }
  if (line.trim() && !line.includes('#')) {
    const folderName = line.split('|')[0].trim();
    if (folderName && !folderName.includes('available colors')) {
      testimonialOrder.push({
        folderName,
        isFeatured: isFeaturedSection
      });
    }
  }
}

async function createTestimonials() {
  for (const item of testimonialOrder) {
    const { folderName, isFeatured } = item;
    const folderPath = path.join(testimonialsDir, folderName);

    if (!fs.existsSync(folderPath)) {
      console.log(`Folder not found: ${folderName}`);
      continue;
    }

    // Read desc.txt and testimonial.txt
    const descFile = path.join(folderPath, 'desc.txt');
    const testimonialFile = path.join(folderPath, 'testimonial.txt');

    if (!fs.existsSync(descFile) || !fs.existsSync(testimonialFile)) {
      console.log(`Files not found for ${folderName}`);
      continue;
    }

    const descContent = fs.readFileSync(descFile, 'utf8').trim();
    const testimonialContent = fs.readFileSync(testimonialFile, 'utf8').trim();

    // Parse the desc content to extract person info
    const descLines = descContent.split('\n').map(line => line.trim()).filter(line => line);
    let shortTestimonial = descContent;
    let personName = '';
    let personRole = '';
    let companyName = '';

    // Check if desc contains person info (indicated by <br> tags)
    if (descContent.includes('<br>')) {
      const parts = descContent.split('<br>').map(part => part.trim());
      shortTestimonial = parts[0];

      if (parts.length >= 2) {
        const personInfo = parts[1];
        if (personInfo.includes('-')) {
          const nameParts = personInfo.split('-').map(part => part.trim());
          personName = nameParts[0];
          personRole = nameParts[1] || '';
        } else {
          personName = personInfo;
        }
      }

      if (parts.length >= 3) {
        companyName = parts[2];
      }
    }

    const testimonialData = {
      data: {
        shortTestimonial,
        fullStory: testimonialContent,
        personName: personName || undefined,
        personRole: personRole || undefined,
        companyName: companyName || undefined,
        isFeatured,
        order: testimonialOrder.indexOf(item),
        hasStory: testimonialContent.length > 0,
        backgroundColor: 'nil' // Default, can be changed in Strapi admin
      }
    };

    try {
      const response = await fetch(strapiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testimonialData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created testimonial: ${folderName} (${isFeatured ? 'featured' : 'regular'})`);
        console.log(`   ID: ${result.data.documentId}`);
      } else {
        console.error(`❌ Error creating ${folderName}:`, await response.text());
      }
    } catch (error) {
      console.error(`❌ Error creating ${folderName}:`, error.message);
    }

    // Delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

createTestimonials().catch(console.error);