module.exports = {
	preset: '@wordpress/jest-preset-default',
	collectCoverageFrom: [
		'packages/**/src/**/*.js',
		'!**/stories/**',
		'!**/node_modules/**',
		'!**/vendor/**',
	],
};
