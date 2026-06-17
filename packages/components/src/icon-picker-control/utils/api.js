/**
 * Use FontAwesome API to search for icons
 *
 * @param {string} search - The value to search for icons.
 *
 * @see https://fontawesome.com/docs/apis/graphql/query-fields#searchpaginated
 * @see https://fontawesome.com/docs/apis/graphql/objects#icon
 * @see https://fontawesome.com/docs/apis/graphql/objects#familystylesbylicense
 * @see https://fontawesome.com/docs/apis/graphql/objects#familystyle
 */
export const getFontAwesomeIcons = async ( search ) => {
	const query = `{ searchPaginated(version: "7.x", query: "${ search }", pageSize: 50)
		{
			icons {
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
