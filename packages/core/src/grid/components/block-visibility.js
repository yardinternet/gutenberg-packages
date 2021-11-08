/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export const BlockVisibilityControls = ( { displayBlock, setAttributes } ) => {
	const toggleDisplayBlock = ( value ) => {
		setAttributes( { displayBlock: value } );
	};

	return (
		<BlockControls
			controls={ [
				{
					icon: 'visibility',
					title: __( 'Blok tonen' ),
					onClick: () => toggleDisplayBlock( true ),
					isActive: displayBlock,
				},
				{
					icon: 'hidden',
					title: __( 'Blok verbergen' ),
					onClick: () => toggleDisplayBlock( false ),
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
