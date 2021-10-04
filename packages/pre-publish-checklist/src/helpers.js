/**
 * Internal dependencies
 */
import { settings } from './settings';

export const getSettings = ( postType ) => {
	return settings.filter( ( item ) => item.postType === postType ).pop();
};

export const getClassName = ( hasError ) => {
	return hasError
		? 'pre-publish-checklist-wrong'
		: 'pre-publish-checklist-correct';
};
