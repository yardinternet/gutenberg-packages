export async function getOpenPubItems(
	query = 'items/1',
	endpoint = `${ theme.openpubEndpoint }/wp-json/owc/openpub/v1/`
) {
	return fetchOWC( `${ endpoint }${ query }` );
}

export async function getPdcItems(
	query = 'items/1',
	endpoint = `${ theme.openpdcEndpoint }/wp-json/owc/pdc/v1/`
) {
	return fetchOWC( `${ endpoint }${ query }` );
}

export async function searchOpenpub(
	searchterm = '',
	endpoint = `${ theme.openpubEndpoint }/wp-json/wp/v2/openpub-item?search=`,
	extraQuery = '&per_page=10'
) {
	return fetchOWC( `${ endpoint }${ searchterm }${ extraQuery }` );
}

async function fetchOWC( query ) {
	try {
		const response = await fetch( query, {
			headers: getBasicAuth(),
		} );

		if ( ! response.ok ) {
			throw new Error( 'Error: could not fetch endpoint.' );
		}

		const data = await response.json();

		return data;
	} catch ( e ) {
		return false;
	}
}

/**
 * Return basic auth header when needed
 */
const getBasicAuth = () => {
	const authUsername = theme.acceptAuthUsername ?? null;
	const authPassword = theme.acceptAuthPassword ?? null;
	const isProd = theme.appEnv === 'production';
	const withBasicAuth = ! isProd && !! authUsername && !! authPassword;

	if ( ! withBasicAuth ) {
		return {};
	}

	return {
		Authorization: 'Basic ' + btoa( `${ authUsername }:${ authPassword }` ),
	};
};
