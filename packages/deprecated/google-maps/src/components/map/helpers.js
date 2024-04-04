export function filterMarkerGroupsByCategory( {
	markerGroups = [],
	selectedFilters = [],
} ) {
	if ( ! selectedFilters.length ) {
		return markerGroups;
	}

	const newGroups = markerGroups.filter( ( { categories } ) => {
		return (
			categories &&
			categories.filter( ( category ) => {
				return selectedFilters.includes( category );
			} ).length
		);
	} );

	return newGroups;
}

export function filterPolygonsByCategory( {
	polygons = [],
	selectedFilters = [],
} ) {
	if ( ! selectedFilters.length ) {
		return polygons;
	}

	const newPolygons = polygons.filter( ( polygon ) => {
		return selectedFilters.includes( polygon.category );
	} );

	return newPolygons;
}
