import { coreFileFilesize } from '../../../config';

export default function RegisterBlockType( settings, name ) {
	if ( name !== coreFileFilesize.block ) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			yardShowFilesize: {
				type: 'boolean',
				default: false,
			},
			yardFilesize: {
				type: 'string',
			},
		},
	};
}
