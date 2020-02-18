import {
	Button,
	Modal,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { createElement } from '@wordpress/element';

function ListControlModal( {
	hasFormData = {},
	controls = [],
	onRequestClose = () => {},
	onSubmit = () => {},
	entityLabel = '',
} ) {
	const getField = ( type ) => {
		switch ( type ) {
			case 'TextControl':
				return TextControl;
			case 'TextAreaControl':
				return TextareaControl;
			default:
				throw new Error( 'Fieldtype not supported' );
		}
	};

	const onHandleSubmit = ( e ) => {
		const formData = {};
		e.preventDefault();
		if ( e.target.length > 0 ) {
			for ( let i = 0; i < e.target.length; i++ ) {
				if ( e.target[ i ].type === 'submit' ) continue;
				formData[ e.target[ i ].name ] = e.target[ i ].value;
				e.target[ i ].value = '';
			}
		}

		onSubmit( formData );
	};

	return (
		<Modal title="titlee" onRequestClose={ onRequestClose }>
			<form id="editModalForm" onSubmit={ onHandleSubmit }>
				{ controls.map( ( control, index ) => {
					// Modify value before showing the value
					const preRender =
						typeof control.preRender === 'function'
							? control.preRender
							: ( value ) => value;

					return createElement( getField( control.type ), {
						onChange: () => {},
						...control.attr,
						key: index,
						name: control.id,
						defaultValue: ! hasFormData.length
							? preRender( hasFormData[ control.id ] )
							: '',
					} );
				} ) }
				{ ! hasFormData.length && (
					<TextControl
						type="hidden"
						name="index"
						value={ hasFormData.index }
					/>
				) }
				<Button isPrimary isLarge type="submit">
					{ entityLabel }
				</Button>
			</form>
		</Modal>
	);
}

export default ListControlModal;
