/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as collapseList from './collapse';
import * as collapseItem from './collapse/collapse-item';
import * as grid from './grid';
import * as gridColumn from './grid/column';
import * as spacer from './spacer';
import * as row from './row';
import * as rowColumn from './column';

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
export { collapseItem, collapseList, grid, gridColumn, spacer, row, rowColumn };
