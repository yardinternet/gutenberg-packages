export const Icon = ( props ) => {
	const { attributes } = props;
	const { icon, iconAltText } = attributes;

	return (
		<i
			className={ `wp-block-yard-icon-component fa-fw ${ icon } ` }
			title={ iconAltText ? iconAltText : null }
			aria-hidden="true"
		></i>
	);
};
