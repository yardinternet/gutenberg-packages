import {
	Button,
	PanelBody,
	PanelHeader,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { useState, useReducer, useEffect } from '@wordpress/element';

import MarkerModal from './marker-modal';
import List from '../list-control/list';

function Markergroup( { name, index, markers = [], setData = () => {} } ) {
	const [ state, dispatch ] = useReducer( reducer, markers );

	useEffect( () => {
		setData( state, index );
	}, [ state ] );

	const onChangePanelName = ( val ) => {
		if ( val.length > 0 ) {
			setPanelName( val );
		}
	};

	const [ panelName, setPanelName ] = useState( name );
	const [ showAddMarkerModal, setShowAddMarkerModal ] = useState( false );
	const [ showEditMarkerModal, setShowEditMarkerModal ] = useState( false );

	const [ markerData, setMarkerData ] = useState( {} );

	return (
		<PanelBody title={ panelName } key={ index }>
			<PanelHeader>Markergroep</PanelHeader>
			<PanelRow>
				<TextControl
					onChange={ ( val ) => onChangePanelName( val ) }
					value={ panelName }
					label={ 'naam' }
				/>
			</PanelRow>
			<PanelRow>
				<>
					{ showAddMarkerModal && (
						<MarkerModal
							onSubmit={ ( marker ) => {
								dispatch( {
									type: 'add',
									payload: { ...marker },
								} );
							} }
							onRequestClose={ () =>
								setShowAddMarkerModal( false )
							}
						/>
					) }
					{ showEditMarkerModal && (
						<MarkerModal
							onSubmit={ ( marker ) => {
								dispatch( {
									type: 'edit',
									payload: { marker, index: 0 },
								} );
							} }
							onRequestClose={ () =>
								setShowEditMarkerModal( false )
							}
							markerData={ markerData }
						/>
					) }
					<List
						data={ state }
						onModify={ ( indexVal ) => {
							setMarkerData( { indexVal, ...state[ index ] } );
							setShowEditMarkerModal( true );
						} }
						onRemove={ ( indexVal ) => {
							dispatch( { type: 'remove', payload: indexVal } );
						} }
					/>
					<Button
						isPrimary
						isLarge
						onClick={ () => setShowAddMarkerModal( true ) }
						type="submit"
					>
						Marker toevoegen
					</Button>
				</>
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
