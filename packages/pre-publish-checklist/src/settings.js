/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

export const settings = applyFilters( 'yard-blocks.prePublishChecklist', [
	{
		postType: 'page',
		title: {
			required: false,
		},
		wordCount: {
			required: false,
			minWords: 1,
			maxWords: 1000,
		},
		featuredImage: {
			required: false,
		},
		excerpt: {
			required: false,
		},
		taxonomies: [
			{
				name: '',
				key: '_ys_',
				minSelected: 1,
				maxSelected: 3,
			},
		],
	},
] );

export const customCheck = applyFilters(
	'yard-blocks.prePublishChecklistCustomCheck',
	[]
);
