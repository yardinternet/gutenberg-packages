/**
 * External dependencies
 */
import React from 'react'; // eslint-disable-line
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import { attributes } from '../block';
import Column from '../components/column';

const props = {
	style: { backgroundColor: 'red' },
	classNames: [ 'example_one', 'example_two' ],
	innerStyles: { color: 'blue' },
	innerClassName: [ 'inner_example_one', 'inner_example_two' ],
	children: null,
};

describe( 'basic', () => {
	test( 'column, classes should not change', () => {
		expect( attributes ).toMatchSnapshot();
	} );

	test( 'column, should render column block with attributes', () => {
		const tree = renderer.create( <Column { ...props } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( 'column, should render column block with child', () => {
		const tree = renderer.create( <Column> Child </Column> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );
} );
