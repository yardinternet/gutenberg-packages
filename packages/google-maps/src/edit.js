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
	const [ triggerMarker, setTriggerMarker ] = useState( false );
	const [ finishDrawerModus, setFinishDrawerModus ] = useState( false );

	return (
		<>
			<Inspector
				setDrawerModusActive={ setDrawerModusActive }
				drawerModusActive={ drawerModusActive }
				triggerMarker={ triggerMarker }
				setFinishDrawerModus={ setFinishDrawerModus }
				{ ...props }
			/>
			<Map
				setAttributes={ setAttributes }
				drawerModusActive={ drawerModusActive }
				setTriggerMarker={ setTriggerMarker }
				finishDrawerModus={ finishDrawerModus }
				setFinishDrawerModus={ setFinishDrawerModus }
				refresh={ drawerModusActive }
				markerGroups={ markerGroups }
				points={ points }
				polygons={ polygons }
				{ ...props }
			/>
		</>
	);
}

export default Edit;
