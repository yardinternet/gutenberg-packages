import Markergroup from './marker-group';

function MarkerGroups( { markerGroups = [], setAttributesCb = () => {} } ) {
	const dispatch = ( action ) => {
		switch ( action.type ) {
			case 'sync':
				return action.payload;
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
			case 'editPanelName':
				return setAttributesCb(
					markerGroups.map( ( item, index ) =>
						index === action.payload.index
							? {
									...item,
									name: action.payload.name,
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
			default:
				throw new Error();
		}
	};

	const renderGroups = () =>
		markerGroups.map( ( { name, markers }, index ) => (
			<Markergroup
				key={ index }
				index={ index }
				name={ name }
				markers={ markers }
				parentDispatch={ dispatch }
			/>
		) );

	return !! markerGroups.length && renderGroups();
}

export default MarkerGroups;
