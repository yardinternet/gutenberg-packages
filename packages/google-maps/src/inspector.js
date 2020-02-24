/**
 * Internal dependencies
 */
import { config } from './config';
import ListControl from './inspector/list-control/list-control';
import AddMarkerGroupModal from './inspector/marker-group/add-marker-group-modal';
import MarkerGroups from './inspector/marker-group/marker-groups';

/**
 * Wordpress dependencies
 */
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import {
	PanelBody,
	Toolbar,
	IconButton,
	Dashicon,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Inspector( props ) {
	const {
		attributes,
		setAttributes,
		drawerModusActive,
		setDrawerModusActive,
		triggerMarker,
		setFinishDrawerModus,
	} = props;
	const { categories, markerGroups, polygons } = attributes;
	const [ showAddMarkerGroupModal, setShowAddMarkerGroupModal ] = useState(
		false
	);

	const addMarkerGroup = ( group ) => {
		const defaultMarkerGroup = {
			name: group,
			markers: [],
			markerImage: {},
		};

		setAttributes( {
			markerGroups: markerGroups.concat( defaultMarkerGroup ),
		} );
		setShowAddMarkerGroupModal( false );
	};

	const createOptionsSelectControl = () => {
		const optionsSelectControl = [];

		for ( let i = 0; i < categories.length; i++ ) {
			optionsSelectControl.push( {
				label: categories[ i ].name,
				value: categories[ i ].name,
			} );
		}

		return optionsSelectControl;
	};

	return (
		<>
			{ showAddMarkerGroupModal && (
				<AddMarkerGroupModal
					onRequestClose={ () => setShowAddMarkerGroupModal( false ) }
					onSubmit={ addMarkerGroup }
				/>
			) }
			<BlockControls>
				<Toolbar>
					<IconButton
						icon={ <Dashicon icon="plus" /> }
						label={ __( 'Voeg markergroep toe' ) }
						onClick={ () => setShowAddMarkerGroupModal( true ) }
					/>
					<IconButton
						icon={ <Dashicon icon="edit" /> }
						label={ __( 'Baken een gebied af' ) }
						onClick={ () =>
							setDrawerModusActive( ! drawerModusActive )
						}
					/>
					{ drawerModusActive && triggerMarker && (
						<IconButton
							icon={ <Dashicon icon="yes" /> }
							label={ __( 'Voltooi een gebied' ) }
							onClick={ () => setFinishDrawerModus( true ) }
						/>
					) }
				</Toolbar>
			</BlockControls>
			<InspectorControls>
				<MarkerGroups
					setAttributesCb={ ( data ) => {
						setAttributes( {
							markerGroups: data,
						} );
					} }
					markerGroups={ markerGroups }
					{ ...props }
				/>
				<PanelBody
					initialOpen={ false }
					title={ __( 'Categorieen', config.textDomain ) }
				>
					<ListControl
						explanationNoItems={ __(
							'Er zijn geen items beschikbaar of voeg een item toe.',
							config.textDomain
						) }
						entityLabel={ __( 'Categorie' ) }
						showAddModalButton={ true }
						data={ categories }
						setAttributes={ setAttributes }
						callback={ ( newCategories ) => {
							setAttributes( { categories: newCategories } );
						} }
						controls={ [
							{
								type: 'TextControl',
								id: 'name',
								attr: { label: 'Naam' },
							},
							{
								type: 'ToggleSwitch',
								id: 'filter',
								attr: {
									label: 'Toon als filter',
								},
							},
						] }
					/>
				</PanelBody>
				<PanelBody
					initialOpen={ false }
					title={ __( 'Gebieden', config.textDomain ) }
				>
					<ListControl
						explanationNoItems={ __(
							'Voeg een gebied toe via de blockcontrols.',
							config.textDomain
						) }
						entityLabel={ __( 'Gebied', config.textDomain ) }
						showAddModalButton={ false }
						data={ polygons }
						setAttributes={ setAttributes }
						callback={ ( newPolygons ) => {
							setAttributes( { polygons: newPolygons } );
						} }
						controls={ [
							{
								type: 'TextControl',
								id: 'id',
								attr: { type: 'hidden' },
							},
							{
								type: 'TextControl',
								id: 'name',
								attr: { label: 'Naam' },
							},
							{
								type: 'SelectControl',
								id: 'category',
								attr: {
									label: 'Categorie',
									options: createOptionsSelectControl(),
								},
							},
							{
								type: 'TextControl',
								id: 'coords',
								attr: { type: 'hidden' },
							},
							{
								type: 'BaseControl',
								id: 'BaseControlColor',
								attr: {
									label: 'Kleur',
									help: __(
										'Kies een kleur voor de polygon.',
										config.textDomain
									),
								},
							},
							{
								type: 'ColorPicker',
								id: 'color',
								attr: {
									label: 'WEEEE',
									name: 'color',
								},
							},
							{
								type: 'BaseControl',
								id: 'BaseControlBorderColor',
								attr: {
									label: 'Border kleur',
									help: __(
										'Kies een border kleur voor de polygon.',
										config.textDomain
									),
								},
							},
							{
								type: 'ColorPicker',
								id: 'borderColor',
								attr: {
									label: 'WEEEE',
									name: 'borderColor',
								},
							},
						] }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default Inspector;
