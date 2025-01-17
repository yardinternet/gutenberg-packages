function Greetings( props ) {
	const { attributes, date = new Date(), defaultGreeting = '' } = props;
	const { greetings } = attributes;

	const getLabel = ( hour, minutes ) => {
		const currentTime = hour * 100 + minutes;
		for ( const key in greetings ) {
			const [ start, end ] = key
				.split( '-' )
				.map( ( time ) => parseInt( time.replace( ':', '' ), 10 ) );
			if ( currentTime >= start && currentTime <= end ) {
				return greetings[ key ];
			}
		}

		return defaultGreeting;
	};

	const label = getLabel( date.getHours(), date.getMinutes() );

	return (
		<div className="gemeenten-block gemeenten-block--greetings">
			{ label }
		</div>
	);
}

export default Greetings;
