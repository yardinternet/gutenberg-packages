# Icon Picker Control Refactor — Design Spec

**Date:** 2026-04-13
**Status:** Approved

## Overview

Refactor `IconPickerControl` to support a new WordPress REST API (`/yard/icons`) provided by the `wp-icons` Laravel/Acorn package (built on Blade Icons). The refactor must be **100% backwards compatible**: sites without the new package continue using the existing FontAwesome GraphQL API flow without any changes to consuming blocks.

---

## Goals

- Auto-detect the new `/yard/icons` REST API at runtime
- When available and opted into, use it for icon search + SVG retrieval
- Keep the existing FontAwesome path working exactly as-is for legacy sites
- Expose a clean new `onChangeSVG` / `iconSVG` API for new consumers
- Reduce unnecessary API load with debouncing, result capping, and a shared SVG cache

---

## File Structure

```
packages/components/src/icon-picker-control/
  index.jsx                          ← updated wrapper + unchanged public exports
  editor.css                         ← extended for SVG picker styles
  README.md                          ← updated
  components/
    delete-icon.jsx                  ← unchanged
    icon-results.jsx                 ← unchanged (used by FontAwesomeIconPicker)
    font-awesome-icon-picker.jsx     ← NEW: current IconPickerControl logic extracted verbatim
    svg-icon-picker.jsx              ← NEW: set selector + debounced search + SVG grid
    svg-icon-results.jsx             ← NEW: SVG preview grid (max 10 results)
  hooks/
    use-icon-sets.js                 ← NEW: detects /yard/icons on mount
  utils/
    api.js                           ← extended: adds getIconSets, searchIcons, getIconSvg
    helpers.js                       ← unchanged
    svg-cache.js                     ← NEW: module-level Map shared across all instances
```

---

## Public API

The three exported symbols are **unchanged**: `IconPickerControl`, `IconPickerControlInspector`, `IconPickerControlToolbar`. Existing consumers require zero changes.

### Updated prop signature

```jsx
IconPickerControl({
    // Existing props — all unchanged
    onChange,              // (classString) => void  — FA path callback
    icon,                  // string: FA class string for legacy preview
    displayIconPreview,    // bool, default true
    displayAsPopover,      // bool, default true
    displayDeleteIcon,     // bool, default false
    handleRemove,          // () => void

    // New optional props — SVG path
    onChangeSVG,           // (svgString) => void — opts consumer into SVG mode
    iconSVG,               // string: raw SVG markup for preview in SVG mode
})
```

### Mode selection logic

```
useIconSets() resolves
  ├─ fetch failed OR sets empty  →  render <FontAwesomeIconPicker>
  └─ sets has data
       ├─ onChangeSVG not provided  →  render <FontAwesomeIconPicker>
       └─ onChangeSVG provided      →  render <SvgIconPicker sets={sets}>
```

Existing consumers providing only `onChange` always get `FontAwesomeIconPicker`, even on sites with the new API installed.

### New consumer wiring

```jsx
<IconPickerControlInspector
    icon={ icon }
    iconSVG={ iconSVG }
    onChange={ ( v ) => setAttributes({ icon: v }) }
    onChangeSVG={ ( v ) => setAttributes({ iconSVG: v }) }
/>
```

### Block frontend template pattern

```jsx
{ iconSVG
    ? <span dangerouslySetInnerHTML={{ __html: iconSVG }} />
    : icon && <i className={ icon } />
}
```

This handles both old saved content (`icon`) and new saved content (`iconSVG`) transparently.

---

## Components

### `FontAwesomeIconPicker`

The current `IconPickerControl` code moved verbatim into `components/font-awesome-icon-picker.jsx`. No logic changes. Receives the same props as today's `IconPickerControl`.

### `SvgIconPicker`

New component. Props: `sets`, `onChange`, `onChangeSVG`, `icon`, `iconSVG`, `displayIconPreview`, `displayAsPopover`, `displayDeleteIcon`, `handleRemove`.

UI structure:
```
[ SelectControl: "Choose icon set" ]     ← required, populated from sets prop
[ SearchControl: "Search icons..." ]     ← 3-char minimum, 300ms debounce
[ Popover / inline results ]
  └─ <SvgIconResults> grid (max 10)
       └─ Button > <span dangerouslySetInnerHTML={{ __html: svg }} />
            └─ while SVG loading: grey skeleton placeholder
[ DeleteIcon button ]                    ← unchanged behaviour
[ Icon preview ]                         ← <span dangerouslySetInnerHTML> when iconSVG present
```

### `SvgIconResults`

Renders a grid of up to 10 icon results. Each cell shows the fetched SVG or a skeleton placeholder while loading. On click, calls `onIconClick(svg)`.

---

## Hooks

### `useIconSets`

```js
const { sets, isNewApiAvailable, isLoading } = useIconSets();
```

- Fetches `GET /yard/icons` once on mount
- While in-flight: `isLoading = true` — wrapper renders nothing (avoids flash of wrong picker)
- On success with data: `isNewApiAvailable = true`, `sets = { "set-name": { prefix }, ... }`
- On failure or empty response: `isNewApiAvailable = false`

---

## Utilities

### `utils/api.js` additions

Existing `getFontAwesomeIcons` is untouched.

```js
// GET /yard/icons → { "set-name": { prefix }, ... }
export const getIconSets = async () => { ... };

// GET /yard/icons/{set}?q={query} → [{ name, set, prefix }, ...]
// Accepts AbortSignal for debounce/abort pattern
export const searchIcons = async ( set, query, signal ) => { ... };

// GET /yard/icons/{set}/{name} → SVG string
export const getIconSvg = async ( set, name ) => { ... };
```

### `utils/svg-cache.js`

Module-level `Map`, lives outside any component, shared across all instances and re-renders within a page session:

```js
const svgCache = new Map(); // keyed by `${set}/${name}`
export const getCachedSvg = ( set, name ) => svgCache.get( `${set}/${name}` );
export const setCachedSvg = ( set, name, svg ) => svgCache.set( `${set}/${name}`, svg );
```

---

## Data Flow (SVG mode)

```
mount
  └─ useIconSets fetches /yard/icons → populate set dropdown

user picks set
  └─ reset search input + results

user types in search field
  ├─ < 3 chars → do nothing
  └─ ≥ 3 chars → wait 300ms (debounced)
       └─ abort any in-flight request via AbortController
            └─ GET /yard/icons/{set}?q={query}
                 └─ take first 10 results
                      └─ for each result: check svgCache
                           ├─ cache hit  → render immediately
                           └─ cache miss → GET /yard/icons/{set}/{name}
                                └─ store in svgCache, render cell

user clicks icon
  └─ SVG already in cache (was fetched for preview)
       └─ call onChangeSVG( svg )
            └─ clear search + close popover
```

---

## Load Reduction

| Technique | Detail |
|---|---|
| 3-character minimum | Search does not fire until `searchInput.length >= 3` |
| 300ms debounce | Keystroke timer resets on each character; request fires only when user pauses |
| AbortController | Previous in-flight search request is cancelled when a new one starts |
| 10-result cap | Only first 10 results from the API are shown and SVGs fetched |
| Module-level SVG cache | Same SVG never fetched twice in a page session |
| Eager sets fetch on mount | `/yard/icons` fetched immediately; dropdown ready before user types |
| `Cache-Control: max-age=86400` | Both `/yard/icons` and SVG endpoints are cached by the browser for 24h |

---

## Error Handling

| Scenario | Behaviour |
|---|---|
| `/yard/icons` fetch fails on mount | `isNewApiAvailable = false` → silently renders `FontAwesomeIconPicker` |
| Search request fails | WordPress snackbar error notice (same pattern as current implementation) |
| Search request aborted | Silently ignored — not treated as an error |
| Individual SVG fetch fails | That grid cell renders a `×` placeholder; rest of grid unaffected |
| No results for query | "Er zijn geen iconen gevonden" — same copy as current |

---

## Backwards Compatibility

- All existing `onChange` / `icon` consumers work without any changes
- `FontAwesomeIconPicker` is the current code, not modified
- `onChangeSVG` is fully optional — omitting it locks the component into FA mode regardless of API availability
- Block frontend templates should check `iconSVG` first and fall back to `icon` — this handles all combinations of old/new saved content
