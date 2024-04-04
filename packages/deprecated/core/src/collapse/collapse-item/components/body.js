function Body( {
	showOpen = false,
	id = 0,
	isAccordion = true,
	children = [],
	accordionId = '',
} ) {
	return (
		<div
			className={ `collapse ${ showOpen ? 'show' : '' }` }
			id={ `collapse-${ id }` }
			data-parent={ isAccordion ? `#accordion-${ accordionId }` : null }
		>
			<div className={ `yard-blocks-collapse-item__body` }>
				{ children }
			</div>
		</div>
	);
}

export default Body;
