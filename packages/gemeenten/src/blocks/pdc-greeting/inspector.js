/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Inspector( props ) {
	const { setAttributes, attributes } = props;
	const { labelMorning, labelDay, labelNight } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Opties' ) }>
				<TextControl
					label={ __( 'Label 00:00 - 11:59 uur' ) }
					value={ labelMorning }
					onChange={ ( value ) =>
						setAttributes( { labelMorning: value } )
					}
				/>
				<TextControl
					label={ __( 'Label 12:00 - 17:59 uur' ) }
					value={ labelDay }
					onChange={ ( value ) =>
						setAttributes( { labelDay: value } )
					}
				/>
				<TextControl
					label={ __( 'Label 18:00 - 23:59' ) }
					value={ labelNight }
					onChange={ ( value ) =>
						setAttributes( { labelNight: value } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
