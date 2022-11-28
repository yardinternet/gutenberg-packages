import { sources } from './__fixtures__/source-control';
import { formatOption, remoteExists } from '../components/source-type-control';

describe( 'sourceTypeControl', () => {
	const type = {
		id: 'pages',
		slug: 'pages',
		name: 'Pages',
	};

	const result = {
		value: '{"baseUrl":"https://www.valente.nl/wp-json/wp/v2/","title":"Valente","type":"Pages","slug":"pages"}',
		label: 'Valente: Pages',
	};

	test( 'formatOption', () => {
		expect( formatOption( sources[ 0 ], type ) ).toEqual( result );
	} );

	test( 'remoteExists', () => {
		const urls = [ { url: 'https://www.google.nl' } ];

		expect( remoteExists( urls, 'https://www.google.nl' ) ).toBeDefined();

		expect( remoteExists( urls, 'https://w.nl' ) ).toBeUndefined();
	} );
} );
