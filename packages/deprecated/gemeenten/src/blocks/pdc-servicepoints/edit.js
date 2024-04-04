/**
 * WordPress dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { Placeholder, Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Inspector from './components/inspector';
import { getPdcItems } from '../../api';

const Edit = ( props ) => {
	const { attributes } = props;
	const { customLocations, locationSelection } = attributes;
	const [ locations, setLocations ] = useState( [] );

	useEffect( () => {
		getLocations();
	}, [] );

	const getLocations = async () => {
		const data = await getPdcItems( 'locations' );

		setLocations( data.data );
	};

	return (
		<>
			<Inspector { ...{ locations, ...props } } />

			{ customLocations && locationSelection.length === 0 ? (
				<Placeholder icon="excerpt-view" label={ __( 'Locaties', '' ) }>
					{ ! Array.isArray( locations ) ? (
						<Spinner />
					) : (
						__(
							'Selecteer de locaties onder "Handmatige selectie".'
						)
					) }
				</Placeholder>
			) : (
				<ServerSideRender
					block="gemeenten/servicepoints"
					attributes={ attributes }
				/>
			) }
		</>
	);
};
export default Edit;
