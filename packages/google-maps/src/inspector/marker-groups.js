import { PanelBody, PanelHeader, PanelRow } from '@wordpress/components';
import ListControl from './list-control/list-control';
import { useState } from '@wordpress/element';

function MarkerGroups( { markerGroups = [], setAttributes = () => {} } ) {
	const [ data, setData ] = useState( [ { name: 'Houten' } ] );
	//const data = [ { name: 'test' }, { name: 'weee' } ];

	return (
		!! markerGroups.length &&
		markerGroups.map( ( { name }, index ) => (
			<PanelBody title={ name } key={ index }>
				<PanelHeader>Markergroep</PanelHeader>
				<PanelRow>
					<ListControl
						data={ data }
						setAttributes={ setAttributes }
						callback={ ( newData ) => setData( newData ) }
						controls={ [
							{
								type: 'TextAreaControl',
								id: 'name',
								attr: {
									label: 'Naam',
								},
							},
							{
								type: 'QueryPopOver',
								id: 'blaat',
								props: {
									addPoint: ( blaat ) => {
										console.log( blaat );
									},
								},
								attr: { label: 'Query' },
							},
						] }
					/>
				</PanelRow>
			</PanelBody>
		) )
	);
}

export default MarkerGroups;
