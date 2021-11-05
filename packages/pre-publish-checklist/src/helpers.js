export const getSettings = ( settings, postType ) => {
	return settings.filter( ( item ) => item.postType === postType ).pop();
};

export const getClassName = ( hasError ) => {
	return hasError
		? 'pre-publish-checklist-wrong'
		: 'pre-publish-checklist-correct';
};
