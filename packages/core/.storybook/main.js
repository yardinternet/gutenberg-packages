const path = require( 'path' );

module.exports = {
	stories: [ '../src/**/*.stories.js' ],
	addons: [ '@storybook/addon-actions/register' ],
	webpackFinal: async ( config, { configType } ) => {
		config.module.rules.push( {
			test: /\.scss$/,
			use: [ 'style-loader', 'css-loader', 'sass-loader' ],
			include: path.resolve( __dirname, '../' ),
		} );

		return config;
	},
};
