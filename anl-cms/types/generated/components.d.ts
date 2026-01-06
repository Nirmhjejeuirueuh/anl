import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsCompanyInfo extends Struct.ComponentSchema {
  collectionName: 'components_elements_company_infos';
  info: {
    description: '';
    displayName: 'Company Info';
  };
  attributes: {
    mission: Schema.Attribute.Component<'elements.section-info', false>;
    values: Schema.Attribute.Component<'elements.section-info', false>;
    vision: Schema.Attribute.Component<'elements.section-info', false>;
  };
}

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

export interface ElementsTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_elements_team_members';
  info: {
    description: 'Individual team member information';
    displayName: 'Team Member';
  };
  attributes: {
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.company-info': ElementsCompanyInfo;
      'elements.section-info': ElementsSectionInfo;
      'elements.team-member': ElementsTeamMember;
    }
  }
}
