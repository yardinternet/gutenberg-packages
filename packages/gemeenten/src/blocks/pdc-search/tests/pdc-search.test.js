/**
 * Internal dependencies
 */
import metadata from '../block.json';

describe( 'basic tests', () => {
	test( 'metadata should not change', () => {
		expect( metadata ).toMatchSnapshot();
	} );
} );
