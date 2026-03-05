# AgileN Lite CMS — Schema Reference Guide

Strapi v5 · Last updated from schema definitions

---

## Table of Contents

### Collection Types (multiple entries per type)
1. [Blog](#blog)
2. [Book](#book)
3. [Consultant](#consultant)
4. [Course](#course)
5. [News](#news)
6. [Resource Library](#resource-library)
7. [Spotlight](#spotlight)
8. [Team Member](#team-member)
9. [Training](#training)

### Single Types (one entry per type)
10. [About Page](#about-page)
11. [Client List](#client-list)
12. [FTS Courses Detail](#fts-courses-detail)
13. [Media Library](#media-library)
14. [Privacy Policy](#privacy-policy)
15. [Services Page](#services-page)
16. [Terms and Conditions](#terms-and-conditions)
17. [Testimonial](#testimonial)

### Components (reusable building blocks)
18. [elements.section-info](#elementssection-info)
19. [media-library.media-item](#media-librarymedia-item)
20. [media-library.media-section](#media-librarymedia-section)
21. [services.service-card](#servicesservice-card)
22. [testimonials.testimonial-item](#testimonialstestimonial-item)

---

## COLLECTION TYPES

---

### Blog

Blog posts / articles published on the site.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** |
| `slug` | UID | **Required** · Auto-generated from title |
| `excerpt` | Text (long) | Short summary shown in listing cards |
| `content` | Rich Text | **Required** · Full article body |
| `image` | Media | Featured / cover image |
| `author` | Text (short) | Author name |
| `categories` | Text (long) | Comma-separated category labels |
| `tags` | Text (long) | Comma-separated tags |
| `publishDate` | Date & Time | Publication date |
| `featured` | Boolean | Pin to featured section |

---

### Book

Books / publications shown in the bookshelf section.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** |
| `description` | Rich Text | **Required** · Book synopsis |
| `image` | Media | **Required** · Book cover image |
| `buttonText` | Text (short) | **Required** · CTA button label (e.g. "Buy Now") |
| `buttonLink` | Text (long) | **Required** · URL for the CTA button |
| `author` | Text (long) | **Required** · Author name(s) |
| `publishedDate` | Date | **Required** · Publication date |
| `order` | Integer | Display order (ascending) |

---

### Consultant

Consultant profiles listed under the Consultancy section.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** · Consultant or service name |
| `slug` | UID | **Required** · Auto-generated from title |
| `description` | Rich Text | Short intro / teaser |
| `content` | Rich Text | Full details / body copy |
| `consultantType` | Enum | `technical_consultant` · `business_consultant` · `agile_coach` · `devops_specialist` · `other` |
| `hide` | Boolean | Hide from public listing |
| `hideSubMenu` | Boolean | Hide from navigation sub-menu |
| `keywords` | Text (short) | SEO keywords |
| `image` | Media | Profile or service image |
| `ctaUrl` | Text (short) | Call-to-action URL |
| `order` | Integer | Display order (ascending) |
| `video` | Boolean | Whether a video is associated |
| `videoUrl` | Text (long) | External video URL (YouTube / Vimeo) |
| `videoFile` | Media | Uploaded video file |

---

### Course

Training courses available in the catalogue.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** |
| `slug` | UID | **Required** · Auto-generated from title |
| `overview` | Text (long) | **Required** · Course summary |
| `moduleCode` | Text (short) | **Required** · e.g. `CRGC-004` |
| `trainingDays` | Integer | Duration in days |
| `schedule` | Text (short) | **Required** · e.g. "3 days" or schedule info |
| `courseFamily` | Text (short) | Grouping family / category |
| `learningObjectives` | Text (long) | Bullet-point learning outcomes |
| `targetAudience` | Text (long) | Who the course is for |
| `hyperlink` | Text (short) | External or booking link |
| `popular` | Boolean | Mark as popular / featured |
| `dropdown` | Text (short) | Sub-menu / dropdown label |
| `tags` | Text (short) | Comma-separated tags |
| `ftsProgramme` | Boolean | Part of the FTS funded programme |
| `order` | Integer | Display order (ascending) |

---

### News

News items / press coverage shown on the site.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** |
| `description` | Text (long) | **Required** · Article summary |
| `source` | Text (short) | **Required** · Publication name (e.g. "BBC News") |
| `date` | Text (short) | **Required** · Display date string (e.g. "12 Jan 2025") |
| `image` | Media | Thumbnail / cover image |
| `tag` | Text (short) | Single tag label |
| `url` | Text (short) | Link to the original article |
| `featured` | Boolean | Pin to featured section |

---

### Resource Library

Downloadable / viewable resources (videos, PDFs, images, audio).

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** |
| `slug` | UID | **Required** · Auto-generated from title |
| `resourceType` | Enum | **Required** · `video` · `image` · `audio` · `pdf` |
| `videoUrl` | Text (short) | External video URL |
| `pdfUrl` | Text (short) | External PDF URL |
| `media` | Media | Uploaded file (video / audio / PDF / image) |
| `category` | Text (short) | Category label |
| `date` | Date | Publication/upload date |
| `article` | Rich Text | Associated article body |
| `archive` | Boolean | Move to archive (hidden from main listing) |
| `coverArt` | Media | Thumbnail / cover image |

---

### Spotlight

Spotlight / featured moment entries (images or videos).

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** |
| `mediaType` | Enum | **Required** · `direct video` · `youtube video` · `image` |
| `image` | Media | Image file (when mediaType = image) |
| `video` | Media | Uploaded video file (when mediaType = direct video) |
| `thumbnail` | Media | Preview thumbnail |
| `videoUrl` | Text (short) | YouTube / external URL (when mediaType = youtube video) |

---

### Team Member

Staff and team profiles.

| Field | Type | Notes |
|-------|------|-------|
| `name` | Text (short) | **Required** |
| `slug` | UID | Auto-generated from name |
| `role` | Text (short) | **Required** · Job title / role |
| `image` | Media | Profile photo |
| `description` | Rich Text | **Required** · Bio / profile body |
| `order` | Integer | Display order (ascending) |

---

### Training

Training programmes listed under the Training section.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** |
| `slug` | UID | **Required** · Auto-generated from title |
| `description` | Rich Text | Short intro / teaser |
| `content` | Rich Text | Full programme details |
| `trainingType` | Enum | `bespoke_programme` · `funded_programme` · `video_podcast` · `partner_programme` · `eligibility_terms` · `other` |
| `hide` | Boolean | Hide from public listing |
| `hideSubMenu` | Boolean | Hide from navigation sub-menu |
| `keywords` | Text (short) | SEO keywords |
| `image` | Media | Programme image |
| `ctaUrl` | Text (short) | Call-to-action URL |
| `order` | Integer | Display order (ascending) |
| `video` | Boolean | Whether a video is associated |
| `videoUrl` | Text (long) | External video URL (YouTube / Vimeo) |
| `videoFile` | Media | Uploaded video file |

---

## SINGLE TYPES

*(Only one entry exists for each of these — edit directly in the CMS.)*

---

### About Page

Content for the About section of the site.

| Field | Type | Notes |
|-------|------|-------|
| `images` | Media | Gallery / hero images |
| `mission` | Text (long) | Mission statement |
| `vision` | Text (long) | Vision statement |
| `core_values` | Text (long) | Core values text |

---

### Client List

Logo carousel / client showcase on the homepage.

| Field | Type | Notes |
|-------|------|-------|
| `logos` | Media | Multiple logo image files (upload as a set) |

---

### FTS Courses Detail

Eligibility and fee information for the FTS funded training scheme.

| Field | Type | Notes |
|-------|------|-------|
| `eligibilty` | Rich Text | Eligibility criteria (note: field name has a typo — use as-is) |
| `courseFees` | Rich Text | Course fees breakdown |

---

### Media Library

Main media/gallery page content, organised into named sections.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** · Page title |
| `sections` | Component (repeatable) | **media-library.media-section** — see component definition below |

---

### Privacy Policy

Full privacy policy page content.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** · Page heading |
| `content` | Rich Text | **Required** · Full policy text |

---

### Services Page

Services overview page content.

| Field | Type | Notes |
|-------|------|-------|
| `description` | Rich Text | **Required** · Introductory description |
| `services` | Component (repeatable) | **services.service-card** — see component definition below |

---

### Terms and Conditions

Full terms & conditions page content.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** · Page heading |
| `content` | Rich Text | **Required** · Full T&C text |

---

### Testimonial

Testimonials / client quotes shown on the site.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | Section heading (optional) |
| `sections` | Component (repeatable) | **testimonials.testimonial-item** — see component definition below |

---

## COMPONENTS

Components are reusable building blocks embedded inside Single Types or Collection Types. They cannot be created independently.

---

### elements.section-info

Generic section header block.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** |
| `description` | Rich Text | **Required** |

---

### media-library.media-item

A single media item within a gallery section.

| Field | Type | Notes |
|-------|------|-------|
| `image` | Media | **Required** · The media file |
| `caption` | Text (short) | Optional caption |
| `description` | Text (long) | Optional longer description |

---

### media-library.media-section

A named section within the Media Library page (e.g. "Active", "Past Highlights").

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** · Section heading |
| `media` | Media | Media files for this section |
| `stage` | Enum | `active` · `pastHighlights` · Controls which page section this appears in |

---

### services.service-card

An individual service card on the Services page.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | **Required** · Service name |
| `description` | Rich Text | **Required** · Service description |
| `image` | Media | **Required** · Service icon or illustration |

---

### testimonials.testimonial-item

A single testimonial / client quote.

| Field | Type | Notes |
|-------|------|-------|
| `shortTestimonial` | Text (long) | **Required** · Quote shown on card (keep concise) |
| `fullStory` | Text (long) | Extended version shown in modal / expanded view |
| `personName` | Text (short) | Name of the person giving the testimonial |
| `personRole` | Text (short) | Their job title |
| `companyName` | Text (short) | Their organisation |
| `companyLogo` | Media | Company logo image |
| `role` | Enum | `partner` · `client` |

---

## Quick Reference

### Field Types Glossary

| Type | What it means |
|------|---------------|
| `Text (short)` | Single-line text input (string) |
| `Text (long)` | Multi-line plain text area |
| `Rich Text` | Full WYSIWYG editor — supports headings, bold, lists, links, etc. |
| `UID` | Auto-generated URL-safe slug (e.g. `my-blog-post`) |
| `Media` | Image, video, audio or document file upload |
| `Boolean` | True / False toggle |
| `Integer` | Whole number |
| `Date` | Date picker (no time) |
| `Date & Time` | Date and time picker |
| `Enum` | Fixed list of allowed values (dropdown) |
| `Component` | Embedded reusable sub-form |

### `order` Field Convention

Where an `order` field exists, entries are displayed **ascending** (lower number = displayed first). Use integers like `10, 20, 30` to leave room for insertions without re-numbering everything.

### Slug / UID Convention

`slug` fields are auto-generated from the `title` or `name` field. You can override them manually. Slugs must be unique within their content type. Changing a live slug will break existing URLs.
