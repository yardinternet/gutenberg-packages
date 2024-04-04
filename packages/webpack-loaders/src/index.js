/**
 * Internal dependencies
 */
const gutenbergPackagesConfig = require( './deprecated' );

/**
 * External dependencies
 */
const includePackages = require( '@yardinternet/webpack-include-packages' );

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Add @yardinternet/gutenberg-* packages to the webpack @wordpress/scripts config.
 *
 * @param {Object} config   - defaultConfig of @wordpress/scripts
 * @param {Array}  packages - array of packages to include
 */
const addPackagesToConfig = ( config, packages = [] ) => {
	config.module.rules[ isProduction ? 0 : 1 ].exclude =
		includePackages( packages );
	return {
		...config,
	};
};

module.exports = {
	addPackagesToConfig,
	gutenbergPackagesConfig,
};
