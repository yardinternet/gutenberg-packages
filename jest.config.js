const { defaults } = require( 'jest-config' );

module.exports = {
	...defaults,
	collectCoverageFrom: [
		'packages/**/src/**/*.js',
		'!**/stories/**',
		'!**/node_modules/**',
		'!**/vendor/**',
	],
};
