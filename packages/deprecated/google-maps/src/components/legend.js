/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';

function Legend( props ) {
	const { map, selectedFilters, legend } = props;
	const legendRef = useRef( [] );

	useEffect( () => {
		legendRef.current.innerHTML = '';
		if ( map && !! selectedFilters.length && !! legend.length ) {
			addLegend();
		}
	}, [ selectedFilters ] );

	const addLegend = () => {
		selectedFilters.map( function ( filter ) {
			return legend.map( function ( legendItem ) {
				if (
					legendItem.category === filter &&
					legendItem.showLegendItem
				) {
					const div = document.createElement( 'div' );
					div.style.backgroundColor = legendItem.color;
					div.innerHTML = legendItem.name;
					div.className = 'legend-item';
					legendRef.current.appendChild( div );
				}

				return legend;
			} );
		} );
	};

	return (
		<div className="yard-google-map-advanced__legend">
			<div id="map-legend" className="map-legend" ref={ legendRef }></div>
		</div>
	);
}

export default Legend;
