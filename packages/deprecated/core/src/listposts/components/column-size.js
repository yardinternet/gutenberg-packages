/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';

function ColumnSize( { label, beforeIcon, value, onChange } ) {
	return (
		<RangeControl
			label={ label }
			beforeIcon={ beforeIcon }
			value={ value }
			onChange={ ( val ) => onChange( parseInt( val, 10 ) ) }
			min={ 1 }
			max={ 4 }
		/>
	);
}

export default ColumnSize;
