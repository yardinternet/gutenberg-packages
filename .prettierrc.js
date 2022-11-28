module.exports = {
	...require( '@wordpress/prettier-config' ),
	overrides: [
		{
			files: [ '*.scss', '*.css' ],
			options: {
				useTabs: true,
				printWidth: 80,
				singleQuote: true,
				trailingComma: 'es5',
				bracketSpacing: true,
				parenSpacing: true,
				jsxBracketSameLine: false,
				semi: true,
				arrowParens: 'always',
			},
		},
	],
};
