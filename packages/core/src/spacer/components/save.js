function Save( props ) {
	const { attributes } = props;
	const { size, backgroundColor } = attributes;

	return (
		<div
			className={ `yard-blocks-spacer yard-blocks-spacer-size-${ size }` }
			style={ { backgroundColor } }
		></div>
	);
}

export default Save;
