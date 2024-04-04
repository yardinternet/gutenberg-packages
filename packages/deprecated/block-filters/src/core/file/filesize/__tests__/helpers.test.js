import { getFileDetails } from '../helpers';

describe( 'fetch', () => {
	const originalFetch = window.fetch;

	beforeEach( () => {
		window.fetch = jest.fn();
	} );

	afterAll( () => {
		window.fetch = originalFetch;
	} );

	test( 'should return 1MB filesize', async () => {
		window.fetch.mockReturnValue(
			Promise.resolve( {
				blob() {
					return {
						size: 1048576, // equals to 1MB
					};
				},
			} )
		);

		const fileSize = await getFileDetails( 'hidden href' );

		expect( fileSize ).toBe( '1 MB' );
	} );

	test( 'should return false with a empty href', async () => {
		const fileSize = await getFileDetails( '' );
		expect( fileSize ).toBe( false );
	} );

	test( 'should throw an error', async () => {
		window.fetch.mockRejectedValue();
		await expect( getFileDetails( 'REJECT' ) ).rejects.toThrow();
	} );
} );
