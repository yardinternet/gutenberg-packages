/**
 * External dependencies
 */
import { useState, useCallback, Fragment } from 'react';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { pickRelevantMediaFiles } from '@yardinternet/gutenberg-editor-components';
import { Icon } from './index';
import Inspector from './components/inspector';
import CarouselEdit from './components/carouselEdit';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

const { BlockControls, MediaUpload, MediaPlaceholder } = wp.editor;
const { Toolbar, IconButton } = wp.components;

function Edit( props ) {
	const { setAttributes, attributes, isSelected } = props;
	const { carouselImages, anchor, imageSize } = attributes;
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	const onSelectImages = useCallback( ( images ) => {
		setAttributes( {
			carouselImages: images.map( ( image ) =>
				pickRelevantMediaFiles( image, imageSize )
			),
		} );

		setActiveIndex( 0 );
	} );

	// Set default anchor otherwise the carousel wouldn't work
	// TODO: Provide a way to check for multiple carousel on the same page
	if ( isEmpty( anchor ) ) {
		setAttributes( {
			anchor: 'carousel-1',
		} );
	}

	const hasImages = !! carouselImages.length;

	const controls = (
		<BlockControls>
			{ hasImages && (
				<Toolbar>
					<MediaUpload
						onSelect={ onSelectImages }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						multiple
						gallery
						value={ carouselImages.map( ( img ) => img.id ) }
						render={ ( { open } ) => (
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Wijzig carrousel' ) }
								icon="edit"
								onClick={ open }
							/>
						) }
					/>
				</Toolbar>
			) }
		</BlockControls>
	);

	return (
		<Fragment>
			<Inspector { ...props } />
			{ !! carouselImages.length && (
				<CarouselEdit
					{ ...{ activeIndex, setActiveIndex, ...props } }
				/>
			) }

			{ isSelected && (
				<MediaPlaceholder
					addToGallery={ hasImages }
					isApppender={ hasImages }
					onSelect={ onSelectImages }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					icon={ ! hasImages && Icon }
					value={ hasImages ? carouselImages : undefined }
					multiple
					labels={ {
						title: ! hasImages && __( 'Carrousel' ),
						instructions:
							! hasImages &&
							__(
								'Sleep afbeeldingen of upload nieuwe afbeeldingen vanuit de mediabibliotheek.'
							),
					} }
				/>
			) }

			{ controls }
		</Fragment>
	);
}

export default Edit;
