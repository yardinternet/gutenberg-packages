/**
 * WordPress dependencies
 */
import { BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { ToolbarButton, Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { insertBlockAtEnd } from '@yardinternet/gutenberg-editor-components';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import ButtonGroup from './components/button-group';

const TEMPLATE = [
	[ 'core/button', { text: 'Contact' } ],
	[ 'core/button', { text: 'Over ons' } ],
];

const ALLOWED_BLOCKS = [ 'core/button' ];

function edit( props ) {
	const { className, clientId, attributes } = props;
	const { btnWidth, btnAlignment } = attributes;

	const insertBlock = () => {
		insertBlockAtEnd( {
			blockName: 'core/button',
			attributes: { text: 'Knop' },
			clientId,
		} );
	};

	return (
		<>
			<Inspector { ...props } />
			<BlockControls>
				<Toolbar label={ __( 'Instellingen' ) }>
					<ToolbarButton
						label={ __( 'Knop toevoegen' ) }
						icon="plus"
						onClick={ insertBlock }
					/>
				</Toolbar>
			</BlockControls>
			<ButtonGroup
				btnAlignment={ btnAlignment }
				btnWidth={ btnWidth }
				className={ className }
			>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					renderAppender={ false }
				/>
			</ButtonGroup>
		</>
	);
}

export default edit;
