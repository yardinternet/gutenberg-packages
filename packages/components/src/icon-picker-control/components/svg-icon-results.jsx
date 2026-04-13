/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Basic SVG sanitization — strips script tags and event handler attributes.
 * TODO: Replace with DOMPurify when available as a project dependency.
 *
 * @param {string} svg - Raw SVG string from the REST API.
 * @return {string} Sanitized SVG string.
 */
const sanitizeSvg = ( svg ) => {
	return svg
		.replace( /<script[\s\S]*?<\/script>/gi, '' )
		.replace( /\son\w+="[^"]*"/gi, '' )
		.replace( /\son\w+='[^']*'/gi, '' );
};

const SvgIconResults = ( { results, onIconClick } ) => {
	return (
		<div className="icon-picker-control-results-container">
			{ results.map( ( { name, set, svg } ) => (
				<div
					className="icon-picker-control-icon-btn-container"
					key={ `${ set }-${ name }` }
				>
					<Button
						onClick={ () => onIconClick( svg ) }
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
							<span
								dangerouslySetInnerHTML={ {
									__html: sanitizeSvg( svg ),
								} }
							/>
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
