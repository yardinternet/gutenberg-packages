import { __ } from '@wordpress/i18n';

import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Spacer' ),
	category: 'yard-blocks',
	description: __( 'test' ),
	edit: () => <div>Edit</div>,
	save: () => <div>save</div>,
};
