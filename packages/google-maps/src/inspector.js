/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { config } from './config';
import ListControl from './inspector/list-control/list-control';
import AddMarkerGroupModal from './inspector/marker-group/add-marker-group-modal';
import MarkerGroups from './inspector/marker-group/marker-groups';
import ImportCoordinatesControl from './inspector/import-coordinates-control';
import MapOptions from './inspector/map-options';

/**
 * Wordpress dependencies
 */
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import {
	PanelBody,
	PanelRow,
	Toolbar,
	IconButton,
	Dashicon,
	TextareaControl,
	TextControl,
	ToggleControl,
	Button,
	Tooltip,
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
		setUndo,
		editMapCenter,
		setEditMapCenter,
	} = props;
	const {
		categories,
		markerGroups,
		polygons,
		filterOptions,
		mapOptions,
		editableShapesModus,
	} = attributes;
	const [ showAddMarkerGroupModal, setShowAddMarkerGroupModal ] = useState(
		false
	);

	const [
		showImportShapeCoordinates,
		setShowImportShapeCoordinates,
	] = useState( false );

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

	const onChangeFilterOptions = ( name, val ) => {
		setAttributes( {
			filterOptions: {
				...filterOptions,
				...{ [ name ]: val },
			},
		} );
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
						icon={ <Dashicon icon="sticky" /> }
						label={ __( 'Voeg markergroep toe' ) }
						onClick={ () => setShowAddMarkerGroupModal( true ) }
					/>
					<Tooltip text={ __( 'Baken een gebied af' ) }>
						<Button
							className={ classnames(
								'components-icon-button',
								'components-toolbar__control',
								{ 'is-active': drawerModusActive }
							) }
							onClick={ () =>
								setDrawerModusActive( ! drawerModusActive )
							}
						>
							<Dashicon icon="edit" />
						</Button>
					</Tooltip>
					{ drawerModusActive && triggerMarker && (
						<>
							<IconButton
								icon={ <Dashicon icon="yes" /> }
								label={ __( 'Voltooi een gebied' ) }
								onClick={ () => setFinishDrawerModus( true ) }
							/>
							<IconButton
								icon={ <Dashicon icon="undo" /> }
								label={ __( 'Reset' ) }
								onClick={ () => setUndo( true ) }
							/>
						</>
					) }
					<Tooltip text={ __( 'Centreer map' ) }>
						<Button
							className={ classnames(
								'components-icon-button',
								'components-toolbar__control',
								{ 'is-active': editMapCenter }
							) }
							onClick={ () => {
								setEditMapCenter( ! editMapCenter );
							} }
						>
							<Dashicon icon="move" />
						</Button>
					</Tooltip>
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
							{
								type: 'ToggleSwitch',
								id: 'showFiltersOnPageLoad',
								attr: {
									label: 'Filter initieel tonen',
								},
							},
						] }
					/>
				</PanelBody>
				<PanelBody
					initialOpen={ false }
					icon="location-alt"
					title={ __( 'Gebieden', config.textDomain ) }
				>
					<ToggleControl
						label={ __( 'Gebieden bewerkbaar', config.textDomain ) }
						checked={ editableShapesModus }
						onChange={ ( val ) =>
							setAttributes( {
								editableShapesModus: val,
							} )
						}
					/>
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
								type: 'SelectControl',
								id: 'category',
								attr: {
									label: 'Categorie',
									options: createOptionsSelectControl(),
								},
							},
							{
								type: 'TextControl',
								id: 'name',
								attr: { label: 'Naam' },
							},
							{
								type: 'TextControl',
								id: 'infowindowEmail',
								attr: { label: 'Email' },
							},
							{
								type: 'TextControl',
								id: 'infowindowPhone',
								attr: { label: 'Telefoon' },
							},
							{
								type: 'TextareaControl',
								id: 'infowindow',
								attr: {
									label: 'Informatie venster',
									help: __(
										'Beschrijving voor in het informatievenster.',
										config.textDomain
									),
								},
							},
							{
								type: 'TextControl',
								id: 'infowindowURL',
								attr: {
									label: 'URL',
									help: __(
										'URL voor in het informatievenster. Voorbeeld: https://www.domein.nl',
										config.textDomain
									),
								},
							},
							{
								type: 'ToggleSwitch',
								id: 'infowindowTargetURL',
								attr: {
									label: 'Link op andere pagina openen?',
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
									label: 'Lijn kleur',
									help: __(
										'Kies een lijn kleur voor de polygon.',
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
					<PanelRow>
						{ showImportShapeCoordinates && (
							<ImportCoordinatesControl
								setModal={ setShowImportShapeCoordinates }
								setAttributes={ setAttributes }
								polygons={ polygons }
							/>
						) }
						<Button
							isDefault
							onClick={ () =>
								setShowImportShapeCoordinates( true )
							}
						>
							Importeer gebied
						</Button>
					</PanelRow>
				</PanelBody>
				<PanelBody
					initialOpen={ false }
					icon="editor-ul"
					title={ __( 'Filters' ) }
				>
					<ToggleControl
						label="Toon filters"
						checked={ filterOptions.showFilters }
						onChange={ ( val ) =>
							onChangeFilterOptions( 'showFilters', val )
						}
					/>
					<TextControl
						label="Filter titel"
						value={ filterOptions.title }
						onChange={ ( val ) =>
							onChangeFilterOptions( 'title', val )
						}
					/>
					<TextareaControl
						label="Filter tekst"
						value={ filterOptions.content }
						onChange={ ( val ) =>
							onChangeFilterOptions( 'content', val )
						}
					/>
				</PanelBody>
				<MapOptions
					mapOptions={ mapOptions }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
		</>
	);
}

export default Inspector;
