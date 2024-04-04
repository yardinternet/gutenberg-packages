/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Column from './components/column';
import ColumnDeprecated from './components/column-deprecated';
import { attributes } from './settings';

const deprecated = [
	// since 1.2.6
	{
		attributes: {
			editIsSelected: {
				type: 'boolean',
				default: false,
			},
			colClassLg: {
				type: 'number',
				default: 0,
			},
			colClass: {
				type: 'number',
				default: 6,
			},
			colClassSm: {
				type: 'number',
				default: 0,
			},
			colClassXs: {
				type: 'number',
				default: 0,
			},
		},

		save: ( props ) => {
			return (
				<Column { ...props }>
					<InnerBlocks.Content />
				</Column>
			);
		},
	},
	// Deprecated version is used in EVB Plus
	{
		attributes,

		save: ( props ) => {
			return (
				<ColumnDeprecated { ...props }>
					<InnerBlocks.Content />
				</ColumnDeprecated>
			);
		},
	},
	// Set default of isFlex to true
	{
		attributes: {
			...attributes,
			isFlex: {
				type: 'boolean',
				default: true,
			},
		},

		isEligible: () => {
			return true;
		},

		save: ( props ) => {
			return (
				<Column { ...props }>
					<InnerBlocks.Content />
				</Column>
			);
		},
	},
];

export default deprecated;
