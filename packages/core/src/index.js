import { registerBlockType } from '@wordpress/blocks';

import * as spacer from './spacer';

export function registerBlocks() {
	[ spacer ].forEach( ( { name, settings } ) => {
		registerBlockType( name, {
			...settings,
			icon: {
				...settings.icon,
				background: '#0293b0',
				foreground: '#fff',
			},
		} );
	} );
}
