export default function InfoWindow( props ) {
	const {
		title,
		url,
		urlTarget,
		phone,
		email,
		content,
		covered,
		contactPerson,
		address,
	} = props;

	return (
		<div className="infowindow">
			{ title && <div className="infowindow__title">{ title }</div> }
			{ content && (
				<div className="infowindow__content">{ content }</div>
			) }
			{ covered && (
				<div className="infowindow__covered">
					<span className="infowindow__label">Beslaat: </span>
					<div className="infowindow__value">{ covered }</div>
				</div>
			) }
			{ address && (
				<div className="infowindow__address">
					<span className="infowindow__label">Adres: </span>
					<div className="infowindow__value">{ address }</div>
				</div>
			) }
			{ url && (
				<div className="infowindow__url">
					<span className="infowindow__label">Website: </span>
					<a
						className="infowindow__value"
						href={ url }
						target={ urlTarget ? '_blank' : '' }
						rel="noopener noreferrer"
					>
						{ url }
					</a>
				</div>
			) }
			{ phone && (
				<div className="infowindow__phone">
					<span className="infowindow__label">Telefoon: </span>
					<span className="infowindow__value">{ phone }</span>
				</div>
			) }
			{ contactPerson && (
				<div className="infowindow__contactperson">
					<span className="infowindow__label">Contact: </span>
					<span className="infowindow__value">{ contactPerson }</span>
				</div>
			) }
			{ email && (
				<div className="infowindow__email">
					<span className="infowindow__label">Email: </span>
					<a
						className="infowindow__value"
						href={ `mailto:${ email }` }
					>
						{ email }
					</a>
				</div>
			) }
		</div>
	);
}
