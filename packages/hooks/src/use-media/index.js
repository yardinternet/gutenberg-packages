/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store } from '@wordpress/core-data';

export const useMedia = ( id ) => {
	return useSelect(
		( select ) => {
			const { getMedia, isResolving, hasFinishedResolution } =
				select( store );

			const mediaParameters = [ id, { context: 'view' } ];

			return {
				media: getMedia( ...mediaParameters ),
				isResolvingMedia: isResolving( 'getMedia', mediaParameters ),
				hasResolvedMedia: hasFinishedResolution(
					'getMedia',
					mediaParameters
				),
			};
		},
		[ id ]
	);
};
