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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.section-info': ElementsSectionInfo;
      'services.service-card': ServicesServiceCard;
    }
  }
}
