export async function getOpenPubItems(
	query = 'items/1',
	endpoint = `${ theme.openpubEndpoint }/wp-json/owc/openpub/v1/`
) {
	return fetchOpenPub( `${ endpoint }${ query }` );
}

export async function searchOpenpub(
	searchterm = '',
	endpoint = `${ theme.openpubEndpoint }/wp-json/wp/v2/openpub-item?search=`,
	extraQuery = '&per_page=10'
) {
	return fetchOpenPub( `${ endpoint }${ searchterm }${ extraQuery }` );
}

async function fetchOpenPub( query ) {
	try {
		const response = await fetch( query );

		if ( ! response.ok ) {
			throw new Error( 'Error: could not fetch endpoint.' );
		}

		const data = await response.json();
		return data;
	} catch ( e ) {
		return false;
	}
}
