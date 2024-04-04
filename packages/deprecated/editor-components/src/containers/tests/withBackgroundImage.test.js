import React from 'react'; // eslint-disable-line
import renderer from 'react-test-renderer';
/**
 * Internal dependencies
 */
import { withBackgroundImage } from './../withBackgroundImage';

describe( 'withBackgroundImage', () => {
	test( 'withBackgroundImage, render with background-image and no-repeat', () => {
		const settings = {
			attributes: {
				bgImgUrl: 'http://www.awesome.com/image.jpg',
				bgRepeat: 'no-repeat',
				bgSize: 'contain',
				bgPosition: 'center center',
			},
		};

		const Component = withBackgroundImage()( ( props ) => (
			<div style={ props.styles }>Should contain backgroundStyles</div>
		) );

		const tree = renderer.create( <Component { ...settings } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( "withBackgroundImage, render bgSize and don't override other styles ", () => {
		const settings = {
			attributes: {
				bgSize: 'contain',
			},
			styles: {
				color: 'red',
			},
		};

		const Component = withBackgroundImage()( ( props ) => (
			<div style={ props.styles }>Should contain backgroundStyles</div>
		) );

		const tree = renderer.create( <Component { ...settings } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );

	test( 'withBackgroundImage, bgPosition should be omitted', () => {
		const settings = {
			attributes: {
				bgSize: 'contain',
				bgPosition: undefined,
			},
		};

		const Component = withBackgroundImage()( ( props ) => (
			<div style={ props.styles }>Should contain backgroundStyles</div>
		) );

		const tree = renderer.create( <Component { ...settings } /> ).toJSON();

		expect( tree ).toMatchSnapshot();
	} );
} );
