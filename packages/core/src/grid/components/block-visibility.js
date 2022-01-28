/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export const BlockVisibilityControls = ( { displayBlock, setAttributes } ) => {
	const toggleDisplayBlock = () => {
		setAttributes( { displayBlock: ! displayBlock } );
	};

	return (
		<BlockControls
			controls={ [
				{
					icon: 'hidden',
					title: displayBlock
						? __( 'Blok verbergen' )
						: __( 'Blok tonen' ),
					onClick: () => toggleDisplayBlock(),
					isActive: ! displayBlock,
				},
			] }
		/>
	);
};

export const BlockVisibilityOverlay = ( { name } ) => (
	<div className="block-visibility-overlay">
		<p className="block-visibility-overlay-text">
			Het &quot;{ name }&quot; blok wordt niet getoond op de website.
		</p>
	</div>
);
