// Strapi CMS API utilities for Astro integration

import { pluralize } from './textConverter';

export const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

// Cached fetch function with browser caching
async function cachedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const cacheOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      'Cache-Control': 'max-age=300', // Cache for 5 minutes
    },
    // Use browser cache when available
    cache: 'default', // Let browser decide caching strategy
  };

  return fetch(url, cacheOptions);
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
  resourceType: 'video' | 'pdf' | 'document' | 'article' | 'other';
  videoUrl?: string;
  pdfUrl?: string;
  externalUrl?: string;
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
  description: string;
  content?: string;
  resourceType: 'video' | 'pdf' | 'document' | 'article' | 'other';
  videoUrl?: string;
  pdfUrl?: string;
  externalUrl?: string;
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
  name: string;
  role: string;
  description?: string;
  leadershipTeam?: boolean;
  socialLinks?: any;
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
  tag?: string;
  date?: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
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
  documentId?: string;
  shortTestimonial: string;
  fullStory?: string;
  personName?: string;
  personRole?: string;
  companyName?: string;
  logoText?: string;
  backgroundColor?: 'yellow' | 'red' | 'cyan' | 'blue' | 'dark-green' | 'green' | 'nil';
  isFeatured?: boolean;
  order?: number;
  hasStory?: boolean;
  companyLogo?: {
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
  avatar?: {
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

/**
 * Fetch all blogs from Strapi CMS (optimized for blog list - only essential fields)
 */
export async function getBlogs(): Promise<StrapiBlog[]> {
  try {
    console.log('getBlogs: Starting API call to Strapi');
    // Ultra-optimized: only fields actually used in BlogCard component
    const response = await cachedFetch(`${STRAPI_URL}/api/blogs?populate=image&fields=title,slug,author,categories,publishDate`);
    // const response = await fetch(`${STRAPI_URL}/api/blogs?populate=*`);
    console.log('getBlogs: Response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }
    const data: StrapiResponse<StrapiBlog> = await response.json();
    console.log('getBlogs: Received data:', data.data?.length || 0, 'blogs');
    return data.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

/**
 * Fetch a single blog by slug from Strapi CMS
 */
export async function getBlogBySlug(slug: string): Promise<StrapiBlog | null> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`);
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
    const response = await cachedFetch(`${STRAPI_URL}/api/blogs?filters[featured][$eq]=true&populate=*`);
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
 * Fetch all courses from Strapi CMS
 */
export async function getCourses(): Promise<StrapiCourse[]> {
  try {
    console.log('getCourses: Starting API call to Strapi');

    // First, get the total count to determine how many pages we need
    const countResponse = await cachedFetch(`${STRAPI_URL}/api/courses?pagination[pageSize]=1`);
    if (!countResponse.ok) {
      throw new Error(`Failed to fetch course count: ${countResponse.status}`);
    }
    const countData: StrapiResponse<StrapiCourse> = await countResponse.json();
    const totalCourses = countData.meta.pagination.total;
    const pageSize = 100; // Fetch 100 courses per page
    const totalPages = Math.ceil(totalCourses / pageSize);

    console.log(`getCourses: Total courses: ${totalCourses}, will fetch ${totalPages} pages`);

    const allCourses: StrapiCourse[] = [];

    // Fetch all pages
    for (let page = 1; page <= totalPages; page++) {
      console.log(`getCourses: Fetching page ${page}/${totalPages}`);
      const response = await cachedFetch(`${STRAPI_URL}/api/courses?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch courses page ${page}: ${response.status}`);
      }
      const data: StrapiResponse<StrapiCourse> = await response.json();
      allCourses.push(...data.data);
    }

    console.log('getCourses: Received data:', allCourses.length, 'courses total');
    console.log('getCourses: Sample course slugs:', allCourses.slice(0, 3).map(c => ({ title: c.title, slug: c.slug })));
    return allCourses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

/**
 * Fetch a single course by slug from Strapi CMS
 */
export async function getCourseBySlug(slug: string): Promise<StrapiCourse | null> {
  try {
    console.log('getCourseBySlug: Searching for slug:', slug);
    const response = await cachedFetch(`${STRAPI_URL}/api/courses?filters[slug][$eq]=${slug}&populate=*`);
    console.log('getCourseBySlug: Response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch course: ${response.status}`);
    }
    const data: StrapiResponse<StrapiCourse> = await response.json();
    console.log('getCourseBySlug: Found courses:', data.data?.length || 0);
    if (data.data?.length > 0) {
      console.log('getCourseBySlug: Found course:', { title: data.data[0].title, slug: data.data[0].slug });
    }
    return data.data[0] || null;
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
    const response = await cachedFetch(`${STRAPI_URL}/api/courses?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*`);
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
export async function getTrainings(): Promise<StrapiTraining[]> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/trainings?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch trainings: ${response.status}`);
    }
    const data: StrapiResponse<StrapiTraining> = await response.json();
    // Filter out hidden trainings and sort by order field
    const filteredTrainings = data.data.filter(training => !training.hide);
    return filteredTrainings.sort((a, b) => {
      // Items with order come first, sorted by order value
      // Items without order come last
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) {
        return -1; // a has order, b doesn't - a comes first
      }
      if (b.order !== undefined) {
        return 1; // b has order, a doesn't - b comes first
      }
      return 0; // both don't have order, maintain current order
    });
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return [];
  }
}

/**
 * Fetch training by slug from Strapi CMS
 */
export async function getTrainingBySlug(slug: string): Promise<StrapiTraining | null> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/trainings?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch training: ${response.status}`);
    }
    const data: StrapiResponse<StrapiTraining> = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching training by slug:', error);
    return null;
  }
}

/**
 * Fetch trainings by category from Strapi CMS
 */
export async function getTrainingsByCategory(category: string): Promise<StrapiTraining[]> {
  try {
    console.log('getTrainingsByCategory: Searching for category:', category);
    const response = await cachedFetch(`${STRAPI_URL}/api/trainings?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*`);
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
    const response = await cachedFetch(`${STRAPI_URL}/api/trainings?filters[trainingType][$eq]=${trainingType}&populate=*`);
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
    const response = await cachedFetch(`${STRAPI_URL}/api/trainings?filters[featured][$eq]=true&populate=*`);
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
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/consultants?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch consultants: ${response.status}`);
    }
    const data: StrapiResponse<StrapiConsultant> = await response.json();
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
    console.error('Error fetching consultants:', error);
    return [];
  }
}

/**
 * Fetch consultant by slug from Strapi CMS
 */
export async function getConsultantBySlug(slug: string): Promise<StrapiConsultant | null> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/consultants?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch consultant: ${response.status}`);
    }
    const data: StrapiResponse<StrapiConsultant> = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching consultant by slug:', error);
    return null;
  }
}

/**
 * Fetch consultants by category from Strapi CMS
 */
export async function getConsultantsByCategory(category: string): Promise<StrapiConsultant[]> {
  try {
    console.log('getConsultantsByCategory: Searching for category:', category);
    const response = await cachedFetch(`${STRAPI_URL}/api/consultants?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*`);
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
    const response = await cachedFetch(`${STRAPI_URL}/api/consultants?filters[consultantType][$eq]=${consultantType}&populate=*`);
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
    const response = await cachedFetch(`${STRAPI_URL}/api/consultants?filters[featured][$eq]=true&populate=*`);
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
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/resource-libraries?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch resource libraries: ${response.status}`);
    }
    const data: StrapiResponse<StrapiResourceLibrary> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching resource libraries:', error);
    return [];
  }
}

/**
 * Fetch resource library by slug from Strapi CMS
 */
export async function getResourceLibraryBySlug(slug: string): Promise<StrapiResourceLibrary | null> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/resource-libraries?filters[slug][$eq]=${slug}&populate=*`);
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
    const response = await cachedFetch(`${STRAPI_URL}/api/resource-libraries?filters[featured][$eq]=true&populate=*`);
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
    const response = await cachedFetch(`${STRAPI_URL}/api/resource-libraries?filters[resourceType][$eq]=${resourceType}&populate=*`);
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
  try {
    console.log('getBlogsByCategory: Searching for category:', category);
    // First try exact match
    let response = await cachedFetch(`${STRAPI_URL}/api/blogs?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs by category: ${response.status}`);
    }
    let data: StrapiResponse<StrapiBlog> = await response.json();
    
    // If no results, try case-insensitive search by fetching all and filtering
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
      trainingDays: course.trainingDays,
      duration: course.trainingDays ? `${course.trainingDays} ${pluralize(course.trainingDays, 'day')}` : undefined,
      courseFamily: course.courseFamily,
      categories: course.courseFamily ? [course.courseFamily] : [],
      status: course.status,
      schedule: course.schedule,
      learningObjectives: course.learningObjectives,
      targetAudience: course.targetAudience,
      hyperlink: course.hyperlink,
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
      image: training.images && training.images.length > 0 ? (training.images[0].url.startsWith('http') ? training.images[0].url : `${STRAPI_URL}${training.images[0].url}`) : undefined,
      date: date,
      trainingType: training.trainingType || 'other',
      categories: training.categories ? training.categories.map(cat => cat.name) : [],
      tags: training.tags ? training.tags.map(tag => tag.name) : [],
      draft: false,
      description: training.description,
      featured: training.featured,
      seoTitle: training.seoTitle,
      seoDescription: training.seoDescription,
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
    collection: "blog",
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
    const response = await cachedFetch(`${STRAPI_URL}/api/team-page?populate[members][fields][0]=name&populate[members][fields][1]=role&populate[members][populate][image][fields][0]=url&populate[members][populate][image][fields][1]=alternativeText`);
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

/**
 * Fetch all spotlights from Strapi CMS
 */
export async function getSpotlights(): Promise<StrapiSpotlight[]> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/spotlights?populate=*&sort=order:asc`);
    if (!response.ok) {
      throw new Error(`Failed to fetch spotlights: ${response.status}`);
    }
    const data: StrapiResponse<StrapiSpotlight> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching spotlights:', error);
    return [];
  }
}

/**
 * Fetch all news from Strapi CMS
 */
export async function getNews(): Promise<StrapiNews[]> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/news-items?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }
    const data: StrapiResponse<StrapiNews> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

/**
 * Fetch all testimonials from Strapi CMS
 */
export async function getTestimonials(): Promise<StrapiTestimonial[]> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/testimonials?populate=*&sort=order:asc`);
    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.status}`);
    }
    const data: StrapiResponse<StrapiTestimonial> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

/**
 * Fetch all books from Strapi CMS
 */
export async function getBooks(): Promise<StrapiBook[]> {
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/books?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`);
    }
    const data: StrapiResponse<StrapiBook> = await response.json();
    return data.data;
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
  photos: StrapiMedia[];
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
  try {
    const response = await cachedFetch(`${STRAPI_URL}/api/media-library?populate[sections][populate]=photos`);
    if (!response.ok) {
      throw new Error(`Failed to fetch media library: ${response.status}`);
    }
    const data: StrapiResponse<StrapiMediaLibrary> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching media library:', error);
    return null;
  }
}