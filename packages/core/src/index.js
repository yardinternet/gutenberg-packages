/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as alert from './alert';
import * as breadcrumbs from './breadcrumbs';
import * as buttonGroup from './button-group';
import * as card from './card';
import * as carousel from './carousel';
import * as collapseList from './collapse';
import * as collapseItem from './collapse/collapse-item';
import * as facetwp from './facetwp';
import * as fontawesome from './fontawesome';
import * as googlemap from './googlemap';
import * as grid from './grid';
import * as gridColumn from './grid/column';
import * as listposts from './listposts';
import * as icon from './icon';
import * as iconList from './iconlist';
import * as iconListItem from './iconlist/iconlist-item';
import * as iframe from './iframe';
import * as navmenu from './navmenu';
import * as preset from './preset';
import * as row from './row';
import * as rowColumn from './column';
import * as socialshare from './socialshare';
import * as spacer from './spacer';
import * as sticky from './sticky';
import * as tab from './tabs/tab';
import * as tabs from './tabs';
import * as timeline from './timeline';
import * as timelineColumn from './timeline/timeline-column';

export function registerBlocks() {
	[ collapseList, collapseItem, spacer ].forEach( ( { name, settings } ) => {
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

// Manual export, to import your blocks manually
export {
	alert,
	breadcrumbs,
	buttonGroup,
	carousel,
	collapseItem,
	collapseList,
	card,
	facetwp,
	fontawesome,
	googlemap,
	grid,
	gridColumn,
	icon,
	iconList,
	iconListItem,
	iframe,
	listposts,
	navmenu,
	preset,
	row,
	rowColumn,
	socialshare,
	spacer,
	sticky,
	tab,
	tabs,
	timeline,
	timelineColumn,
};
