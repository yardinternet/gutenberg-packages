/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { backgroundAttributes } from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import { attributes, name } from './settings';

import edit from './edit';
import save from './save';

const icon = 'fal fa-grip-lines';

const settings = {
	title: __( 'Rij' ),
	description: __(
		'Een strook in de pagina die bestaat uit verschillende kolommen. Rijen kunnen worden gezien als het raamwerk van de pagina.'
	),
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit,

	attributes: { ...attributes, ...backgroundAttributes },

	save,
};

export { icon, name, settings };
