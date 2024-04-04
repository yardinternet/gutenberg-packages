module.exports = function ( api ) {
	api.cache( true );

	return {
		plugins: [
			'@wordpress/babel-plugin-import-jsx-pragma',
			'@babel/plugin-transform-react-jsx',
		],
		presets: [ '@wordpress/babel-preset-default' ],
	};
};
