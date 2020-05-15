/**
 * Internal dependencies
 */
import Edit from './components/edit';
import Inspector from './components/inspector';

function edit( props ) {
	const { setAttributes, attributes, isSelected } = props;
	const { size, backgroundColor } = attributes;

	return (
		<>
			<Inspector { ...props } />
			<Edit
				size={ size }
				setSize={ ( value ) => setAttributes( { size: value } ) }
				isSelected={ isSelected }
				backgroundColor={ backgroundColor }
			/>
		</>
	);
}

export default edit;
