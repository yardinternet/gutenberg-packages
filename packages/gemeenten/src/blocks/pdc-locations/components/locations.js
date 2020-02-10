import React from 'react';

function Locations( { locations = [] } ) {
	return !! locations.length ? (
		locations.map( ( location ) => {
			return (
				<div key={ `location-${ location.id }` }>
					<span>{ location.name }</span>
					<span>{ location.street }</span>
				</div>
			);
		} )
	) : (
		<p>Er zijn geen locaties beschikbaar</p>
	);
}

export default Locations;
