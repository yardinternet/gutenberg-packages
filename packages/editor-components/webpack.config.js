const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
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
