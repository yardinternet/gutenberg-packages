const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const isProduction = process.env.NODE_ENV === 'production';

const includePackages = [ '@yardinternet/gutenberg-editor-components' ].join( '|' );

const exclude = new RegExp( `/node_modules/(?!(${ includePackages })/).*/` );

/**
 * Include packages from node_modules that needs to be parsed
 * NOTE: the index of 1 is based on the webpack.config.js from the wp-scripts package
 */
defaultConfig.module.rules[ isProduction ? 0 : 1 ].exclude = exclude;

module.exports = {
	...defaultConfig,
};
