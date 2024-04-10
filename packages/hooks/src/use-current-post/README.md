# `useCurrentPost`

The `useCurrentPost` hook is a utility that provides a convenient interface for interacting with the current block.

## Usage

```JS
import { useCurrentPost } from '@yardinternet/gutenberg-hooks';

const Edit = ( props ) => {
 const { currentPostType } = useCurrentPost();

 return (
  ...
 );
}
```
