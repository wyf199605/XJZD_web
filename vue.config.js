const path = require('path');

module.exports = {
    publicPath: './',
    pluginOptions: {
        // 在scss每个文件下自动导入scss辅助方法
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, 'src/style/helper/index.scss')
            ]
        }
    },
    configureWebpack: {}
};