function Body( {
	showOpen = false,
	id = 0,
	isAccordion = true,
	children = [],
} ) {
	return (
		<div
			className={ `collapse ${ showOpen ? 'show' : '' }` }
			id={ `collapse-${ id }` }
			data-parent={ isAccordion ? '#accordion' : false }
		>
			<div className={ `yard-blocks-collapse-item__body` }>
				{ children }
			</div>
		</div>
	);
}

export default Body;
