import ListControl from '../list-control';
import ListControlModal from '../list-control-modal';
import List from '../list';

export default {
	title: 'GoogleMaps/Inspector',
	component: ListControl,
};

const controls = [
	{
		type: 'TextControl',
		id: 'name',
		attr: { label: 'Naam' },
	},
	{
		type: 'TextControl',
		id: 'age',
		attr: { label: 'Leeftijd' },
	},
];

export const listControl = () => (
	<ListControl
		data={ [
			{ name: 'Jansen', age: '42' },
			{ name: 'Very Long Long Long Title', age: '42' },
		] }
		controls={ controls }
		entityLabel={ 'Categorie' }
	/>
);

export const listModal = () => (
	<ListControlModal controls={ controls } entityLabel="Opslaan" />
);

export const list = () => <List data={ [ { name: 'Pietje', age: 22 } ] } />;
