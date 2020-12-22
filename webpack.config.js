const currentTask = process.env.npm_lifecycle_event; // determines whether you have run 'npm run dev' or 'npm run build'
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'), 
    require('postcss-nested'), 
    require('postcss-nested-import'),
    require('postcss-hexrgba'),
    require('autoprefixer')    
]

class RunAfterCompile {
   apply(compiler) {
    compiler.hooks.done.tap('Copy images', function() {
        fse.copySync('./app/assets/images', './docs/assets/images')    
    })
   } 
}

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader?url=false', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]
    }

//readdirSync returns all files in the folder
//Filter function will return an array with all the HTML files found.
let pages = fse.readdirSync("./app").filter(function(file) {
    return file.endsWith(".html")  
  }).map(function(page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`
    })
  })

let config = {
    entry: './app/assets/scripts/App.js',
    plugins: pages,
    module: {
        rules: [
            cssConfig
        ]
    }

};

if(currentTask == 'dev') {
    cssConfig.use.unshift('style-loader');/* myArray.unshift() adds an item to the beginning of an array*/
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
    //Backwards compatibility of javascript (install npm packages:"@babel/core": "^7.12.3", "@babel/preset-env": "^7.12.1", "babel-loader": "^8.1.0",)
    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    postCSSPlugins.push(require('cssnano'));
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    }

    config.mode = 'production'

    config.optimization = {
        splitChunks: {cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              enforce: true,
              chunks: "all"
            }
          }}
    }

    config.plugins.push(
        new CleanWebpackPlugin(), 
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()
        )

}

module.exports = config;