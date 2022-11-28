/**
 * External dependencies
 */
import React from 'react'; // eslint-disable-line
import renderer from 'react-test-renderer';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { withBackground, getBackgroundPosition } from '../withBackground';

const backgroundAttributes = {
	bgImgUrl: {
		type: 'string',
	},
	bgSize: {
		type: 'string',
	},
	bgColor: {
		type: 'string',
	},
	bgRepeat: {
		type: 'string',
	},
	dimRatio: {
		type: 'number',
		default: 0,
	},
	focalPoint: {
		type: 'object',
	},
	backgroundFixed: {
		type: 'boolean',
		default: false,
	},
};

describe( 'withBackground', () => {
	test( 'should return all available properties', () => {
		const props = {
			attributes: {
				...backgroundAttributes,
				...{
					bgImgUrl: 'image.jpg',
					bgRepeat: 'no-repeat',
					dimRatio: 50,
					focalPoint: {
						x: 10,
						y: 10,
					},
					backgroundFixed: true,
				},
			},
		};

		const Component = withBackground()(
			( { styles, dimRatioClass, backgroundFixedClass } ) => (
				<div
					style={ styles }
					className={ classnames(
						dimRatioClass,
						backgroundFixedClass
					) }
				>
					WithBackground
				</div>
			)
		);

		const tree = renderer.create( <Component { ...props } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );
} );

describe( 'getBackgroundPosition', () => {
	test( 'should return false when { x: 0, y: 0 }  is given', () => {
		expect( getBackgroundPosition( { x: 0, y: 0 } ) ).toBe( null );
	} );

	test( 'should return { x: .5, y: .5 } when 50% 50%  is given', () => {
		expect( getBackgroundPosition( { x: 0.5, y: 0.5 } ) ).toBe( '50% 50%' );
	} );
} );
