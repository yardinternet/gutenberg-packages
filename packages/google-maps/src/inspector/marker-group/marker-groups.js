import { useEffect, useReducer } from '@wordpress/element';
import { Panel } from '@wordpress/components';
import Markergroup from './marker-group';

function MarkerGroups( { markerGroups = [], setAttributesCb = () => {} } ) {
	const [ state, dispatch ] = useReducer( reducer, markerGroups );

	useEffect( () => {
		setAttributesCb( state );
	}, [ state ] );

	const renderGroups = () =>
		state.map( ( { name, markers }, index ) => (
			<Markergroup
				key={ index }
				index={ index }
				name={ name }
				markers={ markers }
				parentDispatch={ dispatch }
			/>
		) );

	return !! state.length && renderGroups();
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
