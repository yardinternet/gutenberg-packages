/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import Icon from './components/icon';

const Edit = ( props ) => {
	const { attributes } = props;
	const { iconSize } = attributes;

	const blockProps = useBlockProps( {
		className: 'yard-blocks-icon',
		style: { fontSize: iconSize },
	} );

	return (
		<div { ...blockProps }>
			<Inspector { ...props } />
			<Icon { ...props } />
		</div>
	);
};

export default Edit;
