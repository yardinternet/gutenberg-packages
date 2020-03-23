export default function InfoWindow( props ) {
	const { title, url, urlTarget, phone, email, content } = props;

	return (
		<div className="infowindow">
			{ title && <div className="infowindow__title">{ title }</div> }
			{ content && (
				<div className="infowindow__content">{ content }</div>
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
