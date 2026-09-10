# Icon Picker Control

Picks an icon in the block editor. Supports two modes:

- **FontAwesome mode** (default, legacy): searches the FontAwesome GraphQL API and returns a CSS class string (e.g. `fa-solid fa-house`). Stored in the `icon` block attribute.
- **SVG mode** (new): uses the `wp-icons` REST API (`/yard/icons`) to search sets of SVG icons and returns raw SVG markup. Stored in the `iconSVG` block attribute.

Mode is selected automatically. If `/yard/icons` is reachable **and** the consumer provides an `onChangeSVG` callback, SVG mode is used. Otherwise FontAwesome mode is used. Existing consumers that only provide `onChange` are unaffected.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `onChange` | `Function` | — | Called with FA class string (FontAwesome mode). |
| `icon` | `string` | — | Current FA class string, used for the legacy icon preview. |
| `displayIconPreview` | `boolean` | `true` | Show a preview of the selected icon above the search field. |
| `displayAsPopover` | `boolean` | `true` | Show search results in a popover (vs. inline). |
| `displayDeleteIcon` | `boolean` | `false` | Show a delete button below the search field. |
| `handleRemove` | `Function` | — | Called when the delete button is clicked. |
| `onChangeSVG` | `Function` | — | Called with raw SVG string (SVG mode). Opts the consumer into SVG mode when provided. |
| `iconSVG` | `string` | — | Current SVG markup, used for the SVG icon preview. |

## New consumer example

```jsx
<IconPickerControlInspector
    icon={ icon }
    iconSVG={ iconSVG }
    onChange={ ( v ) => setAttributes({ icon: v }) }
    onChangeSVG={ ( v ) => setAttributes({ iconSVG: v }) }
/>
```

### Block attribute registration

```js
attributes: {
    icon:    { type: 'string', default: '' },
    iconSVG: { type: 'string', default: '' },
}
```

### Frontend rendering (handle both old and new saved content)

```jsx
{ iconSVG
    ? <span dangerouslySetInnerHTML={{ __html: iconSVG }} />
    : icon && <i className={ icon } />
}
```

## FontAwesome mode — filter

To limit which FontAwesome family/style combinations appear, use this WordPress filter:

```js
import { addFilter } from '@wordpress/hooks';

addFilter( 'yard.fontawesome-family-styles', 'yard', () => [
    { family: 'classic', style: 'solid' },
    { family: 'classic', style: 'regular' },
] );
```

## SVG mode — how it works

1. On mount, fetches `/yard/icons` to get available icon sets.
2. Renders a set selector (`SelectControl`) populated with the returned sets.
3. Search fires after 3 characters, debounced by 300 ms.
4. Shows the first 10 results; fetches each icon's SVG eagerly (with skeleton placeholders while loading).
5. SVGs are cached in a module-level `Map` for the page session — the same icon is never fetched twice.
6. Selecting an icon calls `onChangeSVG` with the raw SVG string.
