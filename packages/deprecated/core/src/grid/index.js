/**
 * External dependencies
 */
import {
	BlockIcon,
	getMarginAttributes,
	getPaddingAttributes,
	backgroundAttributes,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';

import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, attributes, supports } = metadata;
const Icon = <BlockIcon faClasses="fas fa-th" />;

const settings = {
	title: __( 'Raster' ),
	description: __(
		'Creëer met het raster verschillende layouts. Rasters kunnen worden gezien als het raamwerk van de pagina.'
	),
	category: 'yard-blocks',
	edit,
	attributes: {
		...attributes,
		...backgroundAttributes,
		...getMarginAttributes(),
		...getPaddingAttributes(),
	},
	icon: {
		src: Icon,
	},
	deprecated,
	supports,
	save,
};

export { settings, name };
