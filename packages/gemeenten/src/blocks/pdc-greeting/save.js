import Greeting from './components/greeting';

function save( props ) {
	return <Greeting { ...props } />;
}

export default save;
