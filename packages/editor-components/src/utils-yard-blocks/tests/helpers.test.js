import {
	getColorClassByColor,
	getBackgroundClassByColor,
} from '../../containers/withBackgroundClass';
import { pickRelevantMediaFiles } from '../helpers';

describe( 'getColorClassByColor', () => {
	const editorColorPallete = [
		{
			label: 'Primaire kleur',
			slug: 'primary',
			color: '#0293b0',
		},
		{
			label: 'Secondaire kleur',
			slug: 'secondary',
			color: '#3cccc6',
		},
		{
			label: 'Tertairy kleur',
			slug: 'tertiary',
			color: '#E8E7E8',
		},
		{
			label: 'White',
			slug: 'white',
			color: '#fff',
		},
	];

	test( 'should return the correct slug/class', () => {
		expect( getColorClassByColor( editorColorPallete, '#0293b0' ) ).toBe(
			'primary'
		);
	} );

	test( 'should return undefined when a slug/class is not found', () => {
		expect(
			getColorClassByColor( editorColorPallete, 'awesomecolor' )
		).toEqual( undefined );
	} );

	test( 'should return undefined when a slug/class is not found and color palette is undefined', () => {
		expect( getColorClassByColor( undefined, 'awesomecolor' ) ).toEqual(
			undefined
		);
	} );

	test( 'should return the correct background slug/class', () => {
		expect(
			getBackgroundClassByColor( editorColorPallete, '#E8E7E8' )
		).toBe( 'bg-tertiary' );
	} );

	test( 'should return undefined when a background slug/class is not found', () => {
		expect(
			getBackgroundClassByColor( editorColorPallete, 'awesomecolor' )
		).toEqual( undefined );
	} );

	const image = {
		sizes: {
			thumbnail: {
				height: 150,
				width: 150,
				url: 'test.jpg',
				orientation: 'landscape',
			},
			medium: {
				height: 77,
				width: 300,
				url: 'test.jpg',
				orientation: 'landscape',
			},
			large: {
				height: 261,
				width: 1024,
				url: 'test.jpg',
				orientation: 'landscape',
			},
			full: {
				url: 'test.jpg',
				height: 490,
				width: 1920,
				orientation: 'landscape',
			},
		},
		alt: '',
		id: 2132,
		link: 'test.jpg',
		caption: 'Test caption',
		url: 'test.jpg',
	};

	const imageSize = 'full';
	const imageProps = {
		alt: '',
		id: 2132,
		link: 'test.jpg',
		caption: 'Test caption',
		url: 'test.jpg',
	};

	test( 'return image object with chosen props', () => {
		expect( pickRelevantMediaFiles( image, imageSize ) ).toEqual(
			imageProps
		);
	} );
} );
