/**
 * External dependencies
 */
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import Blockappender from '../block-appender';

describe( 'Cards', () => {
	test( 'blockappender', () => {
		const tree = renderer.create( <Blockappender /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
