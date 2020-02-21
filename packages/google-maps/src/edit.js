/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Map from './map';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

function Edit( props ) {
	const { setAttributes, attributes } = props;
	const { points, polygons, markerGroups } = attributes;
	const [ drawerModusActive, setDrawerModusActive ] = useState( false );
	const [ polygonsObjects, setPolygonsObjects ] = useState( [] );

	return (
		<>
			<Inspector
				setDrawerModusActive={ setDrawerModusActive }
				drawerModusActive={ drawerModusActive }
				{ ...props }
			/>
			<Map
				setAttributes={ setAttributes }
				drawerModusActive={ drawerModusActive }
				refresh={ drawerModusActive }
				markerGroups={ markerGroups }
				points={ points }
				polygonsObjects={ polygonsObjects }
				setPolygonsObjects={ setPolygonsObjects }
				polygons={ polygons }
				{ ...props }
			/>
		</>
	);
}

export default Edit;
