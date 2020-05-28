const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'bulletboardnews.herokuapp.com',
      changeOrigin: true,
    })
  );
};