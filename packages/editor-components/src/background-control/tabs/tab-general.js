import { useSelect } from '@wordpress/data';
import { MediaUpload, ColorPalette } from '@wordpress/block-editor';
import {
	Button,
	Dashicon,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { populateSelectFromMediaSizes, getImageSizeByUrl } from '../helpers';

export default function TabGeneral( {
	attributes = {},
	setAttributes = () => {},
} ) {
	const { dimRatio, bgColor, bgImgId, bgImgUrl } = attributes;

	const mediaImagesSizes = useSelect( ( select ) => {
		if ( ! bgImgId ) {
			return null;
		}

		const media = select( 'core' ).getMedia( bgImgId );

		if ( media && media.media_details ) {
			return media.media_details.sizes;
		}

		return null;
	}, [] );

	/**
	 * Get available imageSizes defined by WP
	 */
	const imageSizes = useSelect(
		( select ) => select( 'core/block-editor' ).getSettings().imageSizes
	);

	return (
		<>
			<MediaUpload
				onSelect={ ( img ) =>
					setAttributes( {
						bgImgId: img.id,
						bgImgUrl: img.url,
					} )
				}
				type="image"
				value={ bgImgUrl }
				render={ ( { open } ) => (
					<div className="yard-sub-control">
						{ ! bgImgUrl && (
							<Button
								isDefault
								isLarge
								className={ 'yard-btn' }
								onClick={ open }
							>
								<Dashicon icon="format-image" />
								{ __( 'Selecteer afbeelding' ) }
							</Button>
						) }
						{ bgImgUrl && (
							<div style={ { position: 'relative' } }>
								<img src={ bgImgUrl } alt="" />
								<Button
									isPrimary
									style={ {
										position: 'absolute',
										top: '10px',
										right: '58px',
									} }
									isDefault
									isLarge
									className={ 'yard-btn' }
									onClick={ open }
								>
									<Dashicon icon="edit" />
								</Button>
								<Button
									style={ {
										position: 'absolute',
										top: '10px',
										right: '10px',
									} }
									isDefault
									isLarge
									className={ 'yard-btn' }
									onClick={ () =>
										setAttributes( {
											bgImgUrl: '',
										} )
									}
								>
									<Dashicon icon="no-alt" />
								</Button>
							</div>
						) }
					</div>
				) }
			/>
			{ mediaImagesSizes && bgImgUrl && imageSizes && (
				<SelectControl
					label={ __( 'Selecteer formaat' ) }
					options={ populateSelectFromMediaSizes(
						mediaImagesSizes,
						imageSizes
					) }
					value={ getImageSizeByUrl( bgImgUrl, mediaImagesSizes ) }
					onChange={ ( value ) => {
						setAttributes( {
							bgImgUrl: value,
						} );
					} }
				/>
			) }
			{ bgImgUrl && bgColor && (
				<RangeControl
					label="Achtergrond dekking"
					value={ dimRatio !== undefined ? dimRatio : 0 }
					onChange={ ( number ) =>
						setAttributes( {
							dimRatio: parseInt( number, 10 ),
						} )
					}
					min={ 0 }
					max={ 100 }
					step={ 10 }
				/>
			) }
			<p className={ 'yard-label' }>{ __( 'Achtergrond kleur' ) }</p>
			<ColorPalette
				value={ bgColor }
				onChange={ ( color ) => setAttributes( { bgColor: color } ) }
			/>
		</>
	);
}
