/**
 * Internal dependencies
 */
import {
	mapCustomViewsToKeyPair,
	templateValidateYardPropsSupport,
} from '../utils';

/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function SelectTemplatesControl( props ) {
	const {
		attributes,
		customViews,
		setAttributes,
		setSupportsNumberPerRow,
		setSupportsNumberPerRowInitialOpen,
		setSupportsCustomAnchorID,
	} = props;
	const { customView } = attributes;
	const defaultOption = [ { label: __( 'Default' ), value: 0 } ];

	const updateStateNumberPerRow = ( value ) => {
		const resultNumberPerRow = templateValidateYardPropsSupport(
			customViews,
			value,
			'HAS_NUMBER_PER_ROW'
		);

		// if array does not contains yard-props be sure to set the state to false.
		if (
			resultNumberPerRow === undefined ||
			resultNumberPerRow[ 0 ] === undefined ||
			resultNumberPerRow[ 0 ].value === undefined
		) {
			return false;
		}

		setSupportsNumberPerRowInitialOpen( true );

		// if array does contains yard-props set the value of the yard-prop.
		return resultNumberPerRow[ 0 ].value;
	};

	const updateStateCustomAnchorID = ( value ) => {
		const resultCustomAnchorID = templateValidateYardPropsSupport(
			customViews,
			value,
			'HAS_CUSTOM_ID_ANCHOR'
		);

		// if array does not contains yard-props be sure to set the state to false.
		if (
			resultCustomAnchorID === undefined ||
			resultCustomAnchorID[ 0 ] === undefined ||
			resultCustomAnchorID[ 0 ].value === undefined
		) {
			return false;
		}

		// if array does contains yard-props set the value of the yard-prop.
		return resultCustomAnchorID[ 0 ].value;
	};

	const onTemplateChange = ( value ) => {
		// set the chosen template.
		setAttributes( { customView: value } );

		// set state
		setSupportsNumberPerRow( updateStateNumberPerRow( value ) );
		setSupportsCustomAnchorID( updateStateCustomAnchorID( value ) );
	};

	return (
		<SelectControl
			value={ customView }
			label={ __( 'Selecteer template' ) }
			onChange={ ( value ) => onTemplateChange( value ) }
			options={ [
				...defaultOption,
				...mapCustomViewsToKeyPair( customViews ),
			] }
		/>
	);
}

export default SelectTemplatesControl;
