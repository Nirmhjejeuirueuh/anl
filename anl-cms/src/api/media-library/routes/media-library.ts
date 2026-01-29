export default {
  routes: [
    {
      method: 'GET',
      path: '/media-library',
      handler: 'media-library.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/media-library',
      handler: 'media-library.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/media-library',
      handler: 'media-library.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};