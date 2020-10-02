const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const rel = path.resolve.bind(null, __dirname + "/src/birder/web/static/src/");
const relToNode = path.resolve.bind(null, __dirname + "/node_modules/");
const outputDir = rel("../dist");
const VERSION = require("./package.json").version;
WITH_CSS_SOURCEMAPS = true;
IS_PRODUCTION = false;

const loaders = {
    style: {
        loader: "style-loader",
        options: {
            hmr: true
        }
    },
    css: {
        loader: "css-loader",
        options: {
            modules: false,
            importLoaders: 1,
            sourceMap: WITH_CSS_SOURCEMAPS,
            // minimize: IS_PRODUCTION,
            // devtool: 'source-map',
        },
    },
    sass: {
        loader: "sass-loader",
        options: {
            // indentedSyntax: true,
            sourceMap: WITH_CSS_SOURCEMAPS,
            devtool: 'source-map',
            // minimize: IS_PRODUCTION,
            // includePaths: [path.resolve(__dirname, "./src")]
        }
    },
    mini: {
        loader: MiniCssExtractPlugin.loader,
        options: {}
    }
};

module.exports = {
    context: rel("."),
    mode: 'production',
    entry: {
        d3: "d3/d3.js",
        theme: "./common",
        charts: "./charts",
    },
    optimization: {
        minimize: false
    },
    output: {
        path: outputDir,
    },
    resolve: {
        modules: [path.resolve(__dirname), 'node_modules'],
        // alias: {
        //     Utilities: path.resolve(__dirname, 'src/utilities/'),
        // }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss/,
                // exclude: /node_modules/,

                use: [loaders.mini, loaders.css, loaders.sass]
            },
            {
                test: /\.css$/,
                use: [loaders.mini, loaders.css]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: IS_PRODUCTION ? '[name].[hash].css' : '[name].css',
            chunkFilename: IS_PRODUCTION ? '[id].[hash].css' : '[id].css'
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin(
            {
                patterns: [
                    {from: relToNode('cal-heatmap/cal-heatmap.js'), to: 'cal-heatmap.js'},
                    {from: relToNode('jquery.scrollto/jquery.scrollTo.js'), to: 'jquery.scrollTo.js'},
                    {from: relToNode('dragsort/dist/js/jquery.dragsort.min.js'), to: 'jquery.dragsort.min.js'},
                ],
            }
        ),
        // new HtmlWebPackPlugin({
        //     template: "./src/index.html",
        //     filename: "./index.html"
        // })
    ]
}
