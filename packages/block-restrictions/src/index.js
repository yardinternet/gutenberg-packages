/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Register block restrictions
 *
 * @param {Object} config
 * @param {Object} config.innerBlockRestrictions
 * @param {Object} config.blockSets
 */
export const registerBlockRestrictions = ( config = {} ) => {
	if ( ! config || typeof config !== 'object' ) {
		return;
	}

	const { innerBlockRestrictions = {}, blockSets = {} } = config;

	addFilter(
		'blocks.registerBlockType',
		'yard/restrict-inner-blocks',
		( settings, name ) => {
			const rule = innerBlockRestrictions[ name ];

			if ( ! rule || typeof rule !== 'object' ) {
				return settings;
			}

			return {
				...settings,
				allowedBlocks: resolveAllowedBlocks(
					rule,
					settings.allowedBlocks || [],
					blockSets
				),
			};
		}
	);
};

/**
 * Resolve allowed blocks for a given rule
 *
 * @param {Object} rule
 * @param {Array}  defaultAllowedBlocks
 * @param {Object} blockSets
 *
 * @return {Array} Allowed block names
 */
const resolveAllowedBlocks = (
	rule = {},
	defaultAllowedBlocks = [],
	blockSets = {}
) => {
	if ( rule.blockSet && ! blockSets[ rule.blockSet ] ) {
		// eslint-disable-next-line no-console
		console.error(
			`[@yardinternet/gutenberg-block-restrictions] Unknown blockSet: "${ rule.blockSet }"`
		);
	}

	const base = Array.isArray( blockSets[ rule.blockSet ] )
		? blockSets[ rule.blockSet ]
		: [];

	const add = Array.isArray( rule.add ) ? rule.add : [];
	const remove = Array.isArray( rule.remove ) ? rule.remove : [];

	const merged = [ ...defaultAllowedBlocks, ...base, ...add ];

	return [ ...new Set( merged ) ].filter(
		( blockName ) => ! remove.includes( blockName )
	);
};
