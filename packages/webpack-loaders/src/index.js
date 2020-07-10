const isProduction = process.env.NODE_ENV === 'production';
/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
/**
 * External dependencies
 */
const includePackages = require( '@yardinternet/webpack-include-packages' );

/**
 * Webpack loader that extends defaultConfig of @wordpress/scripts
 * Supports css, fonts, images
 *
 * @param {Array} packages
 * @return {Object} config
 */
const gutenbergPackagesConfig = ( { packages = [] } ) => {
	defaultConfig.module.rules[
		isProduction ? 0 : 1
	].exclude = includePackages( packages );
	return {
		...defaultConfig,
		module: {
			...defaultConfig.module,
			rules: [
				...defaultConfig.module.rules,
				{
					test: /\.css$/,
					use: [ 'style-loader', 'css-loader' ],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf|png|jpg|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							// With file loader which copies file
							// and brings in URL to the file
							loader: 'file-loader',
							options: {
								name: '[name]-[hash:6].[ext]',
								outputPath: 'assets/',
							},
						},
					],
				},
			],
		},
	};
};

module.exports = {
	gutenbergPackagesConfig,
};
