const path = require('path');
const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'), 
    require('postcss-nested'), 
    require('postcss-nested-import'),
    require('postcss-hexrgba'),
    require('autoprefixer')
    
]

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer: {
        /*Autorefresh on HTML changes*/
        before: function(app, server) {
            server._watch('./app/**/*.html')/*Checks for changes to any files ending in .html */
        },
        /*****************************/
        contentBase: path.join(__dirname, 'app'),
        hot:true,
        port: 3000,
        host: '0.0.0.0' /*Allow devices on the smame network to access the dev server. good for testing on smaller devices(tablets and smartphones). Need to visit: IPv4-address:3000*/
    },
    mode: 'development',
    /*devServer in now watching for changes so watch:true can be removed*/
    /*watch: true,*/
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
            }
        ]
    }
}