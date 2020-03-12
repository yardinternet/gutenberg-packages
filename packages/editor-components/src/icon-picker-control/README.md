# Icon picker control

The React FontIconPicker component included in the IconPickerControl, is a React Component for displaying an interface to pick fonts or SVG out of a collection. More information found here: https://github.com/fontIconPicker/react-fonticonpicker

By default, FontIconPicker tries to render using class. Whatever you pass through icons, will be used like <i class={icon}>. This works with FontAwesome and glyphicons. If for some reason you want to use a custom data-attribute, see the filters below.

## Usage

To use a custom iconfont in your project, make sure to generate your iconfont with a fontgenerator e.g. IcoMoon (https://icomoon.io/). You will end up with a .zip file containing your font files and a style.css file.

Next, place the font files in a folder in your theme (e.g. /assets/fonts). Make sure the source folder in your style.css file matches your font files folder. After that, enqueue the style.css file with wp_enqueue_scripts and admin_enqueue_scripts.

Make sure to use the filter below to add the icon classes to the iconList. These classes are found in the style.css file.

## Hooks

Alter, add or override the list with icon classes. Use an array with classnames for a non-categorized picker, or a plain object for a categorized picker. Example for a categorized list override:

```JS
addFilter( 'yard-blocks.gutenberg-editor-components.iconPickerList', iconList ){
    const icons = {
        'Users & People': [
            'fab fa-accessible-icon',
            'fas fa-address-book',
        ]
    }
    return icons;
};
```

For an iconset with attribute rendering (such as <i data-icomoon={name}>), use this filter. Return an object with the structure below

```JS
addFilter( 'yard-blocks.gutenberg-editor-components.attributeRendering' ){
    return {
        data: 'data-icomoon', // String with the data attribute
        icons: [ // Array with objects
            {
                icon: 57436,  // Icon values
                search: 'Arrow left' // Additional search prop for using the search field effectively
            },
            {
                icon: 57437,
                search: 'Arrow right'
            },
            {
                icon: 57438,
                search: 'Arrow up'
            },
        ],
    }
};
```
