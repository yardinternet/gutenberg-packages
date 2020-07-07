import { orderBy } from 'lodash';

/**
 * Wordpress dependencies
 */
import {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
	Modal,
} from '@wordpress/components';
import { useState, useReducer, useEffect } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { supportCptLatLng } from '../../hooks';
import MarkerModal from './marker-modal';
import MarkerModalCPT from './marker-modal-cpt';
import MarkerModalOptions from './marker-modal-options';
import List from '../list-control/list';
import CategoryControl from '../categories-control';
import { fetchSupportingPosts } from '../../api/fetchPosts';
import { populateSelectCPT } from '../../helpers';

function Markergroup( {
	name,
	index,
	markerImage = {},
	markers = [],
	categoryOptions = [],
	categories = [],
	parentDispatch = () => {},
} ) {
	const [ state, dispatch ] = useReducer(
		reducer,
		withMarkersIndexVal( markers )
	);
	const [ options, setOptions ] = useState( [] );
	const [ loadingPosts, setLoadingPosts ] = useState( false );
	const [ posts, setPosts ] = useState( [] );

	useEffect( () => {
		parentDispatch( {
			type: 'editMarkers',
			payload: { name, markers: state, index, markerImage },
		} );
	}, [ state ] );

	/**
	 * Only execute when component is mounted for the first time
	 */
	useEffect( () => {
		getPosts();
	}, [] );

	/**
	 * When state variable posts is updated
	 */
	useEffect( () => {
		const fetchedOptions = populateSelectCPT( posts, markers );

		if ( Array.isArray( fetchedOptions ) ) {
			setOptions( fetchedOptions );
		}
	}, [ posts ] );

	/**
	 * When state variable posts is updated
	 */
	useEffect( () => {
		const fetchedOptions = populateSelectCPT( posts, markers );

		if ( Array.isArray( fetchedOptions ) ) {
			setOptions( fetchedOptions );
		}
	}, [ markers ] );

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

	/**
	 * Get posts via the rest API
	 */
	const getPosts = async () => {
		try {
			setLoadingPosts( true );

			const results = supportCptLatLng.map( async ( item ) => {
				return await fetchSupportingPosts( item );
			} );

			const combinedResults = await Promise.all( results );

			const filteredResults = combinedResults
				.flat()
				.filter( function ( item ) {
					return item.latitude && item.longitude ? true : false;
				} );

			setPosts( filteredResults );
		} catch ( e ) {
			setPosts( [] );
		} finally {
			setLoadingPosts( false );
		}
	};

	const [ showAddMarkerModal, setShowAddMarkerModal ] = useState( false );
	const [ showAddMarkerModalCPT, setShowAddMarkerModalCPT ] = useState(
		false
	);
	const [ showEditMarkerModal, setShowEditMarkerModal ] = useState( false );
	const [
		showAddMarkerModalOptions,
		setShowAddMarkerModalOptions,
	] = useState( false );
	const [ showRemoveGroupModal, setRemoveGroupModal ] = useState( false );

	const [ markerData, setMarkerData ] = useState( {} );

	return (
		<PanelBody
			icon="location"
			initialOpen={ false }
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
				{ markerImage.url && Object.keys( markerImage.url ).length && (
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
				) }
			</div>
			{ renderSubtitle( `Markers(${ state.length })` ) }
			<PanelRow>
				{ showAddMarkerModalOptions && (
					<MarkerModalOptions
						setShowAddMarkerModal={ setShowAddMarkerModal }
						setShowAddMarkerModalCPT={ setShowAddMarkerModalCPT }
						onRequestClose={ () =>
							setShowAddMarkerModalOptions( false )
						}
					/>
				) }
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
				{ showAddMarkerModalCPT && (
					<MarkerModalCPT
						loadingPosts={ loadingPosts }
						onSubmit={ ( marker ) => {
							dispatch( {
								type: 'add',
								payload: { ...marker },
							} );
						} }
						options={ options }
						posts={ posts }
						onRequestClose={ () =>
							setShowAddMarkerModalCPT( false )
						}
					/>
				) }
				{ showRemoveGroupModal && (
					<Modal
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
					displayValue={ 'infowindowTitle' }
				/>
			</PanelRow>
			<PanelRow>
				{ supportCptLatLng.length ? (
					<Button
						isPrimary
						isLarge
						onClick={ () => setShowAddMarkerModalOptions( true ) }
						type="submit"
					>
						Marker toevoegen
					</Button>
				) : (
					<Button
						isPrimary
						isLarge
						onClick={ () => setShowAddMarkerModal( true ) }
						type="submit"
					>
						Marker toevoegen
					</Button>
				) }
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
			return withMarkersIndexVal(
				state.concat( [
					{
						...action.payload,
						indexVal: state.length,
					},
				] )
			);
		case 'edit':
			return withMarkersIndexVal(
				state.map( ( item, index ) =>
					index === action.payload.index
						? action.payload.marker
						: item
				)
			);
		case 'remove':
			return withMarkersIndexVal(
				state.filter( ( item, index ) => index !== action.payload )
			);
		default:
			throw new Error();
	}
}

/**
 * Add indexVal for each marker which act as uniqueId
 *
 * Each marker has no unique identifier, this is required for the list component to work
 * The indexVal from onEdit inside List refers to the index of the item inside `state`
 *
 * @param {Array} markersWithoutIndex
 */
function withMarkersIndexVal( markersWithoutIndex = [] ) {
	if ( markersWithoutIndex && ! markersWithoutIndex.length ) return [];

	return orderByInfoTitle( markersWithoutIndex ).map(
		( marker, markerIndex ) => ( {
			...marker,
			...{ indexVal: markerIndex },
		} )
	);
}

function orderByInfoTitle( data ) {
	return orderBy( data, [ 'infowindowTitle' ], [ 'asc' ] );
}

export default Markergroup;
