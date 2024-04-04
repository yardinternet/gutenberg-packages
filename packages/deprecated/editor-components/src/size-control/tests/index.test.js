/**
 * Internal dependencies
 */
import { limitValueByUnit, setMax } from '../helpers';

describe( 'size-control', () => {
	test( 'setMax', () => {
		expect( setMax( 1000, '%' ) ).toEqual( 100 );
	} );

	test( 'limitValueByUnit', () => {
		expect( limitValueByUnit( 1000, '%' ) ).toEqual( 100 );
	} );
} );
