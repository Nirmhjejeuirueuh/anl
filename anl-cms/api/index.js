const strapi = require('@strapi/strapi');

let strapiInstance;

module.exports = async (req, res) => {
  try {
    // Initialize Strapi if not already done
    if (!strapiInstance) {
      strapiInstance = strapi.createStrapi({
        distDir: './dist',
      });

      await strapiInstance.start();
    }

    // Handle the request
    await strapiInstance.server.app(req, res);
  } catch (error) {
    console.error('Strapi error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};