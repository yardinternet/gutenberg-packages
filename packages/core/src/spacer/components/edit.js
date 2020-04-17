import { Placeholder, SelectControl } from '@wordpress/components';
import { file } from '@wordpress/icons';

const value = 'large';

export default function Edit( { onChange } ) {
	return (
		<Placeholder icon={ file } label="Placeholder">
			<SelectControl
				label="Size"
				value={ value }
				options={ [
					{ label: 'Big', value: '100%' },
					{ label: 'Medium', value: '50%' },
					{ label: 'Small', value: '25%' },
				] }
				onChange={ ( size ) => {
					onChange( { size } );
				} }
			/>
		</Placeholder>
	);
}
