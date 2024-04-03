/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const IconResults = ( { searchResults, handleIconClick } ) => {
	return (
		<div className="icon-picker-control-results-container">
			{ searchResults?.map( ( result, key ) => {
				return (
					<div
						className="icon-picker-control-icon-btn-container"
						key={ key }
					>
						<Button onClick={ () => handleIconClick( result ) }>
							<i className={ result }></i>
						</Button>
					</div>
				);
			} ) }

			{ ! searchResults?.length && (
				<p>{ __( 'Er zijn geen iconen gevonden' ) }</p>
			) }
		</div>
	);
};

export default IconResults;
