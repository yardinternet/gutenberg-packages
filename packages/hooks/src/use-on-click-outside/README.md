# `useOnClickOutside`

The `useOnClickOutside` hook is a hook that calls a callback when the user clicks outside of the target.

## Usage

```js
import { useOnClickOutside } from '@yardinternet/gutenberg-hooks';

function BlockEdit(props) {
    const [ isOpen, setIsOpen ] = useState( false );
    const closePopover = () => setIsOpen( false );

    const ref = useOnClickOutside( closePopover );

    return (
        { isOpen && (
            <Popover
                ref={ popoverRef }
            >
                ...
            </Popover>
        ) }
    );
}
```
