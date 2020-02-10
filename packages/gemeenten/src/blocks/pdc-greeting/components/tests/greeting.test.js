import React from 'react';
import renderer from 'react-test-renderer';
import Greeting from '../greeting';

const props = {
	attributes: {
		labelMorning: 'Goedemorgen',
		labelDay: 'Goedemiddag',
		labelNight: 'Goedenavond',
	},
};

describe( 'greeting', () => {
	test( 'greeting should render column block with attributes', () => {
		const tree = renderer.create( <Greeting { ...props } /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
