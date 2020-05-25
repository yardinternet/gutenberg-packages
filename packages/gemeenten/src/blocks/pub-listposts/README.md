# Gutenberg Gemeenten OpenPub ListPost

## Add templates

Add templates with this hook.

1. Add a new template file in the ListPostOpenPub folder, for example {theme}/templates/blocks/ListPostsOpenPub/list.blade.php
2. Place this filter in your JS, before `registerGemeentenBlock`

```JS
import { addFilter } from "@wordpress/hooks";

addFilter(
    "gutenberg-gemeenten.OpenPubListPostTemplates",
    "gutenberg-gemeenten",
    () => {
        const templates = [
            { value: "index", label: "Standaard" }, // Default template
            { value: "list", label: "Lijst" } // Value must be the name of your template file
        ];
        return templates;
    }
);
```
