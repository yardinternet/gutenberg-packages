/**
 * Internal dependencies
 */
import { attributes, name } from '../settings';

describe( `column settings`, () => {
	test( `block name of ${ name } should not change`, () => {
		expect( name ).toMatchSnapshot();
	} );

	test( `attributes of ${ name } should not change`, () => {
		expect( attributes ).toMatchSnapshot();
	} );
} );
