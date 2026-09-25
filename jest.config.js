/* eslint-disable */
module.exports = {
	preset: '@wordpress/jest-preset-default',
	collectCoverageFrom: [
		'packages/**/src/**/*.js',
		'!**/node_modules/**',
		'!**/vendor/**',
	],
	// ESM-only deps of @wordpress/*.
	transformIgnorePatterns: [ '/node_modules/(?!(uuid|marked)/)' ],
	moduleNameMapper: {
		'^@yardinternet/gutenberg-editor-components$':
			'<rootDir>/packages/deprecated/editor-components/src/index.js',
	},
	globals: {
		yardBlocks: {
			editorColorPalette: [
				{
					label: 'Primaire kleur',
					slug: 'primary',
					color: '#0293b0',
				},
				{
					label: 'Secondaire kleur',
					slug: 'secondary',
					color: '#3cccc6',
				},
				{
					label: 'Tertairy kleur',
					slug: 'tertiary',
					color: '#E8E7E8',
				},
				{
					label: 'White',
					slug: 'white',
					color: '#fff',
				},
			],
		},
	},
};
