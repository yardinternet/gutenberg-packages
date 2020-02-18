/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Map from './map';

function Edit( props ) {
	const { setAttributes, attributes } = props;
	const { points } = attributes;

	return (
		<>
			<Inspector { ...props } />
			<Map
				setAttributes={ setAttributes }
				points={ points }
				{ ...props }
			/>
			<p>Edit</p>
		</>
	);
}

export default Edit;
