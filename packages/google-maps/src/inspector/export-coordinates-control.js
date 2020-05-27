import { useState } from '@wordpress/element';
import { SelectControl, Modal, ClipboardButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 *
 * @param {Object} param0
 */
function ExportCoordinatesControl( { polygons = [], setModal = () => {} } ) {
	const [ coordinates, setCoordinates ] = useState( '' );
	const [ hasCopied, setHasCopied ] = useState( false );

	const onClose = () => {
		setModal( false );
	};

	const defaultSelectControlValues = [
		{ name: 'Selecteer gebied', coords: '' },
	];

	return (
		<Modal title="Gebied coordinaten exporteren" onRequestClose={ onClose }>
			<SelectControl
				style={ { maxWidth: '600px' } }
				label={ __( 'Selecteer gebied' ) }
				options={ defaultSelectControlValues
					.concat( polygons )
					.map( ( item ) => ( {
						label: item.name,
						value: item.coords,
					} ) ) }
				onChange={ ( value ) => setCoordinates( value ) }
			/>
			{ !! coordinates.length && (
				<ClipboardButton
					isPrimary
					text={ coordinates }
					onCopy={ () => setHasCopied( true ) }
					onFinishCopy={ () => setHasCopied( false ) }
				>
					{ hasCopied
						? 'Coordinaten gekopieerd!'
						: 'Kopieer coordinaten' }
				</ClipboardButton>
			) }
		</Modal>
	);
}

export default ExportCoordinatesControl;
