export const Icon = ( props ) => {
	const { attributes } = props;
	const { icon, iconSVG, iconAltText } = attributes;

	if ( iconSVG ) {
		return (
			<span
				className="wp-block-yard-icon-component wp-block-yard-icon-component--svg"
				title={ iconAltText ? iconAltText : null }
				aria-hidden="true"
				dangerouslySetInnerHTML={ { __html: iconSVG } }
			/>
		);
	}

	return (
		<i
			className={ `wp-block-yard-icon-component fa-fw ${ icon } ` }
			title={ iconAltText ? iconAltText : null }
			aria-hidden="true"
		></i>
	);
};
