const { Fragment } = wp.element;
const { MediaUpload } = wp.editor;
const { Button, Dashicon, SelectControl } = wp.components;
const { __ } = wp.i18n;

const BackgroundImageControl = ( props ) => {
	const { setAttributes, attributes } = props;
	const { bgImgUrl, bgPosition, bgRepeat, bgSize } = attributes;

	return (
		<Fragment>
			<p className="yard-label">{ __( 'Background image' ) }</p>
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
							{ __( 'Select Image' ) }
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
									label={ __( 'Background position' ) }
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
									label={ __( 'Background repeat' ) }
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
									label={ __( 'Background size' ) }
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
