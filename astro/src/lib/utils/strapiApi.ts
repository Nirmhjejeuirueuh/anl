// Strapi CMS API utilities for Astro integration

const STRAPI_URL = 'http://localhost:1337';

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
  excerpt?: string;
  description?: string;
  content?: string;
  instructor?: string;
  duration?: string;
  level?: string;
  categories?: string;
  tags?: string;
  publishedAt: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  moduleCode?: string;
  icon?: string;
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
    const response = await fetch(`${STRAPI_URL}/api/blogs?populate=image&fields=title,slug,author,categories,publishDate`);
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
 * Fetch all courses from Strapi CMS
 */
export async function getCourses(): Promise<StrapiCourse[]> {
  try {
    console.log('getCourses: Starting API call to Strapi');
    const response = await fetch(`${STRAPI_URL}/api/courses?populate=image&fields=title,slug,instructor,duration,level,categories,moduleCode,icon,description,excerpt,publishedAt`);
    console.log('getCourses: Response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status}`);
    }
    const data: StrapiResponse<StrapiCourse> = await response.json();
    console.log('getCourses: Received data:', data.data?.length || 0, 'courses');
    console.log('getCourses: Sample course slugs:', data.data?.slice(0, 3).map(c => ({ title: c.title, slug: c.slug })));
    return data.data;
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
    const response = await fetch(`${STRAPI_URL}/api/courses?filters[slug][$eq]=${slug}&populate=*`);
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
    const response = await fetch(`${STRAPI_URL}/api/courses?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*`);
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
 * Fetch blogs by category from Strapi CMS
 */
export async function getBlogsByCategory(category: string): Promise<StrapiBlog[]> {
  try {
    console.log('getBlogsByCategory: Searching for category:', category);
    // First try exact match
    let response = await fetch(`${STRAPI_URL}/api/blogs?filters[categories][$contains]=${encodeURIComponent(category)}&populate=*`);
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
      image: course.image ? `${STRAPI_URL}${course.image.url}` : undefined,
      date: date,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      categories: course.categories ? course.categories.split(',').map(cat => cat.trim()) : [],
      moduleCode: (course as any).moduleCode,
      icon: (course as any).icon,
      draft: false,
      excerpt: course.excerpt,
      description: course.description || course.excerpt,
      tags: course.tags ? course.tags.split(',').map(tag => tag.trim()) : [],
      featured: course.featured,
    },
    body: course.content || '',
    rendered: {
      html: course.content || '',
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
      image: blog.image ? `${STRAPI_URL}${blog.image.url}` : undefined,
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