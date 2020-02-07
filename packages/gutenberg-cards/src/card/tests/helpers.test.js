/**
 * Internal dependencies
 */
import { getCardWidth, getTemplate } from '../helpers';
import { TEMPLATE } from '../templates';

describe( 'getCardWidth', () => {
	test( 'should return cardWidth of 33.33', () => {
		expect( getCardWidth( 3 ) ).toBe( 33.333333333333336 );
	} );

	test( 'should return cardWith of 100', () => {
		expect( getCardWidth( 1 ) ).toBe( 100 );
	} );
} );

describe( 'getTemplate', () => {
	test( 'should return template value', () => {
		expect( getTemplate( 'default' ) ).toEqual( TEMPLATE.pop() );
	} );

	test( 'should return null', () => {
		expect( getTemplate( 'null' ) ).toEqual( undefined );
	} );
} );
