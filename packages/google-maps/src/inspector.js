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
		return formData;
	};

	const addMarkerGroup = ( group ) => {
		const defaultMarkerGroup = {
			name: group,
			markers: [],
		};

		setAttributes( {
			markerGroups: markerGroups.concat( defaultMarkerGroup ),
		} );
		setShowAddMarkerGroupModal( false );
	};

	console.log( showAddMarkerGroupModal, markerGroups );

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
						label={ __( 'Drawer modus' ) }
						onClick={ () =>
							setDrawerModusActive( ! drawerModusActive )
						}
					/>
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
						data={ categories }
						entityLabel={ __( 'Categorie' ) }
						setAttributes={ setAttributes }
						callback={ ( newCategories ) =>
							setAttributes( { categories: newCategories } )
						}
						controls={ [
							{
								type: 'TextControl',
								id: 'name',
								attr: { label: 'Naam' },
							},
						] }
					/>
				</PanelBody>
				<PanelBody
					initialOpen={ false }
					title={ __( 'Gebieden', config.textDomain ) }
				>
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
