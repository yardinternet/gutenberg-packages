import { filterMarkerGroupsByCategory } from '../helpers';
import { markerGroup1, markerGroup2 } from '../dummy';

describe( 'filterMarkerGroupsByCategory', () => {
	test( 'markerGroups should be empty', () => {
		expect(
			filterMarkerGroupsByCategory( {
				markerGroups: markerGroup1,
				selectedFilters: [ 'weee' ],
			} )
		).toEqual( [] );
	} );

	test( 'markerGroups should not be empty', () => {
		expect(
			filterMarkerGroupsByCategory( {
				markerGroups: markerGroup1,
				selectedFilters: [ 'filter1' ],
			} )
		).toEqual( markerGroup1 );
	} );

	test( 'markerGroups should return one markgroup', () => {
		expect(
			filterMarkerGroupsByCategory( {
				markerGroups: markerGroup1.concat( markerGroup2 ),
				selectedFilters: [ 'filter2' ],
			} )
		).toEqual( markerGroup1 );
	} );

	test( 'markerGroups should not be empty when selectedFilters is empty', () => {
		expect(
			filterMarkerGroupsByCategory( {
				markerGroups: markerGroup1,
				selectedFilters: [],
			} )
		).toEqual( markerGroup1 );
	} );
} );
