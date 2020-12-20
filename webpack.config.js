const currentTask = process.env.npm_lifecycle_event; // determines whether you have run 'npm run dev' or 'npm run build'
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'), 
    require('postcss-nested'), 
    require('postcss-nested-import'),
    require('postcss-hexrgba'),
    require('autoprefixer')    
]

let config = {
    entry: './app/assets/scripts/App.js',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
            }
        ]
    }

};

if(currentTask == 'dev') {
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    }

    config.devServer = {
        /*Autorefresh on HTML changes*/
        before: function(app, server) {
            server._watch('./app/**/*.html')/*Checks for changes to any files ending in .html */
        },
        /*****************************/
        contentBase: path.join(__dirname, 'app'),
        hot:true,
        port: 3000,
        host: '0.0.0.0' /*Allow devices on the smame network to access the dev server. good for testing on smaller devices(tablets and smartphones). Need to visit: IPv4-address:3000*/
    }

    config.mode = 'development'
    /*devServer is now watching for changes so watch:true can be removed*/
    /*watch: true,*/
}

if(currentTask == 'build') {
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    }

    config.mode = 'production'

    config.optimization = {
        splitChunks: {chunks: 'all'}
    }

}

module.exports = config;