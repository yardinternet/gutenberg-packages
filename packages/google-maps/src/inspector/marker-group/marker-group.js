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
import { __ } from '@wordpress/i18n';
import { useState, useReducer, useEffect, useRef } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { supportingCPT } from '../../hooks';
import MarkerModal from './marker-modal';
import MarkerModalCPT from './marker-modal-cpt';
import MarkerModalOptions from './marker-modal-options';
import List from '../list-control/list';
import CategoryControl from '../categories-control';
import { fetchSupportingPosts } from '../../api/fetchPosts';

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
	const [ options, setOptions ] = useState( [] );
	const [ posts, setPosts ] = useState( [] );
	const isInitialMount = useRef( true );

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
		if ( isInitialMount.current ) {
			getPosts();
			isInitialMount.current = false;
		}
	} );

	/**
	 * When state variable posts is updated
	 */
	useEffect( () => {
		populateSelectCPT( posts, markers );
	}, [ posts ] );

	/**
	 * When state variable posts is updated
	 */
	useEffect( () => {
		populateSelectCPT( posts, markers );
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
			const results = await fetchSupportingPosts( supportingCPT.name );
			const filteredResults = results.filter( function( item ) {
				return item.latitude && item.longitude ? true : false;
			} );

			setPosts( filteredResults );
		} catch ( e ) {
			setPosts( [] );
		}
	};

	/**
	 * Get supporting CPT's that are available by the wp rest api
	 *
	 * @param {Array} fetchedPosts
	 * @param {Array} currentMarkers
	 */
	const populateSelectCPT = ( fetchedPosts, currentMarkers ) => {
		try {
			const selectOptions = fetchedPosts.map( function( item ) {
				return {
					value: item.title.rendered,
					label: item.title.rendered,
				};
			} );

			/**
			 * Nalopen op performance: filter in filter of liever een for statement in een filter?
			 * includes() werkt niet omdat alle objecten in een array key zitten.
			 */
			const filteredOptions = selectOptions.filter( ( option ) => {
				const result = currentMarkers.filter(
					( marker ) => marker.name === option.label
				);

				return result.length === 0;
			} );

			setOptions( filteredOptions );
		} catch ( e ) {
			throw new Error( e.message );
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
			{ renderSubtitle( 'Markers' ) }
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
				{ supportingCPT && posts.length > 0 && (
					<Button
						isPrimary
						isLarge
						onClick={ () => setShowAddMarkerModalOptions( true ) }
						type="submit"
					>
						Marker toevoegen
					</Button>
				) }
				{ ! supportingCPT ||
					( posts.length === 0 && (
						<Button
							isPrimary
							isLarge
							onClick={ () => setShowAddMarkerModal( true ) }
							type="submit"
						>
							Marker toevoegen
						</Button>
					) ) }
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
