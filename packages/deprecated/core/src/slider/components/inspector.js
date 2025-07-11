/**
 * WordPress dependencies
 */
import { RangeControl, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const {
		slidesPerPageDesktop,
		slidesPerPageLaptop,
		slidesPerPageTablet,
		slidesPerPageMobile,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Instellingen' ) }>
				<RangeControl
					key="slides-per-page-desktop-range-control"
					label={ __( 'Aantal per pagina (Desktop)' ) }
					value={ slidesPerPageDesktop }
					beforeIcon="desktop"
					onChange={ ( value ) =>
						setAttributes( {
							slidesPerPageDesktop: value,
						} )
					}
					min={ 1 }
					max={ 5 }
				/>
				<RangeControl
					key="slides-per-page-laptop-range-control"
					label={ __( 'Aantal per pagina (Laptop)' ) }
					beforeIcon="laptop"
					value={ slidesPerPageLaptop }
					onChange={ ( value ) =>
						setAttributes( {
							slidesPerPageLaptop: value,
						} )
					}
					min={ 1 }
					max={ 5 }
				/>
				<RangeControl
					key="slides-per-page-tablet-range-control"
					label={ __( 'Aantal per pagina (Tablet)' ) }
					beforeIcon="tablet"
					value={ slidesPerPageTablet }
					onChange={ ( value ) =>
						setAttributes( {
							slidesPerPageTablet: value,
						} )
					}
					min={ 1 }
					max={ 5 }
				/>
				<RangeControl
					key="slides-per-page-mobile-range-control"
					label={ __( 'Aantal per pagina (Mobiel)' ) }
					value={ slidesPerPageMobile }
					beforeIcon="smartphone"
					onChange={ ( value ) =>
						setAttributes( {
							slidesPerPageMobile: value,
						} )
					}
					min={ 1 }
					max={ 5 }
				/>
			</PanelBody>
		</InspectorControls>
	);
}
