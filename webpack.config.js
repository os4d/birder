// const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const rel = path.resolve.bind(null, __dirname + "/src/birder/web/static/src/");
const relToNode = path.resolve.bind(null, __dirname + "/node_modules/");

const outputDir = rel("../dist");

// const outputDir = path.resolve.bind(null, __dirname + "/src/birder/web/static/dist/")();

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
    postcss: {
        loader: "postcss-loader",
        options: {
            sourceMap: WITH_CSS_SOURCEMAPS,
            minimize: IS_PRODUCTION,
            devtool: 'source-map'
            // plugins: function (loader) {
            //     return [
            //         autoprefixer({
            //             browsers: ["last 2 versions"]
            //         })
            //     ]
            // }
        }
    },
    sass: {
        loader: "sass-loader",
        options: {
            // indentedSyntax: true,
            sourceMap: WITH_CSS_SOURCEMAPS,
            minimize: IS_PRODUCTION,
            devtool: 'source-map',
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
    entry: {
        theme: "./common",
        charts: "./charts",
    },
    output: {
        path: outputDir,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss/,
                exclude: /node_modules/,

                use: [loaders.mini, loaders.css, loaders.postcss, loaders.sass]
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
        new CopyPlugin([
            {
                context: relToNode('cal-heatmap/'),
                from: 'cal-heatmap.js',
                to: outputDir
            },
            {
                context: relToNode('jquery.scrollto'),
                from: 'jquery.scrollTo.js',
                to: outputDir
            },

        ]),
        // new HtmlWebPackPlugin({
        //     template: "./src/index.html",
        //     filename: "./index.html"
        // })
    ]
}
