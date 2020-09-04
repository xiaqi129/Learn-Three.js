const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    // devtool: 'eval-source-map',
    // devtool: false,
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: '[name]bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
    devServer: {
        host: 'localhost',
        publicPath: '/',
        contentBase: path.resolve(__dirname, "src"),
        watchContentBase: true,
        compress: true,
        port: 9001,
        historyApiFallback: true,
    }
};