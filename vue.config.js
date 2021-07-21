// const path = require('path')

// const resolve = dir => {
//     return path.join(__dirname, dir)
// }

module.exports = {
    //   baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',  3.0baseUrl被废除，publicPath替代


    // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // // 输出文件目录
    // outputDir: 'dist',
    // // eslint-loader 是否在保存的时候检查
    // lintOnSave: 'error',
    // // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // assetsDir: 'static',
    // devServer: {
    //     port: 8090, // 端口号
    //     host: 'localhost',
    //     https: false, // https:{type:Boolean}
    //     open: true, // 配置自动启动浏览器
    //     overlay: { // 让浏览器 overlay 同时显示警告和错误
    //         warnings: true,
    //         errors: true
    //     },
    //     open: false, // 是否打开浏览器
    //     host: '0.0.0.0',
    //     port: '8080',
    //     https: false,
    //     hotOnly: false, // 热更新
    // },
    // // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
    // productionSourceMap: ['production', 'prod'].includes(process.env.NODE_ENV),

    // chainWebpack: config => {
    //     config.resolve.alias
    //         .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    //         .set('_c', resolve('src/components'))
    // },
    // runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本



    publicPath: "./",
    devServer: {
        // 设置代理
        proxy: {
            '/api': {
                target: ' http://192.168.0.126:8150',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
        }
    }

}

