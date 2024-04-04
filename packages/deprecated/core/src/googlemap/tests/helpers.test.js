/**
 * Internal dependencies
 */
import { getGoogleMapBlockSettings } from '../helpers';

describe( 'helpers', () => {
	const settings = { settings: { google_map_api_key: '' } };

	test( 'should return default values', () => {
		expect( getGoogleMapBlockSettings() ).toEqual( settings );
	} );

	test( 'should add new custom property', () => {
		const newSettings = {
			settings: { color: 'red', google_map_api_key: 'key' },
		};

		expect( getGoogleMapBlockSettings( newSettings ) ).toEqual(
			newSettings
		);
	} );
} );
