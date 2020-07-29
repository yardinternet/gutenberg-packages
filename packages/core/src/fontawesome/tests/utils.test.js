/**
 * Internal dependencies
 */
import { createIconsArray } from '../utils';

describe( 'basic tests', () => {
	test( 'function must return a array with icon objects in it', () => {
		const icons = {
			fab: [ 'internet-explorer', 'bitcoin' ],
			fal: [ 'ad', 'adversal' ],
		};

		const expected = [
			{ visual: 'internet-explorer', name: 'internet-explorer', type: 'fab' },
			{ visual: 'bitcoin', name: 'bitcoin', type: 'fab' },
			{ visual: 'ad', name: 'ad', type: 'fal' },
			{ visual: 'adversal', name: 'adversal', type: 'fal' },
		];

		expect( createIconsArray( icons ) ).toStrictEqual( expected );
	} );
} );
