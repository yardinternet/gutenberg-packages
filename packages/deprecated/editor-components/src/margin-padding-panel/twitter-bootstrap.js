/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';

const { SelectControl, PanelBody } = wp.components;
const { __ } = wp.i18n;

const sizingClasses = [
	{
		label: 'None',
		value: '',
	},
	{
		label: 'Tiny',
		value: '{property}{direction}-1',
	},
	{
		label: 'Small',
		value: '{property}{direction}-2',
	},
	{
		label: 'Medium',
		value: '{property}{direction}-3',
	},
	{
		label: 'Large',
		value: '{property}{direction}-4',
	},
	{
		label: 'Extra large',
		value: '{property}{direction}-5',
	},
];

const TwitterBootstrap = ( props ) => {
	const {
		setAttributes,
		marginTopClass,
		marginBottomClass,
		paddingTopClass,
		paddingBottomClass,
		paddingLeftClass,
		paddingRightClass,
	} = props;

	/**
	 *
	 * @param {string} attribute - class property, marginTopClass etc.
	 * @param {string} value     - formatted value, mt-2, pb-1 etc.
	 */
	const setValue = ( attribute, value ) => {
		setAttributes( {
			[ attribute ]: value,
		} );
	};

	/**
	 *
	 * @param {string} value     - from sizingclasses
	 * @param {string} property  - m(margin) or p(padding)
	 * @param {string} direction - t,b,l,r( right )
	 * @return {string} - formatted value
	 */
	const formatValue = ( value, property, direction ) => {
		if ( value === undefined && ! value.length ) {
			return '';
		}

		const formattedValue = value.replace( '{direction}', direction );

		return formattedValue.replace( '{property}', property );
	};

	/**
	 *
	 * @param {string} options   - sizing classes
	 * @param {string} property  - m(margin) or p(padding)
	 * @param {string} direction - t,b,l,r( right )
	 * @return {Array} - formatted options
	 */
	const formatOptions = ( options, property, direction ) => {
		return options.map( ( option ) => {
			return {
				label: option.label,
				value: formatValue( option.value, property, direction ),
			};
		} );
	};

	return (
		<PanelBody
			title={ __( 'Margin/Padding', 'text-domain' ) }
			initialOpen={ false }
		>
			<Fragment>
				<SelectControl
					label={ __( 'Margin top' ) }
					value={ marginTopClass }
					onChange={ ( newMarginTopClass ) =>
						setValue( 'marginTopClass', newMarginTopClass )
					}
					options={ formatOptions( sizingClasses, 'm', 't' ) }
				/>
				<SelectControl
					label={ __( 'Margin bottom' ) }
					value={ marginBottomClass }
					onChange={ ( newMarginBottomClass ) =>
						setValue( 'marginBottomClass', newMarginBottomClass )
					}
					options={ formatOptions( sizingClasses, 'm', 'b' ) }
				/>
				<SelectControl
					label={ __( 'Padding top' ) }
					value={ paddingTopClass }
					onChange={ ( newPaddingTopClass ) =>
						setValue( 'paddingTopClass', newPaddingTopClass )
					}
					options={ formatOptions( sizingClasses, 'p', 't' ) }
				/>
				<SelectControl
					label={ __( 'Padding bottom' ) }
					value={ paddingBottomClass }
					onChange={ ( newPaddingBottomClass ) =>
						setValue( 'paddingBottomClass', newPaddingBottomClass )
					}
					options={ formatOptions( sizingClasses, 'p', 'b' ) }
				/>
				<SelectControl
					label={ __( 'Padding left' ) }
					value={ paddingLeftClass }
					onChange={ ( newPaddingLeftClass ) =>
						setValue( 'paddingLeftClass', newPaddingLeftClass )
					}
					options={ formatOptions( sizingClasses, 'p', 'l' ) }
				/>
				<SelectControl
					label={ __( 'Padding right' ) }
					value={ paddingRightClass }
					onChange={ ( newPaddingRightClass ) =>
						setValue( 'paddingRightClass', newPaddingRightClass )
					}
					options={ formatOptions( sizingClasses, 'p', 'r' ) }
				/>
			</Fragment>
		</PanelBody>
	);
};

export default TwitterBootstrap;
