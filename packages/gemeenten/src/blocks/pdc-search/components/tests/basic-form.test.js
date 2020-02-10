import React from 'react';
import renderer from 'react-test-renderer';
import BasicForm from '../basic-form';

describe( 'basic form', () => {
	test( 'component should not change', () => {
		const tree = renderer.create( <BasicForm label="Label" /> ).toJSON();
		expect( tree ).toMatchSnapshot();
	} );
} );
