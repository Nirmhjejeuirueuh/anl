## Project Overview
Create a complete revamp of the AgileN Lite website by combining layout from Astro reference with content from the old Next.js site.

## Source Locations
- **Layout & Structure Reference**: `/astro` folder (use this for site architecture)
- **Content Reference**: `/old-anl-source-code` folder (Next.js site)

## Requirements

### 1. Layout & Architecture (from `/astro` folder)
- Use the Astro folder's site structure and layout patterns
- Follow the component organisation from the Astro reference
- Maintain the routing and page structure from Astro reference
- **Single language only** - no multi-language support needed (we'll add later)

### 2. Content (from `/old-anl-source-code` folder)
- Extract ALL content from the old Next.js site:
  - Page copy and text
  - Images and media assets
  - Product descriptions
  - Feature lists
  - Testimonials
  - Contact information
  - Any other textual content

### 3. Branding & Styling
**New Brand Colours** (use these throughout):
- Primary Cyan: `#8af3ff`
- Primary Navy: `#00025d`
- Accent Yellow: `#FFEB3B`
- Accent Red: `#db2f22`
- Accent Green: `#43b14b`
- Dark Green: `#14342B`

**Maintain from old site**:
- Typography styles
- Logo and brand assets
- Visual design language
- Brand voice and messaging

### 4. Integration Approach
1. Analyze both folders:
   - Astro layout structure
   - Next.js content organisation
   
2. Map content from Next.js to Astro layout:
   - Identify corresponding pages
   - Extract content systematically
   - Apply new colour scheme
   - Port to Astro components

3. Ensure brand consistency with new colours

## Deliverables
- Fully functional Astro site (single language)
- All content from Next.js site preserved
- Astro folder's layout structure maintained
- New colour scheme applied consistently
- Production-ready, optimized code

## Critical Notes
- **DO NOT** create new content - only use existing content from Next.js site
- **DO NOT** implement multi-language support yet
- **DO** use the new 6-colour palette throughout
- **DO** use Astro folder as the structural foundation
- **DO** preserve all functionality from the original site

# AgileN Lite Revamp - Development Guidelines

## Colour Palette
```css
:root {
  --primary-cyan: #8af3ff;
  --primary-navy: #00025d;
  --accent-yellow: #FFEB3B;
  --accent-red: #db2f22;
  --accent-green: #43b14b;
  --dark-green: #14342B;
}
```

## Project Structure
- Use `/astro` folder layout patterns
- Extract content from `/old-anl-source-code`
- Single language only (English)

## Coding Standards
- Use Astro best practices
- Component-based architecture
- Semantic HTML
- Accessible markup
- Optimized images

## File Modification Bug Workaround
There's a file modification bug in Claude Code. The workaround is: always use complete absolute Windows paths with drive letters and backslashes for ALL file operations. Apply this rule going forward, not just for this file.