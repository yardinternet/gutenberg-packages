/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { Button, ButtonGroup } from '@wordpress/components';

const WidthButtons = ( { setAttributes } ) => {
	const widthButtons = applyFilters(
		'yard-blocks.gridColumnWidthButtons',
		[ 25, 33, 50, 75, 100 ]
	);

	const handleClick = ( value ) => {
		const fraction = value / 100;

		// The buttons are percentages, but the column width is a fraction of 12
		const val = Math.round( 12 * fraction );
		setAttributes( { colClassLg: val } );

		// Set md column width. This is opinionated, use the filter to change this.
		const mdBreakpointPercentage = applyFilters(
			'yard-blocks.gridColumnWidthButtonsMdPercentage',
			51
		);

		setAttributes( { colClass: value > mdBreakpointPercentage ? 12 : 6 } );
		setAttributes( { colClassSm: 12 } );
		setAttributes( { colClassXs: 12 } );
	};

	return (
		<ButtonGroup style={ { marginBottom: '1.5rem' } }>
			{ widthButtons.map( ( widthValue ) => {
				return (
					<Button
						key={ widthValue }
						isSmall
						onClick={ () => handleClick( widthValue ) }
					>
						{ widthValue }%
					</Button>
				);
			} ) }
		</ButtonGroup>
	);
};

export default WidthButtons;
