/**
 * Internal dependencies
 */
import { findElementById } from '../helpers';

describe( 'helpers', () => {
	const presetCollection = [
		{
			label: 'layout',
			items: [
				{
					id: 1,
					label: 'calltoaction',
				},
			],
		},
		{
			label: 'sidebar',
			items: [
				{
					id: 2,
					label: 'sidebar',
				},
			],
		},
	];

	test( 'should return preset by given id', () => {
		const result = {
			id: 2,
			label: 'sidebar',
		};
		expect( findElementById( presetCollection, 2 ) ).toEqual( result );
	} );

	test( 'should return undefined when no preset is found', () => {
		expect( findElementById( presetCollection, 0 ) ).toEqual( undefined );
	} );
} );
