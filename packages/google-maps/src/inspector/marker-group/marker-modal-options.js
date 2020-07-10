/**
 * WordPress dependencies
 */
import { Button, Modal, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { config } from '../../config';

function MarkerModalOptions( {
	modalTitle = __( 'Hoe wil je een marker toevoegen?', config.textDomain ),
	setShowAddMarkerModalCPT = () => {},
	setShowAddMarkerModal = () => {},
	onRequestClose = () => {},
} ) {
	return (
		<Modal title={ modalTitle } onRequestClose={ onRequestClose }>
			<PanelRow>
				<Button
					isPrimary
					isLarge
					onClick={ () => setShowAddMarkerModalCPT( true ) }
					type="submit"
				>
					Vanuit CPT
				</Button>
				<Button
					isLarge
					onClick={ () => setShowAddMarkerModal( true ) }
					type="submit"
				>
					Vrije invoer
				</Button>
			</PanelRow>
		</Modal>
	);
}

export default MarkerModalOptions;
