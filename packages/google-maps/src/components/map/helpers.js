export function filterMarkerGroupsByCategory( {
	markerGroups = [],
	selectedFilters = [],
} ) {
	if ( ! selectedFilters.length ) return markerGroups;

	const newGroups = markerGroups.filter( ( { categories } ) => {
		return categories.filter( ( category ) => {
			return selectedFilters.includes( category );
		} ).length;
	} );

	return newGroups;
}
