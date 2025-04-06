/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	MediaReplaceFlow,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

/**
 * External dependencies
 */
import { useMedia } from '@yardinternet/gutenberg-hooks';

export const MediaToolbar = ( {
	onSelect,
	onRemove,
	isOptional = false,
	id,
} ) => {
	const hasImage = !! id;
	const { media } = useMedia( id );

	return (
		<ToolbarGroup label={ __( 'Media' ) }>
			{ hasImage ? (
				<>
					<MediaReplaceFlow
						mediaUrl={ media?.source_url }
						onSelect={ onSelect }
						name={ __( 'Vervangen' ) }
					/>
					{ !! isOptional && (
						<ToolbarButton onClick={ onRemove }>
							{ __( 'Media verwijderen' ) }
						</ToolbarButton>
					) }
				</>
			) : (
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ onSelect }
						render={ ( { open } ) => (
							<ToolbarButton onClick={ open }>
								{ __( 'Media toevoegen' ) }
							</ToolbarButton>
						) }
					/>
				</MediaUploadCheck>
			) }
		</ToolbarGroup>
	);
};
