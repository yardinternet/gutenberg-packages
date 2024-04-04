/**
 * WordPress dependencies
 */
import { MediaUpload } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { Button, Dashicon, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BackgroundImageControl = ( props ) => {
	const { setAttributes, attributes } = props;
	const { bgImgUrl, bgPosition, bgRepeat, bgSize } = attributes;

	return (
		<Fragment>
			<p className="yard-label">{ __( 'Achtergrond afbeelding' ) }</p>
			<MediaUpload
				onSelect={ ( img ) => setAttributes( { bgImgUrl: img.url } ) }
				type="image"
				value={ bgImgUrl }
				render={ ( { open } ) => (
					<Fragment>
						<Button
							style={ {
								marginRight: '10px',
								marginBottom: '20px',
							} }
							className={ 'yard-btn' }
							onClick={ open }
						>
							<Dashicon icon="format-image" />
							{ __( 'Selecteer afbeelding' ) }
						</Button>
						{ bgImgUrl && (
							<Fragment>
								<Button
									className={ 'yard-btn' }
									onClick={ () =>
										setAttributes( { bgImgUrl: '' } )
									}
								>
									<Dashicon icon="no-alt" />
								</Button>
								<SelectControl
									label={ __( 'Achtergrond positie' ) }
									value={ bgPosition }
									onChange={ ( position ) => {
										setAttributes( {
											bgPosition: position,
										} );
									} }
									options={ [
										{ value: '', label: 'None' },
										{
											value: 'center top',
											label: 'Center Top',
										},
										{
											value: 'center center',
											label: 'Center Center',
										},
										{
											value: 'center bottom',
											label: 'Center Bottom',
										},
										{
											value: 'left top',
											label: 'Left Top',
										},
										{
											value: 'left center',
											label: 'Left Center',
										},
										{
											value: 'left bottom',
											label: 'Left Bottom',
										},
										{
											value: 'right top',
											label: 'Right Top',
										},
										{
											value: 'right center',
											label: 'Right Center',
										},
										{
											value: 'right bottom',
											label: 'Right Bottom',
										},
									] }
								/>
								<SelectControl
									label={ __( 'Achtergrond herhalen' ) }
									value={ bgRepeat }
									onChange={ ( repeat ) => {
										setAttributes( { bgRepeat: repeat } );
									} }
									options={ [
										{ value: '', label: 'None' },
										{
											value: 'no-repeat',
											label: 'No repeat',
										},
										{ value: 'repeat', label: 'Repeat' },
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
									label={ __( 'Achtergrond grootte' ) }
									value={ bgSize }
									onChange={ ( size ) => {
										setAttributes( { bgSize: size } );
									} }
									options={ [
										{ value: 'auto', label: 'Auto' },
										{ value: 'cover', label: 'Cover' },
										{ value: 'contain', label: 'Contain' },
									] }
								/>
							</Fragment>
						) }
					</Fragment>
				) }
			/>
		</Fragment>
	);
};

export default BackgroundImageControl;
