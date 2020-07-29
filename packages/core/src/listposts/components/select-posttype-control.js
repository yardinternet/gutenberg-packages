/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { mapPostTypes } from '../utils';

const { SelectControl } = wp.components;
const { __ } = wp.i18n;

const SelectPostTypeControl = ( props ) => {
	const { setPostType, postTypes, postType } = props;
	const defaultOption = [ { label: __( 'Selecteer type' ), value: '' } ];

	return (
		<div>
			{ postTypes.length > 1 ? ( // Default option is from event calendar
				<SelectControl
					value={ postType }
					label={ __( 'Selecteer type' ) }
					onChange={ setPostType }
					options={ [
						...defaultOption,
						...mapPostTypes( postTypes ),
					] }
				/>
			) : (
				<Spinner />
			) }
		</div>
	);
};

export default SelectPostTypeControl;
