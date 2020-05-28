const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: {
        host: "http://localhost",
        port: process.env.PORT
      },
      changeOrigin: true,
    })
  );
};