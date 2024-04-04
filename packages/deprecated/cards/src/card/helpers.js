/**
 * Internal dependencies
 */
import { TEMPLATE } from './templates';

export function getCardWidth( parentCardCount ) {
	return parseFloat( 100 / parentCardCount );
}

export function getTemplate( value ) {
	return TEMPLATE.filter( ( item ) => item.value === value ).pop();
}
