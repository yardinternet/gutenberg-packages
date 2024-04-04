export const name = 'yard-blocks/column';

export const attributes = {
	id: {
		type: 'number',
		default: 1,
	},
	// paddingClass is deprecated but still needed see https://github.com/WordPress/gutenberg/issues/10406
	paddingClass: {
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
	isHidden: {
		type: 'boolean',
		default: false,
	},
	bgColor: {
		type: 'string',
		default: '',
	},
	isFlex: {
		type: 'boolean',
		default: false,
	},
	flexDirection: {
		type: 'string',
		default: 'flex-direction-column',
	},
	alignItems: {
		type: 'string',
		default: 'align-items-center',
	},
	justifyContent: {
		type: 'string',
		default: 'justify-content-center',
	},
};
