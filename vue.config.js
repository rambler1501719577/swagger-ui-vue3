const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 8080,
        open: true,
        proxy: {
            '/api1': {
                target: 'http://localhost:8889',
                changeOrigin: true,
                pathRewrite: {
                    '^/api1': '/'
                }
            },
            '/api2': {
                target: 'http://localhost:8001',
                changeOrigin: true,
                pathRewrite: {
                    '^/api2': '/'
                }
            }
        }
    }
})
