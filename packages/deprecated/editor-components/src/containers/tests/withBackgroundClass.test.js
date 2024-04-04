import React from 'react'; // eslint-disable-line
import renderer from 'react-test-renderer';
/**
 * Internal dependencies
 */
import { withBackgroundClass } from '../withBackgroundClass';

describe( 'withBackgroundClass', () => {
	test( 'withBackgroundClass, render with bg-primary class', () => {
		const settings = {
			attributes: {
				backgroundColor: '#0293b0',
			},
		};

		const Component = withBackgroundClass( 'backgroundColor' )(
			( props ) => (
				<div className={ props.backgroundColorClass }>Awesome</div>
			)
		);

		const tree = renderer.create( <Component { ...settings } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( 'withBackgroundClass, render without backgroundColorClass', () => {
		const settings = {
			attributes: {
				backgroundColor: 'red',
			},
		};

		const Component = withBackgroundClass( 'backgroundColor' )(
			( props ) => (
				<div className={ props.backgroundColorClass }>Awesome</div>
			)
		);

		const tree = renderer.create( <Component { ...settings } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );
} );
