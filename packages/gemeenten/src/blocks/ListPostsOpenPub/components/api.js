export function fetchOpenpub( query, endpoint = '/wp-json/owc/openpub/v1/' ) {
	const baseUrl = theme.openpubEndpoint;
	return fetch( baseUrl + endpoint + query );
}
