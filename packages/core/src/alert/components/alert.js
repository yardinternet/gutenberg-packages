function Alert( { attributes, children } ) {
	const { alertType } = attributes;

	return (
		<div className={ alertType } role="alert">
			{ children }
		</div>
	);
}

export default Alert;
