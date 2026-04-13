/**
 * Basic SVG sanitization — strips script tags and event handler attributes.
 * TODO: Replace with DOMPurify when available as a project dependency.
 *
 * @param {string} svg - Raw SVG string.
 * @return {string} Sanitized SVG string.
 */
const sanitizeSvg = ( svg ) => {
	return svg
		.replace( /<script[\s\S]*?<\/script>/gi, '' )
		.replace( /\son\w+="[^"]*"/gi, '' )
		.replace( /\son\w+='[^']*'/gi, '' );
};

export default sanitizeSvg;
