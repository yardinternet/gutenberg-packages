/**
 * External dependencies
 */
import parse from 'html-react-parser';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	// Since adding structured data
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
				type: 'string',
				default: '0',
			},
			parentClientId: {
				type: 'string',
				default: '0',
			},
			heading: {
				type: 'string',
				default: '',
			},
		},
		save( props ) {
			const { attributes } = props;
			const {
				id,
				headerText,
				showOpen,
				isAccordion,
				parentClientId,
				heading,
			} = attributes;

			const button = () => {
				return `
					<button
						class="yard-blocks-collapse-item__button"
						type="button"
						data-toggle="collapse"
						data-target="#collapse-${ id }"
						aria-expanded="false"
						aria-controls="collapse-${ id }"
					>
						${ headerText }
					</button>
				`;
			};

			const header = () => {
				if ( heading === '' ) return button();

				return `
					<${ heading } class="yard-blocks-collapse-item__heading">
						${ button() }
					</${ heading }>
				`;
			};

			return (
				<div className="yard-blocks-collapse-item">
					<div className="yard-blocks-collapse-item__header">
						{ parse( header() ) }
					</div>
					<div
						className={ `collapse ${ showOpen ? 'show' : '' }` }
						id={ `collapse-${ id }` }
						data-parent={
							isAccordion
								? `#accordion-${ parentClientId }`
								: null
						}
					>
						<div className="yard-blocks-collapse-item__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
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
				type: 'string',
				default: '0',
			},
			parentClientId: {
				type: 'string',
				default: '0',
			},
			heading: {
				type: 'string',
				default: '',
			},
		},
		save( props ) {
			const { attributes } = props;
			const {
				id,
				headerText,
				showOpen,
				isAccordion,
				parentClientId,
				heading,
			} = attributes;

			const button = () => {
				return `
					<button
						class="yard-blocks-collapse-item__button"
						type="button"
						data-toggle="collapse"
						data-target="#collapse-${ id }"
						aria-expanded="false"
						aria-controls="collapse-${ id }"
					>
						${ headerText }
					</button>
				`;
			};

			const header = () => {
				if ( heading === '' ) return button();

				return `
					<${ heading } class="yard-blocks-collapse-item__heading">
						${ button() }
					</${ heading }>
				`;
			};

			return (
				<div className="yard-blocks-collapse-item">
					<div className="yard-blocks-collapse-item__header">
						{ parse( header() ) }
					</div>
					<div
						className={ `collapse ${ showOpen ? 'show' : '' }` }
						id={ `collapse-${ id }` }
						data-parent={
							isAccordion
								? `#accordion-${ parentClientId }`
								: false
						}
					>
						<div className="yard-blocks-collapse-item__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
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
				type: 'string',
				default: '0',
			},
			parentClientId: {
				type: 'string',
				default: '0',
			},
		},
		save( props ) {
			const { attributes } = props;
			const { id, headerText, showOpen, isAccordion, parentClientId } =
				attributes;

			return (
				<div className="yard-blocks-collapse-item">
					<div className="yard-blocks-collapse-item__header">
						<button
							className="yard-blocks-collapse-item__button"
							type="button"
							data-toggle="collapse"
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
						data-parent={
							isAccordion
								? `#accordion-${ parentClientId }`
								: false
						}
					>
						<div className="yard-blocks-collapse-item__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
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
				<div className="yard-blocks-collapse-item">
					<div className="yard-blocks-collapse-item__header">
						<button
							className="yard-blocks-collapse-item__button"
							type="button"
							data-toggle="collapse"
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
						<div className="yard-blocks-collapse-item__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
