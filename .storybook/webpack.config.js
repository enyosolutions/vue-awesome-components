const path = require('path')
const rootPath = path.resolve(__dirname, '../src')

module.exports = ({ config }) => {
    config.resolve.alias['@'] = rootPath
    config.resolve.alias['~'] = rootPath
    config.resolve.alias['vue-enyo-components'] = rootPath


    config.module.rules.push({
        test: /\.scss$/,
        use: [
            'vue-style-loader',
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    data: `
                    @import "@/assets/css/font-awesome.min.css";
                    @import "bootstrap/dist/css/bootstrap.min.css";
                    @import "@/assets/css/bootstrap-theme.min.css";
                    @import "@/main.scss";
                    .btn-simple {
                        @extend .btn-primary !optional
                    }
                    `
                }
            }
        ],
    })

    config.module.rules.push({
        test: /\.svg$/,
        use: [
            'svg-sprite-loader',
            'svgo-loader'
        ]
    })



    return config
}