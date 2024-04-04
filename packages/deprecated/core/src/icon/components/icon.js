const Icon = ( props ) => {
	const { attributes } = props;
	const { icon, altText } = attributes;

	return <i className={ icon } title={ altText ? altText : null }></i>;
};

export default Icon;
