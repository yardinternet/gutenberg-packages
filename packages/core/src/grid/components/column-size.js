/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';

function ColumnSize( { label, beforeIcon, value, attribute, setAttributes } ) {
	return (
		<RangeControl
			label={ label }
			beforeIcon={ beforeIcon }
			value={ value === undefined ? 0 : value }
			onChange={ ( val ) =>
				setAttributes( { [ attribute ]: parseInt( val, 10 ) } )
			}
			min={ 0 }
			max={ 12 }
		/>
	);
}

export default ColumnSize;
