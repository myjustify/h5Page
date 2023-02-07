const port = 8080 // dev port
module.exports = {
    publicPath: '/h5Page',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: port,
        // open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api/': {
                target: 'http://10.0.161.70:9980/v1/', // API服务器的地址
                ws: true, // 代理websockets
                changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
                pathRewrite: {
                    // '^/api'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api' 转接为 http://localhost:8081/
                    '^/api': ''
                }
            }
        }
    },
}