import * as PdcSearch from './blocks/pdc-search';
import * as PdcLocations from './blocks/pdc-locations';
import * as PdcGreeting from './blocks/pdc-greeting';
import * as PubLatestPosts from './blocks/ListPostsOpenPub';

import { BLOCK_CATEGORY, ICON_SETTINGS } from './config/settings';
import { registerBlockType } from '@wordpress/blocks';

export function registerGemeentenBlocks() {
	[ PdcSearch, PdcLocations, PdcGreeting, PubLatestPosts ].map(
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
