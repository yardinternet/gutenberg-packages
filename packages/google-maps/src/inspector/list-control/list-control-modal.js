import {
	Button,
	Modal,
	BaseControl,
	TextControl,
	SelectControl,
	TextareaControl,
	ColorPicker,
	ColorPalette,
} from '@wordpress/components';
import { isValidHex } from '../../helpers';
import { createElement } from '@wordpress/element';
import ToggleSwitch from '../toggle-switch';
function ListControlModal( {
	hasFormData = {},
	controls = [],
	onRequestClose = () => {},
	onSubmit = () => {},
	entityLabel = '',
	title = '',
} ) {
	const getField = ( type ) => {
		switch ( type ) {
			case 'TextControl':
				return TextControl;
			case 'SelectControl':
				return SelectControl;
			case 'TextareaControl':
				return TextareaControl;
			case 'ColorPicker':
				return ColorPicker;
			case 'BaseControl':
				return BaseControl;
			case 'ColorPalette':
				return ColorPalette;
			case 'ToggleSwitch':
				return ToggleSwitch;
			default:
				throw new Error( 'Fieldtype not supported' );
		}
	};

	const onHandleSubmit = ( e ) => {
		const formData = {};
		e.preventDefault();
		let fillColorFound = false;
		if ( e.target.length > 0 ) {
			for ( let i = 0; i < e.target.length; i++ ) {
				const name = e.target[ i ].name;
				const value = e.target[ i ].value;

				if (
					e.target[ i ].type === 'submit' ||
					e.target[ i ].type === 'button'
				) {
					continue;
				}

				if ( !! name.length ) {
					formData[ name ] = value;
				}

				// For colorPicker
				if ( isValidHex( value ) ) {
					if ( ! fillColorFound ) {
						formData.color = value;
						fillColorFound = true;
					} else {
						formData.borderColor = value;
					}
				}

				e.target[ i ].value = '';
			}
		}

		onSubmit( formData );
	};

	return (
		<Modal title={ title } onRequestClose={ onRequestClose }>
			<form id="editModalForm" onSubmit={ onHandleSubmit }>
				{ controls.map( ( control, index ) => {
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
						...( control.type === 'ColorPicker' && {
							color: hasFormData[ control.id ],
						} ),
						...( control.type === 'ToggleSwitch' && {
							checked: hasFormData[ control.id ],
						} ),
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
