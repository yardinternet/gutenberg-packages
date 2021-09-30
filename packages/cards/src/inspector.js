/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { dispatch, select } from '@wordpress/data';

function Inspector( { attributes, clientId, setAttributes } ) {
	const { overflowOnMobile, cardsEqualHeight, cardsPerRow } = attributes;
	const { updateBlockAttributes } = dispatch( 'core/block-editor' );
	const { getBlock } = select( 'core/block-editor' );

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) }>
				<ToggleControl
					label={ __( 'Horizontale scroll op klein scherm' ) }
					checked={ overflowOnMobile }
					onChange={ ( bool ) =>
						setAttributes( { overflowOnMobile: bool } )
					}
				/>
				<ToggleControl
					label={ __( 'Kaarten gelijke hoogte' ) }
					checked={ cardsEqualHeight }
					onChange={ ( bool ) =>
						setAttributes( { cardsEqualHeight: bool } )
					}
				/>
				<RangeControl
					label={ __( 'Kaarten per rij' ) }
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
					min={ 1 }
					max={ 6 }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
