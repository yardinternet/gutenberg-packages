/**
 * Internal dependencies
 */
import CardEdit from './edit';
import CardSave from './save';

const { __ } = wp.i18n;

const name = 'yard-blocks/card';
const icon = 'fas fa-copy'; // dffs

const settings = {
	title: __( 'Kaart', 'yard-blocks' ),
	description: __( 'Plaats een kaart in de pagina.', 'yard-blocks' ),

	attributes: {
		url: {
			type: 'string',
		},
		marginTopClass: {
			type: 'string',
			default: '',
		},
		marginBottomClass: {
			type: 'string',
			default: '',
		},
		paddingTopClass: {
			type: 'string',
			default: '',
		},
		paddingBottomClass: {
			type: 'string',
			default: '',
		},
		paddingLeftClass: {
			type: 'string',
			default: '',
		},
		paddingRightClass: {
			type: 'string',
			default: '',
		},
		bgColor: {
			type: 'string',
			default: '',
		},
		elevate: {
			type: 'boolean',
		},
	},
	edit: CardEdit,
	save: CardSave,
};

export { icon, name, settings };
