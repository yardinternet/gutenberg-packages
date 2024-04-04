/**
 * Internal dependencies
 */
import Inspector from './inspector';
import BasicForm from './components/basic-form';

function edit( props ) {
	return (
		<>
			<Inspector { ...props } />
			<BasicForm disabled={ true } { ...props.attributes } />
		</>
	);
}

export default edit;
