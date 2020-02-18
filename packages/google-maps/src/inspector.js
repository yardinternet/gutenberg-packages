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
		togglePopover,
		drawerModusActive,
		setDrawerModusActive,
	} = props;
	const { categories, markerGroups, polygons } = attributes;
	const [ showAddMarkerGroupModal, setShowAddMarkerGroupModal ] = useState(
		false
	);

	const hookPolygonShapes = ( formData ) => {
		formData.coords = [ JSON.stringify( formData.coords ) ];
		console.log( formData );
		return formData;
	};

	const addMarkerGroup = ( group ) => {
		setAttributes( {
			markerGroups: markerGroups.concat( group ),
		} );
	};

	return (
		<>
			{ showAddMarkerGroupModal && (
				<AddMarkerGroupModal onSubmit={ addMarkerGroup } />
			) }
			<BlockControls>
				<Toolbar>
					<IconButton
						icon={ <Dashicon icon="location" /> }
						label={ __( 'Marker toevoegen' ) }
						onClick={ () => togglePopover() }
					/>
					<IconButton
						icon={ <Dashicon icon="grid-view" /> }
						label={ __( 'Add group location' ) }
						onClick={ () => setShowAddMarkerGroupModal( true ) }
					/>
					<IconButton
						icon={ <Dashicon icon="edit" /> }
						label={ __( 'Drawer modus' ) }
						onClick={ () =>
							setDrawerModusActive( ! drawerModusActive )
						}
					/>
				</Toolbar>
			</BlockControls>
			<InspectorControls>
				<MarkerGroups markerGroups={ markerGroups } { ...props } />
				<PanelBody title={ __( 'Categorieen', config.textDomain ) }>
					<ListControl
						data={ categories }
						setAttributes={ setAttributes }
						callback={ ( newCategories ) =>
							setAttributes( { categories: newCategories } )
						}
						controls={ [
							{
								type: 'TextAreaControl',
								id: 'name',
								attr: { label: 'Naam' },
							},
							{
								type: 'TextControl',
								id: 'age',
								attr: { label: 'Leeftijd' },
							},
						] }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Gebieden', config.textDomain ) }>
					<ListControl
						title={ __( 'Gebieden', config.textDomain ) }
						data={ polygons }
						setAttributes={ setAttributes }
						callback={ ( newPolygons ) =>
							setAttributes( { polygons: newPolygons } )
						}
						hookFormData={ hookPolygonShapes }
						controls={ [
							{
								type: 'TextControl',
								id: 'name',
								attr: { label: 'Naam' },
							},
							{
								type: 'TextControl',
								id: 'category',
								attr: { label: 'Categorie' },
							},
							{
								type: 'TextareaControl',
								id: 'coords',
								attr: { label: 'Coordinaten' },
								preRender: ( value ) => {
									// if ( value ) {
									// 	return convertCoordToJSON(
									// 		value.coords
									// 	);
									// }
									console.log( value + 'pre-render' );

									// hier terug converteren naar string
								},
							},
							{
								type: 'BaseControl',
								id: 'BaseControl',
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
								id: 'colorPicker',
								attr: { label: 'Naam' },
							},
						] }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default Inspector;
