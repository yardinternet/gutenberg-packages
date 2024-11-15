# Tolkie

Shows a Tolkie placeholder in the editor. Make sure to add the Tolkie script to your theme and TOLKIE_TOKEN to your .env file.

```php
add_action('wp_enqueue_scripts', function () {
    if (has_block('yard-blocks/tolkie')) {
        wp_enqueue_script('tolkie', 'https://tool.tolkie.nl/src/outside_script.js', [], null, true);
    }
});

add_filter('script_loader_tag', function ($tag, $handle, $source) {
    if ('tolkie' === $handle) {
        $tag = sprintf(
            '<script type="module" class="tolkieIntegrationScript" tolkie-buttons="true" defer token="%s" src="%s"></script>',
            esc_attr(env('TOLKIE_TOKEN')),
            esc_url($source)
        );
    }

    return $tag;
}, 10, 3);
```
