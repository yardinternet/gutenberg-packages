// Import and export all blocks
/**
 * Internal dependencies
 */
import './unregister-blocks';
import * as greetings from './blocks/greetings';
import * as pdcGreeting from './blocks/pdc-greeting';
import * as pdcSearch from './blocks/pdc-search';
import * as pdcServicePoints from './blocks/pdc-servicepoints';
import * as pubListPosts from './blocks/pub-listposts';
import * as pubPoll from './blocks/pub-poll';

export { SEARCH_ENDPOINT } from './config/endpoints';
export * from './blocks/pdc-search';
export { registerGemeentenBlocks } from './register-blocks';

export { greetings, pdcGreeting, pdcSearch, pdcServicePoints, pubListPosts, pubPoll };
