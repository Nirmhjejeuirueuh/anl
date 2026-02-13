# Strapi Cache System

## Overview

The Strapi API integration now includes a smart server-side caching system that:
- **Caches API responses for 5 minutes** to improve performance
- **Detects hard refresh** (Ctrl+F5 / Cmd+Shift+R) and bypasses cache for fresh data
- **Works with Vercel's SSR** for dynamic content updates

## How It Works

### Normal Request Flow
1. User visits a page
2. API call checks the server-side cache
3. If data exists and is less than 5 minutes old → return cached data
4. If cache is expired or missing → fetch fresh data from Strapi and cache it

### Hard Refresh Flow
1. User presses **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac)
2. Browser sends `Cache-Control: no-cache` header
3. System detects this header and **bypasses cache completely**
4. Fresh data is fetched from Strapi immediately
5. New data replaces the cache

## Usage in Astro Pages

To enable hard refresh detection, pass `Astro.request` to any Strapi API function:

```astro
---
import { getBlogBySlug } from '@/lib/utils/strapiApi';

// IMPORTANT: Enable SSR for dynamic content
export const prerender = false;

const { slug } = Astro.params;

// Pass Astro.request to enable hard refresh detection
const blog = await getBlogBySlug(slug, Astro.request);
---
```

### Examples for Different API Functions

```astro
---
// Blogs
const blogs = await getBlogs(Astro.request);
const blog = await getBlogBySlug('my-slug', Astro.request);

// Courses
const courses = await getCourses(Astro.request);
const course = await getCourseBySlug('course-slug', Astro.request);

// Trainings
const trainings = await getTrainings(Astro.request);
const training = await getTrainingBySlug('training-slug', Astro.request);

// Testimonials
const testimonials = await getTestimonials(Astro.request);

// News
const news = await getNews(Astro.request);

// And so on for all Strapi API functions...
---
```

## Important Notes

### 1. Enable SSR for Pages with Dynamic Content

For the caching system to work properly, pages must have SSR enabled:

```astro
---
// Add this at the top of your page
export const prerender = false;
---
```

Without SSR, pages are pre-rendered at build time and won't check the cache on each request.

### 2. Cache TTL (Time To Live)

The cache expires after **5 minutes**. You can modify this in `strapiApi.ts`:

```typescript
class ServerCache {
  private ttl = 5 * 60 * 1000; // 5 minutes in milliseconds
  // Change to: 10 * 60 * 1000 for 10 minutes
}
```

### 3. Testing Hard Refresh

To test if hard refresh works:

1. Visit a page with Strapi content
2. Check browser console - should see "Cache hit" on subsequent loads
3. Press **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac)
4. Check console - should see "Hard refresh detected, bypassing cache"
5. Fresh data will be fetched immediately

### 4. Backward Compatibility

The `request` parameter is **optional**. Existing code will continue to work without modification, but won't support hard refresh detection:

```astro
---
// This still works but won't detect hard refresh
const blogs = await getBlogs();

// This works AND detects hard refresh
const blogs = await getBlogs(Astro.request);
---
```

## API Functions Updated

All Strapi API functions now support the optional `request` parameter:

- `getBlogs(request?)`
- `getBlogBySlug(slug, request?)`
- `getFeaturedBlogs(request?)`
- `getCategories(request?)`
- `getCourses(request?)`
- `getCourseBySlug(slug, request?)`
- `getTrainings(request?)`
- `getTrainingBySlug(slug, request?)`
- `getConsultants(request?)`
- `getConsultantBySlug(slug, request?)`
- `getResourceLibraries(request?)`
- `getResourceLibraryBySlug(slug, request?)`
- `getTestimonials(request?)`
- `getNews(request?)`
- `getTeamPage(request?)`
- `getSpotlights(request?)`
- `getBooks(request?)`
- `getMediaLibrary(request?)`
- `getPrivacyPolicy(request?)`
- `getTermsAndConditions(request?)`

...and all other "by category" and "by type" variants.

## Debugging

The cache system logs its operations to the console:

- `[Strapi Cache] Cache hit for: <url>` - Data served from cache
- `[Strapi Cache] Cache miss, fetching from API: <url>` - Fetching fresh data
- `[Strapi Cache] Hard refresh detected, bypassing cache for: <url>` - Hard refresh triggered
- `[Strapi Cache] Cached response for: <url>` - New data cached

## Performance Benefits

- **Reduced API calls** to Strapi (max once per 5 minutes per endpoint)
- **Faster page loads** (serve from memory instead of network)
- **User control** via hard refresh for immediate updates
- **Automatic expiration** ensures data stays reasonably fresh

## Deployment Considerations

### Vercel
- The cache is **per-instance**, not shared across serverless functions
- Each serverless function instance maintains its own cache
- Cache is cleared when the function instance is recycled

### Multiple Instances
- In production with multiple instances, each instance has its own cache
- Hard refresh only affects the instance that receives the request
- For globally consistent updates, wait for the 5-minute TTL to expire across all instances

### Alternative: Redis Cache
For a shared cache across all instances, consider implementing Redis:

```typescript
// Future enhancement - not implemented yet
class RedisCache {
  // Share cache across all Vercel instances
  // Requires Redis setup and configuration
}
```

## Migration Guide

To update existing pages:

1. **Add SSR:** `export const prerender = false;`
2. **Pass request:** Change `await getBlogs()` to `await getBlogs(Astro.request)`
3. **Test:** Verify hard refresh works

That's it! The caching system handles everything else automatically.
