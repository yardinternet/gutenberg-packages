/**
 * Script rule of a @wordpress/scripts config, found by `test` as its index shifts
 * between development and production.
 *
 * @param {Object} config
 * @return {Object} rule
 */
const scriptRule = ( config ) => {
	const rule = config.module?.rules?.find( ( { test } ) =>
		test?.test?.( 'file.jsx' )
	);

	if ( ! rule ) {
		throw new Error(
			'@yardinternet/gutenberg-webpack-loaders: no script rule found in the webpack config.'
		);
	}

	return rule;
};

module.exports = scriptRule;
