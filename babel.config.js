// Babel needed for jest.config.js
module.exports = function ( api ) {
	api.cache( true );

	return {
		presets: [ '@babel/preset-env', '@wordpress/babel-preset-default' ],
		plugins: [
			'@wordpress/babel-plugin-import-jsx-pragma',
			'@babel/plugin-transform-runtime',
			'@babel/plugin-transform-class-properties',
		],
	};
};
