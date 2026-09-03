/**
 * Internal dependencies
 */
const gutenbergPackagesConfig = require( './deprecated' );
const packageExclude = require( './packageExclude' );
const scriptRule = require( './scriptRule' );

/**
 * Transpile @yardinternet/gutenberg-* packages, which ship unbuilt JSX.
 *
 * @param {Object}   config   - defaultConfig of @wordpress/scripts
 * @param {string[]} packages
 * @return {Object} config
 */
const addPackagesToConfig = ( config, packages = [] ) => {
	if ( packages.length > 0 ) {
		scriptRule( config ).exclude = packageExclude( packages );
	}

	return { ...config };
};

module.exports = {
	addPackagesToConfig,
	gutenbergPackagesConfig,
};
