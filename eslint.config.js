const yard = require( '@yardinternet/eslint-config' );

module.exports = [
	{
		ignores: [
			'**/webpack.config.js',
			'**/__tests__/**/*.js',
			'**/tests/**/*.js',
			'**/build/*.js',
		],
	},
	...yard,
	{
		languageOptions: {
			globals: {
				theme: true,
				google: true,
				MarkerClusterer: true,
				yardBlocks: true,
				jQuery: true,
			},
		},
		rules: {
			// ESLint 9 changed the caughtErrors default from 'none' to 'all'.
			'no-unused-vars': [
				'error',
				{ ignoreRestSiblings: true, caughtErrors: 'none' },
			],
			'@wordpress/dependency-group': 'error',
			'@wordpress/i18n-text-domain': 'off',
			'@wordpress/i18n-translator-comments': 'off',
			'@wordpress/i18n-hyphenated-range': 'off',
			'@wordpress/i18n-ellipsis': 'off',
			'@wordpress/i18n-no-collapsible-whitespace': 'off',
			'jsdoc/check-param-names': 'off',
			'react-hooks/exhaustive-deps': 'off',
		},
	},
];
