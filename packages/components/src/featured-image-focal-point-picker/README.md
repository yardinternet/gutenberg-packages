# Featured Image Focal Point Picker

The Featured Image Focal Point Picker component is a wrapper that enhances the featured image functionality by allowing users to set a focal point.

## How to use

### Register meta field for all post types

To enable the focal point picker, you'll need to register a meta field for the featured image focal point. Use the following PHP code snippet:

```PHP
register_post_meta('', 'featured_image_focal_point', [
    'type' => 'object',
    'description' => __('Focal point of the featured image'),
    'single' => true,
    'show_in_rest' => [
        'schema' => [
            'type' => 'object',
            'properties' => [
                'x' => [
                    'type' => 'number',
                    'default' => 0.5,
                ],
                'y' => [
                    'type' => 'number',
                    'default' => 0.5,
                ],
            ],
        ],
    ],
]);
```

### Custom-field supports for custom post types

Make sure to enable `custom-fields` support for any custom post types where you want to use the focal point picker.

### Add focal point picker to featured image

Integrate the focal point picker into the featured image editor by using JavaScript. This snippet adds the picker to the featured image in the editor:

```JS
import { addFilter } from '@wordpress/hooks';

addFilter(
    'editor.PostFeaturedImage',
    'yard',
    FeaturedImageFocalPointPicker
);
```

### Specify allowed post types

Specify which post types should have access to the focal point picker using the following JavaScript snippet:

```JS
import { addFilter } from '@wordpress/hooks';

addFilter(
    'yard.featured-image-focal-point-picker-allowed-post-types',
    'yard',
    () => [ 'employee', 'page' ]
);
```

### Retrieve focal point values

To retrieve the focal point values for a specific post, use the `getFeaturedImageFocalPoint` method in your PHP code:

```PHP
public function getFeaturedImageFocalPoint($property = 'object-position'): string
{
    $focalPoint = \get_post_meta($this->ID, 'featured_image_focal_point', true);
    if (! $focalPoint) {
        return '';
    }

    $focalPoint = [
        'x' => isset($focalPoint['x']) ? $focalPoint['x'] : 0.5,
        'y' => isset($focalPoint['y']) ? $focalPoint['y'] : 0.5,
    ];

    return sprintf(
        '%s:%d%% %d%%;',
        $property,
        $focalPoint['x'] * 100,
        $focalPoint['y'] * 100
    );
}
```
