/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import Cards from '../cards';
import Card from '../card';

describe( 'Cards', () => {
	test( 'render cards', () => {
		const tree = renderer
			.create(
				<Cards>
					<Card />
				</Cards>
			)
			.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'render cards with props', () => {
		const defaultAttributes = {
			overflowOnMobile: true,
			cardsEqualHeight: true,
		};

		const tree = renderer
			.create(
				<Cards attributes={ defaultAttributes } className="className">
					<Card />
				</Cards>
			)
			.toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
