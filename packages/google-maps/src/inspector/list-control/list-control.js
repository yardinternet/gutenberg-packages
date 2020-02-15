import { omit } from 'lodash';

import { Button } from '@wordpress/components';
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
		dispatch( { type: 'add', payload: formData } );
		setAddModalVisible( false );
	};

	const onEditModalSubmit = ( formData ) => {
		if ( ! formData.index ) {
			throw new Error( 'No index id specified' );
		}

		dispatch( {
			type: 'edit',
			payload: { index: formData.index, ...formData },
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
					entityLabel={ __(
						'Wijzigingen opslaan',
						config.textDomain
					) }
				/>
			) }
			<List
				data={ store }
				onModify={ ( index ) => {
					const item = dispatch( { type: 'get', payload: index } );
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
			<Button
				isLarge
				isPrimary
				onClick={ () => setAddModalVisible( true ) }
			>
				{ `${ entityLabel } ${ __( 'toevoegen', config.textDomain ) }` }
			</Button>
		</>
	);
}

export default ListControl;
