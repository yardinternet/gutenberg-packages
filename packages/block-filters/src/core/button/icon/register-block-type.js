/**
 * Internal dependencies
 */
import { coreButtonIcon } from '../../../config';

export default function RegisterBlockType( settings, name ) {
	if ( name !== coreButtonIcon.block ) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			yardShowButtonIcon: {
				type: 'boolean',
				default: false,
			},
			yardButtonIcon: {
				type: 'string',
				default: 'fas fa-envelope',
			},
			yardButtonIconColor: {
				type: 'string',
				default: '',
			},
		},
	};
}
