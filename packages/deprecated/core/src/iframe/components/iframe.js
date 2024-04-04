function Iframe( props ) {
	const { attributes, className } = props;
	const { title, url, height } = attributes;

	return (
		<>
			<iframe
				className={ className }
				title={ title }
				src={ url }
				height={ height }
			></iframe>
		</>
	);
}

export default Iframe;
