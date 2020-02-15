import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { config } from './config';

import ListControl from './inspector/list-control/list-control';

function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const { categories } = attributes;

	// const [ categoryItem, setCategoryItem ] = useState( {} );

	// const onChange = ( { item, value } ) => {
	// 	setCategoryItem( {
	// 		...categoryItem,
	// 		...{
	// 			[ item ]: value,
	// 		},
	// 	} );
	// };

	// const onSubmit = () => {
	// 	console.log( categoryItem );
	// };

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Categorieen', config.textDomain ) }>
				<ListControl
					data={ categories }
					setAttributes={ setAttributes }
					callback={ ( newCategories ) =>
						setAttributes( { categories: newCategories } )
					}
					controls={ [
						{
							type: 'TextControl',
							name: 'name',
							attr: { label: 'Naam' },
						},
					] }
				>
					{ /* <TextControl
						onChange={ ( val ) =>
							onChange( { item: 'name', value: val } )
						}
					/>
					<TextControl
						onChange={ ( val ) =>
							onChange( { item: 'age', value: val } )
						}
					/> */ }
					<Button onClick={ () => onSubmit() }>Toevoegen</Button>
				</ListControl>
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
