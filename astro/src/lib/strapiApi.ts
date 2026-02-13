import type { TeamMember } from "@/types";

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any; // Can be more specific if needed
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiTeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  order: number;
  slug: string;
  image: StrapiMedia | null;
}

export interface StrapiTeamPage {
  id: number;
  attributes: {
    members: {
      data: StrapiTeamMember[];
    };
  };
}

const STRAPI_URL = import.meta.env.STRAPI_URL || "http://localhost:1337";

export { STRAPI_URL };

// Server-side cache with TTL
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class ServerCache {
  private cache = new Map<string, CacheEntry<any>>();
  private ttl = 5 * 60 * 1000; // 5 minutes in milliseconds

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    const age = now - entry.timestamp;

    if (age > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

const cache = new ServerCache();

// Cached fetch function
async function cachedFetch(url: string, options: RequestInit = {}, request?: Request): Promise<Response> {
  const isHardRefresh = request?.headers.get('cache-control')?.includes('no-cache') ||
                        request?.headers.get('pragma') === 'no-cache';

  const cacheKey = url;

  if (isHardRefresh) {
    console.log(`[Strapi Cache] Hard refresh detected, bypassing cache for: ${url}`);
    cache.clear(cacheKey);
  } else {
    const cachedResponse = cache.get<any>(cacheKey);
    if (cachedResponse) {
      console.log(`[Strapi Cache] Cache hit for: ${url}`);
      return new Response(JSON.stringify(cachedResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  console.log(`[Strapi Cache] Cache miss, fetching from API: ${url}`);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (response.ok) {
    const data = await response.clone().json();
    cache.set(cacheKey, data);
    console.log(`[Strapi Cache] Cached response for: ${url}`);
  }

  return response;
}

export function convertStrapiTeamMember(strapiMember: StrapiTeamMember): TeamMember | null {
  if (!strapiMember || !strapiMember.name) {
    console.error('Invalid team member data:', strapiMember);
    return null;
  }

  return {
    id: strapiMember.id,
    name: strapiMember.name,
    slug: strapiMember.slug,
    role: strapiMember.role,
    description: strapiMember.description,
    order: strapiMember.order,
    image: strapiMember.image ? (strapiMember.image.url.startsWith('http') ? strapiMember.image.url : `${STRAPI_URL}${strapiMember.image.url}`) : "",
    leadershipTeam: false, // Not implemented yet
    social: {
      enable: false,
      list: []
    }
  };
}

export async function getTeamPage(request?: Request): Promise<StrapiTeamPage | null> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/team-page?populate[members][populate]=*`, {}, request);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching team page:", error);
    return null;
  }
}

export async function getAllTeamMembers(request?: Request): Promise<TeamMember[]> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/team-members?populate[image][fields]=url&fields=name,role,slug,order`, {}, request);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Team members API response:', data); // Debug log
    return (data.data || []).map(convertStrapiTeamMember).filter((member: StrapiTeamMember | null) => member !== null);
  } catch (error) {
    console.error("Error fetching all team members:", error);
    return [];
  }
}

export async function getTeamMemberBySlug(slug: string, request?: Request): Promise<TeamMember | null> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/team-members?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`, {}, request);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const strapiMember = data.data && data.data.length > 0 ? data.data[0] : null;
    return strapiMember ? convertStrapiTeamMember(strapiMember) : null;
  } catch (error) {
    console.error("Error fetching team member by slug:", error);
    return null;
  }
}