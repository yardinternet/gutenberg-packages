import * as PdcSearch from './blocks/pdc-search';
import * as PdcGreeting from './blocks/pdc-greeting';
import * as PubListPosts from './blocks/pdc-listposts';
import * as PdcServicePoints from './blocks/pdc-servicepoints';

import { BLOCK_CATEGORY, ICON_SETTINGS } from './config/settings';
import { registerBlockType } from '@wordpress/blocks';

export function registerGemeentenBlocks() {
	[ PdcSearch, PdcGreeting, PubListPosts, PdcServicePoints ].map(
		( { name, settings } ) => {
			return registerBlockType( name, {
				...settings,
				icon: {
					...settings.icon,
					...ICON_SETTINGS,
				},
				category: BLOCK_CATEGORY,
			} );
		}
	);
}
