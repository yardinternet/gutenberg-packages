/**
 * Basic SVG sanitization — strips script tags, event handler attributes,
 * and javascript: URI values.
 * TODO: Replace with DOMPurify when available as a project dependency.
 * Note: Does not cover external resource references (<use href="..."/>).
 *
 * @param {string} svg - Raw SVG string.
 * @return {string} Sanitized SVG string.
 */
const sanitizeSvg = ( svg ) => {
	return svg
		.replace( /<script[\s\S]*?<\/script>/gi, '' )
		.replace( /\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '' )
		.replace( /\bhref\s*=\s*["']?\s*javascript:[^"'\s>]*/gi, '' );
};

export default sanitizeSvg;
