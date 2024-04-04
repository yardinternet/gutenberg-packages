/**
 * Internal dependencies
 */
import {
	filterNumber,
	getNegativeMargin,
	formatToNegativeNumber,
} from '../helpers';

describe( 'helpers', () => {
	test( 'FilterNumber to equal 5', () => {
		expect( filterNumber( 'mt-md-5' ) ).toEqual( 5 );
	} );

	test( 'FilterNumber to equal 0', () => {
		expect( filterNumber( 'mt-md-0' ) ).toEqual( 0 );
	} );

	test( 'FilterNumber with false should return 0', () => {
		expect( filterNumber( false ) ).toEqual( 0 );
	} );

	test( 'FilterNumber with n3 should return -3', () => {
		expect( filterNumber( 'mt-lg-n3' ) ).toEqual( -3 );
	} );

	test( 'getNegativeMargin should return the negative number value', () => {
		expect( getNegativeMargin( 'mt-mb-n5' ) ).toEqual( 5 );
	} );

	test( 'formatToNegativeNumber should return negative value of 3', () => {
		expect( formatToNegativeNumber( 3 ) ).toEqual( -3 );
	} );
} );
