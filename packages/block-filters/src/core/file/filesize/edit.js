/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { coreFileFilesize } from '../../../config';
import FileSize from './components/filesize';
import { getFileDetails } from './helpers';

export default createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name !== coreFileFilesize.block ) {
			return <BlockEdit { ...props } />;
		}

		const { setAttributes, attributes } = props;
		const { href, yardShowFilesize, yardFilesize } = attributes;

		useEffect( () => {
			if ( href ) {
				getFileDetails( href ).then( ( result ) => {
					if ( yardFilesize === result ) {
						return;
					}
					setAttributes( {
						yardFilesize: result,
					} );
				} );
			}
		}, [ href, yardShowFilesize ] );

		return (
			<div
				style={ { justifyContent: 'flex-start' } }
				className="wp-block-file"
			>
				<BlockEdit { ...props } />
				{ href && (
					<InspectorControls>
						<PanelBody title={ __( 'Bestandsgrootte' ) }>
							<ToggleControl
								label={ __( 'Toon bestandsgrootte' ) }
								checked={ yardShowFilesize }
								onChange={ ( bool ) =>
									setAttributes( { yardShowFilesize: bool } )
								}
							/>
						</PanelBody>
					</InspectorControls>
				) }
				{ yardShowFilesize && <FileSize filesize={ yardFilesize } /> }
			</div>
		);
	};
} );
