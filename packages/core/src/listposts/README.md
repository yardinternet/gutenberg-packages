# List Posts

This block can list posts of any posttype with query controls.
The view of this block is server side rendered, these files are located inside the Backend folder.

## Override views in template

Each view inside Backend/ListPosts/view can be overriden from the theme.

## Add yard-props to template

Yard-props can be used to configure your template and this block. You must place this Yard-props in the DocBlock of your template file.
Based on the props you have added to the template, the block settings view displays different panel bodies.

This block currently supports the following Yard-props:

- HAS_CUSTOM_ID_ANCHOR
- HAS_NUMBER_PER_ROW

Take notice:

- Every Yard-prop in your DocBlock should start with the prefix '@yard-prop'.
- Every prefix should be followed by a space and then the name of the Yard-prop and again followed by a space.
- Behind every Yard-prop you must define a boolean value.

Example:

- @yard-prop HAS_CUSTOM_ID_ANCHOR true

### Example

We want to set the number of items per row of our listpost template.

```PHP
/**
 * @param Collection[] \Yard\Support\Post $posts
 * @yard-prop HAS_NUMBER_PER_ROW true
 */
```

When chosing the template, gutenberg will render the section 'Kolommen per rij'.
Chose the amount of columns per row and the listpost will pass the variable `$rowColClasses` to the template

Change

````PHP
 <div class="col-md-6">
 ```

 To

 ```
 <div class="{{ $rowColClasses }}">
 ```


## Custom views

A custom view can be enabled by creating a blade file into the appropiate block custom view directory
Thus, in {active-theme}/templates/blocks/ListPosts/view/custom/example.blade.php. This example.blade.php custom view can then be selected in the Gutenberg editor.

### Endpoints

-   Get all custom views available in the template:

         ```/wp-json/yard/blocks/v1/list-posts/custom-views/```

-   Get all the posttypes, and their pages:

         ```/wp-json/yard/blocks/v1/list-posts/posts/any```
````

## Remote sources

It's possible to integrate any other remote posts, which contains the WordPress post format.

### Implement from project

Add the following hook from your project to integrate remoteSources

```JS
addFilter( 'yard-blocks.listPostsRemoteSources', 'yard-blocks', () => {
 return [
  {
   title: 'Valente',
   value: 'site-1',
   id: 'site-1',
   baseUrl: 'https://www.valente.nl/wp-json/wp/v2/',
   types: [
    { id: 'pages', name: 'Paginas', slug: 'pages' },
    { id: 'faq', name: 'Faq', slug: 'faq' },
   ],
  },
  {
   title: 'Yard',
   value: 'site-2',
   id: 'site-2',
   baseUrl: 'https://www.yard.nl/wp-json/wp/v2/',
   types: [ { id: 'pages', name: 'Paginas', slug: 'pages' } ],
  },
 ];
} );
```

### FetchOptions

The `yard-blocks.listPostsFetchSourcesParam` is available to add extra params when fetching remote sources

```JS
addFilter( 'yard-blocks.listPostsFetchSourcesParam', 'yard-blocks', () => ( { limit: 100, data: 'data' } )
```

### Mapping options

The `yard-blocks.listPostsRemoteSourcesMapping` is available to customize the remote sources mapping

```JS
addFilter( 'yard-blocks.listPostsRemoteSourcesMapping', 'yard-blocks', (mapping, item, urlObject) => {
 mapping.siteTitle = urlObject.slug;
 return mapping;
}
```
