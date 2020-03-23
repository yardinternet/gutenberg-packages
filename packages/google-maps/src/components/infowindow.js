export default function InfoWindow( props ) {
	const { title, url, urlTarget, phone, email, content } = props;

	return (
		<div className="infowindow">
			{ title && <div className="infowindow__title">titel{ title }</div> }
			{ content && (
				<div className="infowindow__content"> conent{ content }</div>
			) }
			{ url && (
				<div className="infowindow__url">
					<a
						href={ url }
						target={ urlTarget ? '_blank' : '' }
						rel="noopener noreferrer"
					>
						Website
					</a>
				</div>
			) }
			{ phone && <div className="infowindow__phone">phone{ phone }</div> }
			{ email && (
				<div className="infowindow__email">email { email }</div>
			) }
		</div>
	);
}
