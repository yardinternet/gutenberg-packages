import {
	SelectControl,
	FocalPointPicker,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const focalPointDimensions = {
	width: 400,
	height: 100,
};

export default function TabAdvanced( { attributes, setAttributes } ) {
	const {
		backgroundFixed,
		bgImgUrl,
		bgRepeat,
		bgSize,
		focalPoint,
	} = attributes;
	return (
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
	);
}
