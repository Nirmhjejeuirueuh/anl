// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    const adminCount = await strapi.query('admin::user').count();

    if (adminCount === 0) {
      console.log('No admin user found - creating super admin...');

      const superAdminRole = await strapi.query('admin::role').findOne({
        where: { code: 'strapi-super-admin' },
      });

      if (!superAdminRole) {
        console.log('Super Admin role missing - this should not happen');
        return;
      }

      await strapi.service('admin::user').create({
        firstname: 'Super',
        lastname: 'Admin',
        email: 'kavinthad03@gmail.com',  // CHANGE THIS to your email
        password: 'Test@123',   // CHANGE THIS to a strong password
        roles: [superAdminRole.id],
        isActive: true,
      });

      console.log('Super admin created successfully!');
    }
  },
};
