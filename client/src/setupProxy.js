const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://bulletboardnews.herokuapp.com', // target host
      changeOrigin: true, // needed for virtual hosted sites
      router: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        'dev.localhost:3000': 'http://localhost:3001',
      },
    })
  );
};