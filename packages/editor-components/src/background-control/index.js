/**
 * WordPress dependencies
 */
import {
	Button,
	Dashicon,
	SelectControl,
	FocalPointPicker,
	RangeControl,
	TabPanel,
	ToggleControl,
} from '@wordpress/components';

import { MediaUpload, ColorPalette } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const BackgroundControl = ( props ) => {
	const { setAttributes, attributes } = props;
	const {
		bgImgUrl,
		bgColor,
		dimRatio,
		bgRepeat,
		bgSize,
		focalPoint,
		backgroundFixed,
	} = attributes;

	const focalPointDimensions = {
		width: 400,
		height: 100,
	};

	const tabImageUpload = [
		{
			name: `background`,
			title: 'Algemeen',
			className: 'tabpanel__btn',
		},
	];

	const tabImageAdvanced = [
		{
			name: `background-advanced`,
			title: 'Gevanceerd',
			className: 'tabpanel__btn',
		},
	];

	return (
		<>
			<TabPanel
				className="tab-panel--layout"
				activeClass="active-tab"
				tabs={ [
					...tabImageUpload,
					...( bgImgUrl ? tabImageAdvanced : [] ),
				] }
			>
				{ ( tab ) => {
					switch ( tab.name ) {
						case `background`:
							return (
								<>
									<MediaUpload
										onSelect={ ( img ) =>
											setAttributes( {
												bgImgUrl: img.url,
											} )
										}
										type="image"
										value={ bgImgUrl }
										render={ ( { open } ) => (
											<div className="yard-sub-control">
												<Button
													isDefault
													isLarge
													className={ 'yard-btn' }
													onClick={ open }
												>
													<Dashicon icon="format-image" />
													{ __( 'Afbeelding' ) }
												</Button>
												{ bgImgUrl && (
													<Button
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
												) }
											</div>
										) }
									/>
									{ bgImgUrl && (
										<img
											style={ { marginBottom: '1rem' } }
											src={ bgImgUrl }
											alt=""
										/>
									) }
									{ bgImgUrl && bgColor && (
										<RangeControl
											label="Achtergrond dekking"
											value={
												dimRatio !== undefined
													? dimRatio
													: 0
											}
											onChange={ ( number ) =>
												setAttributes( {
													dimRatio: parseInt(
														number,
														10
													),
												} )
											}
											min={ 0 }
											max={ 100 }
											step={ 10 }
										/>
									) }
									<p className={ 'yard-label' }>
										{ __( 'Achtergrond kleur' ) }
									</p>
									<ColorPalette
										value={ bgColor }
										onChange={ ( color ) =>
											setAttributes( { bgColor: color } )
										}
									/>
								</>
							);

						case `background-advanced`:
							return bgImgUrl ? (
								<>
									<ToggleControl
										label={ __( 'Vaste achtergrond' ) }
										checked={ backgroundFixed }
										onChange={ () =>
											setAttributes( {
												backgroundFixed: ! backgroundFixed,
												bgSize: 'cover',
											} )
										}
									/>

									<FocalPointPicker
										label={ __( 'Focal Point Picker' ) }
										url={ bgImgUrl }
										dimensions={ focalPointDimensions }
										value={ focalPoint }
										onChange={ ( point ) =>
											setAttributes( {
												focalPoint: point,
											} )
										}
									/>
									<SelectControl
										label={ __( 'Background repeat' ) }
										value={ bgRepeat }
										onChange={ ( repeat ) => {
											setAttributes( {
												bgRepeat: repeat,
											} );
										} }
										options={ [
											{
												value: 'no-repeat',
												label: 'No repeat',
											},
											{
												value: 'repeat',
												label: 'Repeat',
											},
											{
												value: 'repeat-x',
												label: 'Repeat-x',
											},
											{
												value: 'repeat-y',
												label: 'Repeat-y',
											},
										] }
									/>
									<SelectControl
										label={ __( 'Background size' ) }
										value={ bgSize }
										onChange={ ( size ) => {
											setAttributes( {
												bgSize: size,
											} );
										} }
										options={ [
											{
												value: 'auto',
												label: 'Auto',
											},
											{
												value: 'cover',
												label: 'Cover',
											},
											{
												value: 'contain',
												label: 'Contain',
											},
										] }
									/>
								</>
							) : null;

						default:
							throw new Error( 'no valid tab' );
					}
				} }
			</TabPanel>
		</>
	);
};

export default BackgroundControl;
