import { getCachedSvg, setCachedSvg, hasCachedSvg } from './svg-cache';

describe( 'svg-cache', () => {
	test( 'hasCachedSvg returns false for an uncached icon', () => {
		expect( hasCachedSvg( 'fa-solid', 'missing-icon' ) ).toBe( false );
	} );

	test( 'getCachedSvg returns undefined for an uncached icon', () => {
		expect( getCachedSvg( 'fa-solid', 'missing-icon' ) ).toBeUndefined();
	} );

	test( 'setCachedSvg stores an SVG and hasCachedSvg returns true', () => {
		setCachedSvg( 'fa-solid', 'house', '<svg>house</svg>' );
		expect( hasCachedSvg( 'fa-solid', 'house' ) ).toBe( true );
	} );

	test( 'getCachedSvg retrieves the stored SVG string', () => {
		setCachedSvg( 'fa-solid', 'star', '<svg>star</svg>' );
		expect( getCachedSvg( 'fa-solid', 'star' ) ).toBe( '<svg>star</svg>' );
	} );

	test( 'cache is keyed by set/name, different sets are stored separately', () => {
		setCachedSvg( 'fa-solid', 'heart', '<svg>solid-heart</svg>' );
		setCachedSvg( 'fa-brands', 'heart', '<svg>brands-heart</svg>' );
		expect( getCachedSvg( 'fa-solid', 'heart' ) ).toBe( '<svg>solid-heart</svg>' );
		expect( getCachedSvg( 'fa-brands', 'heart' ) ).toBe( '<svg>brands-heart</svg>' );
	} );
} );
