/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { dispatch, select } from '@wordpress/data';

function Inspector( { attributes, blockCount, clientId, setAttributes } ) {
	const { overflowOnMobile, cardsEqualHeight, cardsPerRow } = attributes;
	const { updateBlockAttributes } = dispatch( 'core/block-editor' );
	const { getBlock } = select( 'core/block-editor' );

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Opties' ) }>
				<ToggleControl
					label={ __( 'Verticale scroll op mobile' ) }
					checked={ overflowOnMobile }
					onChange={ ( bool ) => setAttributes( { overflowOnMobile: bool } ) }
				/>
				<ToggleControl
					label={ __( 'Cards gelijke hoogte' ) }
					checked={ cardsEqualHeight }
					onChange={ ( bool ) => setAttributes( { cardsEqualHeight: bool } ) }
				/>
				{ blockCount > 1 && (
					<RangeControl
						label={ __( 'Cards per rij' ) }
						value={ cardsPerRow }
						onChange={ ( count ) => {
							const block = getBlock( clientId );
							setAttributes( { cardsPerRow: count } );

							block.innerBlocks.map( ( innerBlock ) =>
								updateBlockAttributes( innerBlock.clientId, {
									...innerBlock.attributes,
									...{ parentCardCount: count },
								} )
							);
						} }
						min={ 0 }
						max={ 6 }
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
