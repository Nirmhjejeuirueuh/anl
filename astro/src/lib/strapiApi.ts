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
    image: strapiMember.image ? `${STRAPI_URL}${strapiMember.image.url}` : "",
    leadershipTeam: false, // Not implemented yet
    social: {
      enable: false,
      list: []
    }
  };
}

export async function getTeamPage(): Promise<StrapiTeamPage | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/team-page?populate[members][populate]=*`);
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

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/team-members?populate[image][fields]=url&fields=name,role,slug,order`);
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

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/team-members?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
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