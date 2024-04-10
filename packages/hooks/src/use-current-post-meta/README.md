# `useCurrentPostMeta`

The `useCurrentPostMeta` hook is a utility that provides a convenient interface for interacting with the current block.

## Usage

```JS
import { useCurrentPostMeta } from '@yardinternet/gutenberg-hooks';

const Edit = ( props ) => {
 const [featuredImageFocalPoint, setFeaturedImageFocalPoint] = useCurrentPostMeta('featured_image_focal_point');

 return (
  ...
 );
}
```
