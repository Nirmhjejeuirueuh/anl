// Strapi CMS API utilities for Astro integration

import { pluralize } from './textConverter';
import type { TeamMember } from '@/types';

export const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

// Image format interface for Strapi images
export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

// Media interface for photos in media library
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiImageFormat;
    medium: StrapiImageFormat;
    small: StrapiImageFormat;
  };
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


export interface StrapiBlog {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  author: string;
  categories: string;
  tags?: string;
  publishDate: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  image?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: StrapiImageFormat;
      medium: StrapiImageFormat;
      small: StrapiImageFormat;
    };
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
  };
}

export interface StrapiCourse {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
  moduleCode?: string;
  trainingDays?: number;
  learningObjectives?: string;
  targetAudience?: string;
  hyperlink?: string;
  courseFamily?: string;
  status?: string;
  overview?: string;
  popular?: boolean;
  dropdown?: string;
  schedule?: string;
  tags?: string; // comma-separated
  ftsProgramme?: boolean;
}

export interface StrapiFtsCourseDetail {
  id?: number;
  documentId?: string;
  eligibilty: string; // note: API field name has this spelling
  courseFees: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface StrapiTraining {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  trainingType?: 'bespoke_programme' | 'funded_programme' | 'video_podcast' | 'partner_programme' | 'eligibility_terms' | 'other';
  order?: number;
  image?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: StrapiImageFormat;
      medium: StrapiImageFormat;
      small: StrapiImageFormat;
    };
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
  };
  hide?: boolean;
  hideSubMenu?: boolean;
  keywords?: string;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StrapiConsultant {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  consultantType?: 'technical_consultant' | 'business_consultant' | 'agile_coach' | 'devops_specialist' | 'other';
  order?: number;
  image?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: StrapiImageFormat;
      medium: StrapiImageFormat;
      small: StrapiImageFormat;
    };
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
  };
  hide?: boolean;
  hideSubMenu?: boolean;
  keywords?: string;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface StrapiResourceLibrary {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  category?: string;
  description?: string;
  content?: string;
  resourceType: 'video' | 'pdf' | 'document' | 'article' | 'other' | 'audio' | 'image';
  videoUrl?: string;
  pdfUrl?: string;
  externalUrl?: string;
  archive?: boolean;
  media?: {
    id: number;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
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
  };
  coverArt?: {
    id: number;
    name: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  image?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: StrapiImageFormat;
      medium: StrapiImageFormat;
      small: StrapiImageFormat;
    };
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
  };
  featured?: boolean;
  tags?: string;
  keywords?: string;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StrapiTeamMember {
  id?: number;
  documentId?: string;
  name: string;
  role: string;
  description?: string;
  leadershipTeam?: boolean;
  socialLinks?: any;
  slug?: string;
  order?: number;
  image?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats?: any;
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
  };
}

export interface StrapiTeamPage {
  id?: number;
  documentId?: string;
  title: string;
  metaDescription?: string;
  members: StrapiTeamMember[];
}

export interface StrapiSpotlight {
  id?: number;
  documentId?: string;
  videoUrl?: string | null;
  mediaType?: string | null;
  title?: string | null;
  video?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats?: any;
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
  } | null;
  image?: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    formats?: any;
    mime: string;
  } | null;
  thumbnail?: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    mime: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface StrapiNews {
  id?: number;
  documentId?: string;
  title: string;
  description: string;
  source: string;
  date: string;
  tag?: string;
  url?: string;
  featured?: boolean;
  image?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats?: any;
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
  };
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface StrapiTestimonial {
  id?: number;
  shortTestimonial: string;
  fullStory?: string;
  personName?: string;
  personRole?: string;
  companyName?: string | null;
  role?: string | null;
}

export interface StrapiBook {
  id?: number;
  documentId?: string;
  title: string;
  description: string;
  author: string;
  order?: number;
  publishedDate: string;
  buttonText: string;
  buttonLink: string;
  image?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats?: any;
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
  };
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiPrivacyPolicy {
  id?: number;
  documentId?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface StrapiTermsAndConditions {
  id?: number;
  documentId?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/**
 * Fetch FTS courses detail (single type) from Strapi CMS
 */
/**
 * Caches for Strapi fetch functions to prevent redundant API calls during build.
 */
let _blogsCache: StrapiBlog[] | null = null;
let _trainingsCache: StrapiTraining[] | null = null;
let _consultantsCache: StrapiConsultant[] | null = null;
let _resourceCache: StrapiResourceLibrary[] | null = null;
let _teamCache: TeamMember[] | null = null;
let _ftsCache: StrapiFtsCourseDetail | null = null;
let _booksCache: StrapiBook[] | null = null;
let _mediaLibraryCache: StrapiMediaLibrary | null = null;
let _testimonialsCache: StrapiTestimonial[] | null = null;
let _privacyPolicyCache: StrapiPrivacyPolicy | null = null;
let _termsCache: StrapiTermsAndConditions | null = null;
let _spotlightsCache: StrapiSpotlight[] | null = null;
let _newsCache: StrapiNews[] | null = null;
let _clientListCache: StrapiClientLogo[] | null = null;
let _aboutPageCache: any | null = null;
let _servicesPageCache: any | null = null;
const _blogsByCategoryCache: Map<string, StrapiBlog[]> = new Map();

export async function getFtsCourseDetail(): Promise<StrapiFtsCourseDetail | null> {
  if (_ftsCache) return _ftsCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/fts-courses-detail?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch FTS course detail: ${response.status}`);
    }
    const data = await response.json();
    _ftsCache = data.data || null;
    return _ftsCache;
  } catch (error) {
    console.error('Error fetching FTS course detail:', error);
    return null;
  }
}

/**
 * Fetch all blogs from Strapi CMS (optimized for blog list - only essential fields)
 */
export async function getBlogs(): Promise<StrapiBlog[]> {
  if (_blogsCache) return _blogsCache;
  try {
    console.log('getBlogs: Starting API call to Strapi');
    // Ultra-optimized: only fields actually used in BlogCard component
    const response = await fetch(`${STRAPI_URL}/api/blogs?populate=image&fields=title,slug,author,categories,publishDate`);
    // const response = await fetch(`${STRAPI_URL}/api/blogs?populate=*`);
    console.log('getBlogs: Response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }
    const data: StrapiResponse<StrapiBlog> = await response.json();
    console.log('getBlogs: Received data:', data.data?.length || 0, 'blogs');
    _blogsCache = data.data;
    return _blogsCache;
  } catch (error) {
    throw new Error(`Strapi unavailable - failed to fetch blogs: ${error}`);
  }
}

/**
 * Fetch a single blog by slug from Strapi CMS
 */
export async function getBlogBySlug(slug: string): Promise<StrapiBlog | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }
    const data: StrapiResponse<StrapiBlog> = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
}

/**
 * Fetch featured blogs from Strapi CMS
 */
export async function getFeaturedBlogs(): Promise<StrapiBlog[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blogs?filters[featured][$eq]=true&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch featured blogs: ${response.status}`);
    }
    const data: StrapiResponse<StrapiBlog> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    return [];
  }
}

/**
 * Fetch unique categories from Strapi CMS
 */
export async function getCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  try {
    const blogs = await getBlogs();
    const categoryMap = new Map<string, number>();

    // Count occurrences of each category
    blogs.forEach(blog => {
      if (blog.categories) {
        const categories = blog.categories.split(',').map(cat => cat.trim());
        categories.forEach(category => {
          if (category) {
            categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
          }
        });
      }
    });

    // Convert to array format expected by Categories component
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      count,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Module-level cache so getCourses() only hits Strapi once per build,
 * no matter how many pages import and call it.
 */
let _coursesCache: StrapiCourse[] | null = null;

/**
 * Fetch all courses from Strapi CMS
 */
export async function getCourses(): Promise<StrapiCourse[]> {
  if (_coursesCache) {
    return _coursesCache;
  }
  try {
    console.log('getCourses: Starting API call to Strapi');

    // First, get the total count to determine how many pages we need
    const countResponse = await fetch(`${STRAPI_URL}/api/courses?pagination[pageSize]=1`);
    if (!countResponse.ok) {
      throw new Error(`Failed to fetch course count: ${countResponse.status}`);
    }
    const countData: StrapiResponse<StrapiCourse> = await countResponse.json();
    const totalCourses = countData.meta.pagination.total;
    const pageSize = 100; // Fetch 100 courses per page
    const totalPages = Math.ceil(totalCourses / pageSize);

    console.log(`getCourses: Total courses: ${totalCourses}, will fetch ${totalPages} pages`);

    const allCourses: StrapiCourse[] = [];

    // Fetch all pages; include explicit sort by order if provided by backend
    for (let page = 1; page <= totalPages; page++) {
      console.log(`getCourses: Fetching page ${page}/${totalPages}`);
      // the `order` field should be an integer that editors can set to control display sequence
      const response = await fetch(`${STRAPI_URL}/api/courses?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=order:asc`);
      if (!response.ok) {
        throw new Error(`Failed to fetch courses page ${page}: ${response.status}`);
      }
      const data: StrapiResponse<StrapiCourse> = await response.json();
      allCourses.push(...data.data);
    }

    console.log('getCourses: Received data:', allCourses.length, 'courses total');
    console.log('getCourses: Sample course slugs:', allCourses.slice(0, 3).map(c => ({ title: c.title, slug: c.slug })));
    _coursesCache = allCourses;
    return allCourses;
  } catch (error) {
    throw new Error(`Strapi unavailable - failed to fetch courses: ${error}`);
  }
}

export async function getCourseBySlug(slug: string): Promise<StrapiCourse | null> {
  try {
    console.log('getCourseBySlug: Searching for slug:', slug);
    const response = await fetch(`${STRAPI_URL}/api/courses?filters[slug][$eq]=${slug}&populate=*`);
    console.log('getCourseBySlug: Response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: StrapiResponse<StrapiCourse> = await response.json();
    console.log('getCourseBySlug: Found courses:', data.data?.length || 0);
    if (data.data?.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching course by slug:', error);
    return null;
  }
}

/**
 * Fetch courses by category from Strapi CMS
 */
export async function getCoursesByCategory(category: string): Promise<StrapiCourse[]> {
  try {
    console.log('getCoursesByCategory: Searching for category:', category);
    const response = await fetch(`${STRAPI_URL}/api/courses?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*&sort[0]=order:asc`);
    if (!response.ok) {
      throw new Error(`Failed to fetch courses by category: ${response.status}`);
    }
    const data: StrapiResponse<StrapiCourse> = await response.json();
    console.log('getCoursesByCategory: Found', data.data.length, 'courses for category:', category);
    return data.data;
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    return [];
  }
}

/**
 * Fetch all trainings from Strapi CMS
 */
export async function getTrainings(includeHidden = false): Promise<StrapiTraining[]> {
  if (_trainingsCache) {
    return includeHidden ? _trainingsCache : _trainingsCache.filter(training => !training.hide);
  }
  try {
    const response = await fetch(`${STRAPI_URL}/api/trainings?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch trainings: ${response.status}`);
    }
    const data: StrapiResponse<StrapiTraining> = await response.json();
    
    // Sort logic
    const allTrainings = data.data.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return 0;
    });

    _trainingsCache = allTrainings;
    return includeHidden ? allTrainings : allTrainings.filter(training => !training.hide);
  } catch (error) {
    throw new Error(`Strapi unavailable - failed to fetch trainings: ${error}`);
  }
}

/**
 * Fetch training by slug from Strapi CMS
 */
export async function getTrainingBySlug(slug: string): Promise<StrapiTraining | null> {
  const trainings = await getTrainings(true);
  return trainings.find(t => t.slug === slug) || null;
}

/**
 * Fetch trainings by category from Strapi CMS
 */
export async function getTrainingsByCategory(category: string): Promise<StrapiTraining[]> {
  try {
    console.log('getTrainingsByCategory: Searching for category:', category);
    const response = await fetch(`${STRAPI_URL}/api/trainings?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch trainings by category: ${response.status}`);
    }
    const data: StrapiResponse<StrapiTraining> = await response.json();
    console.log('getTrainingsByCategory: Found', data.data.length, 'trainings for category:', category);
    // Filter out hidden trainings and sort by order field
    const filteredTrainings = data.data.filter(training => !training.hide);
    return filteredTrainings.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) {
        return -1;
      }
      if (b.order !== undefined) {
        return 1;
      }
      return 0;
    });
  } catch (error) {
    console.error('Error fetching trainings by category:', error);
    return [];
  }
}

/**
 * Fetch trainings by type from Strapi CMS
 */
export async function getTrainingsByType(trainingType: string): Promise<StrapiTraining[]> {
  try {
    console.log('getTrainingsByType: Searching for type:', trainingType);
    const response = await fetch(`${STRAPI_URL}/api/trainings?filters[trainingType][$eq]=${trainingType}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch trainings by type: ${response.status}`);
    }
    const data: StrapiResponse<StrapiTraining> = await response.json();
    console.log('getTrainingsByType: Found', data.data.length, 'trainings for type:', trainingType);
    // Filter out hidden trainings and sort by order field
    const filteredTrainings = data.data.filter(training => !training.hide);
    return filteredTrainings.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) {
        return -1;
      }
      if (b.order !== undefined) {
        return 1;
      }
      return 0;
    });
  } catch (error) {
    console.error('Error fetching trainings by type:', error);
    return [];
  }
}

/**
 * Fetch featured trainings from Strapi CMS
 */
export async function getFeaturedTrainings(): Promise<StrapiTraining[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/trainings?filters[featured][$eq]=true&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch featured trainings: ${response.status}`);
    }
    const data: StrapiResponse<StrapiTraining> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching featured trainings:', error);
    return [];
  }
}

/**
 * Fetch all consultants from Strapi CMS
 */
export async function getConsultants(): Promise<StrapiConsultant[]> {
  if (_consultantsCache) return _consultantsCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/consultants?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch consultants: ${response.status}`);
    }
    const data: StrapiResponse<StrapiConsultant> = await response.json();
    
    _consultantsCache = data.data.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return 0;
    });
    return _consultantsCache;
  } catch (error) {
    throw new Error(`Strapi unavailable - failed to fetch consultants: ${error}`);
  }
}

/**
 * Fetch consultant by slug from Strapi CMS
 */
export async function getConsultantBySlug(slug: string): Promise<StrapiConsultant | null> {
  const consultants = await getConsultants();
  return consultants.find(c => c.slug === slug) || null;
}

/**
 * Fetch consultants by category from Strapi CMS
 */
export async function getConsultantsByCategory(category: string): Promise<StrapiConsultant[]> {
  try {
    console.log('getConsultantsByCategory: Searching for category:', category);
    const response = await fetch(`${STRAPI_URL}/api/consultants?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch consultants by category: ${response.status}`);
    }
    const data: StrapiResponse<StrapiConsultant> = await response.json();
    console.log('getConsultantsByCategory: Found', data.data.length, 'consultants for category:', category);
    // Filter out hidden consultants and sort by order field
    const filteredConsultants = data.data.filter(consultant => !consultant.hide);
    return filteredConsultants.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) {
        return -1;
      }
      if (b.order !== undefined) {
        return 1;
      }
      return 0;
    });
  } catch (error) {
    console.error('Error fetching consultants by category:', error);
    return [];
  }
}

/**
 * Fetch consultants by type from Strapi CMS
 */
export async function getConsultantsByType(consultantType: string): Promise<StrapiConsultant[]> {
  try {
    console.log('getConsultantsByType: Searching for type:', consultantType);
    const response = await fetch(`${STRAPI_URL}/api/consultants?filters[consultantType][$eq]=${consultantType}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch consultants by type: ${response.status}`);
    }
    const data: StrapiResponse<StrapiConsultant> = await response.json();
    console.log('getConsultantsByType: Found', data.data.length, 'consultants for type:', consultantType);
    // Filter out hidden consultants and sort by order field
    const filteredConsultants = data.data.filter(consultant => !consultant.hide);
    return filteredConsultants.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) {
        return -1;
      }
      if (b.order !== undefined) {
        return 1;
      }
      return 0;
    });
  } catch (error) {
    console.error('Error fetching consultants by type:', error);
    return [];
  }
}

/**
 * Fetch featured consultants from Strapi CMS
 */
export async function getFeaturedConsultants(): Promise<StrapiConsultant[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/consultants?filters[featured][$eq]=true&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch featured consultants: ${response.status}`);
    }
    const data: StrapiResponse<StrapiConsultant> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching featured consultants:', error);
    return [];
  }
}

/**
 * Fetch all resource libraries from Strapi CMS
 */
export async function getResourceLibraries(): Promise<StrapiResourceLibrary[]> {
  if (_resourceCache) return _resourceCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/resource-libraries?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch resource libraries: ${response.status}`);
    }
    const data: StrapiResponse<StrapiResourceLibrary> = await response.json();
    _resourceCache = data.data;
    return _resourceCache;
  } catch (error) {
    throw new Error(`Strapi unavailable - failed to fetch resource libraries: ${error}`);
  }
}

/**
 * Fetch resource library by slug from Strapi CMS
 */
export async function getResourceLibraryBySlug(slug: string): Promise<StrapiResourceLibrary | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/resource-libraries?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch resource library: ${response.status}`);
    }
    const data: StrapiResponse<StrapiResourceLibrary> = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching resource library by slug:', error);
    return null;
  }
}

/**
 * Fetch featured resource libraries from Strapi CMS
 */
export async function getFeaturedResourceLibraries(): Promise<StrapiResourceLibrary[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/resource-libraries?filters[featured][$eq]=true&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch featured resource libraries: ${response.status}`);
    }
    const data: StrapiResponse<StrapiResourceLibrary> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching featured resource libraries:', error);
    return [];
  }
}

/**
 * Fetch resource libraries by type from Strapi CMS
 */
export async function getResourceLibrariesByType(resourceType: string): Promise<StrapiResourceLibrary[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/resource-libraries?filters[resourceType][$eq]=${resourceType}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch resource libraries by type: ${response.status}`);
    }
    const data: StrapiResponse<StrapiResourceLibrary> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching resource libraries by type:', error);
    return [];
  }
}

/**
 * Fetch blogs by category from Strapi CMS
 */
export async function getBlogsByCategory(category: string): Promise<StrapiBlog[]> {
  const cached = _blogsByCategoryCache.get(category);
  if (cached) return cached;
  try {
    console.log('getBlogsByCategory: Searching for category:', category);
    let response = await fetch(`${STRAPI_URL}/api/blogs?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs by category: ${response.status}`);
    }
    let data: StrapiResponse<StrapiBlog> = await response.json();

    // If no results, try case-insensitive search from the already-cached blog list
    if (data.data.length === 0) {
      console.log('getBlogsByCategory: No exact matches, trying case-insensitive search');
      const allBlogs = await getBlogs();
      data.data = allBlogs.filter(blog => {
        if (!blog.categories) return false;
        const blogCategories = blog.categories.split(',').map(cat => cat.trim().toLowerCase());
        return blogCategories.includes(category.toLowerCase());
      });
    }

    console.log('getBlogsByCategory: Found', data.data.length, 'blogs for category:', category);
    _blogsByCategoryCache.set(category, data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    return [];
  }
}

/**
 * Convert Strapi course to Astro-compatible format
 */
export function convertStrapiCourseToAstro(course: StrapiCourse) {
  // Safely parse date with fallbacks
  let date: Date;
  try {
    const dateString = course.publishedAt || course.createdAt;
    if (dateString) {
      date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        // Fallback to current date if invalid
        date = new Date();
      }
    } else {
      // No date available, use current date
      date = new Date();
    }
  } catch (error) {
    // Fallback to current date if parsing fails
    date = new Date();
  }

  return {
    id: course.documentId || course.id?.toString() || course.slug,
    slug: course.slug,
    collection: "courses",
    data: {
      title: course.title,
      date: date,
      moduleCode: course.moduleCode,
      draft: false,
      description: course.overview,
      featured: course.popular,
      dropdown: course.dropdown,
      order: course.order || 0,
      trainingDays: course.trainingDays,
      duration: course.trainingDays ? `${course.trainingDays} ${pluralize(course.trainingDays, 'day')}` : undefined,
      courseFamily: course.courseFamily,
      categories: course.courseFamily ? [course.courseFamily] : [],
      status: course.status,
      schedule: course.schedule,
      learningObjectives: course.learningObjectives,
      targetAudience: course.targetAudience,
      hyperlink: course.hyperlink,
      tags: course.tags ? course.tags.split(',').map(t => t.trim()) : [],
      ftsProgramme: course.ftsProgramme || false,
    },
    body: course.learningObjectives || '',
    rendered: {
      html: course.learningObjectives || '',
    },
  };
}

/**
 * Convert Strapi training to Astro-compatible format
 */
export function convertStrapiTrainingToAstro(training: StrapiTraining) {
  // Safely parse date with fallbacks
  let date: Date;
  try {
    const dateString = training.publishedAt || training.createdAt;
    if (dateString) {
      date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        // Fallback to current date if invalid
        date = new Date();
      }
    } else {
      // No date available, use current date
      date = new Date();
    }
  } catch (error) {
    // Fallback to current date if parsing fails
    date = new Date();
  }

  return {
    id: training.documentId || training.id?.toString() || training.slug,
    slug: training.slug,
    collection: "trainings",
    data: {
      title: training.title,
      image: training.image ? (training.image.url.startsWith('http') ? training.image.url : `${STRAPI_URL}${training.image.url}`) : undefined,
      date: date,
      trainingType: training.trainingType || 'other',
      categories: [], // Not available in StrapiTraining type
      tags: [], // Not available in StrapiTraining type
      draft: false,
      description: training.description,
      featured: false, // Not available in StrapiTraining type
      seoTitle: training.title, // Use title as fallback
      seoDescription: training.description, // Use description as fallback
      keywords: training.keywords,
    },
    body: training.content || '',
    rendered: {
      html: training.content || '',
    },
  };
}

/**
 * Convert Strapi blog to Astro collection entry format
 */
export function convertStrapiBlogToAstro(blog: StrapiBlog) {
  // Safely parse date with fallbacks
  let date: Date;
  try {
    const dateString = blog.publishDate || blog.publishedAt || blog.createdAt;
    if (dateString) {
      date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        // Fallback to current date if invalid
        date = new Date();
      }
    } else {
      // No date available, use current date
      date = new Date();
    }
  } catch (error) {
    // Fallback to current date if parsing fails
    date = new Date();
  }

  return {
    id: blog.documentId,
    slug: blog.slug,
    collection: "blogs",
    data: {
      title: blog.title,
      image: blog.image ? (blog.image.url.startsWith('http') ? blog.image.url : `${STRAPI_URL}${blog.image.url}`) : undefined,
      date: date,
      author: blog.author,
      categories: blog.categories ? blog.categories.split(',').map(cat => cat.trim()) : [],
      draft: false,
      excerpt: blog.excerpt,
      tags: blog.tags ? blog.tags.split(',').map(tag => tag.trim()) : [],
      featured: blog.featured,
    },
    body: blog.content,
    rendered: {
      html: blog.content,
    },
  };
}

/**
 * Fetch team page from Strapi CMS
 */
export async function getTeamPage(): Promise<StrapiTeamPage | null> {
  try {
    console.log('getTeamPage: Starting API call to Strapi');
    const response = await fetch(`${STRAPI_URL}/api/team-page?populate[members][fields][0]=name&populate[members][fields][1]=role&populate[members][populate][image][fields][0]=url&populate[members][populate][image][fields][1]=alternativeText`);
    console.log('getTeamPage: Response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch team page: ${response.status}`);
    }
    const data = await response.json();
    console.log('getTeamPage: Received team page with', data.data?.members?.length || 0, 'members');
    return data.data;
  } catch (error) {
    console.error('Error fetching team page:', error);
    return null;
  }
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
    image: strapiMember.image ? (strapiMember.image.url.startsWith('http') ? strapiMember.image.url : `${STRAPI_URL}${strapiMember.image.url}`) : '',
    leadershipTeam: false,
    social: {
      enable: false,
      list: []
    }
  };
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  if (_teamCache) return _teamCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/team-members?populate[image][fields]=url&fields=name,role,slug,order,description`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    _teamCache = (data.data || []).map(convertStrapiTeamMember).filter((member: TeamMember | null) => member !== null);
    return _teamCache;
  } catch (error) {
    throw new Error(`Strapi unavailable - failed to fetch team members: ${error}`);
  }
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const members = await getAllTeamMembers();
  return members.find(m => m.slug === slug) || null;
}

/**
 * Fetch all spotlights from Strapi CMS
 */
export interface StrapiClientLogo {
  id: number;
  url: string;
  alternativeText: string | null;
  formats?: any;
}

export async function getClientList(): Promise<StrapiClientLogo[]> {
  if (_clientListCache) return _clientListCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/client-list?populate=logos`);
    if (!response.ok) {
      throw new Error(`Failed to fetch client list: ${response.status}`);
    }
    const data: any = await response.json();
    
    // Strapi v5 Single Type response structure:
    // data.data.logos might be the array we need
    const logos = data.data?.logos;

    if (!Array.isArray(logos)) {
      _clientListCache = [];
      return _clientListCache;
    }

    // Map the Strapi image objects to our StrapiClientLogo interface
    _clientListCache = logos.map((logo: any) => ({
      id: logo.id,
      url: logo.url || "",
      alternativeText: logo.alternativeText || "",
    }));
    return _clientListCache;
  } catch (error) {
    console.error('Error fetching client list:', error);
    return [];
  }
}

export async function getSpotlights(): Promise<StrapiSpotlight[]> {
  if (_spotlightsCache) return _spotlightsCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/spotlights?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch spotlights: ${response.status}`);
    }
    const data: StrapiResponse<StrapiSpotlight> = await response.json();
    _spotlightsCache = data.data;
    return _spotlightsCache;
  } catch (error) {
    console.error('Error fetching spotlights:', error);
    return [];
  }
}

/**
 * Fetch all news from Strapi CMS
 */
export async function getNews(): Promise<StrapiNews[]> {
  if (_newsCache) return _newsCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/news-items?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }
    const data: StrapiResponse<StrapiNews> = await response.json();
    _newsCache = data.data.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
    return _newsCache;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

/**
 * Fetch testimonials from Strapi CMS (singleType — sections JSON array)
 */
export async function getTestimonials(): Promise<StrapiTestimonial[]> {
  if (_testimonialsCache) return _testimonialsCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/testimonial?populate[sections][populate]=companyLogo`);
    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.status}`);
    }
    const data = await response.json();
    _testimonialsCache = data?.data?.sections ?? [];
    return _testimonialsCache;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

/**
 * Fetch all books from Strapi CMS
 */
export async function getBooks(): Promise<StrapiBook[]> {
  if (_booksCache) return _booksCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/books?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`);
    }
    const data: StrapiResponse<StrapiBook> = await response.json();
    _booksCache = data.data;
    return _booksCache;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

// Media Library Types
export interface StrapiMediaSection {
  id: number;
  title: string;
  description?: string;
  stage?: string;
  // new field: general media items (images, videos, audios)
  media: StrapiMedia[];
  // keep photos property for backwards compatibility in case older entries still use it
  photos?: StrapiMedia[];
}

export interface StrapiMediaLibrary {
  id?: number;
  documentId?: string;
  title: string;
  description?: string;
  sections: StrapiMediaSection[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export async function getMediaLibrary(): Promise<StrapiMediaLibrary | null> {
  if (_mediaLibraryCache) return _mediaLibraryCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/media-library?populate[sections][populate]=media`);
    if (!response.ok) {
      throw new Error(`Failed to fetch media library: ${response.status}`);
    }
    const data: { data: StrapiMediaLibrary } = await response.json();
    _mediaLibraryCache = data.data;
    return _mediaLibraryCache;
  } catch (error) {
    console.error('Error fetching media library:', error);
    return null;
  }
}

/**
 * Fetch privacy policy from Strapi CMS
 */
export async function getPrivacyPolicy(): Promise<StrapiPrivacyPolicy | null> {
  if (_privacyPolicyCache) return _privacyPolicyCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/privacy-policy`);
    if (!response.ok) {
      throw new Error(`Failed to fetch privacy policy: ${response.status}`);
    }
    const data = await response.json();
    _privacyPolicyCache = data.data || null;
    return _privacyPolicyCache;
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    return null;
  }
}

/**
 * Fetch terms and conditions from Strapi CMS
 */
export async function getTermsAndConditions(): Promise<StrapiTermsAndConditions | null> {
  if (_termsCache) return _termsCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/terms-and-conditions`);
    if (!response.ok) {
      throw new Error(`Failed to fetch terms and conditions: ${response.status}`);
    }
    const data = await response.json();
    _termsCache = data.data || null;
    return _termsCache;
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
    return null;
  }
}

/**
 * Fetch about page from Strapi CMS (single type, cached)
 */
export async function getAboutPage(): Promise<any | null> {
  if (_aboutPageCache) return _aboutPageCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/about-page?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch about page: ${response.status}`);
    }
    const data = await response.json();
    _aboutPageCache = data.data || null;
    return _aboutPageCache;
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}

/**
 * Fetch services page from Strapi CMS (single type, cached).
 * Uses populate[services][populate]=image which is compatible with Strapi v5.
 */
export async function getServicesPage(): Promise<any | null> {
  if (_servicesPageCache) return _servicesPageCache;
  try {
    const response = await fetch(`${STRAPI_URL}/api/services-page?populate[services][populate]=image`);
    if (!response.ok) {
      throw new Error(`Failed to fetch services page: ${response.status}`);
    }
    const data = await response.json();
    _servicesPageCache = data.data || null;
    return _servicesPageCache;
  } catch (error) {
    console.error('Error fetching services page:', error);
    return null;
  }
}