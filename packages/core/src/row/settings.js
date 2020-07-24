export const name = 'yard-blocks/row';

export const attributes = {
	columns: {
		default: 1,
		type: 'number',
	},
	align: {
		type: 'string',
		default: 'wide',
	},
	alignVertical: {
		type: 'string',
		default: 'center',
	},
	bgColor: {
		type: 'string',
	},
	columnsEqualHeight: {
		type: 'boolean',
		default: false,
	},
	layoutDesktop: {
		type: 'string',
		default: '',
	},
	layoutTablet: {
		type: 'string',
		default: '',
	},
	layoutMobile: {
		type: 'string',
		default: '',
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
	rowClass: {
		type: 'string',
		default: 'row',
	},
	rowHeight: {
		type: 'number',
		default: 150,
	},
	rowStyles: {
		type: 'object',
		default: { minHeight: 'auto' },
	},
	rowHeightAuto: {
		type: 'boolean',
		default: true,
	},
	rowGutter: {
		type: 'boolean',
		default: true,
	},
	hasColumnContainer: {
		type: 'boolean',
		default: false,
	},
};
