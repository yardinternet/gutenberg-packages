/**
 * Use FontAwesome API to search for icons
 *
 * @param {string} search - The value to search for icons.
 *
 * @see https://fontawesome.com/docs/apis/graphql/query-fields#search-icon
 * @see https://fontawesome.com/docs/apis/graphql/objects#icon
 * @see https://fontawesome.com/docs/apis/graphql/objects#familystylesbylicense
 * @see https://fontawesome.com/docs/apis/graphql/objects#familystyle
 */
export const getFontAwesomeIcons = async ( search ) => {
	const query = `{ search(version: "6.x", first: 100, query: "${ search }")
		{
			id
			familyStylesByLicense {
				free {
					family
					style
				}
				pro {
					family
					style
				}
			}
		}
	}`;

	try {
		const res = await fetch( 'https://api.fontawesome.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify( { query } ),
		} );

		const data = res.json();
		return data;
	} catch ( error ) {
		throw new Error( error );
	}
};

/**
 * Fetch all registered icon sets from the wp-icons REST API.
 *
 * @param {AbortSignal} [signal] - AbortController signal to cancel the request.
 *
 * @return {Promise<Object>} Map of set name to set metadata, e.g. { "fa-solid": { prefix: "fas" } }
 */
export const getIconSets = async ( signal ) => {
	const res = await fetch( '/yard/icons', { signal } );
	if ( ! res.ok ) {
		throw new Error( `Failed to fetch icon sets: ${ res.status }` );
	}
	return res.json();
};

/**
 * Search icons within a set via the wp-icons REST API.
 *
 * @param {string}      set      - The icon set identifier, e.g. "fa-solid".
 * @param {string}      query    - The search query.
 * @param {AbortSignal} [signal] - AbortController signal to cancel in-flight requests.
 *
 * @return {Promise<Array>} Array of icon objects: [{ name, set, prefix }, ...]
 */
export const searchIcons = async ( set, query, signal ) => {
	const res = await fetch(
		`/yard/icons/${ encodeURIComponent( set ) }?q=${ encodeURIComponent(
			query
		) }`,
		{ signal }
	);
	if ( ! res.ok ) {
		throw new Error( `Failed to search icons: ${ res.status }` );
	}
	return res.json();
};

/**
 * Fetch the raw SVG markup for a single icon.
 *
 * @param {string} set  - The icon set identifier, e.g. "fa-solid".
 * @param {string} name - The icon name, e.g. "house".
 *
 * @return {Promise<string>} Raw SVG markup string.
 */
export const getIconSvg = async ( set, name ) => {
	const res = await fetch(
		`/yard/icons/${ encodeURIComponent( set ) }/${ encodeURIComponent(
			name
		) }`
	);
	if ( ! res.ok ) {
		throw new Error(
			`Failed to fetch SVG for ${ set }/${ name }: ${ res.status }`
		);
	}
	return res.text();
};
