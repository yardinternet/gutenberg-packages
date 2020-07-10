/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import { config } from './config';

function save( { attributes, className } ) {
	const props = {};
	Object.keys( attributes ).map( ( item ) => {
		if ( ! attributes[ item ] || attributes[ item ].length === 0 ) {
			return [];
		}

		return ( props[ 'data-' + item.toLowerCase() ] =
			typeof attributes[ item ] === 'string'
				? attributes[ item ]
				: JSON.stringify( attributes[ item ] ) );
	} );

	return (
		<div
			id={ config.mapDomId }
			className={ classnames( [
				className,
				'yard-google-map-advanced',
			] ) }
			{ ...props }
		></div>
	);
}

export default save;
