import { useState, useEffect, useReducer } from '@wordpress/element';
import Markergroup from './marker-group';

function MarkerGroups( { markerGroups = [], setAttributesCb = () => {} } ) {
	const [ data, setData ] = useState( markerGroups );
	const [ state, dispatch ] = useReducer( reducer, markerGroups );

	useEffect( () => {
		setAttributesCb( state );
	}, [ state ] );

	const markerData = ( markers, index ) => {
		setData(
			data.map( ( item, i ) =>
				index === i ? { ...item, markers } : item
			)
		);
	};

	return (
		!! state.length &&
		state.map( ( { name, markers }, index ) => (
			<Markergroup
				key={ index }
				index={ index }
				name={ name }
				markers={ markers }
				setData={ markerData }
				parentDispatch={ dispatch }
			/>
		) )
	);
}

function reducer( state, action ) {
	switch ( action.type ) {
		case 'editMarkers':
			return state.map( ( item, index ) =>
				index === action.payload.index
					? {
							...item,
							markers: action.payload.markers,
					  }
					: item
			);
		case 'editPanelName':
			return state.map( ( item, index ) =>
				index === action.payload.index
					? {
							...item,
							name: action.payload.name,
					  }
					: item
			);
		default:
			throw new Error();
	}
}

export default MarkerGroups;
