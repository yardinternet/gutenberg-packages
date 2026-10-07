const scriptRule = require( '../src/scriptRule' );

describe( 'scriptRule', () => {
	it( 'skips the source-map-loader pre rule', () => {
		const babelRule = { test: /\.(j|t)sx?$/, use: [ 'babel-loader' ] };
		const config = {
			module: {
				rules: [
					{
						test: /\.(j|t)sx?$/,
						use: 'source-map-loader',
						enforce: 'pre',
					},
					babelRule,
				],
			},
		};

		expect( scriptRule( config ) ).toBe( babelRule );
	} );
} );
