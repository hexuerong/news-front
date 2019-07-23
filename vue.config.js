module.exports = {
    devServer: {
        open: true, //配置自动启动浏览器
        port: 8080,
        proxy: {
            '^/api': {
                target: 'http://localhost:8090',
                ws: true,
                changeOrigin: true
            },
        }
    }
}