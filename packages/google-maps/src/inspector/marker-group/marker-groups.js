import { useState, useEffect, useReducer } from '@wordpress/element';
import Markergroup from './marker-group';

function reducer( state, action ) {
	switch ( action.type ) {
		case 'add':
			return state.concat( action.payload );
		case 'edit':
			return state.map( ( item, index ) =>
				index === action.payload.index ? action.payload.marker : item
			);
		case 'remove':
			return state.filter( ( item, index ) => index !== action.payload );
		default:
			throw new Error();
	}
}

function MarkerGroups( { markerGroups = [], setAttributesCb = () => {} } ) {
	const [ data, setData ] = useState( markerGroups );
	const [ state, dispatch ] = useReducer( markerGroups );

	useEffect( () => {
		setAttributesCb( data );
	}, [ data ] );

	const markerData = ( markers, index ) => {
		setData(
			data.map( ( item, i ) =>
				index === i ? { ...item, markers } : item
			)
		);
	};

	return (
		!! markerGroups.length &&
		markerGroups.map( ( { name, markers }, index ) => (
			<Markergroup
				key={ index }
				index={ index }
				name={ name }
				markers={ markers }
				setData={ markerData }
			/>
		) )
	);
}

export default MarkerGroups;
