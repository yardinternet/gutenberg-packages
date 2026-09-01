function Body( { id = 0, children = [], isOpen = false } ) {
	return (
		<div
			className={ `collapse ${ isOpen ? 'show' : '' }` }
			id={ `collapse-${ id }` }
		>
			<div className={ `yard-blocks-collapse-item__body` }>
				{ children }
			</div>
		</div>
	);
}

export default Body;
