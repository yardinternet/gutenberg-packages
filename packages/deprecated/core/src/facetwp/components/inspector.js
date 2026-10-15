/**
 * External dependencies
 */
import Select from 'react-select';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { BaseControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Inspector = ( props ) => {
	const { setAttributes, attributes, facets, templates, templateOnChange } =
		props;
	const { selectedFacets, selectedTemplate } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Filtering' ) }>
				<BaseControl
					__nextHasNoMarginBottom
					id="yard-blocks-facetwp-facets"
					label={ __( 'Selecteer filters' ) }
				>
					<Select
						inputId="yard-blocks-facetwp-facets"
						isMulti
						value={ selectedFacets }
						getOptionValue={ ( opt ) => opt.name }
						onChange={ ( val ) =>
							setAttributes( { selectedFacets: val } )
						}
						options={ facets }
					/>
				</BaseControl>
				<BaseControl
					__nextHasNoMarginBottom
					id="yard-blocks-facetwp-template"
					label={ __( 'Selecteer sjabloon' ) }
				>
					<Select
						inputId="yard-blocks-facetwp-template"
						value={
							Object.keys( selectedTemplate ).length
								? selectedTemplate
								: null
						}
						getOptionValue={ ( opt ) => opt.name }
						onChange={ templateOnChange }
						options={ templates }
					/>
				</BaseControl>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
