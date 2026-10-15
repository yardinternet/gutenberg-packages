export function createIconsArray( icons ) {
	const iconArray = Object.keys( icons ).map( ( typeOf ) =>
		icons[ typeOf ].map( ( val ) => ( {
			visual: val,
			name: val,
			type: typeOf,
		} ) )
	);

	return iconArray.flat( Infinity );
}
