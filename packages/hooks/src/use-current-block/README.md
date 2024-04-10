# `useCurrentBlock`

The `useCurrentBlock` hook is a utility that provides a convenient interface for interacting with the current block.

## Usage

```js
import { useCurrentBlock } from '@yardinternet/gutenberg-hooks';

const Edit = ( props ) => {
 const { currentBlock, currentBlockAttributes, currentBlockInnerBlocks, currentBlockHasSelectedInnerBlock, setAllCurrentBlockInnerBlocksAttributes } = useCurrentBlock();

 const onChangeHeadingLevel = ( value ) => {
  setAllCurrentBlockInnerBlocksAttributes( { headingLevel: value } );
 };

 return (
  ...
 );
}
```
