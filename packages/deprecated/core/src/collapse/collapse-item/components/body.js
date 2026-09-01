function Body( {
	id = 0,
	isAccordion = true,
	children = [],
  accordionId = '',
	isOpen = false,
} ) {
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
