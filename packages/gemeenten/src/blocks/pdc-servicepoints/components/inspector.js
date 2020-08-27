/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	QueryControls,
	PanelBody,
	SelectControl,
	CheckboxControl,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

/**
 * External dependencies
 */
import Select from 'react-select';

const Inspector = ( props ) => {
	const { attributes, setAttributes, locations } = props;
	const {
		customLocations,
		locationSelection,
		locationsToShow,
		selectedView,
	} = attributes;

	const createSelectOptions = ( options = [] ) => {
		return options.map( function ( location ) {
			return {
				value: location.title,
				label: location.title,
			};
		} );
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) }>
				<QueryControls
					{ ...{ locationsToShow } }
					maxItems={ locations.length }
					numberOfItems={ locationsToShow }
					onNumberOfItemsChange={ ( value ) =>
						setAttributes( {
							locationsToShow: value,
						} )
					}
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Handmatige selectie' ) }
				initialOpen={ false }
			>
				<CheckboxControl
					label={ __( 'Selecteer locaties' ) }
					checked={ customLocations ?? [] }
					onChange={ ( checked ) =>
						setAttributes( {
							customLocations: checked,
						} )
					}
				/>
				{ customLocations && (
					<Select
						isMulti
						value={ locationSelection }
						onChange={ ( value ) => {
							setAttributes( {
								locationSelection: value === null ? [] : value,
							} );
						} }
						options={ createSelectOptions( locations ) }
					/>
				) }
			</PanelBody>
			<PanelBody title={ __( 'Template' ) } initialOpen={ false }>
				<SelectControl
					value={ selectedView }
					label={ __( 'Selecteer sjabloon' ) }
					onChange={ ( value ) => {
						setAttributes( { selectedView: value } );
					} }
					options={ applyFilters(
						'gutenberg-gemeenten.ServicepuntenTemplates',
						[ { value: 'index', label: 'Standaard' } ]
					) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};
export default Inspector;
