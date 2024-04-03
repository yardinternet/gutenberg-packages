# `useParentBlock`

The `useParentBlock` hook is a utility that provides a convenient interface for interacting with the direct parent block.

## Usage

```js
import { useParentBlock } from '@hooks';

const Edit = ( props ) => {
	const { parentBlock, parentAttributes, setParentAttributes, selectParentBlock } = useParentBlock();

	return (
		<Button variant="secondary" onClick={ selectParentBlock }>
			{ __( 'Selecteer hoofdblok' ) }
		</Button>
	);
}
```
