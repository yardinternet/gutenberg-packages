/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Icon from './components/icon';

const Save = ( props ) => {
	const { attributes } = props;
	const { altText, iconSize } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'yard-blocks-icon',
		style: { fontSize: iconSize },
	} );

	return (
		<div { ...blockProps }>
			<Icon { ...props } />
			{ altText && <span className="sr-only">{ altText }</span> }
		</div>
	);
};

export default Save;
