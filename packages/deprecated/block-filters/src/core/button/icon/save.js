/**
 * Internal dependencies
 */
import { coreButtonIcon } from '../../../config';

export default function Save( element, blockType, attributes ) {
	const { yardShowButtonIcon, yardButtonIcon, yardButtonIconColor } =
		attributes;

	if ( blockType.name !== coreButtonIcon.block || ! yardShowButtonIcon ) {
		return element;
	}

	return (
		<div className="yard-blocks-button--with-icon">
			<i
				className={ `yard-blocks-button-icon ${ yardButtonIcon }` }
				style={ { color: yardButtonIconColor } }
				aria-hidden="true"
			></i>
			{ element }
		</div>
	);
}
