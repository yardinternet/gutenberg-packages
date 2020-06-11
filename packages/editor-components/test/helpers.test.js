/**
 * Internal dependencies
 */
import { getSpacingUtilClass } from '../src/helpers.js';

describe( 'getSpacingUtilClass to return bootstrap utility classes', () => {
	test( 'should return m-md-5', () => {
		expect( getSpacingUtilClass( [ 'm', 'md', '5' ] ) ).toEqual( 'm-md-5' );
	} );

	test( 'should return m-5', () => {
		expect( getSpacingUtilClass( [ 'm', false, '5' ] ) ).toEqual( 'm-5' );
	} );

	test( 'should return pb-md-5', () => {
		expect( getSpacingUtilClass( [ 'pb', 'md', '5' ] ) ).toEqual(
			'pb-md-5'
		);
	} );

	test( 'should return negative margin mt-n3', () => {
		expect( getSpacingUtilClass( [ 'mt', false, '-3' ] ) ).toEqual(
			'mt-n3'
		);
	} );

	test( 'should return negative margin mt-n5', () => {
		expect( getSpacingUtilClass( [ 'mt', false, '-5' ] ) ).toEqual(
			'mt-n5'
		);
	} );
} );
