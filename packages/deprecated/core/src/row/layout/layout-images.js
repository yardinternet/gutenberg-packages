/**
 * Internal dependencies
 */
import {
	singleCol,
	singleColCentered,
	twoEqualCol,
	twoHeavyLeftCol,
	twoHeavyRightCol,
	threeEqualCol,
	collapseCols,
} from './assets';

const layoutImages = {
	fullWidth: {
		label: 'Full width',
		image: singleCol,
	},
	fullWidthCentered: {
		label: 'Full width col centered',
		image: singleColCentered,
	},
	equalWidth: {
		label: 'Equal width',
		image: twoEqualCol,
	},
	twoHeavyLeft: {
		label: 'Heavy right 9 / 3',
		image: twoHeavyLeftCol,
	},
	twoHeavyRight: {
		label: 'Heavy right 3 / 9',
		image: twoHeavyRightCol,
	},
	threeEqualWidth: {
		label: '3 3 3',
		image: threeEqualCol,
	},
	collapseRows: {
		label: 'Collapse rows',
		image: collapseCols,
	},
};

export default layoutImages;
