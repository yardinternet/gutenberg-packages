/**
 * Internal dependencies
 */
import { backgroundAttributes } from '../attributes';

describe( `backgroundControl settings`, () => {
	test( `attributes of backgroundControl should not change`, () => {
		expect( backgroundAttributes ).toMatchSnapshot();
	} );
} );
