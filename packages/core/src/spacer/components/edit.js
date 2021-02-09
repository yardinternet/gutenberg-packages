/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
/**
 * External dependencies
 */
import { Global } from '@emotion/core';

/**
 * Internal dependencies
 */
import editorStyles from './../editor-styles';

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
			<Global styles={ editorStyles } />
			<div
				className={ `yard-blocks-spacer-wrapper` }
				style={ { backgroundColor } }
			>
				<div className={ 'yard-blocks-spacer-icon fal fa-arrows-v' } />
				<div className={ 'yard-blocks-spacer-number' }>{ size }</div>
				<div className={ 'yard-blocks-spacer-label' }>Spacer</div>
				{ isSelected && (
					<RangeControl
						onChange={ setSize }
						max={ MAX }
						min={ MIN }
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
