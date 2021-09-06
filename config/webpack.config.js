const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const ROOT_DIRECTORY = path.join(__dirname, '../');
const PUBLIC_DIRECTORY = path.join(ROOT_DIRECTORY, 'public');

const config = {
	entry: [path.resolve(ROOT_DIRECTORY, 'src/index.js')],
	output: {
		path: path.resolve(ROOT_DIRECTORY, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	mode: 'development',
	resolve: {
		modules: [path.resolve('node_modules'), 'node_modules'],
	},
	performance: {
		hints: false,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(PUBLIC_DIRECTORY, 'index.html'),
		}),
		new FaviconsWebpackPlugin(path.resolve(PUBLIC_DIRECTORY, 'logo.png')),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif|pdf)$/,
				use: ['file-loader'],
			},
		],
	},
};
module.exports = config;
