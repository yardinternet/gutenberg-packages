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
	const { points, polygons } = attributes;
	const [ popoverVisible, setPopoverVisible ] = useState( false );
	const [ drawerModusActive, setDrawerModusActive ] = useState( false );

	/**
	 * Toggle querypopover
	 */
	const togglePopover = () => {
		setPopoverVisible( ! popoverVisible );
	};

	const passPolygons = ( polygon ) => {
		setAttributes( {
			polygons: [ ...polygons, polygon ],
		} );
	};

	return (
		<>
			<Inspector
				togglePopover={ togglePopover }
				setDrawerModusActive={ setDrawerModusActive }
				drawerModusActive={ drawerModusActive }
				{ ...props }
			/>
			<Map
				setAttributes={ setAttributes }
				togglePopover={ togglePopover }
				popoverVisible={ popoverVisible }
				drawerModusActive={ drawerModusActive }
				refresh={ drawerModusActive }
				passPolygons={ passPolygons }
				points={ points }
				{ ...props }
			/>
		</>
	);
}

export default Edit;
