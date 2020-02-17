import { omit } from 'lodash';

import { Button, PanelRow } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { config } from '../../config';
import ListControlModal from './list-control-modal';
import List from './list';

export function ListControl( {
	controls = [],
	data = [],
	callback = () => {},
	entityLabel = 'Item',
	// Modify formData before it's dispatched
	hookFormData = ( formData ) => {
		return formData;
	},
} ) {
	const [ store, setStore ] = useState( data );
	const [ addModalVisible, setAddModalVisible ] = useState( false );
	const [ editModalVisible, setEditModalVisible ] = useState( false );
	const [ editModalData, setEditModalData ] = useState( {} );

	const updateStore = ( newStore ) => {
		const storeOmitIndex = newStore.map( ( item ) =>
			omit( item, [ 'index' ] )
		);
		setStore( storeOmitIndex );
		callback( storeOmitIndex );
	};

	const dispatch = ( action ) => {
		switch ( action.type ) {
			case 'add':
				return updateStore( store.concat( [ action.payload ] ) );
			case 'remove':
				return updateStore(
					store.filter( ( item, index ) => index !== action.payload )
				);
			case 'edit':
				return updateStore(
					store.map( ( item, index ) =>
						index === parseInt( action.payload.index, 10 )
							? action.payload
							: item
					)
				);
			case 'get':
				return store[ action.payload ];
		}
	};

	const onAddModalSubmit = ( formData ) => {
		dispatch( { type: 'add', payload: hookFormData( formData ) } );
		setAddModalVisible( false );
	};

	const onEditModalSubmit = ( formData ) => {
		if ( ! formData.index ) {
			throw new Error( 'No index id specified' );
		}

		dispatch( {
			type: 'edit',
			payload: { index: formData.index, ...hookFormData( formData ) },
		} );
		setEditModalVisible( false );
	};

	return (
		<>
			{ addModalVisible && (
				<ListControlModal
					controls={ controls }
					onSubmit={ onAddModalSubmit }
					onRequestClose={ () => setAddModalVisible( false ) }
					entityLabel={ `${ entityLabel } ${ __(
						'opslaan',
						config.textDomain
					) }` }
				/>
			) }
			{ editModalVisible && (
				<ListControlModal
					onRequestClose={ () => setEditModalVisible( false ) }
					hasFormData={ editModalData }
					controls={ controls }
					onSubmit={ onEditModalSubmit }
					preOnSubmit={ ( formData ) => {
						console.log( formData, 'weeee' );
					} }
					entityLabel={ __(
						'Wijzigingen opslaan',
						config.textDomain
					) }
				/>
			) }
			<PanelRow>
				<List
					data={ store }
					onModify={ ( index ) => {
						const item = dispatch( {
							type: 'get',
							payload: index,
						} );
						setEditModalData( {
							...{ ...item },
							index,
						} );
						setEditModalVisible( true );
					} }
					onRemove={ ( index ) =>
						dispatch( { type: 'remove', payload: index } )
					}
				/>
			</PanelRow>
			<PanelRow>
				<Button
					isLarge
					isPrimary
					onClick={ () => setAddModalVisible( true ) }
				>
					{ `${ entityLabel } ${ __(
						'toevoegen',
						config.textDomain
					) }` }
				</Button>
			</PanelRow>
		</>
	);
}

export default ListControl;
