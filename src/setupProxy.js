const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/gateway', { 
        target: 'https://dev7a.ihr360.com',
        "changeOrigin": true,
    }));
    app.use(proxy('/web/gateway', { 
        target: 'https://dev7a.ihr360.com',
        "changeOrigin": true, 
    }));
    app.use(proxy('/api/gateway', { 
        target: 'https://dev7a.ihr360.com',
        "changeOrigin": true, 
    }))
};
