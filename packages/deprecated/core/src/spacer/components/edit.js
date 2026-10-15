/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import '../editor.scss';

const MIN = 0;
const MAX = applyFilters( 'yard-blocks.gutenberg-core.spacer', 5 );

function Edit( {
	size = 2,
	setSize = () => {},
	isSelected = true,
	backgroundColor = '',
} ) {
	return (
		<>
			<div
				className={ `yard-blocks-spacer-wrapper` }
				style={ { backgroundColor } }
			>
				<div className={ 'yard-blocks-spacer-icon fal fa-arrows-v' } />
				<div className={ 'yard-blocks-spacer-number' }>{ size }</div>
				<div className={ 'yard-blocks-spacer-label' }>Spacer</div>
				{ isSelected && (
					<RangeControl
						max={ MAX }
						min={ MIN }
						onChange={ setSize }
						value={ size }
					/>
				) }
			</div>
			<div
				className={ `yard-blocks-spacer-size yard-blocks-spacer-size-${ size }` }
				style={ { backgroundColor } }
			></div>
		</>
	);
}

export default Edit;
