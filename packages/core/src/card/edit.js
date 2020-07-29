/**
 * Internal dependencies
 */
import Card from './components/card';
import Inspector from './components/inspector';

const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;
const { Fragment } = wp.element;
const { applyFilters } = wp.hooks;

const PRESET_TEMPLATE = [
	[ 'core/cover', { className: 'yard-blocks-card__media' }, [] ],
	[ 'core/quote', { className: 'yard-blocks-card__quote' }, [] ],
	[
		'core/heading',
		{ className: 'yard-blocks-card__title', placeholder: __( 'Titel' ) },
		[],
	],
	[
		'core/paragraph',
		{
			className: 'yard-blocks-card__content',
			placeholder: __( 'Content' ),
		},
		[],
	],
	[
		'core/button',
		{ className: 'yard-blocks-card__btn', text: __( 'Lees meer' ) },
		[],
	],
];

const PRESET_ALLOWED_BLOCKS = [
	'core/cover',
	'core/paragraph',
	'core/heading',
	'core/video',
	'core/quote',
];

const TEMPLATE = applyFilters( 'yard-blocks.cardTemplate', PRESET_TEMPLATE );
const ALLOWED_BLOCKS = applyFilters(
	'yard-blocks.cardAllowedBlocks',
	PRESET_ALLOWED_BLOCKS
);

const CardEdit = ( props ) => {
	return (
		<Fragment>
			<Inspector key="inspector" { ...props } />
			<Card { ...props }>
				<InnerBlocks
					template={ TEMPLATE }
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
			</Card>
		</Fragment>
	);
};

export default CardEdit;
