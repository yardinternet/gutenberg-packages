module.exports = function( api ) {
	api.cache( true );

	return {
		plugins: [ '@wordpress/babel-plugin-import-jsx-pragma' ],
		presets: [ '@wordpress/babel-preset-default' ],
	};
};
