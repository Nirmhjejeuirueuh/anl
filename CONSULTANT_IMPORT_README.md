# Consultant Data Import Guide

This guide explains how to populate the consultant collection with data from the existing HTML files.

## Available Consultants

Based on the `s3 structure/our-services/consulting/` folder, there are 2 consultant services:

1. **IT and Security Risk Assessment** (`it-and-security-risk-assessment`)
   - Type: Technical Consultant
   - Content: 5-step security assessment process

2. **Job Redesign Consulting** (`job-redesign-consulting`)
   - Type: Business Consultant
   - Content: Job redesign methodology and benefits

## Import Methods

### Method 1: Automated Import (Recommended)

1. **Get API Token:**
   ```bash
   # In Strapi Admin Panel (http://localhost:1337/admin)
   # Go to Settings > API Tokens
   # Create a new token with full permissions
   # Copy the token
   ```

2. **Set Environment Variable:**
   ```bash
   export STRAPI_API_TOKEN=your_token_here
   ```

3. **Run Import Script:**
   ```bash
   cd /path/to/anl-revamp
   node scripts/import-consultants.js
   ```

### Method 2: Manual Import via Strapi Admin

1. **Access Strapi Admin:**
   - Go to: http://localhost:1337/admin
   - Login with your credentials

2. **Create Consultants:**
   - Navigate to: Content Manager > Consultant
   - Click "Create new entry"
   - Fill in the data from `scripts/populate-consultants.js`

3. **Required Fields:**
   - Title
   - Slug (auto-generated from title)
   - Description
   - Content (use the HTML content provided)
   - Consultant Type (select from dropdown)
   - Featured (checkbox)

## Verification

After importing, verify the data:

1. **API Check:**
   ```bash
   curl "http://localhost:1337/api/consultants?populate=*"
   ```

2. **Frontend Check:**
   - Visit: http://localhost:4321/consultants/
   - Should show consultant cards
   - Click on cards to view individual consultant pages

## File Structure Created

```
anl-cms/src/api/consultant/
├── content-types/consultant/schema.json
├── controllers/consultant.ts
├── routes/consultant.ts
└── services/consultant.ts

astro/src/pages/[...lang]/consultants/
├── index.astro          # Consultant cards page
└── [...slug].astro      # Individual consultant pages

scripts/
├── populate-consultants.js    # Consultant data
└── import-consultants.js      # Import script
```

## Notes

- Images are referenced from the existing S3 bucket
- Content is converted from HTML to Markdown-compatible format
- SEO fields are pre-populated
- Both consultants are marked as "featured" for visibility