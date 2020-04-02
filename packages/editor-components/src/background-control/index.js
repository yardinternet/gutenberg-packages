/**
 * WordPress dependencies
 */
import {
	SelectControl,
	FocalPointPicker,
	TabPanel,
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import TabGeneral from './tabs/tab-general';

const BackgroundControl = ( props ) => {
	const { setAttributes, attributes } = props;
	const {
		bgImgUrl,
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
								<TabGeneral
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
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
