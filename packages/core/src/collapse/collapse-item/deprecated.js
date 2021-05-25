/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	// since 1.3.0
	{
		attributes: {
			headerText: {
				type: 'string',
				default: ' ',
			},
			showOpen: {
				type: 'boolean',
				default: false,
			},
			isAccordion: {
				type: 'boolean',
				default: true,
			},
			id: {
				type: 'number',
				default: 0,
			},
		},
		save( props ) {
			const { attributes } = props;
			const { id, headerText, showOpen, isAccordion } = attributes;

			return (
				<div className={ `yard-blocks-collapse-item` }>
					<div className={ `yard-blocks-collapse-item__header` }>
						<button
							className={ `yard-blocks-collapse-item__button` }
							type={ `button` }
							data-toggle={ `collapse` }
							data-target={ `#collapse-${ id }` }
							aria-expanded="false"
							aria-controls={ `collapse-${ id }` }
						>
							{ headerText }
						</button>
					</div>
					<div
						className={ `collapse ${ showOpen ? 'show' : '' }` }
						id={ `collapse-${ id }` }
						data-parent={ isAccordion ? '#accordion' : false }
					>
						<div className={ `yard-blocks-collapse-item__body` }>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
