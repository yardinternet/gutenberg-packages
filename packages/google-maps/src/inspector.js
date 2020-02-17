import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import {
	Button,
	PanelBody,
	Toolbar,
	IconButton,
	Dashicon,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { config } from './config';

import ListControl from './inspector/list-control/list-control';
import AddMarkerGroupModal from './inspector/add-marker-group-modal';

function Inspector( props ) {
	const { attributes, setAttributes, togglePopover } = props;
	const { categories, markerGroups } = attributes;
	const [ showAddMarkerGroupModal, setShowAddMarkerGroupModal ] = useState(
		false
	);

	const hookPolygonShapes = ( formData ) => {
		console.log( 'do something with polygoon data', formData );
		return formData;
	};

	// const [ categoryItem, setCategoryItem ] = useState( {} );

	// const onChange = ( { item, value } ) => {
	// 	setCategoryItem( {
	// 		...categoryItem,
	// 		...{
	// 			[ item ]: value,
	// 		},
	// 	} );
	// };

	// const onSubmit = () => {
	// 	console.log( categoryItem );
	// };

	return (
		<>
			{ showAddMarkerGroupModal && <AddMarkerGroupModal /> }
			<BlockControls>
				<Toolbar>
					<IconButton
						icon={ <Dashicon icon="location" /> }
						label={ __( 'Marker toevoegen' ) }
						onClick={ () => togglePopover() }
					/>
					<IconButton
						icon={ <Dashicon icon="location" /> }
						label={ __( 'Add group location' ) }
						onClick={ () => setShowAddMarkerGroupModal( true ) }
					/>
				</Toolbar>
			</BlockControls>
			<InspectorControls>
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
				<PanelBody title={ __( 'Polygoon test', config.textDomain ) }>
					<ListControl
						data={ categories }
						setAttributes={ setAttributes }
						callback={ ( newCategories ) =>
							setAttributes( { categories: newCategories } )
						}
						hookFormData={ hookPolygonShapes }
						controls={ [
							{
								type: 'TextControl',
								id: 'name',
								attr: { label: 'Naam' },
								preRender: ( value ) => {
									console.log(
										'do something with prerender',
										value
									);

									return value;
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
