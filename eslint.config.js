const globals = require( 'globals' );
const wordpress = require( '@wordpress/eslint-plugin' );

module.exports = [
	{
		ignores: [
			'**/webpack.config.js',
			'**/__tests__/**/*.js',
			'**/tests/**/*.js',
			'**/build/*.js',
		],
	},
	...wordpress.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				theme: true,
				jsVars: true,
				google: true,
				MarkerClusterer: true,
				yardBlocks: true,
				jQuery: true,
			},
		},
		rules: {
			// @wordpress/* are WP-provided externals, not declared per package.
			'import/no-extraneous-dependencies': 'off',
			'import/no-unresolved': [ 'error', { ignore: [ '^@wordpress/' ] } ],
			// ESLint 9 changed the caughtErrors default from 'none' to 'all'.
			'no-unused-vars': [
				'error',
				{ ignoreRestSiblings: true, caughtErrors: 'none' },
			],
			'jest/expect-expect': 'off',
			'@wordpress/dependency-group': 'error',
			'@wordpress/i18n-translator-comments': 'off',
			'@wordpress/i18n-text-domain': 'off',
			'@wordpress/i18n-no-collapsible-whitespace': 'off',
			'@wordpress/i18n-no-placeholders-only': 'off',
			'@wordpress/i18n-no-variables': 'off',
			'@wordpress/i18n-ellipsis': 'off',
			'@wordpress/i18n-hyphenated-range': 'off',
			'jsdoc/check-access': 'off',
			'jsdoc/require-param': 'off',
			'jsdoc/check-param-names': 'off',
			'jsdoc/require-param-type': 'off',
			'jsdoc/check-property-names': 'off',
			'jsdoc/check-values': 'off',
			'jsdoc/empty-tags': 'off',
			'jsdoc/require-property': 'off',
			'jsdoc/require-property-description': 'off',
			'jsdoc/require-property-name': 'off',
			'jsdoc/require-property-type': 'off',
			'react-hooks/exhaustive-deps': 'off',
		},
	},
];
