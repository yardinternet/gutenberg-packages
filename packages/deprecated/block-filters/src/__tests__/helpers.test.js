import { registerBlockFilters } from '../helpers';

const blockFilters = [
	{
		register: () => {},
		name: 'core/file/filesize',
	},
	{
		register: () => {},
		name: 'yard/any-block',
	},
];

const config = {
	'core/file/filesize': {
		prepend: '',
	},
	'core/button': {},
};

test( 'should return the core/file entry', () => {
	const expected = [ { name: 'core/file', register: () => {} } ];

	expect(
		registerBlockFilters( { blockFilters, config } ).toString()
	).toEqual( expected.toString() );
} );
