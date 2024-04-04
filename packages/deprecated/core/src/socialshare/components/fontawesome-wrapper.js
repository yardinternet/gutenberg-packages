/**
 * Internal dependencies
 */
import FontAwesomeIconStacked from './fontawesome-icon-stacked';

const FontAwesomeWrapper = ( {
	url,
	icon,
	type,
	bgColor,
	color,
	font,
	ariaLabel,
	externalLink = false,
	view,
} ) => {
	const styles = {
		color: bgColor,
	};

	/**
	 * React triggers an error when using window.print() on the anchor element. Rendering a button is more appropiate.
	 * On the frontend an anchor is rendered because the onClick() is not triggered on the frontend
	 */
	const renderPrintButton = () => {
		return (
			<button
				style={ styles }
				className="yard-blocks-socialshare__link yard-blocks-socialshare__button"
				onClick={ () => window.print() }
			>
				<FontAwesomeIconStacked
					icon={ icon }
					type={ type }
					color={ color }
					font={ font }
				/>
			</button>
		);
	};

	return (
		<>
			{ view === 'edit' && icon === 'print' ? (
				renderPrintButton()
			) : (
				<a // eslint-disable-line
					style={ styles }
					className="yard-blocks-socialshare__link"
					href={ url }
					rel={ externalLink ? 'noopener noreferrer' : undefined } // eslint-disable-line
					target={ externalLink ? '_blank' : undefined } // eslint-disable-line
					aria-label={ ariaLabel }
				>
					<FontAwesomeIconStacked
						icon={ icon }
						type={ type }
						color={ color }
						font={ font }
					/>
				</a>
			) }
		</>
	);
};

export default FontAwesomeWrapper;
