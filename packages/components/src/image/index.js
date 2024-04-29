/**
 * WordPress dependencies
 */
import { MediaPlaceholder, InspectorControls } from '@wordpress/block-editor';
import {
	Spinner,
	FocalPointPicker,
	PanelBody,
	Placeholder,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { useMedia } from '@yardinternet/gutenberg-hooks';

export const Image = ( props ) => {
	const {
		id,
		size = 'full',
		onSelect,
		focalPoint = { x: 0.5, y: 0.5 },
		onChangeFocalPoint,
		labels = {},
		canEditImage = true,
		allowedTypes = [ 'image' ],
		...rest
	} = props;
	const hasImage = !! id;
	const { media, isResolvingMedia } = useMedia( id );

	const shouldDisplayFocalPointPicker =
		typeof onChangeFocalPoint === 'function';

	if ( ! hasImage && ! canEditImage ) {
		return (
			<Placeholder
				className="block-editor-media-placeholder"
				withIllustration
			/>
		);
	}

	if ( ! hasImage && canEditImage ) {
		return (
			<MediaPlaceholder
				labels={ labels }
				onSelect={ onSelect }
				accept="image"
				multiple={ false }
				allowedTypes={ allowedTypes }
			/>
		);
	}

	if ( isResolvingMedia ) {
		return <Spinner />;
	}

	const imageUrl =
		media?.media_details?.sizes?.[ size ]?.source_url ?? media?.source_url;
	const altText = media?.alt_text;

	if ( shouldDisplayFocalPointPicker ) {
		const focalPointStyle = {
			objectFit: 'cover',
			objectPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`,
		};

		rest.style = {
			...rest.style,
			...focalPointStyle,
		};
	}

	return (
		<>
			{ shouldDisplayFocalPointPicker && (
				<InspectorControls>
					<PanelBody title={ __( 'Afbeelding focuspunt' ) }>
						<FocalPointPicker
							label={ __(
								'Kies het focuspunt van de afbeelding'
							) }
							url={ imageUrl }
							value={ focalPoint }
							onChange={ onChangeFocalPoint }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<img src={ imageUrl } alt={ altText } { ...rest } />
		</>
	);
};
