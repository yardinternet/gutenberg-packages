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
	const {
		categories,
		legend,
		polygons,
		markerGroups,
		filterOptions,
		mapOptions,
	} = attributes;
	const [ drawerModusActive, setDrawerModusActive ] = useState( false );
	const [ triggerMarker, setTriggerMarker ] = useState( false );
	const [ finishDrawerModus, setFinishDrawerModus ] = useState( false );
	const [ undo, setUndo ] = useState( false );
	const [ editMapCenter, setEditMapCenter ] = useState( false );

	return (
		<>
			<Inspector
				setDrawerModusActive={ setDrawerModusActive }
				drawerModusActive={ drawerModusActive }
				triggerMarker={ triggerMarker }
				setFinishDrawerModus={ setFinishDrawerModus }
				setUndo={ setUndo }
				editMapCenter={ editMapCenter }
				setEditMapCenter={ setEditMapCenter }
				legend={ legend }
				{ ...props }
			/>
			<Map
				setAttributes={ setAttributes }
				drawerModusActive={ drawerModusActive }
				setTriggerMarker={ setTriggerMarker }
				finishDrawerModus={ finishDrawerModus }
				setFinishDrawerModus={ setFinishDrawerModus }
				undo={ undo }
				editMode={ true }
				setUndo={ setUndo }
				editMapCenter={ editMapCenter }
				refresh={ drawerModusActive }
				markerGroups={ markerGroups }
				mapOptions={ mapOptions }
				categories={ categories }
				filterOptions={ filterOptions }
				polygons={ polygons }
				legend={ legend }
				{ ...props }
			></Map>
		</>
	);
}

export default Edit;
