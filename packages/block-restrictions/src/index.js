/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { store as blocksStore } from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { createElement } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

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

			// A rule with only `when` would otherwise resolve to [] and allow nothing
			if ( rule.when && ! hasTypeLevelRule( rule ) ) {
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

	const hasConditions = Object.values( innerBlockRestrictions ).some(
		( rule ) => Array.isArray( rule?.when )
	);

	if ( ! hasConditions ) {
		return;
	}

	addFilter(
		'editor.BlockEdit',
		'yard/restrict-inner-blocks-by-condition',
		withConditionalAllowedBlocks( innerBlockRestrictions, blockSets )
	);
};

const withConditionalAllowedBlocks = ( innerBlockRestrictions, blockSets ) =>
	createHigherOrderComponent(
		( BlockEdit ) => ( props ) => {
			const rule = innerBlockRestrictions[ props.name ];

			if ( ! Array.isArray( rule?.when ) ) {
				return createElement( BlockEdit, props );
			}

			const allowedBlocks = getConditionalAllowedBlocks(
				rule,
				getConditionContext( rule, props ),
				blockSets
			);

			if ( ! allowedBlocks ) {
				return createElement( BlockEdit, props );
			}

			return createElement( BlockEdit, {
				...props,
				attributes: { ...props.attributes, allowedBlocks },
			} );
		},
		'withConditionalAllowedBlocks'
	);

const getConditionContext = ( rule, { name, attributes = {} } ) => ( {
	classNames: ( attributes.className || '' ).split( /\s+/ ),
	postType: select( 'core/editor' )?.getCurrentPostType?.(),
	parentVariation: rule.when.some(
		( { parentVariation } ) => parentVariation
	)
		? select( blocksStore ).getActiveBlockVariation( name, attributes )
				?.name
		: undefined,
} );

/**
 * Resolve allowed blocks for the first `when` condition matching the context
 *
 * @param {Object}   rule
 * @param {Object}   context
 * @param {string[]} context.classNames
 * @param {string}   context.postType
 * @param {string}   context.parentVariation
 * @param {Object}   blockSets
 *
 * @return {Array|undefined} Allowed block names, undefined when no condition matches
 */
export const getConditionalAllowedBlocks = (
	rule = {},
	context = {},
	blockSets = {}
) => {
	const condition = ( rule.when || [] ).find( ( when ) =>
		matchesCondition( when, context )
	);

	return condition
		? resolveAllowedBlocks( condition, [], blockSets )
		: undefined;
};

const matchesCondition = (
	{ className, postType, parentVariation },
	{ classNames = [], postType: currentPostType, parentVariation: variation }
) =>
	matches( className, ( value ) => classNames.includes( value ) ) &&
	matches( postType, ( value ) => value === currentPostType ) &&
	matches( parentVariation, ( value ) => value === variation );

const matches = ( expected, test ) =>
	undefined === expected || [].concat( expected ).some( test );

const hasTypeLevelRule = ( rule ) =>
	[ 'blockSet', 'add', 'remove' ].some( ( key ) => key in rule );

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
