import React from 'react'; // eslint-disable-line
import renderer from 'react-test-renderer';
/**
 * Internal dependencies
 */
import metadata from '../block.json';
import Alert from './../components/alert';

const props = {
	attributes: {
		alertType: 'alert alert-warning',
	},
};

describe( 'basic tests', () => {
	test( 'metadata should not change', () => {
		expect( metadata ).toMatchSnapshot();
	} );

	test( 'should render alert component', () => {
		const tree = renderer.create( <Alert { ...props } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( 'should render alert component with children', () => {
		const tree = renderer
			.create(
				<Alert { ...props }>
					<p>Alert</p>
				</Alert>
			)
			.toJSON();

		expect( tree ).toMatchSnapshot();
	} );
} );
