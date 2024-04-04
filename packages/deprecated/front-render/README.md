# Front-render ( Higher Order Component )

This package facilitates Gutenberg components to render on the frontend based on data-attributes. The data attributes are parsed as props and injected with a stateful frontend component.

## Stateful component

Example of a component which contains React logic.
The goal is to render this component on the editor and frontend side.

```js
import React, { useState } from "react";

export default function Map(props) {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <h1>{toggle && props.title}</h1>
      <button onClick={() => setToggle(!toggle)}>Show message</button>
    </div>
  );
```

## FrontRender

Now with the FrontRender HOC

### withSaveDataAttributes(Editor)

```js
function Map( { className } ) {
	return (
		<div
			id={ config.mapDomId }
			className={ classnames( [
				className,
				'yard-google-map-advanced',
			] ) }
		></div>
	);
}

function save( { attributes, className } ) {
	return withSaveDataAttributes( Map( { className } ), attributes );
}
```

### withFrontRender(Frontend)

HTML output

```html
<div id="gmap" data-obj="{\\"zoom\\":12,\\"title\\":\\"My Map\\"}"
data-testid="1" />
```

```js
import Map from 'component/frontend';

const WrappedComponent = withFrontRender( {
		Component: Map,
		document.querySelector('#gmap'),
    } );
```

## Examples of components

TODO, rewrite gemeenten and google maps
