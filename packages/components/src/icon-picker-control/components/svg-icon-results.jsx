/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const SvgIconResults = ( { results, onIconClick } ) => {
	return (
		<div className="icon-picker-control-results-container">
			{ results.map( ( { name, svg }, key ) => (
				<div
					className="icon-picker-control-icon-btn-container"
					key={ key }
				>
					<Button
						onClick={ () =>
							svg && svg !== 'ERROR' && onIconClick( svg )
						}
						disabled={ ! svg || svg === 'ERROR' }
						label={ name }
					>
						{ svg === null && (
							<span
								className="icon-picker-control-svg-skeleton"
								aria-hidden="true"
							/>
						) }
						{ svg === 'ERROR' && (
							<span
								className="icon-picker-control-svg-error"
								aria-hidden="true"
							>
								×
							</span>
						) }
						{ svg && svg !== 'ERROR' && (
							<span dangerouslySetInnerHTML={ { __html: svg } } />
						) }
					</Button>
				</div>
			) ) }

			{ ! results.length && (
				<p>{ __( 'Er zijn geen iconen gevonden' ) }</p>
			) }
		</div>
	);
};

export default SvgIconResults;
