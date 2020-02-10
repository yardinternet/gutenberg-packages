module.exports = function( api ) {
	api.cache( true );

	const presets = [ '@wordpress/default' ];
	const plugins = [ '@babel/plugin-transform-react-jsx' ];

	return {
		presets,
		plugins,
	};
};
