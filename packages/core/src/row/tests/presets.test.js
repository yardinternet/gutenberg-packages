/**
 * Internal dependencies
 */
import { preset } from '../layout/presets';
import { filterPresetByLayoutIDs } from '../layout';

jest.mock( '../hooks', () => ( {
	filteredPreset: {},
} ) );

describe( 'filterPresetByLayoutIDs', () => {
	test( 'Preset should not be modified', () => {
		const expected = preset;

		const result = filterPresetByLayoutIDs( preset, [] );
		expect( expected ).toEqual( result );
	} );

	test( 'Preset should return the filtered preset', () => {
		const customPreset = {
			1: {
				layouts: {
					desktop: [
						{
							id: 'col-1-desktop-full-width',
							classNames: [ 'col-1-desktop-full-width' ],
							col: 1,
						},
						{
							id: 'col-1-desktop-full-width-centered',
							classNames: [ 'col-1-desktop-full-width-centered' ],
							col: 1,
						},
					],
					mobile: [
						{
							id: 'col-1-mobile-full-width',
							classNames: [ 'col-1-mobile-full-width' ],
							col: 1,
						},
					],
				},
			},
		};

		const result = filterPresetByLayoutIDs( customPreset, [
			'col-1-mobile-full-width',
			'col-1-desktop-full-width-centered',
		] );
		const expected = {
			1: {
				layouts: {
					desktop: [
						{
							id: 'col-1-desktop-full-width-centered',
							classNames: [ 'col-1-desktop-full-width-centered' ],
							col: 1,
						},
					],
					mobile: [
						{
							id: 'col-1-mobile-full-width',
							classNames: [ 'col-1-mobile-full-width' ],
							col: 1,
						},
					],
				},
			},
		};

		expect( expected ).toEqual( result );
	} );
} );
