import React from 'react';
import BasicForm from './components/basic-form';

import { useDataAttributes } from '../../hooks';
import { domID } from './config';

function SearchWrapper() {
	const dataAttributes = useDataAttributes( domID );

	return (
		<BasicForm
			disabled={ false }
			btnText={ dataAttributes.btntext }
			label={ dataAttributes.label }
			searchUrl={ dataAttributes.searchurl }
			hasBtnText={ dataAttributes.hasbtntext === 'true' }
		/>
	);
}

export { domID, SearchWrapper as Component };
