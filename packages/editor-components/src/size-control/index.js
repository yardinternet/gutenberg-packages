/**
 * WordPress dependencies
 */
import { RangeControl, Button, ButtonGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { setMax, limitValueByUnit } from './helpers';

function SizeControl( { label, value, onChange } ) {
	const units = [ 'px', 'vh', '%' ];

	let unit = 'px';

	if ( value !== undefined ) {
		const matches = value.match( /(\d+)|([a-z%]+)/g );
		value = parseInt( matches[ 0 ], 10 );
		unit = matches[ 1 ];
	}

	const onChangeValue = ( val, unitVal ) =>
		onChange( onChangeFilter( val, unitVal ) );

	const onChangeFilter = ( val, unitVal ) => {
		value = limitValueByUnit( val, unitVal );
		unit = unitVal;

		return `${ value }${ unit }`;
	};

	return (
		<>
			<div className="size-control__type">
				<h2>{ label }</h2>
				<ButtonGroup>
					{ units.map( ( val ) => (
						<Button
							isPressed={ val === unit }
							onClick={ () => onChangeValue( value, val ) }
							key={ val }
						>
							{ val }
						</Button>
					) ) }
				</ButtonGroup>
			</div>
			<RangeControl
				value={ value || 0 }
				onChange={ ( val ) => onChangeValue( val, unit ) }
				min={ 0 }
				max={ setMax( unit ) }
			/>
			{ value > 0 && (
				<Button isSecondary onClick={ () => onChangeValue( 0, unit ) }>
					Reset
				</Button>
			) }
		</>
	);
}

export default SizeControl;
