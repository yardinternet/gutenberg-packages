# Link

The `<Link>` Component makes it super simple to add inline links to your custom blocks.

## Usage

```js
import { Link } from '@yardinternet/gutenberg-components';

const BlockEdit = (props) => {
    const { attributes, setAttributes } = props;
    const { linkText, linkUrl, opensInNewTab } = attributes;

    const handleTextChange = ( value ) => setAttributes( { linkText: value } );
    const handleLinkChange = ( value ) =>
        setAttributes( {
            linkText: value?.title ?? linkText,
            linkUrl: value?.url,
            opensInNewTab: value?.opensInNewTab,
        } );
    const handleLinkRemove = () =>
        setAttributes( {
            linkUrl: null,
            opensInNewTab: null,
        } );

    return (
        <div {...blockProps}>
            <Link 
                link={ {
                    url: linkUrl,
                    title: linkText,
                    opensInNewTab,
                } }
                onLinkChange={ handleLinkChange }
                onLinkRemove={ handleLinkRemove }
                onTextChange={ handleTextChange }
                placeholder="Vul de link en tekst in..."
            />
        </div>
    )
}
```

The `<RichText>` node will only render when BlockEdit is selected.

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
|  `link` | `object` | `{ url: '', title: '', opensInNewTab: false }` | The link object with the url, title and the additional settings |
|  `onLinkChange` | `Function` | `() => {}` | Callback when the URL is changed |
|  `onLinkRemove` | `Function` | `null` | Optional Callback when the URL is removed. The "Unlink" option only gets shown if this prop gets provided |
|  `onTextChange` | `Function` | `() => {}` | Callback when the link's text is changed |
|  `placeholder` | `string` | `Vul de link en tekst in..` | Text visible before actual value is inserted |
|  `settings` | `Array` | `[ { id: 'opensInNewTab', title: __( 'Open in new tab' ), } ]` | An array with additional settings |
|  `suggestionsQuery` | `object` | `undefined` | The query params to give to /wp/v2/search |
|  `...rest` | `object` | `{}` | Pass through any additional props to the RichText component used for the link element |
