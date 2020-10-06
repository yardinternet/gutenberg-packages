/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { NAMESPACE } from '../../config/settings';

const Save = ( { attributes } ) => {
	const { selectedPoll } = attributes;

	return (
		<>
			{ selectedPoll ? (
				<>[poll id={ selectedPoll }]</>
			) : (
				<p>
					{ __(
						'Er is geen poll geselecteerd. Selecteer een poll.',
						NAMESPACE
					) }
				</p>
			) }
		</>
	);
};

export default Save;
