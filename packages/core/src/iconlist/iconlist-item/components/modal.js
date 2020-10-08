/**
 * WordPress dependencies
 */
import { Button, Modal } from '@wordpress/components';
/**
 * External dependencies
 */
import { IconPickerControl } from '@yardinternet/gutenberg-editor-components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

function IconModal( { setAttributes, icon } ) {
	const [ isOpen, setOpen ] = useState( false );

	return (
		<div>
			<Button isSecondary onClick={ () => setOpen( true ) }>
				{ __( 'Kies een icoon' ) }
			</Button>
			{ isOpen && (
				<Modal
					title={ __( 'Kies een icoon' ) }
					onRequestClose={ () => setOpen( false ) }
				>
					<IconPickerControl
						icon={ icon }
						onChange={ ( newIcon ) =>
							setAttributes( { icon: newIcon } )
						}
					/>
					<Button isSecondary onClick={ () => setOpen( false ) }>
						{ __( 'Sluit' ) }
					</Button>
				</Modal>
			) }
		</div>
	);
}

export default IconModal;
