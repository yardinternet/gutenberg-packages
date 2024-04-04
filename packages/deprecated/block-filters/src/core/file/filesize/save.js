/**
 * Internal dependencies
 */
import { coreFileFilesize } from '../../../config';
import FileSize from './components/filesize';

export default function Save( element, blockType, attributes ) {
	if (
		blockType.name !== coreFileFilesize.block ||
		! attributes.yardShowFilesize
	) {
		return element;
	}

	const { yardFilesize } = attributes;

	return (
		<div
			className="yard-block-filter--core-file"
			style={ { display: 'flex' } }
		>
			<>
				{ element }
				<FileSize filesize={ yardFilesize } />
			</>
		</div>
	);
}
