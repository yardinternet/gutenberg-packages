/**
 * External dependencies
 */
import { BlockIcon } from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder, Spinner, SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { NAMESPACE } from '../../config/settings';
import { getOpenPubItems } from './../../api';

const Edit = ( props ) => {
	const { attributes, setAttributes } = props;
	const { selectedPoll } = attributes;
	const [ pollCollection, setPollCollection ] = useState( [] );
	const defaultOption = [
		{ label: __( 'Selecteer poll', NAMESPACE ), value: '' },
	];

	useEffect( () => {
		fetchPolls();
	}, [] );

	const fetchPolls = async () => {
		const data = await getOpenPubItems(
			'v1/items',
			`${ theme.openpubEndpoint }/wp-json/owc/polls/`
		);

		if ( data ) {
			setPollCollection( transformPollData( data ) );
		} else {
			setPollCollection( data );
		}
	};

	const transformPollData = ( options = [] ) => {
		return options.map( function ( poll ) {
			return {
				value: poll.id,
				label: poll.title,
			};
		} );
	};

	return (
		<>
			<Placeholder
				icon={
					<BlockIcon faClasses="fal fa-poll-h" marginRight={ true } />
				}
				label={ __( 'Poll', NAMESPACE ) }
			>
				{ pollCollection ? (
					<SelectControl
						label={ __( 'Selecteer een poll', NAMESPACE ) }
						value={ selectedPoll }
						options={ [ ...defaultOption, ...pollCollection ] }
						onChange={ ( poll ) =>
							setAttributes( { selectedPoll: poll } )
						}
					/>
				) : (
					<>
						{ Array.isArray( pollCollection ) ? (
							<Spinner />
						) : (
							__(
								'Er zijn geen polls gevonden of het endpoint kon niet worden opgehaald.',
								NAMESPACE
							)
						) }
					</>
				) }
			</Placeholder>
		</>
	);
};
export default Edit;
