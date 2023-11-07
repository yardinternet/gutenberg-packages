/* eslint-disable */
module.exports = {
	preset: '@wordpress/jest-preset-default',
	collectCoverageFrom: [
		'packages/**/src/**/*.js',
		'!**/stories/**',
		'!**/node_modules/**',
		'!**/vendor/**',
	],
	moduleNameMapper: {
		'^@yardinternet/gutenberg-editor-components$':
			'<rootDir>/packages/editor-components/src/index.js',
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
