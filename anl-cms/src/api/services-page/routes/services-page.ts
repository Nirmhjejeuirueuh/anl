export default {
  routes: [
    {
      method: 'GET',
      path: '/services-page',
      handler: 'services-page.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/services-page',
      handler: 'services-page.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/services-page',
      handler: 'services-page.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};