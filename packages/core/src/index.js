/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as spacer from './spacer';
import * as collapseList from './collapse';
import * as collapseItem from './collapse/collapse-item';
import * as grid from './grid';
import * as gridColumn from './grid/column';

export function registerBlocks() {
	[ spacer, collapseList, collapseItem ].forEach( ( { name, settings } ) => {
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

//export { * as grid } from './grid';
// Export for yard-blocks
export { grid, gridColumn };
//export { default as GridColumn } from './grid/column';
