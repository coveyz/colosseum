const path = require('path');
const htmlWebpckPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = (dir) => {
	return path.resolve(__dirname, dir);
};

module.exports = {
	entry: resolve('./src/index.js'),
	output: {
		path: resolve('./dist'),
		filename: 'index.js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
			},
		],
	},
	plugins: [
		new htmlWebpckPlugin({
			template: resolve('./src/index.html'),
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
	],
};
