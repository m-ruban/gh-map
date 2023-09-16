const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPluginPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const rootPath = path.resolve(__dirname, 'src');
const entryPath = path.resolve(rootPath, 'index.js');
const outputPath = path.resolve(__dirname, 'dist');
const modeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    entry: {
        main: entryPath,
    },
    mode: modeEnv,
    output: {
        filename: modeEnv === 'development' ? '[name].js' : '[name]-[chunkhash].js',
        path: outputPath,
        publicPath: '/',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 8000,
        historyApiFallback: true,
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8000',
        },
    },
    resolve: {
        alias: {
            root: path.resolve(__dirname, 'src/'),
            map: path.resolve(__dirname, 'src/Map'),
            ['side-bar']: path.resolve(__dirname, 'src/SideBar'),
        },
        extensions: ['.js', '.jsx', '.js', '.json', '.svg', '.gif', '.jpg', '.less', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|otf|svg|gif|jpe?g)$/,
                use: ['url-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)?$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            inject: true,
        }),
        new CopyPluginPlugin({
            patterns: [
                { from: 'public/fonts', to: 'fonts' },
                { from: 'public/icons', to: 'icons' },
                { from: 'public/images', to: 'images' },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            cacheGroups: {
                gg: {
                    name: 'gg',
                    test: (entry) => entry.context && entry.context.match(/gg-ukit/),
                    chunks: 'all',
                    priority: 4,
                },
                pixi: {
                    name: 'pixi',
                    test: (entry) => {
                        return entry.context && entry.context.match(/@pixi/);
                    },
                    chunks: 'all',
                    priority: 3,
                },
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'all',
                    priority: 2,
                },
            },
        },
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined,
};
