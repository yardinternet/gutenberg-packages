/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';
import { ColorPalette } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const BackgroundColorControl = ( props ) => {
	const { setAttributes, attributes } = props;
	const { bgColor, dimRatio } = attributes;

	return (
		<Fragment>
			<p className={ 'yard-label' }>{ __( 'Background color' ) }</p>
			<ColorPalette
				value={ bgColor }
				onChange={ ( color ) => setAttributes( { bgColor: color } ) }
			/>
			<p className={ 'yard-label' }>{ __( 'Opacity' ) }</p>
			<RangeControl
				label={ __( 'Background Opacity' ) }
				value={ dimRatio }
				onChange={ ( number ) =>
					setAttributes( { dimRatio: parseInt( number, 10 ) } )
				}
				min={ 0 }
				max={ 100 }
				step={ 10 }
				required
			/>
		</Fragment>
	);
};

export default BackgroundColorControl;
