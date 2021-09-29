/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

const Inspector = ( { heading, setAttributes, clientId } ) => {
	const { getBlocksByClientId } = useSelect( ( select ) => ( {
		getBlocksByClientId: select( 'core/block-editor' ).getBlocksByClientId,
	} ) );

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const onChange = ( value ) => {
		setAttributes( { heading: value } );

		const children = getBlocksByClientId( clientId )[ 0 ].innerBlocks;
		children.forEach( ( child ) =>
			updateBlockAttributes( child.clientId, { heading: value } )
		);
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) }>
				<SelectControl
					label="Heading"
					value={ heading }
					options={ [
						{ label: 'Geen', value: '' },
						{ label: 'h2', value: 'h2' },
						{ label: 'h3', value: 'h3' },
						{ label: 'h4', value: 'h4' },
						{ label: 'h5', value: 'h5' },
						{ label: 'h6', value: 'h6' },
					] }
					onChange={ onChange }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
