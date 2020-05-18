module.exports = {
	collectCoverageFrom: [
		'packages/**/src/**/*.js',
		'!**/stories/**',
		'!**/node_modules/**',
		'!**/vendor/**',
	],
	transform: { '^.+\\.jsx?$': 'babel-jest' },
};
