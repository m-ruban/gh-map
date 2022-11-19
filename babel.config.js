module.exports = {
    presets: ['@babel/env', '@babel/react'],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/transform-arrow-functions',
        '@babel/proposal-object-rest-spread',
        ['babel-plugin-webpack-alias', { config: './webpack.config.js' }],
    ],
};
