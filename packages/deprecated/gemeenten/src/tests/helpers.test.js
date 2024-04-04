import { extractFromBlockAttributes } from '../helpers';

describe( 'ExtractFromAttributes', () => {
	const data = {
		label: {
			type: 'string',
			default: 'Awesome label',
		},
		value: {
			type: 'string',
			default: 'Awesome value',
		},
	};

	test( 'basic', () => {
		const expected = {
			label: 'Awesome label',
			value: 'Awesome value',
		};

		expect( extractFromBlockAttributes( data ) ).toEqual( expected );
	} );
} );
