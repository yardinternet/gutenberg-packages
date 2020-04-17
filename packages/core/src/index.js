import { registerBlockType } from '@wordpress/blocks';

import * as spacer from './spacer';

export function registerBlocks() {
	[ spacer ].map( ( { name, settings } ) => {
		registerBlockType( name, {
			...settings,
		} );
	} );
}
