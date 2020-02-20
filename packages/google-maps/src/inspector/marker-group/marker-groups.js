import Markergroup from './marker-group';

function MarkerGroups( { markerGroups = [], setAttributesCb = () => {} } ) {
	const dispatch = ( action ) => {
		switch ( action.type ) {
			case 'editMarkers':
				return setAttributesCb(
					markerGroups.map( ( item, index ) =>
						index === action.payload.index
							? {
									...item,
									markers: action.payload.markers,
							  }
							: item
					)
				);
			case 'removeGroup':
				return setAttributesCb(
					markerGroups.filter(
						( item, index ) => index !== action.payload
					)
				);

			case 'updateGroup':
				return setAttributesCb(
					markerGroups.map( ( item, index ) =>
						index === action.payload.index
							? {
									...item,
									[ action.payload.name ]:
										action.payload.value,
							  }
							: item
					)
				);
			default:
				throw new Error();
		}
	};

	const renderGroups = () =>
		markerGroups.map( ( group, index ) => (
			<Markergroup
				key={ index }
				index={ index }
				{ ...group }
				parentDispatch={ dispatch }
			/>
		) );

	return !! markerGroups.length && renderGroups();
}

export default MarkerGroups;
