import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsSectionInfo extends Struct.ComponentSchema {
  collectionName: 'components_elements_section_infos';
  info: {
    description: '';
    displayName: 'Section Info';
  };
  attributes: {
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MediaLibraryMediaItem extends Struct.ComponentSchema {
  collectionName: 'components_media_library_media_items';
  info: {
    description: 'A single media item with photo and caption';
    displayName: 'Media Item';
  };
  attributes: {
    caption: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface MediaLibraryMediaSection extends Struct.ComponentSchema {
  collectionName: 'components_media_library_media_sections';
  info: {
    description: 'A section containing multiple photos uploaded in bulk';
    displayName: 'Media Section';
  };
  attributes: {
    photos: Schema.Attribute.Media<'images', true>;
    stage: Schema.Attribute.Enumeration<['active', 'pastHighlights']>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServicesServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_services_service_cards';
  info: {
    description: '';
    displayName: 'Service Card';
  };
  attributes: {
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TestimonialsTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_testimonials_testimonial_items';
  info: {
    description: 'A single testimonial entry';
    displayName: 'Testimonial Item';
  };
  attributes: {
    companyLogo: Schema.Attribute.Media<'images'>;
    companyName: Schema.Attribute.String;
    fullStory: Schema.Attribute.Text;
    personName: Schema.Attribute.String;
    personRole: Schema.Attribute.String;
    role: Schema.Attribute.Enumeration<['partner', 'client']>;
    shortTestimonial: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.section-info': ElementsSectionInfo;
      'media-library.media-item': MediaLibraryMediaItem;
      'media-library.media-section': MediaLibraryMediaSection;
      'services.service-card': ServicesServiceCard;
      'testimonials.testimonial-item': TestimonialsTestimonialItem;
    }
  }
}
