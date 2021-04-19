/**
 * Internal dependencies
 */
import * as PdcSearch from './blocks/pdc-search';
import * as PdcGreeting from './blocks/pdc-greeting';
import * as PdcThemelist from './blocks/pdc-themelist';
import * as PubListPosts from './blocks/pub-listposts';
import * as PdcServicePoints from './blocks/pdc-servicepoints';
import * as PubPoll from './blocks/pub-poll';

import { BLOCK_CATEGORY, ICON_SETTINGS } from './config/settings';
/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

export function registerGemeentenBlocks() {
	[
		PdcSearch,
		PdcGreeting,
		PdcThemelist,
		PubListPosts,
		PdcServicePoints,
		PubPoll,
	].map( ( { name, settings } ) => {
		return registerBlockType( name, {
			...settings,
			icon: {
				...settings.icon,
				...ICON_SETTINGS,
			},
			category: BLOCK_CATEGORY,
		} );
	} );
}
