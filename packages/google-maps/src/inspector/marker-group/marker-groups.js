import { useState, useEffect } from '@wordpress/element';
import Markergroup from './marker-group';

function MarkerGroups( { markerGroups = [], setAttributesCb = () => {} } ) {
	const [ data, setData ] = useState( markerGroups );

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
