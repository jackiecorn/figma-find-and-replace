const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
	filenameHashing: false,
	productionSourceMap: false,
	chainWebpack: config => {
		config.plugins.delete('html');
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');
	},
	configureWebpack: {
		optimization: {
			namedChunks: true
		},
		output: {
			jsonpFunction: 'findAndReplace'
		},
		plugins: [
			new CopyWebpackPlugin([
				{
					from: './src/contentScript.js',
					to: 'js'
				}
			]),
			new ZipPlugin({
				path: '..',
				filename: 'extension.zip'
			})
		]
	}
};
