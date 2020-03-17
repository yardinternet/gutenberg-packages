import { registerBlockFilters } from '../helpers';

const blockFilters = [
	{
		register: () => {},
		name: 'core/file',
	},
	{
		register: () => {},
		name: 'yard/any-block',
	},
];

const config = {
	'core/file': {
		blaat: true,
	},
	'core/button': {
		blaat: true,
	},
};

test( 'should return the core/file entry', () => {
	const expected = [ { name: 'core/file', register: () => {} } ];

	expect(
		registerBlockFilters( { blockFilters, config } ).toString()
	).toEqual( expected.toString() );
} );

test( 'should return empty array', () => {
	expect( registerBlockFilters( { blockFilters: [], config: {} } ) ).toEqual(
		[]
	);
} );
