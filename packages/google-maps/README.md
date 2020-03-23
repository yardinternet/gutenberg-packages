# Filters

The google map advanced block supports import from CPT's. Please make sure that the CPT has the correct meta fields with coordinates stored in them.
Meta fields that are required are 'latitude' & 'longitude'.
To automate this proces this example can be used for adding the coordinates to the CPT while this post is being saved.

Take notice: the CPT must have meta fields for a city and an address

## Add coordinates to CPT while saving

```Hook::action('rest_after_insert_name_of_CPT', function ($post, $request) {
$postCity = get_post_meta($post->ID, '_ys_location-city', true);
$postAddress = get_post_meta($post->ID, '_ys_location-address', true);

    if ( ! empty($postCity) && ! empty($postAddress)) {
        $getGeo = wp_remote_get('https://maps.googleapis.com/maps/api/geocode/json?address='.$postAddress.'+'.$postCity.'&key=' . $apiKey, []);
        $responseBody = json_decode($getGeo['body']);
        $location = $responseBody->results[0]->geometry->location;

        update_post_meta($post->ID, '_ys_lat', $location->lat);
        update_post_meta($post->ID, '_ys_lng', $location->lng);
    }

}, 10, 2);
```

## Include meta fields to the response of the REST API

The response of the REST API does not include the meta fields by default. Below an example that explains how to add the meta fields to the response.

```Hook::filter('rest_prepare_name_of_CPT', function ($data, $post, $context) {
    $latitude = get_post_meta($post->ID, '_ys_lat', true);
    $longitude = get_post_meta(\$post->ID, '_ys_lng', true);

    $data->data['latitude'] = empty(  $latitude ) ? null : $longitude;

    $data->data['longitude'] = empty(  $longitude ) ? null : $longitude;

    return $data;

}, 10, 3);
```

## Add filter

A filter in hooks.js, inside the blocks folder within the theme folder, is required to activate this functionality.

-   path to destination: htdocs/wp-content/themes/theme-fusion/blocks/hooks.js

## Example: add filter

import { addFilter } from '@wordpress/hooks';

```addFilter(
    'yard-blocks.googleMapsSupportingCPT',
    'yard-blocks.googleMapsSupportingCPT',
    () => ( {
        name:
        'locatie',
    } )
);
```

## Include map into the frontend

```JS
import {
    Map as GoogleMap,
    props,
    mapDomId
} from "@yardinternet/gutenberg-google-maps/src/frontend";
import { render } from "@wordpress/element";

function Map() {
    return <GoogleMap {...props} />;
}

if (document.getElementById(mapDomId)) {
    render(<Map />, document.getElementById(mapDomId));
}
```
