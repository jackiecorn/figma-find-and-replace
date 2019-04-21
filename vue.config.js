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
		}
	}
};
