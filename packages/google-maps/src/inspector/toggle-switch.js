import { useState } from '@wordpress/element';
import { FormToggle } from '@wordpress/components';

/**
 * This toggle component is used within submitting forms instead of direct state modification
 */
function ToggleSwitch( { label = '', name = '', checked = false } ) {
	const [ toggle, setToggle ] = useState( checked === 'true' );

	return (
		<>
			<FormToggle
				label={ label }
				onChange={ () => setToggle( ! toggle ) }
				checked={ toggle }
			/>
			<input name={ name } value={ toggle } type="hidden" />
			<label style={ { marginLeft: '10px' } } htmlFor={ name }>
				{ label }
			</label>
		</>
	);
}

export default ToggleSwitch;
