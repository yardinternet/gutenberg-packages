/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { SelectControl, Modal, Button } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 *
 * @param {Object} param0
 */
function ExportCoordinatesControl( { polygons = [], setModal = () => {} } ) {
	const [ coordinates, setCoordinates ] = useState( '' );
	const [ hasCopied, setHasCopied ] = useState( false );
	const copyRef = useCopyToClipboard( coordinates, () => {
		setHasCopied( true );
		setTimeout( () => setHasCopied( false ), 4000 );
	} );

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
				<Button variant="primary" ref={ copyRef }>
					{ hasCopied
						? 'Coordinaten gekopieerd!'
						: 'Kopieer coordinaten' }
				</Button>
			) }
		</Modal>
	);
}

export default ExportCoordinatesControl;
