import classnames from 'classnames';

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
			id="gmap"
			className={ classnames( [
				className,
				'yard-google-map-advanced',
			] ) }
			{ ...props }
		>
			Save
		</div>
	);
}

export default save;
