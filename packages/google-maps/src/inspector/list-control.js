import List from './list';
import { TextControl, Button, Modal } from '@wordpress/components';
import { useState, createElement } from '@wordpress/element';

function ListControl( { data, setAttributes, controls } ) {
	const [ name, setName ] = useState( '' );
	const [ show, showModal ] = useState( false );
	const [ modalType, setModalType ] = useState( 'add' );
	const [ listItem, setListItem ] = useState( {} );

	const [ dataItem, setDataItem ] = useState( {} );

	const onChange = ( { item, value } ) => {
		setDataItem( {
			...dataItem,
			...{
				[ item ]: value,
			},
		} );
	};

	const getField = ( type ) => {
		switch ( type ) {
			case 'TextControl':
				return TextControl;
			default:
				throw new Error( 'Fieldtype not supported' );
		}
	};

	const dispatch = ( action ) => {
		switch ( action.type ) {
			case 'add':
				return setAttributes( {
					categories: data.concat( [ action.payload ] ),
				} );
			case 'remove':
				return setAttributes( {
					categories: data.filter(
						( item, index ) => index !== action.payload
					),
				} );
			case 'edit':
				console.log( action );
		}
	};

	const onSubmit = () => {
		dispatch( { type: 'add', payload: dataItem } );
		showModal( false );
	};

	const onModify = () => {
		showModal( true );
		return renderModal();
	};

	const renderModal = ( { title = '', btnTitle = '', mode = 'add' } ) => (
		<Modal title={ title } onRequestClose={ () => showModal( false ) }>
			{ controls.map( ( control, index ) => {
				return createElement( getField( control.type ), {
					onChange: ( val ) =>
						onChange( { item: control.name, value: val } ),
					...control.attr,
					...dispatch( { type: 'edit', payload: index } ),
				} );
			} ) }
			<Button onClick={ () => onSubmit() }>{ btnTitle }</Button>
		</Modal>
	);

	// const editModal = ( { title: '', btnTitle: '', mode: 'add' } ) => (
	// 	<Modal
	// 		title="Wijzig category"
	// 		onRequestClose={ () => showModal( false ) }
	// 	>
	// 		<TextControl
	// 			value={ name }
	// 			onChange={ ( val ) => setName( val ) }
	// 		/>
	// 		<Button onClick={ () => onSubmit() }>Wijzigen</Button>
	// 	</Modal>
	// );

	return (
		<>
			{ show && renderModal() }
			<List state={ data } dispatch={ dispatch } onModify={ onModify }>
				<Button onClick={ () => showModal( true ) }>
					Add category
				</Button>
			</List>
		</>
	);
}

export default ListControl;
