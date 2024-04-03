# Icon picker control

The IconPickerControl use the Font Awesome API to search for icons. More information found here: <https://fontawesome.com/docs/apis/>.

## Hooks

By default all the styles from Font Awesome are loaded. Use this filter to change which styles are needed. In this example all styles are loaded:

```JS
import { addFilter } from '@wordpress/hooks';

addFilter('yard.fontawesome-family-styles', 'yard', () => [
  { family: 'classic', style: 'solid' },
  { family: 'classic', style: 'regular' },
  { family: 'classic', style: 'light' },
  { family: 'classic', style: 'thin' },
  { family: 'classic', style: 'brands' },
  { family: 'duotone', style: 'solid' },
  { family: 'sharp', style: 'solid' },
  { family: 'sharp', style: 'regular' },
  { family: 'sharp', style: 'light' },
  { family: 'sharp', style: 'thin' },
]);
```
