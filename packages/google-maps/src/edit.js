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
	const [ popoverVisible, setPopoverVisible ] = useState( false );
	const [ drawerModusActive, setDrawerModusActive ] = useState( false );
	const [ polygonsObjects, setPolygonsObjects ] = useState( [] );

	/**
	 * Toggle querypopover
	 */
	const togglePopover = () => {
		setPopoverVisible( ! popoverVisible );
	};

	const passPolygonsToAttributes = ( polygon ) => {
		setAttributes( {
			polygons: [ ...polygons, polygon ],
		} );
	};

	const passPolygonsObjects = ( polygon ) => {
		setPolygonsObjects( polygonsObjects.concat( polygon ) );
	};

	return (
		<>
			<Inspector
				togglePopover={ togglePopover }
				setDrawerModusActive={ setDrawerModusActive }
				drawerModusActive={ drawerModusActive }
				polygonsObjects={ polygonsObjects }
				{ ...props }
			/>
			<Map
				setAttributes={ setAttributes }
				togglePopover={ togglePopover }
				popoverVisible={ popoverVisible }
				drawerModusActive={ drawerModusActive }
				refresh={ drawerModusActive }
				markerGroups={ markerGroups }
				passPolygonsToAttributes={ passPolygonsToAttributes }
				passPolygonsObjects={ passPolygonsObjects }
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
