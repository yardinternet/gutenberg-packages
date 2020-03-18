import FileSize from './components/filesize';
import { blocks } from '../../config';

export default function Save( element, blockType, attributes ) {
	if ( blockType.name !== blocks.coreFile || ! attributes.yardShowFilesize ) {
		return element;
	}

	const { yardFilesize } = attributes;

	return (
		<div className="yard-block-filter--core-file">
			<>
				{ element }
				<FileSize filesize={ yardFilesize } />
			</>
		</div>
	);
}
