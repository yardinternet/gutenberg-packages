/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

export const TEMPLATE = applyFilters( 'yard-block-cards.template', [
	{
		label: 'Standaard',
		value: 'default',
		cardClass: [],
		innerCardClass: [ 'shadow', 'pb-3' ],
		innerBlocks: [
			[
				'core/cover',
				{
					url:
						'https://images.unsplash.com/photo-1493540288419-cf30fdb13202?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
					minHeight: 200,
					className: 'mb-4 h-auto',
				},
			],
			[
				'core/heading',
				{
					content: 'Here is some content',
					level: 2,
					className: 'px-3',
				},
			],
			[
				'core/paragraph',
				{
					content: 'Here is some content',
					className: 'px-3',
				},
			],
		],
	},
] );
