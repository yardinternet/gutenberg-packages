/**
 * Internal dependencies
 */
import metadata from '../block.json';
import Save from '../components/save';

describe( 'basicTest', () => {
	test( 'Metadata should not change', () => {
		expect( metadata ).toMatchSnapshot();
	} );
} );

describe( 'checkOutput', () => {
	const props = {
		attributes: {
			size: 5,
			backgroundColor: '#FFF',
		},
	};
	test( 'Save output should not change', () => {
		expect( Save( props ) ).toMatchSnapshot();
	} );
} );
