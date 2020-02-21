import {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
	Modal,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useReducer, useEffect } from '@wordpress/element';

import MarkerModal from './marker-modal';
import List from '../list-control/list';
import CategoryControl from '../categories-control';

import { MediaPlaceholder } from '@wordpress/block-editor';

function Markergroup( {
	name,
	index,
	markerImage = {},
	markers = [],
	categoryOptions = [],
	categories = [],
	parentDispatch = () => {},
} ) {
	const [ state, dispatch ] = useReducer( reducer, markers );

	useEffect( () => {
		parentDispatch( {
			type: 'editMarkers',
			payload: { name, markers: state, index, markerImage },
		} );
	}, [ state ] );

	const onChangePanelName = ( value ) => {
		if ( value.length > 0 ) {
			parentDispatch( {
				type: 'updateGroup',
				payload: { name: 'name', value, index },
			} );
		}
	};

	const renderSubtitle = ( title ) => {
		return (
			<p
				style={ {
					fontSize: '1.05rem',
					marginTop: '1.1em',
					marginBottom: '.5em',
				} }
			>
				{ title }
			</p>
		);
	};

	const [ showAddMarkerModal, setShowAddMarkerModal ] = useState( false );
	const [ showEditMarkerModal, setShowEditMarkerModal ] = useState( false );
	const [ showRemoveGroupModal, setRemoveGroupModal ] = useState( false );

	const [ markerData, setMarkerData ] = useState( {} );

	return (
		<PanelBody
			icon="location"
			initialOpen={ true }
			title={ name }
			key={ index }
		>
			<PanelRow>
				<TextControl
					onChange={ ( val ) => onChangePanelName( val ) }
					value={ name }
					label={ 'Groepnaam' }
				/>
			</PanelRow>
			<div>
				<Button isLink onClick={ () => setRemoveGroupModal( true ) }>
					Groep verwijderen
				</Button>
			</div>
			<PanelRow>{ renderSubtitle( 'Marker afbeelding' ) }</PanelRow>
			<PanelRow>
				{ ! markerImage.url ? (
					<MediaPlaceholder
						onSelect={ ( media ) => {
							parentDispatch( {
								type: 'updateGroup',
								payload: {
									index,
									name: 'markerImage',
									value: { id: media.id, url: media.url },
								},
							} );
						} }
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ { title: 'Marker afbeelding' } }
					></MediaPlaceholder>
				) : (
					<img src={ markerImage.url } alt="marker afbeelding" />
				) }
			</PanelRow>
			<div>
				<Button
					isLink
					onClick={ () =>
						parentDispatch( {
							type: 'updateGroup',
							payload: {
								index,
								name: 'markerImage',
								value: {},
							},
						} )
					}
				>
					Afbeelding verwijderen
				</Button>
			</div>
			{ renderSubtitle( 'Markers' ) }
			<PanelRow>
				{ showAddMarkerModal && (
					<MarkerModal
						onSubmit={ ( marker ) => {
							dispatch( {
								type: 'add',
								payload: { ...marker },
							} );
						} }
						onRequestClose={ () => setShowAddMarkerModal( false ) }
					/>
				) }
				{ showRemoveGroupModal && (
					<Modal
						title={ __( 'Group verwijderen?' ) }
						onRequestClose={ () => setRemoveGroupModal( false ) }
					>
						<Button
							onClick={ () => {
								setRemoveGroupModal( false );
								parentDispatch( {
									type: 'removeGroup',
									payload: index,
								} );
							} }
							isPrimary
							style={ {
								background: 'red',
								borderColor: 'red',
							} }
						>
							Ja, verwijder groep
						</Button>
					</Modal>
				) }
				{ showEditMarkerModal && (
					<MarkerModal
						onSubmit={ ( marker, indexVal ) => {
							if ( indexVal === null ) {
								throw new Error(
									'index value is null, provide a index to update the marker'
								);
							}
							dispatch( {
								type: 'edit',
								payload: { marker, index: indexVal },
							} );
						} }
						onRequestClose={ () => setShowEditMarkerModal( false ) }
						markerData={ markerData }
					/>
				) }
				<List
					data={ state }
					onModify={ ( indexVal ) => {
						setMarkerData( {
							indexVal,
							...state[ indexVal ],
						} );
						setShowEditMarkerModal( true );
					} }
					onRemove={ ( indexVal ) => {
						dispatch( {
							type: 'remove',
							payload: indexVal,
						} );
					} }
				/>
			</PanelRow>
			<PanelRow>
				<Button
					isPrimary
					isLarge
					onClick={ () => setShowAddMarkerModal( true ) }
					type="submit"
				>
					Marker toevoegen
				</Button>
			</PanelRow>
			<PanelRow>
				<div>
					{ renderSubtitle( 'Categorieen' ) }
					<CategoryControl
						onChange={ ( val ) =>
							parentDispatch( {
								type: 'updateGroup',
								payload: {
									index,
									name: 'categories',
									value: val,
								},
							} )
						}
						categoriesSelected={ categories }
						categories={ categoryOptions }
					/>
				</div>
			</PanelRow>
		</PanelBody>
	);
}

function reducer( state, action ) {
	switch ( action.type ) {
		case 'add':
			return state.concat( action.payload );
		case 'edit':
			return state.map( ( item, index ) =>
				index === action.payload.index ? action.payload.marker : item
			);
		case 'remove':
			return state.filter( ( item, index ) => index !== action.payload );
		default:
			throw new Error();
	}
}

export default Markergroup;
