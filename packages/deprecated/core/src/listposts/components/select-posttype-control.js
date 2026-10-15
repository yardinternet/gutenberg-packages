/**
 * WordPress dependencies
 */
import { Spinner, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { mapPostTypes } from '../utils';

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
