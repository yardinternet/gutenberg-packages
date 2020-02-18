function save( { attributes } ) {
	const x = {};
	Object.keys( attributes ).map( ( item ) => {
		if ( ! attributes[ item ] || attributes[ item ].length === 0 ) {
			return;
		}

		return ( x[ 'data-' + item.toLowerCase() ] =
			typeof attributes[ item ] === 'string'
				? attributes[ item ]
				: JSON.stringify( attributes[ item ] ) );
	} );

	return (
		<div id="gmap" { ...x }>
			Save
		</div>
	);
}

export default save;
