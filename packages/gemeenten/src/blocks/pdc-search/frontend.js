import React from 'react';
import BasicForm from './components/basic-form';

import { useDataAttributes } from '../../hooks';
import { domID } from './config';

function SearchWrapper() {
	const dataAttributes = useDataAttributes( domID );

	return <BasicForm { ...dataAttributes } />;
}

export { domID, SearchWrapper as Component };
