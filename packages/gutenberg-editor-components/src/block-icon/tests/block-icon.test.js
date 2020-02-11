/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import BlockIcon from '../';

describe( 'Blockicon basic', () => {
	it( 'basic test', () => {
		const tree = renderer.create( <BlockIcon /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	it( 'BlockIcon, pass faClasses', () => {
		const tree = renderer
			.create( <BlockIcon faClasses="fa-icon" /> )
			.toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	it( 'BlockIcon, add marginRight property', () => {
		const tree = renderer
			.create( <BlockIcon faClasses="fa-icon" marginRight={ true } /> )
			.toJSON();

		expect( tree ).toMatchSnapshot();
	} );
} );
