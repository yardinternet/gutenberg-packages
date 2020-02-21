import React from 'react';
import renderer from 'react-test-renderer';
import Greeting from '../greeting';

const props = {
	attributes: {
		labelMorning: 'Goedemorgen',
		labelDay: 'Goedemiddag',
		labelNight: 'Goedenavond',
	},
	date: new Date( 'August 19, 1975 13:15:30' ),
};

describe( 'greeting default', () => {
	test( 'greeting should render column block with attributes', () => {
		const tree = renderer.create( <Greeting { ...props } /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'greeting should return goedenavond', () => {
		const tree = renderer
			.create(
				<Greeting
					{ ...{
						...props,
						...{ date: new Date( 'August 19, 1975 18:15:30' ) },
					} }
				/>
			)
			.toJSON();
		expect( tree ).toMatchSnapshot();
	} );

	test( 'greeting should return goedemorgen', () => {
		const tree = renderer
			.create(
				<Greeting
					{ ...{
						...props,
						...{ date: new Date( 'August 19, 1975 8:15:30' ) },
					} }
				/>
			)
			.toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
