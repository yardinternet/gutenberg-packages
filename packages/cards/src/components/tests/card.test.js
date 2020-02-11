/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import Card from '../card';

describe( 'Card', () => {
	test( 'render card', () => {
		const tree = renderer.create( <Card /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'render card with props', () => {
		const styles = {
			color: 'red',
		};

		const tree = renderer
			.create(
				<Card
					innerCardClass="innerClass"
					className="className"
					styles={ styles }
				/>
			)
			.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'render card with children', () => {
		const tree = renderer
			.create(
				<Card>
					<p>Paragraph</p>
				</Card>
			)
			.toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
