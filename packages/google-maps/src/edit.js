/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Map from './map';
import QueryPopOver from './components/query-popover';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

function Edit( props ) {
	const { setAttributes, attributes } = props;
	const { points } = attributes;
	const [ popoverVisible, setPopoverVisible ] = useState( false );

	/**
	 * Toggle querypopover
	 */
	const togglePopover = () => {
		setPopoverVisible( ! popoverVisible );
	};

	return (
		<>
			<Inspector togglePopover={ togglePopover } { ...props } />
			<Map
				setAttributes={ setAttributes }
				togglePopover={ togglePopover }
				popoverVisible={ popoverVisible }
				points={ points }
				{ ...props }
			/>
			<p>Edit</p>
		</>
	);
}

export default Edit;
