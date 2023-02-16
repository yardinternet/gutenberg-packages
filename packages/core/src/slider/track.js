/**
 * WordPress dependencies
 */
import { Button, ButtonGroup } from '@wordpress/components';

const Track = ( { currentSlide, innerBlocks, selectSlide, insertSlide } ) => {
	return (
		<ButtonGroup style={ { display: 'flex', justifyContent: 'center' } }>
			{ innerBlocks?.map( ( slide, index ) => (
				<Button
					key={ slide.clientId }
					isPrimary={ slide.clientId === currentSlide }
					isSecondary
					onClick={ () => selectSlide( slide.clientId ) }
				>
					{ index + 1 }
				</Button>
			) ) }
			<Button key={ 'plus' } isSecondary onClick={ () => insertSlide() }>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					aria-hidden="true"
					focusable="false"
				>
					<path d="M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"></path>
				</svg>
			</Button>
		</ButtonGroup>
	);
};

export default Track;
