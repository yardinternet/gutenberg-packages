const path = require( 'path' );
const {
	gutenbergPackagesConfig,
} = require( '@yardinternet/gutenberg-webpack-loaders' );

const exclude = [
	'@yardinternet/gutenberg-cards',
	'@yardinternet/gutenberg-editor-components',
	'@yardinternet/gutenberg-google-maps',
];

const config = gutenbergPackagesConfig( { packages: exclude } );

module.exports = {
	...config,
	output: {
		filename: 'blocks.js',
		path: path.resolve( process.cwd(), '../assets/dist/js' ),
	},
};
